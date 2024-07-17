import { SliderRenderParams, SliderRenderInfo, sliderConfig } from './config';
import { transferStyle } from '../../utils/Styles';

/** Slider：获取渲染信息 */
export default function getRenderInfo(params: SliderRenderParams): SliderRenderInfo {
  const {
    consumerValue: { renderInfo, themeConfig: _themeConfig },
    props: {
      disabled,
      lineColor,
      activeLineColor,
      blockSize,
      blockColor,
      style,
      lineStyle = {},
      activeLineStyle = {},
      blockStyle = {},
      blockImage = '',
    },
  } = params;
  const themeConfig = { ...sliderConfig, ..._themeConfig };
  const { sliderWrapStyle, sliderLineStyle, sliderActiveLineStyle, sliderBlockStyle, sliderBlockImageStyle } =
    themeConfig;
  const _style = transferStyle(style);
  const _lineStyle = transferStyle(lineStyle);
  const _activeLineStyle = transferStyle(activeLineStyle);
  const _blockStyle = transferStyle(blockStyle);

  const result: SliderRenderInfo = {
    wrapProps: {
      style: {
        ...sliderWrapStyle,
        ..._style,
        // size优先级最高
        paddingHorizontal: blockSize ? blockSize / 2 : _style.paddingHorizontal || sliderWrapStyle.paddingHorizontal,
        height: _style.height || blockSize || sliderWrapStyle.height,
        opacity: disabled ? 0.5 : 1,
      },
    },
    lineProps: {
      style: {
        ...sliderLineStyle,
        backgroundColor: lineColor || themeConfig.colorFillOther || sliderLineStyle.backgroundColor,
        ..._lineStyle,
      },
      accessible: !disabled,
    },
    activeLineProps: {
      style: {
        ...sliderActiveLineStyle,
        backgroundColor: activeLineColor || themeConfig.colorTheme || sliderActiveLineStyle.backgroundColor,
        ..._activeLineStyle,
      },
    },
    blockProps: {
      style: {
        ...sliderBlockStyle,
        ..._blockStyle,
        ...(blockSize ? { width: blockSize, height: blockSize, borderRadius: blockSize / 2 } : {}),
        ...{
          backgroundColor:
            blockColor || _blockStyle.backgroundColor || themeConfig.colorTheme || sliderBlockStyle.backgroundColor,
        },
      },
    },
    blockImageProps: {
      style: sliderBlockImageStyle,
      source: { uri: blockImage },
    },
  };
  return renderInfo?.slider?.({ ...params, defaultRenderInfo: result }) || result;
}
