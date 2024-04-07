import { ReactNode } from 'react';
import { GenericStyleProp, ViewStyle } from '@hippy/react';

export interface RadioProps {
  /** 是否选中 */
  checked: boolean;
  /** 设置为禁用状态 */
  disabled?: boolean;
  /** 描述文字 */
  label?: string | ReactNode;
  /** 容器样式 */
  style?: GenericStyleProp<ViewStyle>;
  /** 状态变更前回调 */
  onBeforeChange?: (nextChecked: boolean) => boolean | Promise<boolean>;
  /** 状态变更 */
  onChange: (checked: boolean) => void;
  /** 子节点 */
  children?: ReactNode;
}

export interface RadioState {
  checked: boolean;
}
