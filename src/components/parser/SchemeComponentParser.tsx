import {SchemeComponent} from "@/models/scheme/SchemeComponent.ts";
import {useMemo} from "react";
import {SchemeComponentTypes} from "@/models/scheme/SchemeComponentTypes.ts";
import {Group} from "@/components/composition/Group.tsx";
import {DynamicList} from "@/components/composition/DynamicList.tsx";
import {Component} from "@/components/composition/Component.tsx";

interface SchemeComponentParserProps {
	component: SchemeComponent
}

export const SchemeComponentParser = ({component}: SchemeComponentParserProps) => {
	const reactComponent = useMemo(() => {
		switch (component.type) {
			case SchemeComponentTypes.GROUP: return (
				<Group component={component}/>
			)
			case SchemeComponentTypes.DYNAMIC_LIST: return (
				<DynamicList
					component={component}
				/>
			)
			default: return (
				<Component
					component={component}
				/>
			)
		}
	}, [component])

	return (
		<div
			style={{width: '100%'}}
		>
			{reactComponent}
		</div>
	)
}