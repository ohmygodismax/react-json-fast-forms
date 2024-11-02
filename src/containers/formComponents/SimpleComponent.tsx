import {ReactElement} from "react";
import {ComponentLayout} from "@/containers/formComponents/ComponentLayout.tsx";

interface SimpleComponentProps {
	children: ReactElement
}

export const SimpleComponent = ({children}: SimpleComponentProps) => {
	return (
		<ComponentLayout>
			{children}
		</ComponentLayout>
	)
}