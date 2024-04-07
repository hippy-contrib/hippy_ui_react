import { PropsWithChildren } from 'react';
import { ViewProps, ViewStyle, ImageProps } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { RadioProps, RadioState } from '../../components/Radio/PropsType';
import { HiTextProps } from '../../components/HiText/PropsType';

/** 主题配置：选择框 */
export interface ThemeConfigRadio {
  radioStyle: ViewStyle;
  radioDisabledStyle: ViewStyle;
  radioImgStyle: ViewStyle;
  radioCheckImg: {
    checked: string;
    noCheck: string;
  };
  radioTextProps: HiTextProps;
}

/** 自定义渲染：选择框 */
export interface RadioRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<RadioProps>;
  state: RadioState;
}
export interface RadioRenderInfo {
  wrapProps: ViewProps;
  imgProps: ImageProps;
  textProps: HiTextProps;
}
export type RenderInfoRadio = (params: RadioRenderParams & { defaultRenderInfo: RadioRenderInfo }) => RadioRenderInfo;
