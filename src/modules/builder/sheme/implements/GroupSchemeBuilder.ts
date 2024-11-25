import AbstractSchemeBuilder from "@/modules/builder/sheme/AbstractSchemeBuilder.ts";
import {ComponentScheme} from "@/models/scheme/component/ComponentScheme.ts";
import {Direction} from "@/models/parts/layout/Direction.ts";

export class GroupSchemeBuilder extends AbstractSchemeBuilder {
	constructor(id: string) {
		super(id, 'group');
	}

	setLabel = (label: string)=>  {
		this.componentScheme.render = {
			...this.componentScheme.render,
			label: label
		};
	}

	setLayoutDirection = (direction: Direction) => {
		this.componentScheme.layout = {
			...this.componentScheme.layout,
			direction: direction
		}
	}

	setComponents = (components: ComponentScheme[]) => {
		this.componentScheme.components = components;
	}

	addComponent = (component: ComponentScheme) => {
		this.componentScheme.components = this.componentScheme.components ? [...this.componentScheme.components, component] : [component];
	}
}