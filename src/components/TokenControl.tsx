import {useContext, useEffect} from "react";
import {DynamicFormContext} from "@/providers/DynamicFormProvider.tsx";

interface TokenParserProps {
	token: string,
	type: string,
}

export const TokenControl = ({token, type}: TokenParserProps) => {
	const config = useContext(DynamicFormContext);

	useEffect(() => {
		if (config) {
			const {setToken} = config;
			if (token) {
				setToken(type, token);
			} else if (config.getToken(type)) {
				//TODO: В таком случае нужно удалить свойство.
			}
		}
	}, [config, token, type]);

	return null
}