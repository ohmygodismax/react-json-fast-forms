import {Select as AntSelect} from "antd";
import {useEffect} from "react";

interface SelectProps {
	options?: {label: string, value: string}[],
	value?: string | undefined,
	disabled?: boolean,
	onChange?: (value: string | undefined) => void,
	loading?: boolean,
	error?: string | null,
	isMultiple?: boolean,
	placeholder?: string,
	_defaultValue?: string,
}

export const Select = ({options, value, disabled, _defaultValue, loading = false, isMultiple = false, placeholder = '', error = null, onChange}: SelectProps) => {
	useEffect(() => {
		if (onChange && _defaultValue && !value) {
			onChange(_defaultValue);
		}
	}, [_defaultValue, onChange, value]);

	useEffect(() => {
		if (onChange) {
			onChange(undefined)
		}
	}, [options]);

	return (
		<AntSelect
			value={value}
			disabled={disabled}
			options={options}
			onChange={onChange}
			loading={loading}
			placeholder={placeholder || undefined}
			status={error ? 'error' : undefined}
			mode={isMultiple ? 'multiple': undefined}
		/>
	)
}