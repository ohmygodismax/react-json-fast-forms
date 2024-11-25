import {ComponentScheme} from "@/models/scheme/component/ComponentScheme.ts";
import {ComponentTypes} from "@/models/scheme/component/ComponentTypes.ts";

abstract class AbstractSchemeBuilder {
	componentScheme: ComponentScheme;

	protected constructor(id: string, type: ComponentTypes) {
		this.componentScheme = {
			id: id,
			type: type
		}
	}

	getResult = () => {
		return this.componentScheme
	}
}

export default AbstractSchemeBuilder