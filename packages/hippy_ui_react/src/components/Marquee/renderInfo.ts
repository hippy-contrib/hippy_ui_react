import { MarqueeRenderInfo, MarqueeRenderParams, marqueeConfig } from './config';
import { transferStyle } from '../../utils/Styles';

/** Marquee：获取渲染信息 */
export default function getRenderInfo(params: MarqueeRenderParams): MarqueeRenderInfo {
  const {
    consumerValue: { themeConfig: _themeConfig, renderInfo },
    props: { style, onPress },
    shouldLoop,
  } = params;
  const themeConfig = { ...marqueeConfig, ..._themeConfig };
  const verticalWrapStyle = transferStyle([themeConfig.marqueeVerticalProps.style, style]);
  const horizontalWrapStyle = transferStyle([themeConfig.marqueeHorizontalProps.style, style]);
  const result: MarqueeRenderInfo = {
    verticalWrapProps: {
      ...themeConfig.marqueeVerticalProps,
      style: transferStyle([verticalWrapStyle, shouldLoop && { justifyContent: 'flex-start' }]),
      onClick: onPress,
    },
    verticalContentProps: {
      ...themeConfig.marqueeVerticalContentProps,
      style: transferStyle([
        themeConfig.marqueeVerticalContentProps.style,
        { justifyContent: verticalWrapStyle.justifyContent },
      ]),
    },
    horizontalWrapProps: {
      ...themeConfig.marqueeHorizontalProps,
      style: transferStyle([horizontalWrapStyle, shouldLoop && { justifyContent: 'flex-start' }]),
      onClick: onPress,
    },
    horizontalContentProps: {
      ...themeConfig.marqueeHorizontalContentProps,
      style: transferStyle([
        themeConfig.marqueeHorizontalContentProps.style,
        { alignItems: horizontalWrapStyle.alignItems },
      ]),
    },
  };
  return renderInfo?.marquee?.({ ...params, defaultRenderInfo: result }) || result;
}
