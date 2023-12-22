import type { ThemeConfig } from 'antd'
import { COLORS, FONT_FAMILY } from './AppConstants'

export const themeConfig: ThemeConfig = {
    token: {
        colorPrimary: COLORS.PRIMARY,
        colorInfo: COLORS.PRIMARY,
        fontFamily: FONT_FAMILY,
        fontSize: 16,
        lineHeight: 1.5,
        colorBorder: '#AEAEAE',
        fontSizeLG: 16,
        controlHeight: 42,
        controlHeightLG: 52
    }
}
