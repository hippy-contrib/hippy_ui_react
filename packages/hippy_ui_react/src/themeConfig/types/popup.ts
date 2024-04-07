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
