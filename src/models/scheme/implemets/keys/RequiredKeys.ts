import {SchemeComponent} from "@/models/scheme/SchemeComponent.ts";

export type RequiredKeys = Required<Pick<SchemeComponent,
	'id' | 'type'
>>