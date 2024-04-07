import { ReactNode } from 'react';

export interface ToastProps {
  /** 是否显示 */
  isShow?: boolean;
  /** 显示文字内容 */
  text: string | ReactNode;
  /** 显示时长，若为0，则表示不自动隐藏 */
  duration?: number;
  /** 是否穿透, none为允许穿透， 默认穿透 */
  pointerEvents?: 'none' | 'auto';
  /** 收起Toast的回调 */
  onHide?: () => void;
  /** 子节点 */
  children?: ReactNode;
}

export interface ToastState {
  isShow: boolean;
}

/**
 * 注册 Provider globalView 的key：Toast
 * */
export const GLOBAL_VIEW_KEY_TOAST = 'HRUToast';
