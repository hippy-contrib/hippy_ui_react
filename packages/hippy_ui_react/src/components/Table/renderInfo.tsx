import { TableRenderParams, TableRenderInfo } from '../../themeConfig/types/table';
import { transferStyle } from '../../utils/Styles';
import { TableBorderStyle } from './PropsType';

/** Table：获取渲染信息 */
export default function getRenderInfo(params: TableRenderParams): TableRenderInfo {
  const {
    consumerValue: { themeConfig, renderInfo },
    props: { style, borderStyle, headerCellStyleFn, headerStyle, rowStyleFn, cellStyleFn },
  } = params;
  const _borderStyle = transferStyle([themeConfig.tableBorderStyle, borderStyle]) as TableBorderStyle;

  const result: TableRenderInfo = {
    wrapProps: {
      style: transferStyle([
        themeConfig.tableStyle,
        {
          borderLeftWidth: _borderStyle.borderWidth,
          borderBottomWidth: _borderStyle.borderWidth,
          borderColor: _borderStyle.borderColor,
        },
        style,
      ]),
    },
    borderStyle: _borderStyle,
    rowStyleFn: (params) => {
      return transferStyle([themeConfig.tableRowStyleFn(params), rowStyleFn?.(params)]);
    },
    cellStyleFn: (params) => {
      return transferStyle([
        themeConfig.tableCellStyleFn(params),
        {
          borderRightWidth: _borderStyle.borderWidth,
          borderTopWidth: _borderStyle.borderWidth,
          borderColor: _borderStyle.borderColor,
        },
        cellStyleFn?.(params),
      ]);
    },
    headerStyle: transferStyle([themeConfig.tableHeaderStyle, headerStyle]),
    headerCellStyleFn: (params) => {
      return transferStyle([
        themeConfig.tableHeaderCellStyleFn(params),
        {
          borderRightWidth: _borderStyle.borderWidth,
          borderTopWidth: _borderStyle.borderWidth,
          borderColor: _borderStyle.borderColor,
        },
        headerCellStyleFn?.(params),
      ]);
    },
  };

  return renderInfo?.table?.({ ...params, defaultRenderInfo: result }) || result;
}
