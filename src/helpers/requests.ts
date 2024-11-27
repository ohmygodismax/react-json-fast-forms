import {AsyncType} from "@/models/scheme/component/config/AsyncConfig.ts";
import {FormState} from "@/models/FormState.ts";

interface RequestArguments {
	data: FormState,
	type: AsyncType,
	url: string,
	query?: string,
	authorizationToken?: string
}

export async function request({data, type, url, query, authorizationToken}: RequestArguments) {
	try {
		const fetchHeaders: HeadersInit = {
			'Content-Type': "application/json",
			'Accept': "application/json, text/plain, */*"
		};

		if (authorizationToken) {
			fetchHeaders['Authorization'] = `Bearer ${authorizationToken}`;
		}

		let requestUrl= url;
		if (type === 'fetch/get') {
			const params = new URLSearchParams();
			Object.entries((data)).forEach(([key, value]) => {
				params.append(key, `${value}`);
			})
			requestUrl = url + params.toString();
		}
		const method = type === 'fetch/post' || type === 'gql' ? 'POST' : 'GET'
		let body: string | undefined;
		switch (type) {
			case "gql": {
				body = JSON.stringify({query, variables: data || undefined})
			} break;
			case "fetch/post": {
				body = JSON.stringify(data);
			} break;
		}

		const result = await fetch(requestUrl, {headers: fetchHeaders, method, body})
		return  result.json()
	} catch {
		throw new Error('Request error')
	}
}