import {createRoot} from 'react-dom/client'
import {FormState} from "@/models/FormState.ts";
import {FormScheme} from "@/models/scheme/FormScheme.ts";
import {SchemeComponent} from "@/models/scheme/SchemeComponent.ts";
import {SchemeComponentTypes} from "@/models/scheme/SchemeComponentTypes.ts";
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
					type: SchemeComponentTypes.TEXT_FIELD
				},
				{
					id: 'date_01',
					valueName: 'date_01',
					label: 'Введите дату',
					type: SchemeComponentTypes.DATE
				}
			],
			type: SchemeComponentTypes.GROUP
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
							type: SchemeComponentTypes.SELECT
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
									type: SchemeComponentTypes.NUMBER
								},
								{
									id: 'dynamicList_01-checkbox_01',
									label: 'Да/Нет',
									valueName: 'subItem_02',
									type: SchemeComponentTypes.CHECKBOX
								},
							],
							allowAddRemove: true,
							path: 'items',
							type: SchemeComponentTypes.DYNAMIC_LIST
						}
					],
					type: SchemeComponentTypes.GROUP
				},
				{
					id: 'subGroup_02',
					label: 'Подгруппа 2',
					components: [
						{
							id: 'tagList_01',
							valueName: 'tagList_01',
							label: 'Список тегов',
							type: SchemeComponentTypes.TAG_LIST
						},
						{
							id: 'textArea_01',
							valueName: 'textArea_01',
							label: 'Зона текста',
							validate: {
								minLength: 2,
								required: true
							},
							type: SchemeComponentTypes.TEXT_AREA
						}
					],
					type: SchemeComponentTypes.GROUP
				}
			],
			type: SchemeComponentTypes.GROUP
		}
	],
	type: SchemeComponentTypes.GROUP
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
}
console.log("HELLO WORLD");

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
