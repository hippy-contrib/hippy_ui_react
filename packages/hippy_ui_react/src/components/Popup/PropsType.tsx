import { AnimationOptions, GenericStyleProp, ViewStyle } from '@hippy/react';
import { ReactNode } from 'react';

export interface PopupProps {
  /** 半屏内容样式 */
  style?: GenericStyleProp<ViewStyle>;
  /** 蒙层样式 */
  maskStyle?: GenericStyleProp<ViewStyle>;
  /** 点击蒙层事件 */
  onMaskClick?: () => void | boolean;
  /** 半屏完全展示通知 */
  onShow?: () => void;
  /** 是否使用动画 */
  animated?: boolean;
  /** 动画参数 */
  animationOption?: Partial<AnimationOptions>;
  /** 子节点 */
  children?: ReactNode;
}

export interface PopupState {
  isShow: boolean;
}
