import {JSONFunction} from "@/models/scheme/component/parts/JSONFunction.ts";

export type AvailableConfig = {
	readonly?: boolean,
	dependsConditions?: JSONFunction //input: form state
}