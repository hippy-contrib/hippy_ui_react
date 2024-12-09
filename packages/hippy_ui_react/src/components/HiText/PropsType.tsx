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
  size?: TextStyle['fontSize'] | string;
  /** 字体粗细，fontWeight（HiTextWeight中的值是组件对粗细的定义，默认：bold-600,medium-500,regular-400） */
  weight?: HiTextWeight | TextStyle['fontWeight'];
  /** 字体颜色 */
  color?: HiTextColor | TextStyle['color'];
  /** lineHeight */
  lineHeight?: TextStyle['lineHeight'] | string;
  /** textAlign */
  textAlign?: TextStyle['textAlign'];
  /** 主题模式 */
  theme?: ThemeMode;
  /** 无障碍开关 */
  accessible?: boolean;
  /** 无障碍阅读文本 */
  accessibilityLabel?: string;
  /** 设置Android API 23及以上系统的文本折行策略。
   * simple：简单折行，每一行显示尽可能多的字符，直到这一行不能显示更多字符时才进行换行，这种策略下不会自动折断单词（当一行只有一个单词并且宽度显示不下的情况下才会折断）；
   * high_quality：高质量折行，针对整段文本的折行进行布局优化，必要时会自动折断单词，比其他两种策略略微影响性能，通常比较适合只读文本；
   * balanced：平衡折行，尽可能保证一个段落的每一行的宽度相同，必要时会折断单词。
   * */
  breakStrategy?: string;
}
