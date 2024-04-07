import { GenericStyleProp, ViewStyle } from '@hippy/react';

export interface IndicatorProps {
  /** slider 长度 */
  length: number;
  /** 当前选中 index */
  activeIndex: number;
  /** 容器样式 */
  style?: GenericStyleProp<ViewStyle>;
  /** 节点样式 */
  dotStyle?: GenericStyleProp<ViewStyle>;
  /** 选中节点样式 */
  activeStyle?: GenericStyleProp<ViewStyle>;
}
