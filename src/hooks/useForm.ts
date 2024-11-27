import {FormSubmit} from "@/models/FormSubmit.ts";
import {FormState} from "@/models/FormState.ts";
import {createFunctionFromJson} from "@/helpers/functions.ts";
import {request} from "@/helpers/requests.ts";

export const useFormSubmit = () => {
	const submit = (state: FormState, config: FormSubmit) => {
		const {type, url, ignoredStateValuesRegExp, statePreRequestHandler} = config;
		let submitState = {...state};

		if (statePreRequestHandler) {
			const statePreRequestFunction = createFunctionFromJson(statePreRequestHandler);
			submitState = statePreRequestFunction(submitState);
		}

		if (ignoredStateValuesRegExp) {
			const processedState: FormState = {};
			const reqExp = new RegExp(ignoredStateValuesRegExp, 'i');
			Object.entries(submitState).forEach(([key, value]) => {
				if (!reqExp.test(key)) {
					processedState[key] = value;
				}
			})
			submitState = processedState;
		}

		return request({
			data: submitState,
			type: type === 'post' ? 'fetch/post' : 'fetch/get',
			url: url
		})
	};

	return {submit}
}