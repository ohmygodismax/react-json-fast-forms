import {Select as AntSelect} from "antd";
import {useEffect} from "react";

interface SelectProps {
	options?: {label: string, value: string}[],
	value?: string,
	disabled?: boolean,
	onChange?: (value: string) => void,
	_defaultValue?: string,
}

export const Select = ({options, value, disabled, _defaultValue, onChange}: SelectProps) => {
	useEffect(() => {
		if (onChange && _defaultValue && !value) {
			onChange(_defaultValue);
		}
	}, [_defaultValue, onChange, value]);

	return (
		<AntSelect
			value={value}
			disabled={disabled}
			options={options}
			onChange={onChange}
		/>
	)
}