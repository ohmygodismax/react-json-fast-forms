import {OutputData} from "@/components/async/AsyncDataProvider.tsx";
import {ReactElement, useMemo} from "react";
import {FabricException} from "@/helpers/exceptions/FabricException.ts";

interface AsyncSelectAdapterProps {
	data: OutputData,
	render: (options: {value: string, label: string}[]) => ReactElement
}

export const AsyncSelectAdapter = ({data, render}: AsyncSelectAdapterProps) => {
	const options = useMemo(() => {
		if (data) {
			return data.map((item) => {
				const {value, label} = item;
				if (!value || !label) {
					throw FabricException('value || label');
				}
				return {value, label}
			})
		} else {
			return []
		}
	}, [data])

	return (
		<>
			{render(options)}
		</>
	)
}