import {DatePicker, TimeRangePickerProps} from "antd";
import {useMemo} from "react";
import dayjs, {Dayjs} from "dayjs";
import {RangePresets} from "@/models/scheme/component/config/RenderConfig.ts";

const AntRangePicker = DatePicker.RangePicker;

interface RangePickerProps {
	value?: [string, string],
	format?: string,
	rangePresets?: RangePresets,
	onChange?: (date: [string, string]) => void,
}

export const RangePicker = ({value, format, rangePresets, onChange}: RangePickerProps) => {
	const rangePickerPresets = useMemo(() => {
		if (rangePresets) {
			const rangePickerPresets: TimeRangePickerProps['presets'] = [];
			if (rangePresets.prevWeek) {
				rangePickerPresets.push({ label: 'Последняя неделя', value: [dayjs().add(-7, 'd'), dayjs()] });
			}
			if (rangePresets.curWeek) {
				//TODO: Реализовать.
			}
			if (rangePresets.prevMonth) {
				rangePickerPresets.push({ label: 'Последний месяц', value: [dayjs().add(-1, 'month'), dayjs()] });
			}
			if (rangePresets.curMonth) {
				rangePickerPresets.push({ label: 'Текущий месяц', value: [dayjs().startOf('month'), dayjs()] })
			}
			if (rangePresets.prevQuarter) {
				rangePickerPresets.push({ label: 'Последний квартал', value: [dayjs().add(-3, 'month'), dayjs()] });
			}
			if (rangePresets.curQuarter) {
				//TODO: Реализовать.
			}
			return rangePickerPresets;
		}
	}, [rangePresets])

	const inputRangeAdapter = (date: string): Dayjs => {
		return dayjs(date)
	}

	const outputRangeAdapter = (date: string): string => {
		const dateArray = date.split('.');
		return new Date( +dateArray[2], +dateArray[1], +dateArray[0]).toISOString();
	}

	const rangeValue = useMemo<[Dayjs, Dayjs] | undefined>(() => {
		if (value) {
			return [inputRangeAdapter(value[0]), inputRangeAdapter(value[1])];
		}
	}, [value])

	const handleChange = (rangeStrings: [string, string]) => {
		if (onChange) {
			onChange([outputRangeAdapter(rangeStrings[0]), outputRangeAdapter(rangeStrings[1])]);
		}
	}

	return (
		<AntRangePicker
			value={rangeValue}
			format={format}
			presets={rangePickerPresets}
			onChange={(_, rangeStrings) => handleChange(rangeStrings)}
		/>
	)
}

