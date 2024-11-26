import {AsyncConfig, AsyncType} from "@/models/scheme/component/config/AsyncConfig.ts";
import {JSONFunction} from "@/models/scheme/component/parts/JSONFunction.ts";

abstract class AbstractAsyncConfigBuilder {
	asyncConfig: AsyncConfig;

	protected constructor(type: AsyncType, url: string) {
		this.asyncConfig = {
			type: type,
			url: url
		}
	}

	setAsyncDataIntersect = (func: JSONFunction) => {
		this.asyncConfig = {
			...this.asyncConfig,
			data: {
				intersectProcessing: func
			}
		}
	}

	setRequestCondition = (func: JSONFunction) => {
		this.asyncConfig = {
			...this.asyncConfig,
			fetch: {
				...this.asyncConfig.fetch,
				dependsCondition: func
			}
		}
	}

	setStateToRequestVariables = (func: JSONFunction) => {
		this.asyncConfig = {
			...this.asyncConfig,
			fetch: {
				...this.asyncConfig.fetch,
				stateToFetchVariables: func
			}
		}
	}

	setWatchedVariables = (variables: string[]) => {
		this.asyncConfig = {
			...this.asyncConfig,
			fetch: {
				...this.asyncConfig.fetch,
				watchedVariables: variables
			}
		}
	}

	addExtractor = (name: string, func: JSONFunction) => {
		this.asyncConfig = {
			...this.asyncConfig,
			extractors: {
				...this.asyncConfig.extractors,
				[name]: func
			}
		}
	}

	getResult = () => {
		return this.asyncConfig;
	}
}

export default AbstractAsyncConfigBuilder