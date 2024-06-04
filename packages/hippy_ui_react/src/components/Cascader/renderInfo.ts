import { CascaderRenderInfo, CascaderRenderParams, cascaderConfig } from './config';
import { pickTextStyle, transferStyle } from '../../utils/Styles';

/** Cascader：获取渲染信息 */
export default function getRenderInfo<T>(params: CascaderRenderParams<T>): CascaderRenderInfo {
  const {
    consumerValue: { renderInfo, themeConfig: _themeConfig },
    props: { scrollViewHeight, itemHeight, scrollViewStyleFn, itemStyle, itemActiveStyle, markStyle },
  } = params;

  const themeConfig = { ...cascaderConfig, ..._themeConfig };
  const _itemStyle = transferStyle([themeConfig.cascaderItemStyle, { height: itemHeight }, itemStyle]);
  const _itemActiveStyle = transferStyle([themeConfig.cascaderItemActiveStyle, itemActiveStyle]);

  const result: CascaderRenderInfo = {
    wrapStyle: transferStyle([themeConfig.cascaderWrapStyle]),
    markStyle: transferStyle([
      themeConfig.cascaderMarkStyle,
      { height: itemHeight, top: (scrollViewHeight - itemHeight) / 2 },
      markStyle,
    ]),
    scrollViewPropsFn: (index: number) => {
      return {
        style: transferStyle([
          themeConfig.cascaderScrollViewPropsFn(index),
          { height: scrollViewHeight },
          scrollViewStyleFn?.(index),
        ]),
      };
    },
    itemStyle: _itemStyle,
    itemActiveStyle: _itemActiveStyle,
    itemActiveTxtProps: {
      ...themeConfig.cascaderItemTxtProps,
      style: transferStyle([themeConfig.cascaderItemTxtProps.style, pickTextStyle(_itemStyle)]),
    },
    itemTxtProps: {
      ...themeConfig.cascaderItemActiveTxtProps,
      style: transferStyle([themeConfig.cascaderItemActiveTxtProps.style, pickTextStyle(_itemActiveStyle)]),
    },
  };
  return renderInfo?.cascader?.({ ...params, defaultRenderInfo: result }) || result;
}
