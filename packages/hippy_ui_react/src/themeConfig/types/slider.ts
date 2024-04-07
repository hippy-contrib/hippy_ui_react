import { PropsWithChildren } from 'react';
import { ViewProps, ViewStyle, ImageProps } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { SliderProps, SliderState } from '../../components/Slider/PropsType';

/** 主题配置：选择框 */
export interface ThemeConfigSlider {
  sliderWrapStyle: ViewStyle;
  sliderLineStyle: ViewStyle;
  sliderActiveLineStyle: ViewStyle;
  sliderBlockStyle: ViewStyle;
  sliderBlockImageStyle: ImageProps['style'];
}

/** 自定义渲染：滑动选择器 */
export interface SliderRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<SliderProps>;
  state: SliderState;
}
export interface SliderRenderInfo {
  wrapProps: ViewProps;
  lineProps: ViewProps;
  activeLineProps: ViewProps;
  blockProps: ViewProps;
  blockImageProps: ImageProps;
}
export type RenderInfoSlider = (
  params: SliderRenderParams & { defaultRenderInfo: SliderRenderInfo },
) => SliderRenderInfo;
