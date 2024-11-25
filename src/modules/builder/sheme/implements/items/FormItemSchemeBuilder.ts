import AbstractSchemeBuilder from "@/modules/builder/sheme/AbstractSchemeBuilder.ts";
import {ComponentTypes} from "@/models/scheme/component/ComponentTypes.ts";
import {JSONFunction} from "@/models/scheme/component/parts/JSONFunction.ts";
import {Direction} from "@/models/parts/layout/Direction.ts";
import {Align} from "@/models/scheme/component/config/LayoutConfig.ts";

abstract class FormItemSchemeBuilder extends AbstractSchemeBuilder {
	protected constructor(id: string, type: ComponentTypes, valueName: string) {
		super(id, type);
		this.componentScheme.value = {
			...this.componentScheme.value,
			valueName: valueName
		}
	}

	setLayoutDirection = (direction: Direction) => {
		this.componentScheme.layout = {
			...this.componentScheme.layout,
			direction: direction
		}
	}

	setLayoutAlign = (align: Align) => {
		this.componentScheme.layout = {
			...this.componentScheme.layout,
			align: align
		}
	}

	setLabel = (label: string)=>  {
		this.componentScheme.render = {
			...this.componentScheme.render,
			label: label
		};
	}

	setAvailableCondition = (condition: JSONFunction) => {
		this.componentScheme.available = {
			...this.componentScheme.available,
			dependsCondition: condition
		}
	}
}

export default FormItemSchemeBuilder