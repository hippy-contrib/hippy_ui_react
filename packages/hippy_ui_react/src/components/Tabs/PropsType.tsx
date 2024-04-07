import { ReactNode } from 'react';
import { ViewStyle, GenericStyleProp, Style, TextStyle, ViewProps } from '@hippy/react';
import { BadgeProps } from '../Badge/PropsType';

export interface TabValue {
  text: string;
  textImg?: string;
  textActiveImg?: string;
}
export type TabRenderItemFunc = (params: { tab: TabValue; index: number }) => ReactNode;
export interface TabRenderItemParams {
  tab: TabValue;
  index: number;
  isActive: boolean;
  defaultRender: TabRenderItemFunc;
  tabProps: ViewProps;
  badge?: ReactNode;
  underline?: ReactNode;
  textStyle: TextStyle;
}

export interface TabsProps {
  /** Tab列表。可以是文字，也可以是完整信息（带图异化） */
  values: Array<string | TabValue>;
  /** 当前选中tab的序号 */
  activeIndex?: number;
  /** 初始化选中tab的序号（优先级比activeIndex低） */
  defaultActiveIndex?: number;
  /** tab点击更新时触发 */
  onChange?: (index: number) => void;
  /** tab即将切换时触发，返回false则不切换 */
  onBeforeChange?: (newIndex: number, oldIndex: number) => boolean | Promise<boolean>;
  /** 容器样式 */
  style?: GenericStyleProp<ViewStyle>;
  /** 未选中样式（可设置文字样式，会被透传下去） */
  itemStyleFn?: (index: number) => GenericStyleProp<Style> | undefined | null;
  /** 选中样式（可设置文字样式，会被透传下去） */
  activeStyleFn?: (index: number) => GenericStyleProp<Style> | undefined | null;
  /** 下划线样式 */
  underlineStyleFn?: (index: number) => GenericStyleProp<ViewStyle>;
  /** 红点列表 */
  badgeList?: Array<{ index: number; badgeProps?: BadgeProps; view?: ReactNode }>;
  /** 选中后自动滚动定位（params.offset: `center`表示居中，数值表示选中项与左边框的距离） */
  autoScroll?: Omit<ScrollIndexParams, 'index'> | boolean;
  /** 显示下划线 */
  showUnderline?: boolean;
  /** 禁止点击变更 */
  disabled?: boolean;
  /** tab过少的时候等比例占满（至少n个Tab才启动计算） */
  equallyDivide?: number;
  /** 设置滚动的初始偏移值（scrollX） */
  initialContentOffset?: number;
  /** 自定义 item 渲染 */
  renderItem?: (params: TabRenderItemParams) => ReactNode;
}

export interface TabsState {
  activeIndex: number;
  isEquallyDivide: boolean;
  imgSizeMap: Record<string, { loading: number; size?: { width: number; height: number } }>;
}

export interface ScrollIndexParams {
  index: number;
  /**
   *  自动滚动是否开启动画
   * */
  animated?: boolean;
  /**
   *  自动滚动的偏移（center代表居中，number代表距离左边的间距，null表示不操作）
   * */
  offset?: 'center' | number | null;
}
