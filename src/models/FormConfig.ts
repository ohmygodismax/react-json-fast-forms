import {FormState} from "@/models/FormState.ts";
import {FormMeta} from "@/models/FormMeta.ts";
import {FormScheme} from "@/models/scheme/FormScheme.ts";

export type FormConfig = {
	meta?: FormMeta,
	state: FormState,
	scheme: FormScheme
}