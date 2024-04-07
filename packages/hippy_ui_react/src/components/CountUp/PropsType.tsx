import { TextStyleProp } from '@hippy/react';

export interface ComCountUpProps {
  /** 初始滚动开始值，默认初始不滚动 */
  startValue?: number;
  /** 值 */
  value: number;
  /** 自定义格式化值输出 */
  format?: (value: number) => string;
  /** 持续时长（毫秒） */
  animationDuration?: number;
  /** 变化间隔（毫秒） */
  animationInterval?: number;
  /** 文本样式 */
  style?: TextStyleProp;
  /** 取几位小数 */
  decimalPlaces?: number;
  /** 变化结束的回调函数 */
  onArrival?: () => void;
}

export interface ComCountUpState {
  value: number;
}
