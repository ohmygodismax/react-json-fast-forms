import {Checkbox as AntCheckbox} from "antd";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {useEffect, useMemo} from "react";

interface CheckboxProps {
	value?: string,
	disabled?: boolean,
	onChange?: (checked: string | boolean | undefined) => void
}

export const Checkbox = ({value, disabled = false, onChange}: CheckboxProps) => {
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

	return <AntCheckbox checked={checked} disabled={disabled} onChange={handleChange}/>
}