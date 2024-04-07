import { ReactNode } from 'react';
import { ViewStyleProp } from '@hippy/react';

export enum ModalBtnType {
  default = 'default',
  primary = 'primary',
  vertical = 'vertical',
}

export enum ModalCloseType {
  none = 'none',
  white = 'white',
  black = 'black',
  themeMode = 'themeMode',
}

export interface ModalProps {
  /** 按钮类型 "primary" | "default" | "vertical" */
  btnType?: ModalBtnType;
  /** 标题 */
  title?: string | ReactNode;
  /** 内容 */
  content?: string | ReactNode;
  /** 确认按钮的文本 */
  confirmText?: string | ReactNode;
  /**	取消按钮的文本 */
  cancelText?: string | ReactNode;
  /** 窗口样式 */
  style?: ViewStyleProp;
  /** 蒙层样式 */
  maskStyle?: ViewStyleProp;
  /** 右上角关闭按钮类型 */
  closeType?: ModalCloseType;
  /** 点击右上角关闭按钮触发事件（不设置的话会用onCancel） */
  onClose?: () => void;
  /** 整个组件的点击事件，可添加关闭弹层事件（不设置的话会用onClose或onCancel） */
  onPress?: () => void;
  /** 点击取消按钮触发的事件 */
  onCancel?: () => void;
  /** 点击确认按钮触发的事件 */
  onConfirm?: (e?: any) => void;
  /** 头部运营区 */
  header?: ReactNode;
  /** 填充内容 */
  children?: ReactNode | undefined;
}

/**
 * 注册 Provider globalView 的key：Modal
 * */
export const GLOBAL_VIEW_KEY_MODAL = 'HRUModal';
