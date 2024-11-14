import {createRoot} from 'react-dom/client'
import {FormState} from "@/models/FormState.ts";
import {FormConfiguration} from "@/components/FormConfiguration.tsx";
import {DynamicForm} from "@/components/DynamicForm.tsx";
import formConfig from "./form-config.json";
import {FormConfig} from "@/models/FormConfig.ts";

const handleFormFinish = (state: FormState) => {
	console.log(state);
};

createRoot(document.getElementById('root')!).render(
		<>
			<FormConfiguration
				designToken={{
					colorBgBase: '#e4e4e4',
					colorTextBase: '#000000',
					colorPrimaryBg: '#ac1b1b',
					colorPrimary: '#0a21b8'
				}}
			>
				<DynamicForm
					config={formConfig as FormConfig}
					onFinish={handleFormFinish}
				/>
			</FormConfiguration>
		</>
)
