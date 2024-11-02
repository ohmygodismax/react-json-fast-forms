import {ReactElement} from "react";
import {Col} from "antd";

interface ComponentLayoutProps {
	children: ReactElement
}

export const ComponentLayout = ({children}: ComponentLayoutProps) => {
	return (
		<Col
			style={{width: '100%', padding: 5}}
		>
			{children}
		</Col>
	)
}