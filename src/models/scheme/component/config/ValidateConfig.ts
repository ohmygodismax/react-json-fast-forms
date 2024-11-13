import {JSONFunction} from "@/models/scheme/component/parts/JSONFunction.ts";

export type ValidateConfig = {
	required: boolean,
	validateFunc: JSONFunction

	//Number
	min: number,
	max: number,
	step: number,

	//String
	textReq: string,
	maxLength: number,
	minLength: number
}