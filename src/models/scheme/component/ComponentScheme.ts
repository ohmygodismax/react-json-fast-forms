import {ComponentTypes} from "@/models/scheme/component/ComponentTypes.ts";
import {AsyncConfig} from "@/models/scheme/component/config/AsyncConfig.ts";
import {LayoutConfig} from "@/models/scheme/component/config/LayoutConfig.ts";
import {AvailableConfig} from "@/models/scheme/component/config/AvailableConfig.ts";
import {ValidateConfig} from "@/models/scheme/component/config/ValidateConfig.ts";
import {ValueConfig} from "@/models/scheme/component/config/ValueConfig.ts";
import {RenderConfig} from "@/models/scheme/component/config/RenderConfig.ts";

export type ComponentScheme = {
	id: string,
	components?: ComponentScheme[],
	type: ComponentTypes

	//configs
	value?: ValueConfig,
	render?: Partial<RenderConfig>,
	available?: AvailableConfig
	layout?: Partial<LayoutConfig>,
	async?: AsyncConfig,
	validate?: Partial<ValidateConfig>
}