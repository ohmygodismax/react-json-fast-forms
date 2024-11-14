import {AsyncConfig} from "@/models/scheme/component/config/AsyncConfig.ts";
import {ReactElement, useCallback, useEffect, useMemo, useState} from "react";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import {useWatch} from "antd/es/form/Form";
import {JSONFunction} from "@/models/scheme/component/parts/JSONFunction.ts";

export type AsyncData = {
	data: object
	value: string | undefined,
	label: string | undefined,
}[] | null

type ResultConfig = {
	data: AsyncData,
	isLoading: boolean,
	error: string | null
}

interface AsyncProviderProps {
	config: AsyncConfig,
	render: (config: ResultConfig) => ReactElement
}

export const AsyncDataProvider = ({config, render}: AsyncProviderProps) => {
	const form = useFormInstance();

	const watchedValues = useWatch((values) => { //Достаем наблюдаемые свойства из состояния формы
		const dependsValues = config.depends?.map((item) => item.value);
		let watchedValues: typeof values | null = null;
		if (dependsValues) {
			watchedValues = {};
			for (const key in values) {
				if (dependsValues.includes(key)) {
					watchedValues[key] = values[key];
				}
			}
		}
		return watchedValues
	}, form);

	const [asyncData, setAsyncData] = useState<object[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchVariables = useMemo(() => { //Обработываем наблюдаемые значение, при необходимости оборачиваем переменные в прочие названия
		if (watchedValues) {
			const dependValues = config.depends;
			if (dependValues) {
				const wrappedValues: Record<string, string | undefined> = {};
				dependValues.forEach((item) => {
					const {value, wrappedAsyncValue} = item;
					wrappedValues[wrappedAsyncValue ? wrappedAsyncValue : value] = watchedValues[value];
				})
				return wrappedValues
			} else {
				return watchedValues
			}
		}
	}, [config, watchedValues]);

	useEffect(() => { //Проверяем переменные на undefined и конфигурацию на параметр ifUndefined перед запросом
		if (fetchVariables) {
			const isAllValuesUndefined = Object.values(fetchVariables).every((variable) => variable === undefined);
			if (!isAllValuesUndefined) {
				fetchData();
			} else if (config.fetch?.ifUndefined) {
				fetchData();
			}
		}
	}, [config, fetchVariables]);

	useEffect(() => { //При необходимости запрашиваем данные при инициализации
		if (config.fetch?.onInit && config.fetch?.ifUndefined) {
			fetchData();
		}
	}, [config]);

	const fetchData = useCallback(() => {
		setIsLoading(true);
		setError('');
		fetch(
			config.url,
			{
				method: config.type === 'fetch/post' || config.type === 'gql' ? 'POST' : 'GET',
				headers: {
					'Content-Type': "application/json",
					'Accept': "application/json",
				},
				body: JSON.stringify({
					query: config.query,
					variables: fetchVariables
				})
			}
		)
			.then((res) => res.json())
			.then((json) => {
				if (json.errors && json.errors.length !== 0) {
					throw new Error('Ошибка при выполнении запроса')
				}
				setAsyncData(json.data);
			})
			.catch((error) => {
				setError(error);
			})
			.finally(() => {
				setIsLoading(false);
			})
	}, [config, watchedValues])

	const createFunctionFromJSON = (json: JSONFunction) => {
		return new Function(json.arguments, json.body);
	}

	const outputData = useMemo(() => { //Обрабатываем полученные данные
		let data: AsyncData = null;

		const intersectFunctionScheme = config.data?.intersectProcessing;
		const valueFunctionScheme = config.extractors?.value;
		const labelFunctionScheme = config.extractors?.label;

		if (asyncData) {
			if (intersectFunctionScheme) {
				const dataProcess = (createFunctionFromJSON(intersectFunctionScheme));
				data = dataProcess(asyncData, watchedValues);
			}

			if (!Array.isArray(data) || !data) {
				throw new Error('After the request and processing, there should be an array')
			}

			data = data.map((item) => ({
				data: item,
				value: undefined,
				label: undefined
			}))

			if (valueFunctionScheme) {
				const valueExtractor = createFunctionFromJSON(valueFunctionScheme);
				data = data.map((item) => ({
					...item,
					value: valueExtractor(item.data)
				}))
			}

			if (labelFunctionScheme) {
				const labelExtractor = createFunctionFromJSON(labelFunctionScheme);
				data = data.map((item) => ({
					...item,
					label: labelExtractor(item.data)
				}))
			}
		}

		return data
	}, [config, asyncData, watchedValues]);

	return (
		<>
			{render({
				data: outputData,
				isLoading: isLoading,
				error: error,
			})}
		</>
	)
}