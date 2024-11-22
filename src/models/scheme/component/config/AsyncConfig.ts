import {JSONFunction} from "@/models/scheme/component/parts/JSONFunction.ts";

export type AsyncConfig = {
	type: 'fetch/post' | 'fetch/get' | 'gql',
	url: string,
	query: string,
	data?: {
		intersectProcessing?: JSONFunction //input: data, state //TODO: Подумать над названием и местом в конфигурации.
	},
	fetch?: {
		dependsCondition?: JSONFunction //input: state TODO: Переименовать когда определится полная структура
		stateToFetchVariables?: JSONFunction//input: state. Convert state to fetch variables
		watchedVariables?: string[] //ReFetch only if variables value change
	}
	depends?: Array<{
		value: string,
		path?: string | string[],
		wrappedAsyncValue?: string
	}>,
	extractors?: { //input: processing data
		value: JSONFunction,
		label: JSONFunction
	}
}