import {SchemeComponent} from "@/models/scheme/SchemeComponent.ts";
import {FormItemKeys} from "@/models/scheme/implemets/keys/FormItemKeys.ts";

export type SelectComponent = FormItemKeys & Required<Pick<SchemeComponent,
	'values'
>>