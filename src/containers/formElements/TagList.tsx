import {Flex, Input, InputRef, Tag, theme} from "antd";
import {ChangeEvent, CSSProperties, useEffect, useRef, useState} from "react";
import {PlusOutlined, CloseCircleOutlined, StopOutlined} from "@ant-design/icons";

interface ITagListProps {
	value?: string[],
	onChange?: (value: string[]) => void,
	allowAdd?: boolean,
	allowRemove?: boolean,
	readOnly?: boolean,
}

const nestedStyle: CSSProperties = {
	height: 22,
	margin: 2
};


export const TagList = ({value, allowAdd = false, allowRemove = false, readOnly, onChange}: ITagListProps) => {
	const {	token: { colorPrimary, colorBgContainer }	} = theme.useToken();

	const inputRef = useRef<InputRef>(null);
	const [inputVisible, setInputVisible] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');

	useEffect(() => {
		if (inputVisible) {
			inputRef.current?.focus();
		}
	}, [inputVisible]);

	const handleTagClose = (closeTagVal: string) => {
		if (value && onChange) {
			const newValues = value.filter((val) => val !== closeTagVal);
			onChange(newValues);
		}
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleInputConfirm = () => {
		if (inputValue && onChange && !value?.includes(inputValue)) {
			const newValue = value ? [...value, inputValue] : [inputValue];
			onChange(newValue);
		}
		setInputVisible(false);
		setInputValue('');
	};

	return (
		<Flex wrap>
			{value && value.length !== 0 ?
				value.map((val) => (
					<Tag
						key={val}
						style={{
							...nestedStyle
						}}
						color={colorPrimary}
						closeIcon={allowRemove && !readOnly ? <CloseCircleOutlined style={{color: colorBgContainer}}/> : null}
						onClose={() => handleTagClose(val)}
					>
						{val}
					</Tag>
				)) :
				<Tag
					style={{
						...nestedStyle,
						color: 'red'
					}}
					icon={<StopOutlined />}
				>
					Нет доступных элементов
				</Tag>
			}
			{allowAdd && !readOnly &&
				<>
					{inputVisible ?
						<Input
							ref={inputRef}
							type="text"
							size="small"
							style={{
								width: 64,
								height: 22,
								marginInlineEnd: 8,
								verticalAlign: 'top',
							}}
							value={inputValue}
							onChange={handleInputChange}
							onBlur={handleInputConfirm}
							onPressEnter={handleInputConfirm}
						/> :
						<Tag
							style={{
								...nestedStyle,
								background: colorBgContainer,
								borderStyle: 'dashed',
							}}
							icon={<PlusOutlined />}
							onClick={() => setInputVisible(true)}
						>
							Новый элемент
						</Tag>
					}
				</>
			}
		</Flex>
	)
}
