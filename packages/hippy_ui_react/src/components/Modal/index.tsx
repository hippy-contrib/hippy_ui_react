import React, { Component, isValidElement } from 'react';
import { View } from '@hippy/react';
import { GLOBAL_VIEW_KEY_MODAL, ModalBtnType, ModalCloseType, ModalProps } from './PropsType';
import Consumer from '../../provider/Consumer';
import Mask from '../Mask';
import getRenderInfo from './renderInfo';
import Button from '../Button';
import Divider from '../Divider';
import HiText from '../HiText';
import Provider from '../../provider/Provider';
import { ModalRenderInfo } from '../../themeConfig/types/modal';

/**
 * @visibleName Modal 对话框
 */
export class Modal extends Component<ModalProps, {}> {
  public static defaultProps = {
    closeType: ModalCloseType.none,
  };

  static btnType = ModalBtnType;
  static closeType = ModalCloseType;

  /**
   * 全局调用-显示对话框
   * @param modalProps - 对话框参数
   * @param options - 额外参数
   */
  static show = (modalProps: ModalProps, options?: { backToClose?: boolean }) => {
    const { backToClose = true } = options || {};
    Provider.updateGlobalView({
      [GLOBAL_VIEW_KEY_MODAL]: {
        data: [
          {
            view: <Modal onCancel={Modal.hide} {...modalProps} />,
            onBackToClose: backToClose
              ? () => {
                  Modal.hide();
                  return true;
                }
              : undefined,
          },
        ],
      },
    });
  };

  /**
   * 全局调用-收起对话框
   */
  static hide = () => {
    Provider.updateGlobalView({
      [GLOBAL_VIEW_KEY_MODAL]: {
        data: [],
      },
    });
  };

  // 渲染底部按钮组-默认左右样式
  renderFooterDefault = (renderInfo: ModalRenderInfo) => {
    const { confirmText, onConfirm, cancelText, onCancel } = this.props;
    const {
      footerDefaultBtnConfirmProps,
      footerDefaultBtnCancelProps,
      footerDefaultWrapStyle,
      footerDefaultTxtConfirmProps,
      footerDefaultTxtCancelProps,
    } = renderInfo;

    return (
      <View style={footerDefaultWrapStyle}>
        {cancelText ? (
          <View {...footerDefaultBtnConfirmProps} onClick={onCancel}>
            {isValidElement(cancelText) ? cancelText : <HiText {...footerDefaultTxtCancelProps}>{cancelText}</HiText>}
          </View>
        ) : null}
        {cancelText && confirmText ? <Divider color={'rgba(0, 0, 0, 0.1)'} vertical={true} /> : null}
        {confirmText ? (
          <View {...footerDefaultBtnCancelProps} onClick={onConfirm}>
            {isValidElement(confirmText) ? (
              confirmText
            ) : (
              <HiText {...footerDefaultTxtConfirmProps}>{confirmText}</HiText>
            )}
          </View>
        ) : null}
      </View>
    );
  };

  // 渲染底部按钮组-按钮样式
  renderFooterPrimary = (renderInfo: ModalRenderInfo) => {
    const { confirmText, onConfirm, cancelText, onCancel } = this.props;
    const { footerPrimaryBtnCancelProps, footerPrimaryWrapStyle, footerPrimaryBtnConfirmProps } = renderInfo;

    return (
      <View style={footerPrimaryWrapStyle}>
        {isValidElement(confirmText) ? (
          confirmText
        ) : confirmText ? (
          <Button {...footerPrimaryBtnConfirmProps} onPress={onConfirm}>
            {confirmText}
          </Button>
        ) : null}
        {isValidElement(cancelText) ? (
          cancelText
        ) : cancelText ? (
          <Button {...footerPrimaryBtnCancelProps} onPress={onCancel}>
            {cancelText}
          </Button>
        ) : null}
      </View>
    );
  };

  // 渲染底部按钮组-上下样式
  renderFooterVertical = (renderInfo: ModalRenderInfo) => {
    const { confirmText, onConfirm, cancelText, onCancel } = this.props;
    const {
      footerVerticalWrapStyle,
      footerVerticalBtnCancelProps,
      footerVerticalBtnConfirmProps,
      footerVerticalTxtConfirmProps,
      footerVerticalTxtCancelProps,
    } = renderInfo;

    return (
      <View style={footerVerticalWrapStyle}>
        {confirmText ? (
          <View {...footerVerticalBtnConfirmProps} onClick={onConfirm}>
            {isValidElement(confirmText) ? (
              confirmText
            ) : (
              <HiText {...footerVerticalTxtConfirmProps}>{confirmText}</HiText>
            )}
          </View>
        ) : null}
        {cancelText ? (
          <View {...footerVerticalBtnCancelProps} onClick={onCancel}>
            {isValidElement(cancelText) ? cancelText : <HiText {...footerVerticalTxtCancelProps}>{cancelText}</HiText>}
          </View>
        ) : null}
      </View>
    );
  };

  render() {
    return (
      <Consumer>
        {(consumerValue) => {
          const { header, children, btnType, onCancel, onClose = onCancel, onPress = onClose } = this.props;
          const renderInfo = getRenderInfo({
            consumerValue,
            props: this.props,
          });
          const { maskStyle, modalProps, title, content, closeIcon } = renderInfo;
          return (
            <Mask style={maskStyle} onClick={onPress}>
              <View {...modalProps}>
                {header}
                {title}
                {content}
                {children}
                {btnType === ModalBtnType.primary
                  ? this.renderFooterPrimary(renderInfo)
                  : btnType === ModalBtnType.vertical
                    ? this.renderFooterVertical(renderInfo)
                    : this.renderFooterDefault(renderInfo)}
                {closeIcon}
              </View>
            </Mask>
          );
        }}
      </Consumer>
    );
  }
}

export default Modal;
