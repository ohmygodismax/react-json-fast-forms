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
					id: 'select_01',
					value: {
						valueName: 'select_01',
					},
					render: {
						label: 'Синхронный список',
						multiple: true,
						values: [
							{value: '1', label: 'Значение 1'},
							{value: '2', label: 'Значение 2'},
							{value: '3', label: 'Значение 3'}
						]
					},
					type: 'select'
				},
				{
					id: 'select_02',
					value: {
						valueName: 'select_02',
					},
					render: {
						label: 'Тип аппарата',
						placeholder: 'Выберите значение...',
						multiple: true,
					},
					async: {
						type: 'gql',
						fetch: {
							onInit: true,
							ifUndefined: true
						},
						data: {
							intersectProcessing: {'arguments':'data','body':`return data.platformTypePlatform;`},
						},
						extractors: {
							value: {'arguments':'platformTypePlatform', 'body':`return platformTypePlatform.id;`},
							label: {'arguments':'platformTypePlatform', 'body':`return platformTypePlatform.text;`}
						},
						url: '/api/kvp-server/graphql',
						query: `query allSensorsQuery($idPlatformType: [Int] $idPlatform: [Int] $idInstrument: [Int]) {platformTypePlatform {id text} platforms(idPlatformType: $idPlatformType) {id text platformType {id}} instruments {id text platformType {id text}} platformInstrument(id: $idPlatform) {idPlatform idInstrument instrument {id text}} sensorPlc(idInstrument: $idInstrument) {id idSensor text idInstrument items {id idLevel text}} sensorBand(idInstrument: $idInstrument) {id idSensor text idInstrument items {id idBand text}} sensors {id name idInstrument resolution bands {id idBand text}}}`,
					},
					type: 'select'
				},
				// {
				// 	id: 'select_03',
				// 	valueName: 'select_03',
				// 	label: 'Аппаратура',
				// 	placeholder: 'Выберите значение...',
				// 	async: {
				// 		type: 'gql',
				// 		fetchOnInit: false,
				// 		fetchIfUndefined: false,
				// 		url: '/api/kvp-server/graphql',
				// 		query: `query allSensorsQuery($idPlatformType: [Int] $idPlatform: [Int] $idInstrument: [Int]) {platformTypePlatform {id text} platforms(idPlatformType: $idPlatformType) {id text platformType {id}} instruments {id text platformType {id text}} platformInstrument(id: $idPlatform) {idPlatform idInstrument instrument {id text}} sensorPlc(idInstrument: $idInstrument) {id idSensor text idInstrument items {id idLevel text}} sensorBand(idInstrument: $idInstrument) {id idSensor text idInstrument items {id idBand text}} sensors {id name idInstrument resolution bands {id idBand text}}}`,
				// 		dependsValues: [['select_02', 'idPlatformType']],
				// 		filterByDependent: {'arguments':'values, instruments','body':`return instruments.filter((instrument) => values[0].includes(instrument.platformType.id));`},
				// 		extractDataFunction: {'arguments':'data','body':`return data.instruments;`},
				// 		extractValueFunction: {'arguments':'instrument', 'body':`return instrument.id;`},
				// 		extractLabelFunction: {'arguments':'instrument', 'body':`return instrument.text;`},
				// 	},
				// 	multiple: true,
				// 	values: [],
				// 	type: 'select'
				// }
			],
			type: 'group'
		},
		{
			id: 'divider_01',
			render: {
				placeholder: 'Divider'
			},
			layout: {
				align: 'left'
			},
			type: 'divider'
		},
		{
			id: 'group_02',
			components: [
				{
					id: 'radio_1',
					value: {
						valueName: 'radio_1',
					},
					render: {
						values: [{label: 'Радио 1', value: '01'}, {label: 'Радио 2', value: '02'}],
					},
					type: 'radio'
				},
				{
					id: 'switcher_1',
					value: {
						valueName: 'switcher_1',
					},
					type: 'switcher'
				}
			],
			type: 'group'
		},
		{
			id: 'divider_02',
			type: 'divider'
		},
	],
	type: 'group'
};

const scheme: FormScheme = {
	content: rootComponent
};

const state: FormState = {
	'radio_1': '02',
	'switcher_1': true
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
