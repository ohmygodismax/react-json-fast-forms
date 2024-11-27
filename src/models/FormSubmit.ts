import {JSONFunction} from "@/models/scheme/component/parts/JSONFunction.ts";

export type FormSubmit = {
	type: 'post' | 'get',
	url: string,
	ignoredStateValuesRegExp?: string,
	statePreRequestHandler?: JSONFunction
}