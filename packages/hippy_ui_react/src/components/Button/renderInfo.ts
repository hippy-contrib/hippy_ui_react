import { isValidElement } from 'react';
import { ViewStyle, ImageProps, Platform } from '@hippy/react';
import { HiTextProps } from '../HiText/PropsType';
import { transferStyle, UtilStyles, pickTextStyle } from '../../utils/Styles';
import { extendObj, isWeb } from '../../utils/Utils';
import { ButtonRenderInfo, ButtonRenderParams } from '../../themeConfig/types/button';

/** Button：获取渲染信息 */
export default function getRenderInfo(params: ButtonRenderParams): ButtonRenderInfo {
  const {
    consumerValue: { themeConfig, renderInfo },
    props,
  } = params;
  const { badge, image, accessible, accessibilityLabel, children } = props;

  const allStyles = getStyle(params);

  const result: ButtonRenderInfo = {
    wrapProps: { style: allStyles.wrapperStyle, accessible, accessibilityLabel },
    textProps: { ...allStyles.textProps, accessible: !Platform.OS, numberOfLines: 1 },
    imageProps: { style: allStyles.imageStyle },
    badgeProps: { style: allStyles.badgeStyle },
    pressProps: { style: allStyles.pressStyle },
  };

  // 无障碍
  if (accessible && typeof children === 'string' && accessibilityLabel === undefined) {
    result.wrapProps.accessibilityLabel = children + ' 按钮';
  }
  // 手动兼容h5无障碍(当前hippy-web没有处理无障碍相关属性，先手动兼容下)
  if (isWeb() && accessible) {
    (result.wrapProps as any).role = 'button';
    (result.wrapProps as any).tabindex = 0;
  }
  // image
  const _image = themeConfig.buttonPreImgFn?.(params) ?? image;
  if (isValidElement(_image)) {
    result.imageProps = extendObj(result.imageProps, _image.props) as ImageProps;
  } else if (_image) {
    result.imageProps.source = { uri: _image as string };
  }
  // badge
  const _badge = themeConfig.buttonBadgeFn?.(params) ?? badge;
  if (isValidElement(_badge)) {
    result.badgeProps = extendObj(result.badgeProps, _badge.props) as ImageProps;
  } else if (_badge) {
    result.badgeProps.source = { uri: _badge as string };
  }
  return renderInfo?.button?.({ ...params, defaultRenderInfo: result }) || result;
}

/** Button：获取渲染样式 */
function getStyle(params: ButtonRenderParams) {
  const {
    consumerValue: { themeConfig },
    props,
  } = params;
  const { disabled, style, loading, circle, round } = props;

  // 注意：部分安卓机同时使用{opacity、overflow:"hidden"、borderRadius}会导致children无法渲染
  let wrapperStyle: ViewStyle = themeConfig.buttonWrapStyleFn(params);
  const imageStyle: ViewStyle = themeConfig.buttonImgStyleFn(params);
  const textProps: HiTextProps = themeConfig.buttonTextPropsFn(params);

  // 3. WrapperStyle：Other
  wrapperStyle.cursor = disabled ? 'not-allowed' : loading ? 'wait' : 'pointer';
  (round || circle) && (wrapperStyle.borderRadius = wrapperStyle.height as number);
  if (circle) {
    wrapperStyle.paddingLeft = 0;
    wrapperStyle.paddingRight = 0;
    wrapperStyle.width = wrapperStyle.height;
    wrapperStyle.minWidth = undefined;
  }
  wrapperStyle = transferStyle([wrapperStyle, style]);

  // 4. badge
  const badgeStyle: ViewStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    width: wrapperStyle.height,
    height: wrapperStyle.height,
  };

  // 5. press
  const pressStyle: ViewStyle = transferStyle([
    {
      ...UtilStyles.mask,
      pointerEvents: 'none',
    },
    themeConfig.buttonPressStyleFn(params),
  ]);

  // 6. textStyle
  textProps.style = transferStyle([textProps.style, pickTextStyle(wrapperStyle)]);

  // 7. imageStyle
  if (circle) {
    imageStyle.marginRight = 0;
  }

  return {
    wrapperStyle,
    badgeStyle,
    pressStyle,
    imageStyle,
    textProps,
  };
}
