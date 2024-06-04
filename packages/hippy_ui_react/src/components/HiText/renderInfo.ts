import React, { ReactNode } from 'react';
import { TextStyle } from '@hippy/react';
import { HiTextRenderParams, HiTextRenderInfo, hiTextConfig } from './config';
import { transferStyle } from '../../utils/Styles';
import { HiTextColor } from './PropsType';
import { isWeb } from '../../utils/Utils';
import HiText from './index';

/** HiText：获取渲染信息 */
export default function getRenderInfo(params: HiTextRenderParams): HiTextRenderInfo {
  const {
    consumerValue: { renderInfo, themeConfig: _themeConfig },
    props,
  } = params;
  const { theme, size, weight, lineHeight, color, textAlign, children, ...textProps } = props;

  const themeConfig = { ...hiTextConfig, ..._themeConfig };
  const { textStyle } = getStyles(params);
  const child = renderChildren(children);

  const result: HiTextRenderInfo = {
    textProps: {
      ...textProps,
      style: textStyle,
      children: themeConfig.hiTextFormat ? themeConfig.hiTextFormat(child) : child,
    },
  };
  return renderInfo?.hiText?.({ ...params, defaultRenderInfo: result }) || result;
}

// 渲染子节点
function renderChildren(children: ReactNode): ReactNode {
  if (typeof children === 'string') {
    return isWeb() ? children : HiText.decodeHTML(children);
  } else if (Array.isArray(children)) {
    return React.Children.map(children, (child) => renderChildren(child));
  } else {
    return children;
  }
}

/** HiText：获取样式信息 */
function getStyles(params: HiTextRenderParams) {
  const {
    consumerValue: { themeConfig: _themeConfig },
    props,
  } = params;
  const themeConfig = { ...hiTextConfig, ..._themeConfig };
  const {
    size = themeConfig.hiTextSizeDefault,
    color = HiTextColor.textBase,
    weight = themeConfig.hiTextWeightRegular,
    lineHeight,
    textAlign,
    style,
    numberOfLines,
  } = props;

  let textStyle: TextStyle = {};
  if (isWeb()) {
    if (numberOfLines) {
      textStyle.display = numberOfLines === 1 ? 'block' : '-webkit-box';
      textStyle.lineClamp = numberOfLines;
      textStyle.boxOrient = 'vertical';
      textStyle.textOverflow = 'ellipsis';
      textStyle.overflow = 'hidden';
      textStyle.overflowWrap = 'break-word';
      textStyle.whiteSpace = numberOfLines === 1 ? 'nowrap' : 'pre-wrap';
    } else {
      textStyle.lineClamp = 'inherit';
    }
  }
  if (size) {
    textStyle.fontSize = size;
  }
  if (lineHeight) {
    textStyle.lineHeight = lineHeight;
  }
  if (weight) {
    textStyle.fontWeight = themeConfig[weight] || weight;
  }
  if (color) {
    textStyle.color = themeConfig[color] || color;
  }
  if (textAlign) {
    textStyle.textAlign = textAlign;
  }
  textStyle = transferStyle([textStyle, style]);
  return {
    textStyle,
  };
}
