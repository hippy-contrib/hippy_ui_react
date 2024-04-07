import React, { isValidElement } from 'react';
import { BadgeRenderInfo, BadgeRenderParams } from '../../themeConfig/types/badge';
import { transferStyle } from '../../utils/Styles';
import HiText from '../HiText';

/** Badge：获取渲染信息 */
export default function getRenderInfo(params: BadgeRenderParams): BadgeRenderInfo {
  const {
    consumerValue: { renderInfo, themeConfig },
    props: { style, value, isDot = value === undefined, maxValue, children, wrapStyle },
  } = params;

  let badgeStyle;
  let badgeText;
  let isShow = true;
  if (isDot) {
    // 红点
    badgeStyle = null;
    badgeText = null;
  } else if (isValidElement(value)) {
    // 自定义
    badgeText = value;
    badgeStyle = themeConfig.badgeWithTxtStyle;
  } else if (value || value === 0) {
    // 数值或字符串
    const showTxt = (typeof value === 'number' && value > maxValue ? `${maxValue}+` : value) as string;

    if (parseInt(showTxt, 10).toString() === String(showTxt) && String(showTxt).length === 1) {
      badgeStyle = themeConfig.badgeWithTxtOneStyle;
    } else {
      badgeStyle = themeConfig.badgeWithTxtStyle;
    }
    badgeText = (
      <HiText {...themeConfig.badgeTxtProps} style={transferStyle([themeConfig.badgeTxtProps.style])}>
        {showTxt}
      </HiText>
    );
  } else {
    badgeStyle = null;
    badgeText = null;
    isShow = false;
  }

  const result: BadgeRenderInfo = {
    badgeProps: {
      style: isShow
        ? transferStyle([
            themeConfig.badgeStyle,
            badgeStyle,
            children && (isDot ? themeConfig.badgeWithChildrenStyle : themeConfig.badgeTxtWithChildrenStyle),
            style,
          ])
        : undefined,
    },
    badgeText,
    wrapProps: { ...themeConfig.badgeWrapProps, style: transferStyle([themeConfig.badgeWrapProps.style, wrapStyle]) },
  };
  return renderInfo?.badge?.({ ...params, defaultRenderInfo: result }) || result;
}
