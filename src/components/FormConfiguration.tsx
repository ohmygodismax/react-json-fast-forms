import {ReactElement, useMemo} from "react";
import {Locale} from "antd/es/locale";
import {App, ConfigProvider} from "antd";
import ru_RU from "antd/locale/ru_RU";

interface FormConfigurationProps {
	locale?: Locale,
	designToken?: Partial<{
		colorPrimary?: string,
		colorBgBase?: string,
		colorTextBase?: string,
		colorBgSpotlight?: string,
		colorPrimaryBg?: string
	}>,
	children: ReactElement
}

export const FormConfiguration = ({locale, designToken, children}: FormConfigurationProps) => {
	const token = useMemo(() => {
		return designToken ?
			{
				colorPrimary: designToken?.colorPrimary,
				colorBgBase: designToken?.colorBgBase,
				colorTextBase: designToken?.colorTextBase,
				colorBgSpotlight: designToken?.colorPrimary,
				colorPrimaryBg: designToken?.colorPrimary
			}
		 : undefined
	}, [designToken])

	return (
		<ConfigProvider
			locale={locale || ru_RU}
			theme={{
				token: token
			}}
		>
			<App>
				{children}
			</App>
		</ConfigProvider>
	)
}