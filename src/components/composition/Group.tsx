import {useEffect, useMemo} from "react";
import {SchemeComponent} from "@/models/scheme/SchemeComponent.ts";
import {SchemeComponentParser} from "@/components/parser/SchemeComponentParser.tsx";
import {GroupHeader} from "@/containers/GroupHeader.tsx";
import {Flex, Row} from "antd";

interface GroupProps {
	component: SchemeComponent
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
			style={{width: '100%', padding: `${component.label ? '5px' : ''}`}}
		>
			{component.label && <GroupHeader label={component.label}/>}
			<>
				{component.layout?.isColumnLayout ?
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