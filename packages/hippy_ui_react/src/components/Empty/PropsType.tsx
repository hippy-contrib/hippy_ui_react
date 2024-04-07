import { ReactNode } from 'react';
import { GenericStyleProp, ViewStyle } from '@hippy/react';

export interface EmptyProps {
  /** 提示文案 */
  desc?: string | ReactNode;
  /** 图片链接 */
  image?: string | ReactNode;
  /** 点击事件 */
  onPress?: () => void;
  /** 容器样式 */
  style?: GenericStyleProp<ViewStyle>;
}
