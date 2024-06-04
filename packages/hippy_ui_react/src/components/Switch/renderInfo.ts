import { ViewStyle } from '@hippy/react';
import { SwitchRenderInfo, SwitchRenderParams, switchConfig } from './config';
import { transferStyle } from '../../utils/Styles';
import { isWeb } from '../../utils/Utils';

/** Switch：获取渲染信息 */
export default function getRenderInfo(params: SwitchRenderParams): SwitchRenderInfo {
  const {
    consumerValue: { renderInfo },
    props,
    state,
  } = params;
  const { wrapStyle, circleStyle, translateX } = getStyles(params);

  const { accessible, accessibilityLabel } = props;
  const { checked } = state;

  const result: SwitchRenderInfo = {
    wrapProps: {
      style: wrapStyle,
      accessible,
      accessibilityLabel,
    },
    circleProps: {
      style: circleStyle,
    },
    translateX,
  };
  if (accessible && accessibilityLabel === undefined) {
    result.wrapProps.accessibilityLabel = checked ? '已打开 按钮' : '已关闭 按钮';
  }

  return renderInfo?.switch?.({ ...params, defaultRenderInfo: result }) || result;
}

/** Switch：获取渲染样式 */
function getStyles(params: SwitchRenderParams) {
  const {
    consumerValue: { themeConfig: _themeConfig },
    props,
    state,
    translateXAnimation,
  } = params;
  const themeConfig = { ...switchConfig, ..._themeConfig };
  const { activeColor, style, circleStyle: userCircleStyle } = props;
  const { checked } = state;

  // wrapStyle
  const wrapStyle: ViewStyle = transferStyle([
    themeConfig.switchStyle,
    {
      backgroundColor: themeConfig.colorTextSecondary,
    },
    style,
  ]);
  if (checked) {
    wrapStyle.backgroundColor = activeColor || themeConfig.colorTheme;
  }

  // circleStyle
  const circleStyle: ViewStyle = transferStyle([themeConfig.switchCircleStyle, userCircleStyle]);
  const paddingLeft =
    (Object.prototype.hasOwnProperty.call(wrapStyle, 'paddingLeft')
      ? wrapStyle.paddingLeft
      : Object.prototype.hasOwnProperty.call(wrapStyle, 'paddingHorizontal')
        ? wrapStyle.paddingHorizontal
        : wrapStyle.padding) || 0;
  const paddingRight =
    (Object.prototype.hasOwnProperty.call(wrapStyle, 'paddingRight')
      ? wrapStyle.paddingLeft
      : Object.prototype.hasOwnProperty.call(wrapStyle, 'paddingHorizontal')
        ? wrapStyle.paddingHorizontal
        : wrapStyle.padding) || 0;
  const translateX = checked ? 0 : wrapStyle.width - paddingLeft - paddingRight - circleStyle.width;
  if (isWeb()) {
    circleStyle.transform = ('translateX(' + translateX + 'px)') as any;
    circleStyle.transition = 'transform 200ms';
  } else {
    circleStyle.transform = [{ translateX: translateXAnimation }];
  }

  return {
    wrapStyle,
    circleStyle,
    translateX,
  };
}
