import { ReactNode } from 'react';
import { ViewStyle, GenericStyleProp, LayoutEvent } from '@hippy/react';
import { IndicatorProps } from '../Indicator/PropsType';

export interface ScrollEvent {
  contentOffset: {
    x: number;
    y: number;
  };
}

export enum SwiperCardPosition {
  center = 'center',
  left = 'left',
}

export interface SwiperProps {
  /** 容器样式 */
  style?: GenericStyleProp<ViewStyle>;
  /** 子节点 */
  children: ReactNode[];
  /** 页码改变时会触发 change 事件 */
  onChange?: (index: number) => void;
  /** 布局回调事件 */
  onLayout?: (layoutEvent: LayoutEvent) => void;
  /** 开始拖拽时触发 事件 */
  onScrollBeginDrag?: (event?: ScrollEvent) => void;
  /** 结束拖拽时触发 事件 */
  onScrollEndDrag?: (event?: ScrollEvent) => void;
  /** 是否可以滑动, 默认true */
  scrollEnabled?: boolean;
  /** 用户滑动距离超过此数值，则自动滑动（0则不自动滚动，可用于优化自动轮播和自动滚动的交互） */
  autoScrollWidth?: number;
  /** 开启自动轮播，值为轮播毫秒时间（大于0才生效） */
  autoplay?: number;
  /** 自动轮播前回调，返回本次能否往下轮播 */
  beforePlay?: (nextIndex: number) => boolean;
  /** 滚动事件 */
  onScroll?: (event: ScrollEvent) => void;
  /** 自动滚动时节点位置（居中/靠左） */
  cardPosition?: SwiperCardPosition;
  /** 指示器（非空就会开启。渲染和ScrollView同级，需要自行用View包裹） */
  indicatorProps?: Partial<IndicatorProps>;
  /** 卡片间距 */
  spacing?: {
    /** 中间 */
    between: number;
    /** 首尾（不填默认等于between） */
    startAndEnd?: number;
  };
  /** 整屏滑动（一屏多卡片时设置是否整屏滑动） */
  pagingEnabled?: boolean;
}

export interface SwiperState {
  activeIndex: number;
  offsetX: number;
}
