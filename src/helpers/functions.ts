import {JSONFunction} from "@/models/scheme/component/parts/JSONFunction.ts";

export const createFunctionFromJson = (json: JSONFunction) => {
	return new Function(json.arguments, json.body)
}