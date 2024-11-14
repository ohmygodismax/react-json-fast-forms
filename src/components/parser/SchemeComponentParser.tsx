import {ComponentScheme} from "@/models/scheme/component/ComponentScheme.ts";
import {useMemo} from "react";
import {Group} from "@/components/composition/Group.tsx";
import {DynamicList} from "@/components/composition/DynamicList.tsx";
import {Component} from "@/components/composition/Component.tsx";

interface SchemeComponentParserProps {
	group?: ComponentScheme,
	component: ComponentScheme
}

export const SchemeComponentParser = ({group, component}: SchemeComponentParserProps) => {
	const reactComponent = useMemo(() => {
		switch (component.type) {
			case 'group': return (
				<Group component={component}/>
			)
			case 'dynamicList': return (
				<DynamicList
					component={component}
				/>
			)
			default: return (
				<Component
					group={group || undefined}
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