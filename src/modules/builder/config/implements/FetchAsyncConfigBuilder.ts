import AbstractAsyncConfigBuilder from "@/modules/builder/config/AbstractAsyncConfigBuilder.ts";

export class FetchAsyncConfigBuilder extends AbstractAsyncConfigBuilder {
	constructor(type: 'post' | 'get', url: string) {
		super(`fetch/${type}`, url);
	}
}