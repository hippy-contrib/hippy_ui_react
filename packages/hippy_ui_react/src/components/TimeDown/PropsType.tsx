import { ReactNode } from 'react';
import { GenericStyleProp, TextStyle } from '@hippy/react';

export interface TimeDownComponentProps {
  /** 结束时间 */
  time: Date;
  /** 格式化时间 */
  format?: (leftTimeInfo: LeftTimeInfo) => string | ReactNode;
  /** 每隔多久更新数据（毫秒） */
  stepTime?: number;
  /** 到达时间的回调函数 */
  onArrival?: () => void;
  /** 组件销毁之前回调，便于获取销毁前的计时 */
  onUnmount?: (leftTimeInfo: LeftTimeInfo) => void;
  /** 文本样式 */
  style?: GenericStyleProp<TextStyle>;
}

export interface TimeDownComponentState {
  render: ReactNode;
}

export interface LeftTimeInfo {
  leftTime: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
}
