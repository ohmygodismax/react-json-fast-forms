import {Button} from "antd";

interface SubmitButtonProps {
	isLoading?: boolean,
	disabled?: boolean,
	label?: string
}

export const SubmitButton = ({isLoading = false, disabled = false, label = 'Завершить'}: SubmitButtonProps) => {
	return (
		<Button
			type="primary"
			htmlType="submit"
			loading={isLoading}
			disabled={disabled}
		>
			{label}
		</Button>
	)
}