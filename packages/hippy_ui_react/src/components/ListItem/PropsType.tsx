import { ReactNode } from 'react';
import { ViewStyleProp, LayoutEvent } from '@hippy/react';
import { ButtonProps } from '../Button/PropsType';

export interface ListItemProps {
  /** 条目的标题 */
  title: ReactNode;
  /** 不限制标题高度（可显示`꧁`等异常高度字，但会带来高度不标准的副作用） */
  titleNoHeight?: boolean;
  /** 条目的描述信息 */
  note?: ReactNode;
  /** 条目描述信息补充 */
  moreNote?: ReactNode;
  /** 排名信息 */
  rank?: ReactNode;
  /** 条目的主要缩略图 */
  thumb?: ReactNode;
  /** 条目的主要缩略图形状   */
  thumbCircle?: boolean;
  /** 右侧按钮 */
  buttonProps?: ButtonProps;
  /** 右侧自定义内容 */
  extraOperate?: ReactNode;
  /** 点击回调 */
  onPress?: (e?: any) => void;
  /** 自定义样式 */
  style?: ViewStyleProp;
  /** 获取布局函数 */
  onLayout?: (event: LayoutEvent) => void;
  /** 整个条目的无障碍开关 */
  accessible?: boolean;
  /** 整个条目的无障碍阅读文本 */
  accessibilityLabel?: string;
  /** 长按条目 */
  onLongClick?: (event?: any) => void | boolean;
  /** 左侧（除右侧自定义内容和按钮）无障碍合并 */
  leftAccessible?: boolean;
}
