import {AsyncConfig} from "@/models/scheme/component/config/AsyncConfig.ts";
import {ReactElement, useCallback, useEffect, useMemo, useState} from "react";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import {useWatch} from "antd/es/form/Form";
import {Value} from "@/models/scheme/component/parts/Value.ts";

type ResultConfig = {
	values: Value[] | undefined,
	isLoading: boolean,
	error: string | null
}

interface AsyncProviderProps {
	config: AsyncConfig,
	render: (config: ResultConfig) => ReactElement
}

export const AsyncProvider = ({config, render}: AsyncProviderProps) => {
	const form = useFormInstance();
	const watchedValues = useWatch((values) => {
		const dependsValues = config.dependsValues.map((value) => {
			return typeof value === 'string' ? value : value[0]
		});
		const filteredValues: typeof values = {};
		for (const key in values) {
			if (dependsValues.includes(key)) {
				filteredValues[key] = values[key];
			}
		}
		return filteredValues
	}, form);

	const [asyncData, setAsyncData] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchVariables = useMemo(() => {
		if (config.dependsValues.length !== 0 && watchedValues) {
			const values: Record<string, string | undefined> = {};
			config.dependsValues.forEach((valueName) => {
				if (typeof valueName === "string") {
					values[valueName] = watchedValues[valueName];
				} else {
					values[valueName[1]] = watchedValues[valueName[0]];
				}
			})
			return values
		}
	}, [config.dependsValues, watchedValues]);

	useEffect(() => {
		if (fetchVariables) {
			const isAllVariablesUndefined = Object.values(fetchVariables).every((variable) => variable === undefined);
			if (isAllVariablesUndefined) {
				if (config.fetchIfUndefined) {
					fetchData();
				}
			} else {
				fetchData();
			}
		}
	}, [config.fetchIfUndefined, fetchVariables]);

	useEffect(() => {
		if (config.fetchOnInit && config.fetchIfUndefined) {
			fetchData();
		}
	}, [config.fetchOnInit, config.fetchIfUndefined]);

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
			.then((data) => {
				setAsyncData(data.data);
			})
			.catch((error) => {
				setError(error);
			})
			.finally(() => {
				setIsLoading(false);
			})
	}, [config, watchedValues])

	const values = useMemo(() => {
		let data: object[] | undefined = asyncData;
		if (asyncData && config.extractDataFunction) {
			const extractDataFunction = new Function(config.extractDataFunction.arguments, config.extractDataFunction.body);
			const extractData = extractDataFunction(asyncData);
			if (config.filterByDependent && fetchVariables) {
				const filterFunction = new Function(config.filterByDependent.arguments, config.filterByDependent.body);
				const values = config.dependsValues.map((value) => {
					let valueName: string;
					if (typeof value === 'string') {
						valueName = value;
					} else {
						valueName = value[1]
					}
					return fetchVariables[valueName]
				})

				data = filterFunction(values, extractData)
			} else {
				data = extractData;
			}
		}

		const extractValueFunction = new Function(config.extractValueFunction.arguments, config.extractValueFunction.body);
		const extractLabelFunction = new Function(config.extractLabelFunction.arguments, config.extractLabelFunction.body);

		if (data) {
			return data.map((item: object) => {
				return {
					value: extractValueFunction(item),
					label: extractLabelFunction(item)
				}
			})
		}
	}, [config, asyncData, fetchVariables]);

	return (
		<>
			{render({
				values: values,
				isLoading: isLoading,
				error: error,
			})}
		</>
	)
}