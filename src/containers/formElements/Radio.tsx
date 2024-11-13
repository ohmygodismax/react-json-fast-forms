import {Radio as AntRadio, RadioChangeEvent} from "antd";
import {Value} from "@/models/scheme/component/parts/Value.ts";

interface RadioProps {
	value?: string,
	onChange?: (value: string) => void,
	options: Value[]
}

export const Radio = ({value, options, onChange}: RadioProps) => {
	const handleRadioChange = (e: RadioChangeEvent) => {
		if (onChange) {
			onChange(e.target.value);
		}
	}

	return (
		<AntRadio.Group
			// disabled={readonly}
			block
			value={value}
			optionType={'button'}
			onChange={handleRadioChange}
		>
			{options.map((option) => (
				<AntRadio
					key={option.value}
					value={option.value}
					disabled={option.disabled}

				>
					{option.label}
				</AntRadio>
			))}
		</AntRadio.Group>
	)
}