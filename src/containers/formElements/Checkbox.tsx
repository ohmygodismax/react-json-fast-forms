import {Checkbox as AntCheckbox} from "antd";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {useEffect, useMemo} from "react";

interface CheckboxProps {
	value?: string,
	onChange?: (checked: string | boolean | undefined) => void,
	readOnly?: boolean
}

export const Checkbox = ({value, onChange, readOnly}: CheckboxProps) => {
	useEffect(() => {
		if (onChange) {
			onChange(value);
		}
	}, []);

	const checked = useMemo(() => {
		return value === 'true'
	}, [value]);

	const handleChange = (event: CheckboxChangeEvent) => {
		if (onChange) {
			onChange(event.target.checked ? 'true' : 'false')
		}
	}

	return (
		<AntCheckbox
			checked={checked}
			disabled={readOnly ? readOnly : undefined}
			onChange={handleChange}
		/>
	)
}