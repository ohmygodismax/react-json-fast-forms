import {Value} from "@/models/scheme/component/parts/Value.ts";

export type RangePresets = {
	prevMonth?: boolean,
	curMonth?: boolean
	prevWeek?: boolean,
	curWeek?: boolean,
	prevQuarter?: boolean,
	curQuarter?: boolean,
}

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
	rangePresets: RangePresets,
}