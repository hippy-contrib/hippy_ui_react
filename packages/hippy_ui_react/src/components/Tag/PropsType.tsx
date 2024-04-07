import { ReactNode } from 'react';
import { GenericStyleProp, Style } from '@hippy/react';
import { ThemeMode } from '../../themeConfig';

export enum TagType {
  red = 'red',
  purple = 'purple',
  pink = 'pink',
  yellow = 'yellow',
  blue = 'blue',
  green = 'green',
  black = 'black',
  redBold = 'redBold',
  purpleBold = 'purpleBold',
  pinkBold = 'pinkBold',
  yellowBold = 'yellowBold',
  blueBold = 'blueBold',
  greenBold = 'greenBold',
  blackBold = 'blackBold',
}

export interface TagProps {
  /** 类型 */
  type?: string | TagType;
  /** 自定义样式（可设置文字样式，会被透传下去） */
  style?: GenericStyleProp<Style>;
  /** 前置节点 */
  prefix?: ReactNode;
  /** 定制主题 */
  theme?: ThemeMode;
  /** 设置截断文字字符长度 */
  maxLength?: number;
  /** 开启无障碍 */
  accessible?: boolean;
  /** 无障碍阅读文本 */
  accessibilityLabel?: string;
  /** 点击事件 */
  onPress?: () => void;
  /** 子节点 */
  children?: ReactNode;
}
