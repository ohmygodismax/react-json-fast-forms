import {Switch as AntSwitch} from "antd";

interface SwitcherProps {
	value?: boolean,
	onChange?: (checked: string | boolean | undefined) => void,
	readOnly?: boolean
}

export const Switcher = ({value, onChange, readOnly}: SwitcherProps) => {

	const handleChange = (checked: boolean) => {
		if (onChange) {
			onChange(checked)
		}
	}

	return (
		<AntSwitch
			checked={value}
			disabled={readOnly ? readOnly : undefined}
			onChange={handleChange}
		/>
	)
}