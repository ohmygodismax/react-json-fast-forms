import {createRoot} from 'react-dom/client'
import {FormState} from "@/models/FormState.ts";
import {FormScheme} from "@/models/scheme/FormScheme.ts";
import {SchemeComponent} from "@/models/scheme/SchemeComponent.ts";
import {FormConfiguration} from "@/components/FormConfiguration.tsx";
import {DynamicForm} from "@/components/DynamicForm.tsx";

const rootComponent: SchemeComponent = {
	id: 'root',
	label: 'Группа 1',
	layout: {
		isColumnLayout: true
	},
	components: [
		{
			id: 'group_01',
			components: [
				{
					id: 'select_01',
					valueName: 'select_01',
					label: 'Синхронный список',
					multiple: true,
					values: [
						{value: '1', label: 'Значение 1'},
						{value: '2', label: 'Значение 2'},
						{value: '3', label: 'Значение 3'}
					],
					type: 'select'
				},
				{
					id: 'select_02',
					valueName: 'select_02',
					label: 'Асинхронный список 1',
					placeholder: 'Выберите...',
					async: {
						type: 'gql',
						fetchOnInit: true,
						fetchIfUndefined: true,
						url: '/api/graphql',
						query: `query`,
						dependsValues: [],
						extractDataFunction: {'arguments':'data','body':`return data;`},
						extractValueFunction: {'arguments':'data', 'body':`return data.id;`},
						extractLabelFunction: {'arguments':'data', 'body':`return data.text;`},
					},
					multiple: true,
					type: 'select'
				},
				{
					id: 'select_03',
					valueName: 'select_03',
					label: 'Асинхронный список 2',
					placeholder: 'Выберите...',
					async: {
						type: 'gql',
						fetchOnInit: false,
						fetchIfUndefined: false,
						url: '/api/graphql',
						query: `query`,
						dependsValues: [['select_02', 'wrappedName']],
						filterByDependent: {'arguments':'values, data','body':`return data.filter((instrument) => values[0].includes(data.id));`},
						extractDataFunction: {'arguments':'data','body':`return data;`},
						extractValueFunction: {'arguments':'data', 'body':`return data.id;`},
						extractLabelFunction: {'arguments':'data', 'body':`return data.text;`},
					},
					multiple: true,
					values: [],
					type: 'select'
				}
			],
			type: 'group'
		}
	],
	type: 'group'
};

const scheme: FormScheme = {
	component: rootComponent
};

const state: FormState = {

};

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
					scheme={scheme}
					state={state}
					onFinish={handleFormFinish}
				/>
			</FormConfiguration>
		</>
)
