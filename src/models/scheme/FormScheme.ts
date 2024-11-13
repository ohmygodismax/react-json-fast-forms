import {ComponentScheme} from "@/models/scheme/component/ComponentScheme.ts";

export type FormScheme = {
	content: ComponentScheme,
	schemeVersion?: string,
	type?: string
}