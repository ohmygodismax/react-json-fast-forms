import {Divider} from "antd";

interface GroupHeaderProps {
	label: string;
}

export const GroupHeader = ({label}: GroupHeaderProps) => {
	return (
		<Divider
			orientation={'left'}
		>
			{label}
		</Divider>
	)
}