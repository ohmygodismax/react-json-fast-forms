import FormItemSchemeBuilder from "@/modules/builder/sheme/implements/items/FormItemSchemeBuilder.ts";
import {Value} from "@/models/scheme/component/parts/Value.ts";
import {AsyncConfig} from "@/models/scheme/component/config/AsyncConfig.ts";

export class SelectBuilder extends FormItemSchemeBuilder {
	constructor(id: string, valueName: string) {
		super(id, 'select', valueName);
	}

	addValues = (values: Value[]) => {
		this.componentScheme.render = {
			...this.componentScheme.render,
			values: values
		}
	}

	setMultiple = (isMultiple: boolean) => {
		this.componentScheme.render = {
			...this.componentScheme.render,
			multiple: isMultiple
		}
	}

	setPlaceholder = (placeholder: string) => {
		this.componentScheme.render = {
			...this.componentScheme.render,
			placeholder: placeholder
		}
	}

	setAsyncConfig = (async: AsyncConfig) => {
		this.componentScheme.async = async;
	}
}