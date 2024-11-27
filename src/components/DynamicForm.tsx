import {FormState} from "@/models/FormState.ts";
import {Form, theme} from "antd";
import {useForm} from "antd/es/form/Form";
import {ReactElement, useEffect} from "react";
import {SchemeComponentParser} from "@/components/parser/SchemeComponentParser.tsx";
import {SubmitButton} from "@/containers/SubmitButton.tsx";
import {FormConfig} from "@/models/FormConfig.ts";
import {DynamicFormContext} from "@/providers/DynamicFormProvider.tsx";
import {createFormTokenName, getToken, setToken} from "@/utils/tokens.utils.ts";
import {TokenControl} from "@/components/TokenControl.tsx";
import {useFormSubmit} from "@/hooks/useForm.ts";

interface DynamicFormProps {
	name: string,
	accessToken?: string,
	config: FormConfig,
	onFinish?: (state: FormState) => void,
	onChange?: (state: FormState) => void,
	onSubmitSuccess?: (result: object) => void,
	onSubmitFail?: (error: string) => void,
	submitButton?: ReactElement,
	isDisabled?: boolean,
}

export const DynamicForm = ({name, accessToken, config, onChange, onFinish, onSubmitSuccess, onSubmitFail, isDisabled = false, submitButton}: DynamicFormProps) => {
	const {	token: { colorBgBase }	} = theme.useToken();
	const [form] = useForm<FormState>();

	const {submit} = useFormSubmit()

	useEffect(() => {
		form.setFieldsValue(config.state);
	}, [config])

	const handleFinish = (state: FormState) => {
		const result = {...state};
		Object.entries(config.state).forEach(([key, value]) => {
			if (!result[key]) {
				result[key] = value;
			}
		});
		if (onFinish) {
			onFinish(result);
		}
		const submitConfig = config.submit;
		if (submitConfig) {
			submit(result, submitConfig)
				.then((result) => {
					if (onSubmitSuccess) {
						onSubmitSuccess(result);
					}
				})
				.catch((e) => {
					if (onSubmitFail) {
						onSubmitFail(e);
					}
				})
		}
	}

	return (
		<DynamicFormContext.Provider value={{
			formName: name,
			setToken: (type: string, token: string) => setToken(createFormTokenName(name, type), token),
			getToken: (type: string) => getToken(createFormTokenName(name, type)),
		}}>
			<Form
				form={form}
				layout={config.meta?.layout?.align || 'vertical'}
				labelCol={config?.meta?.layout?.labelCol || undefined}
				wrapperCol={config.meta?.layout?.wrapperCol || undefined}
				labelAlign={'left'}
				initialValues={config.state}
				onFinish={handleFinish}
				onValuesChange={onChange}
				style={{width:'100%', background: `${colorBgBase}`}}
				disabled={isDisabled}
			>
				<TokenControl
					token={accessToken || ''}
					type={'access'}
				/>
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
		</DynamicFormContext.Provider>
	)
}