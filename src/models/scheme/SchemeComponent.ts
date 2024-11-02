import {SchemeComponentTypes} from "@/models/scheme/SchemeComponentTypes.ts";

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
	values?: {label: string, value: string}[], //Select
	path?: string, //Dynamic List,
	defaultRepetitions?: number //Dynamic List
	placeholder?: string,
	allowAddRemove?: boolean, //Dynamic List
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