import {FormMeta} from "@/models/FormMeta.ts";
import {FormScheme} from "@/models/scheme/FormScheme.ts";
import {FormState} from "@/models/FormState.ts";
import {Form, theme} from "antd";
import {useForm} from "antd/es/form/Form";
import {ReactElement, useEffect} from "react";
import {SchemeComponentParser} from "@/components/parser/SchemeComponentParser.tsx";
import {SubmitButton} from "@/containers/SubmitButton.tsx";

interface DynamicFormProps {
	meta?: FormMeta
	scheme: FormScheme,
	state: FormState,
	onFinish: (state: FormState) => void,
	submitButton?: ReactElement,
	isDisabled?: boolean,
}

export const DynamicForm = ({meta = {layout: 'vertical'}, scheme, state, onFinish, isDisabled = false, submitButton}: DynamicFormProps) => {
	const {	token: { colorBgBase }	} = theme.useToken();
	const [form] = useForm<FormState>();

	useEffect(() => {
		console.log(scheme);
	}, [scheme]);

	return (
		<Form
			form={form}
			layout={meta.layout}
			initialValues={state}
			onFinish={onFinish}
			style={{width:'100%', background: `${colorBgBase}`}}
			disabled={isDisabled}
		>
			<SchemeComponentParser
				component={scheme.component}
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