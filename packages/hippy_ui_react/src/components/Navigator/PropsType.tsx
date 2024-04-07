import { ReactNode } from 'react';
import { ViewStyleProp } from '@hippy/react';
import { ThemeMode } from '../../themeConfig';

export interface NavigatorProps {
  /** 导航栏样式 */
  style?: ViewStyleProp;
  /** 容器样式 */
  wrapStyle?: ViewStyleProp;
  /** 电池栏占位样式 */
  statusBarStyle?: ViewStyleProp;
  /** 后退事件 */
  onBack?: () => void;
  /** 自定义后退节点 */
  back?: ReactNode;
  /** 标题 */
  title?: string | ReactNode;
  /** 标题是否居中 */
  titleCenter?: boolean;
  /** 自定义左侧节点 */
  leftNodes?: ReactNode[] | ReactNode;
  /** 自定义右侧节点（建议不超过2个） */
  rightNodes?: ReactNode[] | ReactNode;
  /** 定制主题 */
  theme?: ThemeMode;
}

export interface NavigatorState {
  leftExtWidth: number;
  rightExtWidth: number;
}
