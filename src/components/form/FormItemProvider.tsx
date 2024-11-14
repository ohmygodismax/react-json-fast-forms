import {ReactNode} from "react";

interface FormItemProviderProps {
	value?: string,
	onChange?: (value: string | undefined) => void | undefined,
	render: (value: string | undefined, onChange: undefined | ((value: string | undefined) => void)) => ReactNode,
}

export const FormItemProvider = ({value, onChange, render}: FormItemProviderProps) => {
	return (
		<>
			{render(value, onChange)}
		</>
	)
}