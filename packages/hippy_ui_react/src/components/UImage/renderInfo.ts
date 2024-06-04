import { UImageRenderInfo, UImageRenderParams, uImageConfig } from './config';
import { isWeb } from '../../utils/Utils';
import { transferStyle } from '../../utils/Styles';

/** UImage：获取渲染信息 */
export default function getRenderInfo(params: UImageRenderParams): UImageRenderInfo {
  const {
    consumerValue: { themeConfig: _themeConfig, renderInfo },
    props: { src, defaultImage, accessible, accessibilityLabel, style, onLayout, resizeMode, onPress },
    state: { isError },
  } = params;

  const themeConfig = { ...uImageConfig, ..._themeConfig };
  const imgDefaultSrc = defaultImage || themeConfig.uImageDefaultSrcFn(params);
  const imgSrc = src || imgDefaultSrc;

  const result: UImageRenderInfo = {
    imgProps: {
      ...themeConfig.uImageProps,
      style: transferStyle([themeConfig.uImageProps.style, style]),
      onLayout,
      resizeMode,
      onClick: onPress,
      accessible,
      accessibilityLabel,
    },
    imgSrc,
    imgDefaultSrc,
    imgRealSrc: isError ? imgDefaultSrc : imgSrc,
  };

  // 手动兼容h5无障碍(当前hippy-web没有处理无障碍相关属性，先手动兼容下)
  if (isWeb()) {
    if (accessibilityLabel) {
      result.imgProps['aria-label'] = accessibilityLabel;
    } else {
      result.imgProps['aria-hidden'] = true;
    }
  }

  return renderInfo?.uImage?.({ ...params, defaultRenderInfo: result }) || result;
}
