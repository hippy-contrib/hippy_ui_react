import React, { isValidElement } from 'react';
import { ModalRenderInfo, ModalRenderParams, modalConfig } from './config';
import { transferStyle } from '../../utils/Styles';
import HiText from '../HiText';

/** Modal：获取渲染信息 */
export default function getRenderInfo(params: ModalRenderParams): ModalRenderInfo {
  const {
    consumerValue: { themeConfig: _themeConfig, renderInfo },
    props: { maskStyle, title, style, header, content, cancelText },
  } = params;
  const themeConfig = { ...modalConfig, ..._themeConfig };
  const result: ModalRenderInfo = {
    modalProps: {
      ...themeConfig.modalProps,
      style: transferStyle([themeConfig.modalProps.style, { backgroundColor: themeConfig.colorFillBase }, style]),
    },
    maskStyle: transferStyle([{ zIndex: themeConfig.zIndexModal }, themeConfig.modalMaskStyle, maskStyle]),
    title: !title ? null : isValidElement(title) ? (
      title
    ) : (
      <HiText
        {...themeConfig.modalTitleProps}
        style={transferStyle([themeConfig.modalTitleProps.style, { marginTop: header ? 24 : 30 }])}
      >
        {title}
      </HiText>
    ),
    content: !content ? null : isValidElement(content) ? (
      content
    ) : (
      <HiText
        {...themeConfig.modalContentProps}
        style={transferStyle([
          themeConfig.modalContentProps.style,
          { marginTop: title ? 15 : header ? 24 : 30, textAlign: String(content).length < 14 ? 'center' : 'left' },
        ])}
      >
        {content}
      </HiText>
    ),
    closeIcon: themeConfig.modalCloseIconFn(params),
    footerDefaultBtnCancelProps: themeConfig.modalFooterDefaultBtnCancelProps,
    footerDefaultBtnConfirmProps: themeConfig.modalFooterDefaultBtnConfirmProps,
    footerDefaultWrapStyle: themeConfig.modalFooterDefaultWrapStyle,
    footerDefaultTxtConfirmProps: themeConfig.modalFooterDefaultTxtConfirmProps,
    footerDefaultTxtCancelProps: themeConfig.modalFooterDefaultTxtCancelProps,
    footerPrimaryBtnCancelProps: themeConfig.modalFooterPrimaryBtnCancelProps,
    footerPrimaryBtnConfirmProps: {
      ...themeConfig.modalFooterPrimaryBtnConfirmProps,
      style: transferStyle([
        themeConfig.modalFooterPrimaryBtnConfirmProps.style,
        { marginBottom: cancelText ? 15 : 0 },
      ]),
    },
    footerPrimaryWrapStyle: themeConfig.modalFooterPrimaryWrapStyle,
    footerVerticalBtnCancelProps: themeConfig.modalFooterVerticalBtnCancelProps,
    footerVerticalBtnConfirmProps: themeConfig.modalFooterVerticalBtnConfirmProps,
    footerVerticalWrapStyle: themeConfig.modalFooterVerticalWrapStyle,
    footerVerticalTxtConfirmProps: themeConfig.modalFooterVerticalTxtConfirmProps,
    footerVerticalTxtCancelProps: themeConfig.modalFooterVerticalTxtCancelProps,
  };
  return renderInfo?.modal?.({ ...params, defaultRenderInfo: result }) || result;
}
