import {JSONFunction} from "@/models/scheme/component/parts/JSONFunction.ts";

export type AsyncType = 'fetch/post' | 'fetch/get' | 'gql';

export type AsyncConfig = {
	type: AsyncType,
	url: string,
	query?: string,
	data?: {
		intersectProcessing?: JSONFunction //input: data, state //TODO: Подумать над названием и местом в конфигурации.
	},
	fetch?: {
		dependsCondition?: JSONFunction //input: state TODO: Переименовать когда определится полная структура
		stateToFetchVariables?: JSONFunction//input: state. Convert state to fetch variables
		watchedVariables?: string[] //ReFetch only if variables value change
	},
	extractors?: { //input: processing data
		value?: JSONFunction,
		label?: JSONFunction
	}
}