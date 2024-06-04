import { PropsWithChildren } from 'react';
import { ViewProps } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { PopupProps } from '../../components/Popup/PropsType';

/** 主题配置：半屏弹窗 */
export interface ThemeConfigPopup {
  popupWrap: ViewProps;
}

/** 自定义渲染：半屏弹窗 */
export interface PopupRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<PopupProps>;
}
export interface PopupRenderInfo {
  mainProps: ViewProps;
}
export type RenderInfoPopup = (params: PopupRenderParams & { defaultRenderInfo: PopupRenderInfo }) => PopupRenderInfo;

/**
 * Popup 组件
 */
export const popupConfig: ThemeConfigPopup = {
  popupWrap: {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
  },
};
