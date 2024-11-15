import React, { isValidElement } from 'react';
import { Image } from '@hippy/react';
import HiText from '../HiText';
import { transferStyle } from '../../utils/Styles';
import { EmptyRenderInfo, EmptyRenderParams, emptyConfig } from './config';
import { ThemeConfig } from '../../themeConfig';

/** Empty：获取渲染信息 */
export default function getRenderInfo(params: EmptyRenderParams): EmptyRenderInfo {
  const {
    consumerValue: { themeConfig: _themeConfig, renderInfo },
    props,
  } = params;
  const themeConfig: ThemeConfig = { ...emptyConfig, ..._themeConfig };
  const { onPress, style, image, desc = themeConfig.emptyTxtDesc } = props;

  const result: EmptyRenderInfo = {
    wrapProps: {
      ...themeConfig.emptyWrap,
      onClick: onPress,
      style: transferStyle([themeConfig.emptyWrap.style, style]),
    },
    img: isValidElement(image) ? (
      image
    ) : (
      <Image
        {...themeConfig.emptyImg}
        source={image && typeof image === 'string' ? { uri: image } : themeConfig.emptyImg.source}
      />
    ),
    text: isValidElement(desc) ? desc : <HiText {...themeConfig.emptyText}>{desc}</HiText>,
  };
  return renderInfo?.empty?.({ ...params, defaultRenderInfo: result }) || result;
}
