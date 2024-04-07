import { GenericStyleProp, ViewStyle } from '@hippy/react';

export interface LoadingGifProps {
  /** 容器样式 */
  style?: GenericStyleProp<ViewStyle>;
  /** 活跃颜色 */
  activeColor?: string;
  /** 默认颜色 */
  defaultColor?: string;
  /** 点击事件 */
  onPress?: (event?: any) => void | boolean;
  /** 自定义进度：0~100 */
  percent?: number | null;
  /** 动画:持续时间（毫秒） */
  animationDuration?: number;
  /** 动画:帧率 */
  animationFrames?: number;
  /** 动画:每次动画间隔（毫秒） */
  animationDelay?: number;
  /** 是否活跃（退出页面时标记为false避免无限执行） */
  isActive?: () => boolean;
}

export interface LoadingGifState {
  myPercent: number;
}
