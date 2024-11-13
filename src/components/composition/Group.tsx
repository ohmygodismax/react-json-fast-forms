import {useEffect, useMemo} from "react";
import {ComponentScheme} from "@/models/scheme/component/ComponentScheme.ts";
import {SchemeComponentParser} from "@/components/parser/SchemeComponentParser.tsx";
import {GroupHeader} from "@/containers/GroupHeader.tsx";
import {Flex, Row} from "antd";

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
				{components.map((component) => (
					<SchemeComponentParser
						key={component.id}
						component={component}
					/>
				))}
			</>
		)
	}, [component])

	return (
		<Row
			style={{width: '100%', padding: `${component.render?.label ? '5px' : ''}`}}
		>
			{(component.render?.label) && <GroupHeader label={component.render?.label}/>}
			<>
				{component.layout?.direction === 'vertical' ?
					<Flex vertical wrap
						style={{width: '100%'}}
					>
						{groupComponent}
					</Flex> :
					<Flex
						style={{width: '100%'}}
					>
						{groupComponent}
					</Flex>
				}
			</>
		</Row>
	)
}