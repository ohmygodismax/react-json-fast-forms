import {createRoot} from 'react-dom/client'
import {FormState} from "@/models/FormState.ts";
import {FormScheme} from "@/models/scheme/FormScheme.ts";
import {ComponentScheme} from "@/models/scheme/component/ComponentScheme.ts";
import {FormConfiguration} from "@/components/FormConfiguration.tsx";
import {DynamicForm} from "@/components/DynamicForm.tsx";

const rootComponent: ComponentScheme = {
	id: 'root',
	render: {
		label: 'Группа 1',
	},
	layout: {
		direction: 'vertical'
	},
	components: [
		{
			id: 'group_01',
			components: [
				{
					id: 'text_01',
					value: {
						valueName: 'text_01'
					},
					render: {
						label: 'Введите текстовое значение',
					},
					type: 'textField'
				},
				{
					id: 'date_01',
					value: {
						valueName: 'date_01'
					},
					render: {
						label:  'Введите дату',
					},
					type: 'date'
				}
			],
			type: 'group'
		},
		{
			id: 'group_02',
			render: {
				label: 'Группа 2',
			},
			components: [
				{
					id: 'subGroup_01',
					render: {
						label: 'Подгруппа 1',
					},
					components: [
						{
							id: 'select_01',
							value: {
								valueName: 'select_01',
								defaultValue: 'value_01'
							},
							render: {
								label: 'Выберите из списка',
								values: [
									{value: 'value_01', label: 'Значение 1'},
									{value: 'value_02', label: 'Значение 2'}
								]
							},
							validate: {
								required: true,
							},
							type: 'select'
						},
						{
							id: 'dynamicList_01',
							value: {
								path: 'items',
							},
							render: {
								label: 'Динамический лист',
								defaultRepetitions: 1,
								allowAddRemove: true,
							},
							components: [
								{
									id: 'dynamicList_01-number_01',
									render: {
										label: 'Введите номер',
									},
									value: {
										valueName: 'subItem_01',
									},
									type: 'number'
								},
								{
									id: 'dynamicList_01-checkbox_01',
									render: {
										label: 'Да/Нет',
									},
									value: {
										valueName: 'subItem_02',
									},
									type: 'checkbox'
								},
							],

							type: 'dynamicList'
						}
					],
					type: 'group'
				},
				{
					id: 'subGroup_02',
					render: {
						label: 'Подгруппа 2',
					},
					components: [
						{
							id: 'tagList_01',
							value: {
								valueName: 'tagList_01',
							},
							render: {
								label: 'Список тегов',
								allowAddRemove: true,
							},
							available: {
								readonly: true,
							},
							type: 'tagList'
						},
						{
							id: 'textArea_01',
							value: {
								valueName: 'textArea_01',
							},
							render: {
								label: 'Зона текста',
							},
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
	content: rootComponent
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
					config={{
						scheme: scheme,
						state: state
					}}
					onFinish={handleFormFinish}
				/>
			</FormConfiguration>
		</>
)
