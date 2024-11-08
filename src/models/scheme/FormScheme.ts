import {SchemeComponent} from "@/models/scheme/SchemeComponent.ts";

export type FormScheme = {
	content: SchemeComponent,
	schemeVersion?: string,
	type?: string
}