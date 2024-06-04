import React, { isValidElement } from 'react';
import { TagRenderParams, TagRenderInfo, tagConfig } from './config';
import { pickTextStyle, transferStyle } from '../../utils/Styles';
import HiText from '../HiText';

/** Tag：获取渲染信息 */
export default function getRenderInfo(params: TagRenderParams): TagRenderInfo {
  const {
    consumerValue: { renderInfo, themeConfig: _themeConfig },
    props: { style: userStyle, accessible, accessibilityLabel, children, onPress, maxLength },
  } = params;

  const themeConfig = { ...tagConfig, ..._themeConfig };
  const style = transferStyle([themeConfig.tagStyle, themeConfig.tagTypeStyleFn(params), userStyle]);
  const txtStyle = pickTextStyle(style);
  const result: TagRenderInfo = {
    tagProps: {
      onClick: onPress,
      accessible,
      accessibilityLabel:
        accessibilityLabel === undefined && typeof children === 'string' ? children : accessibilityLabel,
      style,
    },
    txtNode: isValidElement(children) ? (
      children
    ) : (
      <HiText style={txtStyle} numberOfLines={1}>
        {typeof children === 'string' && maxLength > 0 ? children.slice(0, maxLength) : children}
      </HiText>
    ),
  };

  return renderInfo?.tag?.({ ...params, defaultRenderInfo: result }) || result;
}
