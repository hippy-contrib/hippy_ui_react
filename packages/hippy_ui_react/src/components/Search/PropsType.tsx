import { ReactNode } from 'react';
import { TextInputProps, ImageProps, ViewProps } from '@hippy/react';

export interface SearchProps {
  /** 容器属性 */
  wrapProps?: ViewProps;
  /** 左侧图标 */
  leftIcon?: Partial<ImageProps> | ReactNode;
  /** 右侧图标（清空图标不出时显示） */
  rightIcon?: ReactNode;
  /** 清空图标 */
  clearIcon?: Partial<ImageProps> | ReactNode;
  /** 自定义输入框属性 */
  inputProps?: Partial<TextInputProps>;
  /** 尾部插入节点 */
  children?: ReactNode;
}

export interface SearchState {
  value: string;
}
