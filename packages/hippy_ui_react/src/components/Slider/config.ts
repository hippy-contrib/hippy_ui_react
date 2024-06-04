import { PropsWithChildren } from 'react';
import { ViewProps, ViewStyle, ImageProps } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { SliderProps, SliderState } from './PropsType';

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

/**
 * Radio 组件
 */
export const sliderConfig: ThemeConfigSlider = {
  sliderWrapStyle: {
    position: 'relative',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    height: 18,
    paddingHorizontal: 18 / 2,
  },
  sliderLineStyle: {
    alignSelf: 'stretch',
    height: 4,
    backgroundColor: '#F2F2F6',
    borderRadius: 2,
  },
  sliderActiveLineStyle: {
    position: 'absolute',
    height: 4,
    left: 0,
    borderRadius: 2,
    backgroundColor: '#FF6D77',
  },
  sliderBlockStyle: {
    position: 'absolute',
    width: 18,
    height: 18,
    top: 0,
    borderRadius: 18 / 2,
    overflow: 'hidden',
    cursor: 'pointer',
  },
  sliderBlockImageStyle: {
    flex: 1,
  },
};
