import { GenericStyleProp, ViewStyle } from '@hippy/react';

export interface SwitchState {
  checked: boolean;
}

export interface SwitchProps {
  /** 是否开启 */
  checked?: boolean;
  /** 选中时的颜色 */
  activeColor?: string;
  /** 开启无障碍阅读 */
  accessible?: boolean;
  /** 无障碍阅读文本 */
  accessibilityLabel?: string;
  /** 状态变更前的回调，返回是否继续变更 */
  onBeforeChange?: (isChecked?: boolean) => boolean | Promise<boolean>;
  /** 状态变更回调 */
  onChange?: (isChecked: boolean) => void;
  /** 容器样式 */
  style?: GenericStyleProp<ViewStyle>;
  /** 圆点样式 */
  circleStyle?: GenericStyleProp<ViewStyle>;
  /** 开启点击事件防抖 */
  debounce?: boolean | number;
}
