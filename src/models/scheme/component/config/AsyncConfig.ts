import {JSONFunction} from "@/models/scheme/component/parts/JSONFunction.ts";

export type AsyncConfig = {
	type: 'fetch/post' | 'fetch/get' | 'gql',
	url: string,
	query: string,
	data?: {
		intersectProcessing: JSONFunction //input: data, state
	},
	fetch?: {
		dependsCondition?: JSONFunction //input: state
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