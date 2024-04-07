import { ViewStyle, GenericStyleProp, ImageProps, LayoutEvent } from '@hippy/react';
import { ReactNode } from 'react';

export interface UImageProps {
  /** 图片样式 */
  style: GenericStyleProp<ViewStyle>;
  /** 图片链接 */
  src: string;
  /** 默认图链接 */
  defaultImage?: string;
  /** 布局 */
  resizeMode?: ImageProps['resizeMode'];
  /** 点击事件处理函数 */
  onPress?: (e?: any) => void | boolean;
  /** 无障碍开关 */
  accessible?: boolean;
  /** 无障碍阅读文本 */
  accessibilityLabel?: string;
  /** 布局回调 */
  onLayout?: (e: LayoutEvent) => void;
  /** 加载失败回调 */
  onError?: () => void;
  /** 加载成功回调 */
  onSuccess?: () => void;
  /** 子节点 */
  children?: ReactNode;
}

export interface UImageState {
  isError: boolean;
}
