import { PropsWithChildren } from 'react';
import { TextProps, TextStyle, ViewProps, ViewStyle } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { ToastProps, ToastState } from '../../components/Toast/PropsType';

/** 主题配置：Toast */
export interface ThemeConfigToast {
  toastStyle: ViewStyle;
  toastTextStyle: TextStyle;
}

/** 自定义渲染：Toast */
export interface ToastRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<ToastProps>;
  state: ToastState;
}
export interface ToastRenderInfo {
  maskProps: ViewProps;
  mainProps: ViewProps;
  textProps: TextProps;
}
export type RenderInfoToast = (params: ToastRenderParams & { defaultRenderInfo: ToastRenderInfo }) => ToastRenderInfo;
