// import { type ReactNode } from 'react';
import { GenericStyleProp, ViewStyle } from '@hippy/react';

export interface SliderProps {
  /** 滑条取值范围 */
  limitValues?: number[];
  /** 默认值，如果是数组则显示两个滑块 */
  initValues?: number[] | number;
  /* 最小的位移值 */
  minMove?: number;
  /** 设置为禁用状态 */
  disabled?: boolean;
  /** 滑动条颜色 */
  lineColor?: string;
  /** 滑动条选中颜色 */
  activeLineColor?: string;
  /** 滑块的大小 */
  blockSize?: number;
  /** 滑块的颜色 */
  blockColor?: string;
  /** 设置整个容器响应滑动事件 */
  contentOnEvent?: boolean;

  /** 容器样式 */
  style?: GenericStyleProp<ViewStyle>;
  /** 滑动条样式 */
  lineStyle?: GenericStyleProp<ViewStyle>;
  /** 选中的滑动条样式 */
  activeLineStyle?: GenericStyleProp<ViewStyle>;
  /** 滑动块样式 */
  blockStyle?: GenericStyleProp<ViewStyle>;
  /** 滑动块图片 */
  blockImage?: string;
  /** 状态变更 */
  onChange?: (data: { start: number; end: number }) => void;
}

export interface SliderState {
  sliderWidth: number;
  startValue: number;
  endValue: number;
}
