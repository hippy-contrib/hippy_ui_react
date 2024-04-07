import { ViewStyleProp, GenericStyleProp, Style } from '@hippy/react';

export interface CascaderData<T = any> {
  id: string;
  name: string;
  data?: T;
  children?: Array<CascaderData<T>>;
}

export interface CascaderProps<T = any> {
  /** 数据选项 */
  data: Array<CascaderData<T>>;
  /** 选中值 */
  active?: string[];
  /** 选中变更 */
  onChange?: (value: Array<CascaderData<T>>) => void;
  /** 滚动列高度 */
  scrollViewHeight?: number;
  /** 条目高度 */
  itemHeight?: number;
  /** 滚动列样式 */
  scrollViewStyleFn?: (index: number) => ViewStyleProp;
  /** 条目样式（可设置文字样式，会被透传下去） */
  itemStyle?: GenericStyleProp<Style>;
  /** 选中条目样式（可设置文字样式，会被透传下去） */
  itemActiveStyle?: GenericStyleProp<Style>;
  /** 选中框样式 */
  markStyle?: ViewStyleProp;
}

export interface CascaderState<T = any> {
  value: Array<CascaderData<T>>;
}
