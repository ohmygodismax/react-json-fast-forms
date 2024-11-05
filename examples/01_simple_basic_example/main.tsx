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
					id: 'text_01',
					valueName: 'text_01',
					label: 'Введите текстовое значение',
					type: 'textField'
				},
				{
					id: 'date_01',
					valueName: 'date_01',
					label: 'Введите дату',
					type: 'date'
				}
			],
			type: 'group'
		},
		{
			id: 'group_02',
			label: 'Группа 2',
			components: [
				{
					id: 'subGroup_01',
					label: 'Подгруппа 1',
					components: [
						{
							id: 'select_01',
							valueName: 'select_01',
							label: 'Выберите из списка',
							validate: {
								required: true,
							},
							values: [
								{value: 'value_01', label: 'Значение 1'},
								{value: 'value_02', label: 'Значение 2'}
							],
							type: 'select'
						},
						{
							id: 'dynamicList_01',
							label: 'Динамический лист',
							defaultRepetitions: 1,
							components: [
								{
									id: 'dynamicList_01-number_01',
									label: 'Введите номер',
									valueName: 'subItem_01',
									type: 'number'
								},
								{
									id: 'dynamicList_01-checkbox_01',
									label: 'Да/Нет',
									valueName: 'subItem_02',
									type: 'checkbox'
								},
							],
							allowAddRemove: true,
							path: 'items',
							type: 'dynamicList'
						}
					],
					type: 'group'
				},
				{
					id: 'subGroup_02',
					label: 'Подгруппа 2',
					components: [
						{
							id: 'tagList_01',
							valueName: 'tagList_01',
							label: 'Список тегов',
							allowAddRemove: true,
							readonly: true,
							type: 'tagList'
						},
						{
							id: 'textArea_01',
							valueName: 'textArea_01',
							label: 'Зона текста',
							validate: {
								minLength: 2,
								required: true
							},
							type: 'textArea'
						}
					],
					type: 'group'
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
	text_01: 'Input text',
	date_01: '2024-10-26',
	select_01: 'value_01',
	tagList_01: ['tag1', 'tag2'],
	items: [
		{
			subItem_01: 12,
			subItem_02: true
		}
	],
	textArea_01: ''
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
