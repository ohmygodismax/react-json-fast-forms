import {SchemeComponentTypes} from "@/models/scheme/SchemeComponentTypes.ts";
import {AsyncConfig} from "@/models/scheme/AsyncConfig.ts";
import {Value} from "@/models/scheme/Value.ts";

export type SchemeComponent = {
	id: string,
	valueName?: string,
	label?: string,
	components?: SchemeComponent[], //Group
	layout?: Partial<{columns: string | null, row: string, isColumnLayout: boolean | null}>,
	readonly?: boolean,
	content?: string, //HTML
	alt?: string, //Image
	source?: string, //Image
	text?:string,
	values?: Value[], //Select
	path?: string, //Dynamic List,
	defaultRepetitions?: number //Dynamic List
	placeholder?: string,
	allowAddRemove?: boolean, //Dynamic List
	async?: AsyncConfig,
	multiple?: boolean,
	validate?: Partial<{
		min?: number,
		max?: number,
		required?: boolean,
		step?: number,
		textReg?: string,
		maxLength?: number,
		minLength?: number
	}>,
	defaultValue?: string,
	type: SchemeComponentTypes
}