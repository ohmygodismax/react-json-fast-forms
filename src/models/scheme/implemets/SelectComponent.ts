import {ComponentScheme} from "@/models/scheme/component/ComponentScheme.ts";
import {FormItemKeys} from "@/models/scheme/implemets/keys/FormItemKeys.ts";

export type SelectComponent = FormItemKeys & Required<Pick<ComponentScheme,
	'values'
>>