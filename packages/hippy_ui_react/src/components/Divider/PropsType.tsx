import { GenericStyleProp, ViewStyle } from '@hippy/react';

export interface DividerProps {
  /** 颜色 */
  color?: string;
  /** 是否竖线 */
  vertical?: boolean;
  /** 自定义样式 */
  style?: GenericStyleProp<ViewStyle>;
}
