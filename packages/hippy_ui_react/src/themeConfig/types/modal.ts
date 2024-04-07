import { PropsWithChildren, ReactNode } from 'react';
import { ViewProps, ViewStyleProp } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { ModalProps } from '../../components/Modal/PropsType';
import { HiTextProps } from '../../components/HiText/PropsType';
import { ButtonProps } from '../../components/Button/PropsType';

/** 主题配置：对话框 */
export interface ThemeConfigModal {
  modalProps: ViewProps;
  modalMaskStyle: ViewStyleProp;
  modalTitleProps: HiTextProps;
  modalContentProps: HiTextProps;
  modalCloseIconFn: (params: ModalRenderParams) => ReactNode;
  modalFooterDefaultWrapStyle: ViewStyleProp;
  modalFooterDefaultBtnConfirmProps: ViewProps;
  modalFooterDefaultBtnCancelProps: ViewProps;
  modalFooterDefaultTxtConfirmProps: HiTextProps;
  modalFooterDefaultTxtCancelProps: HiTextProps;
  modalFooterPrimaryWrapStyle: ViewStyleProp;
  modalFooterPrimaryBtnConfirmProps: ButtonProps;
  modalFooterPrimaryBtnCancelProps: ButtonProps;
  modalFooterVerticalWrapStyle: ViewStyleProp;
  modalFooterVerticalBtnConfirmProps: ViewProps;
  modalFooterVerticalBtnCancelProps: ViewProps;
  modalFooterVerticalTxtConfirmProps: HiTextProps;
  modalFooterVerticalTxtCancelProps: HiTextProps;
}

/** 自定义渲染：对话框 */
export interface ModalRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<ModalProps>;
}
export interface ModalRenderInfo {
  maskStyle: ViewStyleProp;
  modalProps: ViewProps;
  title: ReactNode;
  content: ReactNode;
  closeIcon: ReactNode;
  footerDefaultWrapStyle: ViewStyleProp;
  footerDefaultBtnConfirmProps: ViewProps;
  footerDefaultBtnCancelProps: ViewProps;
  footerDefaultTxtConfirmProps: HiTextProps;
  footerDefaultTxtCancelProps: HiTextProps;
  footerPrimaryWrapStyle: ViewStyleProp;
  footerPrimaryBtnConfirmProps: ButtonProps;
  footerPrimaryBtnCancelProps: ButtonProps;
  footerVerticalWrapStyle: ViewStyleProp;
  footerVerticalBtnConfirmProps: ViewProps;
  footerVerticalBtnCancelProps: ViewProps;
  footerVerticalTxtConfirmProps: HiTextProps;
  footerVerticalTxtCancelProps: HiTextProps;
}
export type RenderInfoModal = (params: ModalRenderParams & { defaultRenderInfo: ModalRenderInfo }) => ModalRenderInfo;
