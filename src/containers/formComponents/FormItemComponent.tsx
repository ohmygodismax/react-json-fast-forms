import {ReactElement} from "react";
import {ColProps, Form} from "antd";
import {ComponentLayout} from "@/containers/formComponents/ComponentLayout.tsx";
import {Direction} from "@/models/parts/layout/Direction.ts";

interface ComponentProps {
	label?: string,
	name: string | string[],
	labelCol?: ColProps,
	wrapperCol?: ColProps,
	children: ReactElement,
	isRequired?: boolean,
	readOnly?: boolean,
	direction?: Direction
}

export const FormItemComponent = ({label, name, direction, isRequired = false, readOnly, children, labelCol, wrapperCol}: ComponentProps) => {
	return (
		<ComponentLayout>
			<Form.Item
				required={isRequired}
				rules={[{required: isRequired}]}
				labelCol={labelCol || undefined}
				wrapperCol={wrapperCol || undefined}
				layout={direction}
				name={name}
				label={label && label}
				tooltip={readOnly && 'Поле доступно только для просмотра'}
			>
				{children}
			</Form.Item>
		</ComponentLayout>
	)
}