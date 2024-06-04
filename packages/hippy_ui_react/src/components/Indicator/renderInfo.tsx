import React from 'react';
import { View } from '@hippy/react';
import { IndicatorRenderParams, IndicatorRenderInfo, indicatorConfig } from './config';
import { transferStyle } from '../../utils/Styles';

/** Indicator：获取渲染信息 */
export default function getRenderInfo(params: IndicatorRenderParams): IndicatorRenderInfo {
  const {
    consumerValue: { renderInfo, themeConfig: _themeConfig },
    props: { style, activeIndex, dotStyle, activeStyle, length },
  } = params;

  const themeConfig = { ...indicatorConfig, ..._themeConfig };
  const result: IndicatorRenderInfo = {
    wrapProps: {
      ...themeConfig.indicatorWrapProps,
      style: transferStyle([themeConfig.indicatorWrapProps.style, style]),
    },
    itemList: new Array(length).fill(0).map((v, i) => {
      const isActive = i === activeIndex;
      return (
        <View
          key={i}
          {...themeConfig.indicatorItemProps}
          {...(isActive ? themeConfig.indicatorActiveProps : null)}
          style={transferStyle([
            { backgroundColor: themeConfig.colorTextSecondary },
            themeConfig.indicatorItemProps.style,
            dotStyle,
            isActive && { backgroundColor: themeConfig.colorTextBase },
            isActive && themeConfig.indicatorActiveProps.style,
            isActive && activeStyle,
          ])}
        />
      );
    }),
  };
  return renderInfo?.indicator?.({ ...params, defaultRenderInfo: result }) || result;
}
