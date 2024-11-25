import {SpanOffset} from "@/models/parts/layout/SpanOffset.ts";
import {BreakPointsLayout} from "@/models/parts/layout/BreakPointsLayout.ts";
import {Direction} from "@/models/parts/layout/Direction.ts";

export type Align = "left" | "center" | "right";

export type LayoutConfig = {
	labelCol?: SpanOffset | BreakPointsLayout,
	wrapperCol?: SpanOffset | BreakPointsLayout,
	direction?: Direction,
	align?: Align
}