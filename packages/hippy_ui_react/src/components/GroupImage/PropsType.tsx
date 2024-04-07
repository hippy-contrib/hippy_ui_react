import { ViewStyle, GenericStyleProp } from '@hippy/react';

export interface GroupImageProps {
  /** 图片地址 */
  sources: string[];
  /** 大小 */
  size: number;
  /** 容器样式 */
  style?: GenericStyleProp<ViewStyle>;
}
