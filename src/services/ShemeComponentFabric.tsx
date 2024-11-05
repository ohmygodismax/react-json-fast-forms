import {SchemeComponent} from "@/models/scheme/SchemeComponent.ts";
import {Input, InputNumber, Typography} from "antd";
import {
	FabricException
} from "@/helpers/exceptions/FabricException.ts";
import {TagList} from "@/containers/formElements/TagList.tsx";
import {imageWidth} from "@/config/parser.config.ts";
import {DatePicker} from "@/containers/formElements/DatePicker.tsx";
import {Checkbox} from "@/containers/formElements/Checkbox.tsx";
import {Select} from "@/containers/formElements/Select.tsx";
import {NoDefinedElement} from "@/containers/formElements/NoDefinedElement.tsx";

const { Text } = Typography;

export const SchemeComponentFabric = (component: SchemeComponent) => {
	const {readonly} = component;
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
			const {text} = component;
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
		case'select': {
			const {values, defaultValue} = component;
			if (!values) {
				throw FabricException('values');
			} else {
				return (
					<Select
						_defaultValue={defaultValue}
						options={values}
					/>
				)
			}
		}
		case 'tagList': {
			const {allowAddRemove} = component;
			return (
				<TagList
					allowAdd={allowAddRemove && allowAddRemove}
					allowRemove={allowAddRemove && allowAddRemove}
					readOnly={readonly}
				/>
			)
		}
		case 'html': {
			const {content} = component;
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
			const {alt, source} = component;
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
		default: return (
			<NoDefinedElement/>
		)
	}
}