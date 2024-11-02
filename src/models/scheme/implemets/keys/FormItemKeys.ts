import {RequiredKeys} from "@/models/scheme/implemets/keys/RequiredKeys.ts";
import {SchemeComponent} from "@/models/scheme/SchemeComponent.ts";

export type FormItemKeys = RequiredKeys &
	Required<Pick<SchemeComponent,
		'valueName'
	>>