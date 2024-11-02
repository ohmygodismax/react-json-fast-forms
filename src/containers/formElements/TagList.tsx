import {Flex, Skeleton, Tag, theme} from "antd";

interface ITagListProps {
	value?: string[],
	onChange?: (value: string) => void,
}

export const TagList = ({value}: ITagListProps) => {
	const {	token: { colorPrimary }	} = theme.useToken();

	return (
		<Flex wrap>
			{value ?
				value.map((val) => (
					<Tag
						key={val}
						style={{margin: 5}}
						color={colorPrimary}
					>
						{val}
					</Tag>
				)) :
				<Skeleton.Input size={'large'}/>
			}
		</Flex>
	)
}
