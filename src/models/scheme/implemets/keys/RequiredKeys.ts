import {ComponentScheme} from "@/models/scheme/component/ComponentScheme.ts";

export type RequiredKeys = Required<Pick<ComponentScheme,
	'id' | 'type'
>>