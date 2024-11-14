import {useEffect, useMemo} from "react";
import {ComponentScheme} from "@/models/scheme/component/ComponentScheme.ts";
import {SchemeComponentParser} from "@/components/parser/SchemeComponentParser.tsx";
import {GroupHeader} from "@/containers/GroupHeader.tsx";
import {Flex} from "antd";

interface GroupProps {
	component: ComponentScheme
}

export const Group = ({component}: GroupProps) => {
	useEffect(() => {
		if (!component.components) {
			throw new Error('Components is required!');
		}
	}, [component]);

	const groupComponent = useMemo(() => {
		const {components} = component;
		if (!components) {
			throw new Error('Components is required!');
		}
		return (
			<>
				{components.map((innerComponent) => (
					<SchemeComponentParser
						key={innerComponent.id}
						component={innerComponent}
						group={component}
					/>
				))}
			</>
		)
	}, [component])

	return (
		<Flex vertical
			style={{padding: 5}}
		>
			{(component.render?.label) && <GroupHeader label={component.render?.label}/>}
			{component.layout?.direction === 'vertical' ?
				<Flex vertical>
					{groupComponent}
				</Flex> :
				<Flex>
					{groupComponent}
				</Flex>
			}
		</Flex>
	)
}