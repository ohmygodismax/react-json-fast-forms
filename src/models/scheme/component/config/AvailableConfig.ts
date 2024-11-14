import {JSONFunction} from "@/models/scheme/component/parts/JSONFunction.ts";

export type AvailableConfig = {
	readonly?: boolean,
	dependsCondition?: JSONFunction //input: form state
}