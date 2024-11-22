import {AsyncConfig} from "@/models/scheme/component/config/AsyncConfig.ts";
import {ReactElement, useCallback, useContext, useEffect, useMemo, useState} from "react";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import {useWatch} from "antd/es/form/Form";
import {JSONFunction} from "@/models/scheme/component/parts/JSONFunction.ts";
import {DynamicFormContext} from "@/providers/DynamicFormProvider.tsx";

export type OutputData = {
	data: object
	value: string | undefined,
	label: string | undefined,
}[] | null

type ResultConfig = {
	data: OutputData,
	isLoading: boolean,
	error: string | null
}

interface AsyncProviderProps {
	config: AsyncConfig,
	render: (config: ResultConfig) => ReactElement
}

export const AsyncDataProvider = ({config, render}: AsyncProviderProps) => { //TODO: Очень большой компонент. Когда определится вся бизнес-логика разбить на небольшие функциональные компоненты.
	const form = useFormInstance();

	const state = useWatch([], form); //Общее состояние формы

	const watchedVariables = useWatch((values) => { //Только переменные, которые определены как наблюдаемые (для повторного запроса данных)
		 const watchedVariables = config.fetch?.watchedVariables;
		 if (watchedVariables) {
			 const watchedObject: typeof values = {};
			 watchedVariables.forEach((variable) => {
				 if (values[variable]) {
					 watchedObject[variable] = values[variable];
				 }
			 });
			 return watchedObject
		 } else {
			 return null
		 }
	})

	const formConfig = useContext(DynamicFormContext);

	const [asyncData, setAsyncData] = useState<object[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const checkForFetchAvailability = useCallback(() => {
		const dependsFunctionScheme = config.fetch?.dependsCondition;
		if (dependsFunctionScheme) {
			if (state) {
				const dependsCondition = createFunctionFromJSON(dependsFunctionScheme);
				return !!dependsCondition(state);
			} else {
				return false;
			}
		} else {
			return true;
		}
	}, [state, config])

	const prepareFetchData = useCallback(() => {
		const stateToFetchVariablesFunctionScheme = config.fetch?.stateToFetchVariables;
		if (stateToFetchVariablesFunctionScheme) {
			const stateToFetchVariablesFunction = createFunctionFromJSON(stateToFetchVariablesFunctionScheme);
			return stateToFetchVariablesFunction(state);
		} else {
			return null
		}
	}, [state, config])

	useEffect(() => {
		if (!config.fetch?.watchedVariables && state && !isLoading && !asyncData) {
				if (checkForFetchAvailability()) {
					const data = prepareFetchData();
					fetchData(data);
				}
		}
	}, [state, config]);

	useEffect(() => {
		if (watchedVariables) {
			if (checkForFetchAvailability()) {
				const data = prepareFetchData();
				fetchData(data);
			}
		}
	}, [watchedVariables, config]);

	const fetchData = useCallback((data: object) => {
		setIsLoading(true);
		setError('');
		const headers: HeadersInit = {
			'Content-Type': "application/json",
			'Accept': "application/json",
		};

		if (formConfig) {
			const accessToken = formConfig.getToken('access');
			if (accessToken) {
				headers['Authorization'] = `Bearer ${accessToken}`;
			}
		}

		fetch(
			config.url,
			{
				method: config.type === 'fetch/post' || config.type === 'gql' ? 'POST' : 'GET',
				headers,
				body: config.type === 'gql' ? JSON.stringify({
					query: config.query,
					variables: data || undefined
				}) : undefined
			}
		)
			.then((res) => res.json())
			.then((json) => {
				// if (json.errors && json.errors.length !== 0) {
				// 	throw new Error('Ошибка при выполнении запроса')
				// }
				setAsyncData(json);
			})
			.catch((error) => {
				setError(error);
			})
			.finally(() => {
				setIsLoading(false);
			})
	}, [formConfig])

	const createFunctionFromJSON = (json: JSONFunction) => {
		return new Function(json.arguments, json.body);
	}

	const generateOutputData = useCallback((asyncData: object[]) => {
		let outputData: OutputData = null;

		const intersectFunctionScheme = config.data?.intersectProcessing;
		const valueFunctionScheme = config.extractors?.value;
		const labelFunctionScheme = config.extractors?.label;

		if (asyncData) {
			if (intersectFunctionScheme) {
				const dataProcess = (createFunctionFromJSON(intersectFunctionScheme));
				outputData = dataProcess(asyncData, state);

				if (!Array.isArray(outputData) || !outputData) {
					throw new Error('After the request and processing, there should be an array')
				}

				outputData = outputData.map((item) => ({
					data: item,
					value: undefined,
					label: undefined
				}))
			} else {
				if (!Array.isArray(asyncData)) {
					throw new Error('After the request and processing, there should be an array')
				}

				outputData = asyncData.map((item) => ({
					data: item,
					value: undefined,
					label: undefined
				}))
			}

			if (valueFunctionScheme) {
				const valueExtractor = createFunctionFromJSON(valueFunctionScheme);
				outputData = outputData.map((item) => ({
					...item,
					value: valueExtractor(item.data)
				}))
			}

			if (labelFunctionScheme) {
				const labelExtractor = createFunctionFromJSON(labelFunctionScheme);
				outputData = outputData.map((item) => ({
					...item,
					label: labelExtractor(item.data)
				}))
			}
		}

		return outputData
	}, [config, state])

	const outputData = useMemo(() => {
		if (asyncData) {
			return generateOutputData(asyncData)
		}
	}, [asyncData, config])


	return (
		<>
			{render({
				data: outputData || [],
				isLoading: isLoading,
				error: error,
			})}
		</>
	)
}