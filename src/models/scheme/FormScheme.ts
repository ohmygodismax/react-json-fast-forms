import {SchemeComponent} from "@/models/scheme/SchemeComponent.ts";

export type FormScheme = {
	component: SchemeComponent,
	schemeVersion?: string,
	type?: string
}