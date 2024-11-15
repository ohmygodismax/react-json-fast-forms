import {SpanOffset} from "@/models/parts/layout/SpanOffset.ts";
import {BreakPointsLayout} from "@/models/parts/layout/BreakPointsLayout.ts";
import {Direction} from "@/models/parts/layout/Direction.ts";

export type FormMeta = {
	id?: string,
	name?: string,
	layout?: {
		align?: Direction,
		labelCol?: SpanOffset | BreakPointsLayout,
		wrapperCol?: SpanOffset | BreakPointsLayout,
	},
	description?: string
}