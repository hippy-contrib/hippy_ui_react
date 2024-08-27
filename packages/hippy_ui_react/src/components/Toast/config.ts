import { PropsWithChildren } from 'react';
import { TextProps, TextStyle, ViewProps, ViewStyle } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { ToastProps, ToastState } from './PropsType';

/** 主题配置：Toast */
export interface ThemeConfigToast {
  toastMaskStyle: ViewStyle;
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

/**
 * Toast 组件
 */
export const toastConfig: ThemeConfigToast = {
  toastMaskStyle: {},
  toastStyle: {
    marginHorizontal: 20,
    alignSelf: 'center',
    minHeight: 34,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    backgroundColor: 'rgba(17, 17, 17, 0.9)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  toastTextStyle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.85,
  },
};
