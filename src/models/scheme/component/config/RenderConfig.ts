import {Value} from "@/models/scheme/component/parts/Value.ts";

export type RenderConfig = {
	label: string,
	values: Value[],
	placeholder: string,
	multiple: boolean,
	content: string,
	alt: string,
	source: string,
	text:string,
	defaultRepetitions: number
	allowAddRemove: boolean,
}