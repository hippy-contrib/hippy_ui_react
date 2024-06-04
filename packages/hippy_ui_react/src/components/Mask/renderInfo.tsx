import React from 'react';
import { Platform, View } from '@hippy/react';
import { MaskRenderInfo, MaskRenderParams, maskConfig } from './config';
import { transferStyle, UtilStyles } from '../../utils/Styles';
import { MaskProps } from './PropsType';

/** Mask：获取渲染信息 */
export default function getRenderInfo(params: MaskRenderParams): MaskRenderInfo {
  const {
    consumerValue: { themeConfig: _themeConfig, renderInfo },
    props,
  } = params;
  const themeConfig = { ...maskConfig, ..._themeConfig };
  // ios外层无障碍设置会阻断里面，这里拆出一个View
  const { accessible, accessibilityLabel, style, ...viewProps } = props as MaskProps;
  const isIos = Platform.OS === 'ios';
  const result: MaskRenderInfo = {
    maskProps: {
      ...themeConfig.maskProps,
      ...viewProps,
      ...(isIos ? null : { accessible, accessibilityLabel }),
      style: transferStyle([{ zIndex: themeConfig.zIndexMask }, themeConfig.maskProps.style, style]),
    },
    coverView:
      (accessible || accessibilityLabel) && isIos ? (
        <View accessible={accessible} accessibilityLabel={accessibilityLabel} style={UtilStyles.mask} />
      ) : null,
  };
  return renderInfo?.mask?.({ ...params, defaultRenderInfo: result }) || result;
}
