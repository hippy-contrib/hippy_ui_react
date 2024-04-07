import { ReactElement } from 'react';
import { ViewStyle, GenericStyleProp } from '@hippy/react';

export interface MarqueeProps {
  /** 需要展示的数据 */
  children: ReactElement[] | ReactElement;
  /** 容器样式 */
  style?: GenericStyleProp<ViewStyle>;
  /** 动画：变化间隔（毫秒。hippy下会和animationOffset一起除以pixelRatio，以避免卡顿感） */
  animationInterval?: number;
  /** 动画：变化步长（hippy下会和animationInterval一起除以pixelRatio，以避免卡顿感） */
  animationOffset?: number;
  /** 动画：延迟（毫秒，左右滚动默认0，上下滚动默认3000） */
  animationDelay?: number;
  /** 点击事件 */
  onPress?: () => void;
  /** 上下滚动变更事件 */
  onChange?: (index: number) => void;
  /** 额外拷贝的子节点数（默认左右滚动全部拷贝，上下滚动拷贝1个） */
  copyChildren?: number;
  /** 是否上下滚动 */
  vertical?: boolean;
  /** 横向滚动的衔接间距 */
  spacing?: number;
  /** 中止动画 */
  disabled?: boolean;
}

export interface MarqueeState {
  horizontalWrapWidth: number;
  horizontalChildrenWidth: number;
}
