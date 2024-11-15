import {ComponentScheme} from "@/models/scheme/component/ComponentScheme.ts";
import {SchemeComponentFabric} from "@/services/ShemeComponentFabric.tsx";
import {SimpleComponent} from "@/containers/formComponents/SimpleComponent.tsx";
import {FormItemComponent} from "@/containers/formComponents/FormItemComponent.tsx";
import {useMemo} from "react";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import {useWatch} from "antd/es/form/Form";

interface ComponentProps {
	path?: string,
	group?: ComponentScheme,
	component: ComponentScheme
}

export const Component = ({path, component, group} : ComponentProps) => {
	const form = useFormInstance();
	const state = useWatch([], form);

	const reactComponent = useMemo(() => {
		return SchemeComponentFabric(component, state)
	}, [component, state]);

	const renderComponent = () => {
		switch (component.type) {
			case 'image':
			case 'text':
			case 'divider':
			case 'html': {
				return (
					<SimpleComponent>
						{reactComponent}
					</SimpleComponent>
				);
			}
			default: {
				const required = component.validate?.required;
				const valueName = component.value?.valueName;
				const label = component.render?.label;
				const readonly = component.available?.readonly;
				if (!valueName || valueName === '') {
					throw new Error('ValueName is required');
				}

				return (
					<FormItemComponent
						name={path ? [path, valueName] : valueName}
						labelCol={component.layout?.labelCol || group?.layout?.labelCol}
						wrapperCol={component.layout?.wrapperCol || group?.layout?.wrapperCol}
						label={label}
						direction={component.layout?.direction}
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