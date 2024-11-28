import {Button, Flex, Form} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {ComponentScheme} from "@/models/scheme/component/ComponentScheme.ts";
import {Component} from "@/components/composition/Component.tsx";
import {GroupHeader} from "@/containers/GroupHeader.tsx";
import {useEffect, useMemo} from "react";
import useFormInstance from "antd/es/form/hooks/useFormInstance";

interface DynamicListProps {
	component: ComponentScheme
}

export const DynamicList = ({component}: DynamicListProps) => {
	const form = useFormInstance();

	const listValue = useMemo(() => {
		return form.getFieldValue(component.value?.path)
	}, [form, component])

	useEffect(() => { //TODO: Временное решение. Большая привязка к реализации tasklist-ui. Необходимо добавлять пустое значение в начальное состояние формы в парсере camunda-tasklist-ui.
		const defaultRepetitions = component.render?.defaultRepetitions;
		if (defaultRepetitions && (!listValue || listValue.length < defaultRepetitions)) {
			const {components} = component;
			if (components) {
				const componentsValueNames: Array<string | undefined> = components.map((component) => component.value?.valueName);
				const emptyItem: Record<string, undefined> = {};
				componentsValueNames.forEach((valueName) => {
					if (valueName) {
						emptyItem[valueName] = undefined;
					}
				});
				const initialValue = [];
				for (let i = 0; i < defaultRepetitions - (listValue ? listValue.length : 0); i++) {
					initialValue.push({...emptyItem});
				}
				form.setFieldValue(component.value?.path, initialValue);
			}
		}
	}, [listValue, component]);

	const renderComponent = (name: string, subComponent: ComponentScheme) => {
		return (
			<Component path={name} component={subComponent}/>
		)
	};

	const renderMinusButton = (onClick: () => void) => {
		return (
			<MinusCircleOutlined style={{color: 'red'}} onClick={() => onClick()} />
		)
	}

	const renderAddBlock = (onClick: () => void) => {
		return (
			<Button type="dashed" onClick={() => onClick()} block icon={<PlusOutlined />}>
				Добавить строку
			</Button>
		)
	}

	const isMinusButtonRender = (listIndex: number) => {
		if (component.render?.allowAddRemove) {
			const defaultRepetitions = component.render?.defaultRepetitions;
			if (defaultRepetitions) {
				return listIndex + 1 > defaultRepetitions;
			} else {
				return true
			}
		} else {
			return false
		}
	}

	const renderList = () => {
		const components = component.components;
		const path = component.value?.path;
		const label = component.render?.label;
		if (!path || !components) {
			throw new Error('Path and Components is required!');
		}

		return (
			<Form.List
				name={path}
			>
				{(fields, {add, remove}) => {
					return (
						(
							<Flex vertical>
								{label && <GroupHeader label={label}/>}
								{fields.map((_, name) => {
									return (
										<Flex
											key={`${component.id}-${name}`}
											justify={'start'}
											align={'center'}
										>
											{components &&
												<>
													{components.map((component) => (
														<div
															key={`${component.id}-${name}`}
															style={{width: '100%'}}
														>
															{renderComponent(`${name}`, component)}
														</div>
													))}
												</>
											}
											{
												<Flex
													style={{width: '20px'}}
												>
													{isMinusButtonRender(name) &&
														<>
															{renderMinusButton(() => remove(name))}
														</>
													}
												</Flex>
											}
										</Flex>
									)
								})}
								{component.render?.allowAddRemove &&
									<Form.Item
										style={{margin: 10}}
									>
										{renderAddBlock((() => add()))}
									</Form.Item>
								}
							</Flex>
						)
					)
				}}
			</Form.List>
		)
	}

	return (
		<div
			style={{padding: 5}}
		>
			{renderList()}
		</div>
	)
}