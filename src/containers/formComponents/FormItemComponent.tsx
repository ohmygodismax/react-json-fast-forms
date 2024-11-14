import {ReactElement} from "react";
import {Form} from "antd";
import {ComponentLayout} from "@/containers/formComponents/ComponentLayout.tsx";

interface ComponentProps {
	label?: string,
	name: string | string[],
	labelCol?: number,
	children: ReactElement,
	isRequired?: boolean,
	readOnly?: boolean,
}

export const FormItemComponent = ({label, name, isRequired = false, readOnly, children, labelCol}: ComponentProps) => {
	return (
		<ComponentLayout>
			<Form.Item
				required={isRequired}
				rules={[{required: isRequired}]}
				labelCol={labelCol ? { span: labelCol } : undefined}
				name={name}
				label={label && label}
				tooltip={readOnly && 'Поле доступно только для просмотра'}
			>
				{children}
			</Form.Item>
		</ComponentLayout>
	)
}