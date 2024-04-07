import { TextStyle, TextProps } from '@hippy/react';
import { ThemeMode } from '../../themeConfig';

export enum HiTextWeight {
  regular = 'hiTextWeightRegular',
  medium = 'hiTextWeightMedium',
  bold = 'hiTextWeightBold',
}

export enum HiTextColor {
  theme = 'colorTheme',
  link = 'colorLink',
  textBase = 'colorTextBase',
  textSecondary = 'colorTextSecondary',
}

export interface HiTextProps extends TextProps {
  /** 字体大小，fontSize，默认：15 */
  size?: TextStyle['fontSize'];
  /** 字体粗细，fontWeight（HiTextWeight中的值是组件对粗细的定义，默认：bold-600,medium-500,regular-400） */
  weight?: HiTextWeight | TextStyle['fontWeight'];
  /** 字体颜色 */
  color?: HiTextColor | TextStyle['color'];
  /** lineHeight */
  lineHeight?: TextStyle['lineHeight'];
  /** textAlign */
  textAlign?: TextStyle['textAlign'];
  /** 主题模式 */
  theme?: ThemeMode;
}
