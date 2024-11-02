import {ReactElement} from "react";
import {Form} from "antd";
import {ComponentLayout} from "@/containers/formComponents/ComponentLayout.tsx";

interface ComponentProps {
	label?: string,
	name: string | string[],
	children: ReactElement,
	isRequired?: boolean
}

export const FormItemComponent = ({label, name, isRequired = false, children}: ComponentProps) => {
	return (
		<ComponentLayout>
			<Form.Item
				required={isRequired}
				rules={[{required: isRequired}]}
				name={name}
				label={label && label}
			>
				{children}
			</Form.Item>
		</ComponentLayout>
	)
}