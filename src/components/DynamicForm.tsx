import {FormState} from "@/models/FormState.ts";
import {Form, theme} from "antd";
import {useForm} from "antd/es/form/Form";
import {ReactElement} from "react";
import {SchemeComponentParser} from "@/components/parser/SchemeComponentParser.tsx";
import {SubmitButton} from "@/containers/SubmitButton.tsx";
import {FormConfig} from "@/models/FormConfig.ts";

interface DynamicFormProps {
	config: FormConfig,
	onFinish?: (state: FormState) => void,
	onChange?: (state: FormState) => void,
	submitButton?: ReactElement,
	isDisabled?: boolean,
}

export const DynamicForm = ({config, onChange, onFinish, isDisabled = false, submitButton}: DynamicFormProps) => {
	const {	token: { colorBgBase }	} = theme.useToken();
	const [form] = useForm<FormState>();

	return (
		<Form
			form={form}
			layout={config.meta?.layout?.align || 'vertical'}
			labelAlign={'left'}
			initialValues={config.state}
			onFinish={onFinish}
			onValuesChange={onChange}
			style={{width:'100%', background: `${colorBgBase}`}}
			disabled={isDisabled}
		>
			<SchemeComponentParser
				component={config.scheme.content}
			/>
			<Form.Item>
				{submitButton ?
					submitButton :
					<SubmitButton/>
				}
			</Form.Item>
		</Form>
	)
}