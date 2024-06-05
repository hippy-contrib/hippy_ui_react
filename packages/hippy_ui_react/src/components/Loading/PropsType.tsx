import { ReactNode } from 'react';
import { GenericStyleProp, ViewStyle } from '@hippy/react';
import { LoadingGifProps } from '../LoadingGif/PropsType';

export interface LoadingProps {
  /** 文字描述 */
  text?: string | ReactNode;
  /** 自定义前面的加载图 */
  gif?: ReactNode;
  /** 设置LoadingGif */
  loadingGifProps?: LoadingGifProps;
  /** 点击事件 */
  onPress?: () => void;
  /** 容器样式（可设置文字样式，会被透传下去） */
  style?: GenericStyleProp<ViewStyle>;
  /** 开启无障碍阅读 */
  accessible?: boolean;
  /** 无障碍阅读文本 */
  accessibilityLabel?: string;
  /** 子节点 */
  children?: ReactNode;
}
