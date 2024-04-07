import React, { isValidElement } from 'react';
import { Image } from '@hippy/react';
import { NavigatorRenderInfo, NavigatorRenderParams } from '../../themeConfig/types/navigator';
import { transferStyle } from '../../utils/Styles';
import HiText from '../HiText';

/** Navigator：获取渲染信息 */
export default function getRenderInfo(params: NavigatorRenderParams): NavigatorRenderInfo {
  const {
    consumerValue: { renderInfo, themeConfig },
    props: { title, back, onBack },
  } = params;
  const { wrapStyle, navigatorStyle, titleStyle, statusBarStyle } = getStyle(params);
  const result: NavigatorRenderInfo = {
    wrapStyle,
    statusBarStyle,
    navigatorStyle,
    title: isValidElement(title) ? (
      title
    ) : (
      <HiText {...themeConfig.navigatorTitlePropsFn(params)} style={titleStyle}>
        {title}
      </HiText>
    ),
    back: isValidElement(back) ? back : <Image {...themeConfig.navigatorBackPropsFn(params)} onClick={onBack} />,
  };
  return renderInfo?.navigator?.({ ...params, defaultRenderInfo: result }) || result;
}

function getStyle(params: NavigatorRenderParams) {
  const {
    consumerValue: { themeConfig },
    props: { style, statusBarStyle, wrapStyle, titleCenter },
  } = params;
  return {
    wrapStyle: transferStyle([themeConfig.navigatorWrapStyle, wrapStyle]),
    statusBarStyle: transferStyle([themeConfig.navigatorStatusBarStyle, statusBarStyle]),
    navigatorStyle: transferStyle([themeConfig.navigatorStyle, style]),
    titleStyle: transferStyle([
      themeConfig.navigatorTitlePropsFn(params).style,
      titleCenter && { textAlign: 'center' },
    ]),
  };
}
