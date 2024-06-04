import React, { PropsWithChildren, ReactNode } from 'react';
import { ViewProps, ViewStyleProp, Image, PixelRatio } from '@hippy/react';
import { ThemeMode } from '../../themeConfig/index';
import { ConsumerValue } from '../../provider/PropsType';
import { WINDOW_WIDTH } from '../../utils/Dimensions';
import { ModalProps, ModalCloseType } from './PropsType';
import { HiTextProps, HiTextWeight, HiTextColor } from '../HiText/PropsType';
import { ButtonProps, ButtonType } from '../Button/PropsType';

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

/**
 * Modal 组件
 */
export const modalConfig: ThemeConfigModal = {
  modalProps: {
    onClick: () => {},
    style: {
      overflow: 'hidden',
      borderRadius: 15,
      width: Math.min(295, WINDOW_WIDTH() - 80),
    },
  },
  modalMaskStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitleProps: {
    size: 17,
    weight: HiTextWeight.bold,
    style: {
      textAlign: 'center',
    },
  },
  modalContentProps: {
    size: 14,
    style: {
      marginHorizontal: 22,
    },
  },
  modalCloseIconFn: (params) => {
    const {
      consumerValue: { theme },
      props: { closeType, onCancel, onClose = onCancel },
    } = params;

    const WHITE_CLOSE =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAxCAYAAABznEEcAAAAAXNSR0IArs4c6QAAAbxJREFUaEPtl+tNw0AQhGdoAEgFiMZIUkFEAxAKACogUFk6IHSwaC1HOizHd97bjVB0/mvt2t/M7D2IC3h4AQxoEP/FxeZEc8JRgRYnRzGrWjUnquRzLG5OOIpZ1ao5ISI3JH9qZNQeWl/Tx+yEiDwBeAagEBuSX3NhRGQJ4A3ANYAtye3cHp0AliKtEREZ1C7ngPQAu6SH9ltYHKmBOADoopA8RSAjANpiT/LeImoNhEYhVfL4/UmQEwDqwprk51kh+kjNAokAqJqJo2Infkxf/3EkCsAFosSRSAA3iAyI5lxjlz5VMzCcG/Ngjw3gRLTCAFydKJiRzrCaVejUyuXqRAKiEXoY+eiO5NqyjE7VuENkIqVOrObs7CXArhAzZsIVxA1iAkAPhsNouTriApHbB0RkBeBjZJl1caQaIgeQDHsYSBVEKUA0iBlCRDTnw1Nndh+IiFYNxB7AXZLzLEDGkQPJRcmS6nbsEJFvALd9w2KACRAheXVuiA2A1/6O/Wi50PQzpXd1vWO/kHw/K4TlY1E15pmI+iFL3wZhUS2ipjkRoaqlZ3PColpETXMiQlVLz+aERbWImotw4hfj4dAyCJK5KQAAAABJRU5ErkJggg==';
    const BLACK_CLOSE =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAASUExURUdwTBAQEBAQEBAQEBAQEA0NDQK6mXAAAAAGdFJOUwCAMCBEGJBfGxUAAAB8SURBVDjLY2AYBVQDJgEQmtkJVZxJUAjCUBQ0QJFgERRUgCgQdECRYBaEaFEUFAxANUsRrIVJEGYkkiUgIUWoiehasGiAaMGmAawFmwawFqwawFqEGEiRwGkULstxOheXB3EGCa5AZEUEO9ERBY9aNEtUoCawOo9mDOoBAESADFsE/YJ/AAAAAElFTkSuQmCC';

    return closeType !== ModalCloseType.none ? (
      <Image
        onClick={onClose}
        source={{
          uri:
            closeType === ModalCloseType.white || (closeType === ModalCloseType.themeMode && theme === ThemeMode.dark)
              ? WHITE_CLOSE
              : BLACK_CLOSE,
        }}
        style={{
          width: 24,
          height: 24,
          backgroundColor: 'transparent',
          position: 'absolute',
          right: 11,
          top: 11,
        }}
        resizeMode="cover"
        accessible={true}
        accessibilityLabel={'关闭 按钮'}
      />
    ) : null;
  },
  modalFooterDefaultWrapStyle: {
    marginTop: 30,
    borderTopWidth: 1 / PixelRatio.get(),
    borderColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
  },
  modalFooterDefaultBtnConfirmProps: {
    accessible: true,
    style: {
      flex: 1,
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
    },
  },
  modalFooterDefaultBtnCancelProps: {
    accessible: true,
    style: {
      flex: 1,
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
    },
  },
  modalFooterDefaultTxtConfirmProps: {
    weight: HiTextWeight.bold,
    size: 16,
    color: HiTextColor.theme,
  },
  modalFooterDefaultTxtCancelProps: {
    size: 16,
  },
  modalFooterVerticalWrapStyle: {
    marginTop: 30,
  },
  modalFooterVerticalBtnConfirmProps: {
    accessible: true,
    style: {
      borderTopWidth: 1 / PixelRatio.get(),
      borderColor: 'rgba(0, 0, 0, 0.1)',
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
    },
  },
  modalFooterVerticalBtnCancelProps: {
    accessible: true,
    style: {
      borderTopWidth: 1 / PixelRatio.get(),
      borderColor: 'rgba(0, 0, 0, 0.1)',
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
    },
  },
  modalFooterPrimaryWrapStyle: {
    marginTop: 30,
    marginBottom: 30,
  },
  modalFooterPrimaryBtnConfirmProps: {
    type: ButtonType.primary,
    style: { marginHorizontal: 64 },
  },
  modalFooterPrimaryBtnCancelProps: {
    type: ButtonType.default,
    style: { marginHorizontal: 64 },
  },
  modalFooterVerticalTxtConfirmProps: {
    color: HiTextColor.theme,
    weight: HiTextWeight.bold,
    size: 16,
  },
  modalFooterVerticalTxtCancelProps: {
    size: 16,
  },
};
