import {SchemeComponent} from "@/models/scheme/SchemeComponent.ts";
import {SchemeComponentFabric} from "@/services/ShemeComponentFabric.tsx";
import {SimpleComponent} from "@/containers/formComponents/SimpleComponent.tsx";
import {FormItemComponent} from "@/containers/formComponents/FormItemComponent.tsx";
import {useMemo} from "react";

interface ComponentProps {
	path?: string,
	component: SchemeComponent
}

export const Component = ({path, component} : ComponentProps) => {
	const reactComponent = useMemo(() => {
		return SchemeComponentFabric(component)
	}, [component]);

	const renderComponent = () => {
		switch (component.type) {
			case 'image':
			case 'text':
			case 'html': {
				return (
					<SimpleComponent>
						{reactComponent}
					</SimpleComponent>
				);
			}
			default: {
				const required = component.validate?.required;
				const {valueName, label, readonly} = component;
				if (!valueName || valueName === '') {
					throw new Error('ValueName is required');
				}
				return (
					<FormItemComponent
						name={path ? [path, valueName] : valueName}
						label={label}
						isRequired={required}
						readOnly={readonly}
					>
						{reactComponent}
					</FormItemComponent>
				)
			}
		}
	}

	return (
		<>
			{renderComponent()}
		</>
	)
}