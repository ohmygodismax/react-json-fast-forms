import {createContext} from "react";
import {getToken, setToken} from "@/utils/tokens.utils.ts";

interface DynamicFormConfig {
	formName: string;
	setToken: typeof setToken;
	getToken: typeof getToken;
}

export const DynamicFormContext = createContext<DynamicFormConfig | null>(null)