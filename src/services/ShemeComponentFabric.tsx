import {ComponentScheme} from "@/models/scheme/component/ComponentScheme.ts";
import {Divider, Input, InputNumber, Typography} from "antd";
import {
	FabricException
} from "@/helpers/exceptions/FabricException.ts";
import {TagList} from "@/containers/formElements/TagList.tsx";
import {imageWidth} from "@/config/parser.config.ts";
import {DatePicker} from "@/containers/formElements/DatePicker.tsx";
import {Checkbox} from "@/containers/formElements/Checkbox.tsx";
import {Select} from "@/containers/formElements/Select.tsx";
import {NoDefinedElement} from "@/containers/formElements/NoDefinedElement.tsx";
import {AsyncDataProvider} from "@/components/async/AsyncDataProvider.tsx";
import {FormItemProvider} from "@/components/form/FormItemProvider.tsx";
import { Radio } from "@/containers/formElements/Radio";
import {Switcher} from "@/containers/formElements/Switcher.tsx";
import {FormState} from "@/models/FormState.ts";
import {AsyncSelectAdapter} from "@/components/async/AsyncSelectAdapter.tsx";

const { Text } = Typography;

export const SchemeComponentFabric = (component: ComponentScheme, state: FormState) => {
	const readonly = component.available?.readonly

	switch (component.type) {
		case 'textField': {
			const minLength = component?.validate?.minLength;
			const maxLength = component?.validate?.maxLength;
			return (
				<Input
					minLength={minLength}
					maxLength={maxLength}
					readOnly={readonly}
				/>
			)
		}
		case 'number': {
			const min = component?.validate?.min;
			const max = component?.validate?.max;
			const step = component?.validate?.step;
			return (
				<InputNumber
					disabled={readonly}
					style={{ width: '100%' }}
					readOnly={readonly}
					min={min ? min : undefined}
					max={max ? max : undefined}
					step={step ? step : 1}
				/>
			)
		}
		case 'text': {
			const text = component.render?.text;
			if (!text) {
				throw FabricException('text');
			} else {
				return (
					<Text underline>{text}</Text> //TODO: Реализовать MD компонент.
				)
			}
		}
		case 'textArea': return (
			<Input.TextArea readOnly={readonly}/>
		)
		case 'checkbox': return (
			<Checkbox
				readOnly={readonly}
			/>
		)
		case 'select': {
			const {value, render, available, async} = component;
			if (!value || !render) {
				throw FabricException('select configs');
			}

			const {values, multiple, placeholder} = render;
			const {defaultValue} = value;

			const dependsConditions = available?.dependsCondition
			if (!values && !async) {
				throw FabricException('values');
			} else {
				let active = true;
				if (dependsConditions && state) {
					if (dependsConditions && state) {
						const conditionFunction = new Function(dependsConditions.arguments, dependsConditions.body);
						active = conditionFunction(state)
					}
				}

				if (async) {
					return (
						<FormItemProvider
							render={(value, onChange) => (
								<AsyncDataProvider
									config={async}
									render={({data, isLoading, error}) => (
										<AsyncSelectAdapter
											data={data}
											render={(options) => (
												<Select
													options={options}
													loading={isLoading}
													error={error}

													_defaultValue={defaultValue}
													placeholder={placeholder}
													disabled={!active || !options || options.length === 0}
													isMultiple={multiple}

													value={value}
													onChange={onChange}
												/>
											)}
										/>
									)}
								/>
							)}
						/>
					)
				} else {
					return (
						<Select
							_defaultValue={defaultValue}
							options={values}
							placeholder={placeholder}
							disabled={!active || !values || values.length === 0}
							isMultiple={multiple}
						/>
					)
				}
			}
		}
		case 'tagList': {
			const {render} = component;
			return (
				<TagList
					allowAdd={render?.allowAddRemove || true}
					allowRemove={render?.allowAddRemove || true}
					readOnly={readonly}
				/>
			)
		}
		case 'html': {
			const content = component.render?.content;
			if (!content) {
				throw FabricException('content');
			} else {
				return (
					<div
						dangerouslySetInnerHTML={{
							__html: content
						}}
					/>
				)
			}
		}
		case 'image': {
			const alt = component.render?.alt;
			const source = component.render?.source;
			if (!alt || !source) {
				throw FabricException('alt | source');
			} else {
				return (
					<img
						style={{width: `${imageWidth}px`}}
						alt={alt}
						src={source}
					/>
				)
			}
		}
		case 'date': return (
			<DatePicker/>
		)
		case 'radio': {
			const values = component.render?.values;
			if (!values) {
				throw FabricException('values');
			} else {
				return (
					<Radio
						options={values}
					/>
				)
			}
		}
		case 'switcher': {
			return (
				<Switcher/>
			)
		}
		case 'divider': {
			const align = component.layout?.align;
			const label = component.render?.label;
			return (
				<Divider

					orientation={align || 'center'}
				>
					{label ? label : ''}
				</Divider>
			)
		}
		default: return (
			<NoDefinedElement/>
		)
	}
}