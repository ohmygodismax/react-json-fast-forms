import AbstractAsyncConfigBuilder from "@/modules/builder/config/AbstractAsyncConfigBuilder.ts";

export class GQLAsyncConfigBuilder extends AbstractAsyncConfigBuilder {
	constructor(url: string, query: string) {
		super('gql', url);
		this.asyncConfig.query = query;
	}
}