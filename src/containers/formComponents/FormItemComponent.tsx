import {ReactElement} from "react";
import {Form} from "antd";
import {ComponentLayout} from "@/containers/formComponents/ComponentLayout.tsx";

interface ComponentProps {
	label?: string,
	name: string | string[],
	children: ReactElement,
	isRequired?: boolean,
	readOnly?: boolean,
}

export const FormItemComponent = ({label, name, isRequired = false, readOnly, children}: ComponentProps) => {
	return (
		<ComponentLayout>
			<Form.Item
				required={isRequired}
				rules={[{required: isRequired}]}
				name={name}
				label={label && label}
				tooltip={readOnly && 'Поле доступно только для просмотра'}
			>
				{children}
			</Form.Item>
		</ComponentLayout>
	)
}