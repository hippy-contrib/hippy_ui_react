import { ViewStyleProp } from '@hippy/react';
import { ReactNode } from 'react';

export enum ProgressLineCap {
  butt = 'butt',
  round = 'round',
}
export enum ProgressType {
  line = 'line',
  circle = 'circle',
}
export interface ProgressProps {
  /** 容器样式 */
  style?: ViewStyleProp;
  /** 百分比进度：0~100 */
  percent: number;
  /** 类型：line/circle */
  type?: ProgressType;
  /** 环形进度条画布宽度（圆环直径。若有间隙，可能需要根据屏幕分辨率微调） */
  size?: number;
  /** 进度条的宽度 */
  strokeWidth?: number;
  /** 进度条背景色（线形支持渐变色`linear-gradient`） */
  color?: string;
  /** 进度条底色 */
  underColor?: string;
  /** 动画时间(单位为毫秒) 为 0 则不进行动画 */
  duration?: number;
  /** 进度条两端的形状: butt-平角  round-圆角 */
  lineCap?: ProgressLineCap;
  /** 动画结束回调 */
  onFinish?: () => void;
  /** 开启无障碍阅读 */
  accessible?: boolean;
  /** 无障碍阅读文本 */
  accessibilityLabel?: string;
  /** 子节点 */
  children?: ReactNode;
}
export interface ProgressState {
  percent: number;
  lineWidth: number;
}
