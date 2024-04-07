import { ReactNode } from 'react';
import { ViewStyle, Style, GenericStyleProp } from '@hippy/react';

export interface TableBorderStyle {
  borderWidth?: number;
  borderColor?: string;
}

export type TableCellGetStyleFn = (cell: { rowIndex: number; columnIndex: number }) => GenericStyleProp<Style>;
export type TableHeaderCellGetStyleFn = (cell: { columnIndex: number }) => GenericStyleProp<Style>;
export type TableRowGetStyleFn = (cell: { rowIndex: number }) => GenericStyleProp<ViewStyle>;

export interface TableProps {
  /** 外层容器样式 */
  style?: ViewStyle;
  /** 边框样式，支持设置borderWidth, borderColor */
  borderStyle?: TableBorderStyle;
  /** 单元格样式（可设置文字样式，会被透传下去） */
  cellStyleFn?: TableCellGetStyleFn;
  /** 行容器样式 */
  rowStyleFn?: TableRowGetStyleFn;
  /** 标题 */
  header?: ReactNode[];
  /** 标题容器样式 */
  headerStyle?: ViewStyle;
  /** 标题单元格样式（可设置文字样式，会被透传下去） */
  headerCellStyleFn?: TableHeaderCellGetStyleFn;
  /** 各行数据 */
  data: Array<Array<ReactNode | string>>;
}

export interface TableCellProps {
  /** 自定义节点 */
  data: ReactNode;
  /** 单元格样式（可设置文字样式，会被透传下去） */
  style?: Style;
}

export interface TableRowProps {
  /** 一行的数据 */
  data: ReactNode[];
  /** 边框样式 */
  borderStyle?: TableBorderStyle;
  /** 单元格容器样式 */
  style?: ViewStyle;
  /** 单元格样式（可设置文字样式，会被透传下去） */
  cellStyleFn?: TableHeaderCellGetStyleFn;
}
