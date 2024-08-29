import { ReactNode } from 'react';
import { GenericStyleProp, Style } from '@hippy/react';
import { ThemeMode } from '../../themeConfig';

export enum ButtonType {
  default = 'default',
  normal = 'normal',
  primary = 'primary',
  text = 'text',
}

export enum ButtonSize {
  small = 's',
  medium = 'm',
  big = 'b',
  huge = 'h',
}

export interface ButtonState {
  isPressIn: boolean;
}

export interface ButtonProps {
  /** 按钮类型 */
  type?: ButtonType;
  /** 按钮尺寸 */
  size?: ButtonSize;
  /** 设置按钮为禁用状态 */
  disabled?: boolean;
  /** 设置按钮为加载中状态，此时会禁用按钮 */
  loading?: boolean;
  /** 设置前置图片 */
  image?: string | ReactNode;
  /** 自定义样式（可设置文字样式，会被透传下去） */
  style?: GenericStyleProp<Style>;
  /** 是否开启点击特效 */
  activeStyle?: boolean;
  /** 是否圆角按钮 */
  round?: boolean;
  /** 是否圆形按钮 */
  circle?: boolean;
  /** 标记图片链接（覆盖在右边的图片） */
  badge?: string | ReactNode;
  /** 定制主题 */
  theme?: ThemeMode;
  /** 点击事件处理函数 */
  onPress?: (e?: any) => undefined | boolean | void;
  /** 开始触摸事件处理函数 */
  onPressIn?: (e?: any) => undefined | boolean | void;
  /** 结束触摸事件处理函数 */
  onPressOut?: (e?: any) => undefined | boolean | void;
  /** 开启无障碍阅读 */
  accessible?: boolean;
  /** 无障碍阅读文本 */
  accessibilityLabel?: string;
  /** 开启点击事件防抖 */
  debounce?: boolean | number;
  /** 开启点击事件节流 */
  throttle?: boolean | number;
  /** 不可点击时触发的点击事件（方便做提示） */
  onDisablePress?: (e?: any) => undefined | boolean | void;
  /** 嵌套节点 */
  children?: ReactNode;
}
