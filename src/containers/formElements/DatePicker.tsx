import {DatePicker as AntDatePicker, DatePickerProps as AntDatePickerProps} from "antd";
import {useMemo} from "react";
import dayjs from "dayjs";
import {dateFormat} from "@/config/parser.config.ts";

interface DatePickerProps {
	value?: string,
	onChange?: (date: string) => void,
}

export const DatePicker = ({value, onChange, ...props}: DatePickerProps) => {
	const dateValue = useMemo(() => {
		return value ? dayjs(value, dateFormat) : null
	}, [value])

	const handleChangeDate: AntDatePickerProps['onChange'] = (_, dateStr) => {
		if (onChange && typeof dateStr === 'string') {
			onChange(dateStr);
		}
	};

	return (
		<AntDatePicker
			style={{
				width: '100%'
			}}
			value={dateValue}
			onChange={handleChangeDate}
			{...props}
		/>
	)
}