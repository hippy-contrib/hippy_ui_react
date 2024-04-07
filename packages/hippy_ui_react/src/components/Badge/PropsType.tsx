import { ReactNode } from 'react';
import { ViewStyleProp } from '@hippy/react';

export interface BadgeProps {
  /** 标记红点样式 */
  style?: ViewStyleProp;
  /** 显示值 */
  value?: string | number | ReactNode;
  /** 最大值，超出显示`${maxValue}+` */
  maxValue?: number;
  /** 小红点（不填`value`默认为true） */
  isDot?: boolean;
  /** 容器样式 */
  wrapStyle?: ViewStyleProp;
  /** 子节点 */
  children?: ReactNode;
}
