export type FormMeta = {
	id?: string,
	name?: string,
	layout?: {
		align?: 'vertical' | 'horizontal' | 'inline',
		wrapperCol?: number,
		labelCol?: number
	},
	description?: string
}