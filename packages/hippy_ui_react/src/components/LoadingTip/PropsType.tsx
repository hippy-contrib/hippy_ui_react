import { ReactNode } from 'react';
import { TextStyle, GenericStyleProp } from '@hippy/react';
import { LoadingProps } from '../Loading/PropsType';
import { EmptyProps } from '../Empty/PropsType';

export enum LoadingTipStatus {
  error = -1,
  ready = 0,
  loading = 1,
  finish = 2,
}

export interface LoadingTipProps {
  /** 加载状态：LoadingTip.status */
  status: LoadingTipStatus;
  /** 是否已有数据（没有会显示Empty组件） */
  hasData: number | boolean | undefined | null;
  /** 点击事件 */
  onPress?: () => void;
  /** 文案：空数据 */
  txtEmpty?: ReactNode;
  /** 文案：加载完成 */
  txtFinish?: ReactNode;
  /** 文案：加载异常 */
  txtError?: ReactNode;
  /** 文案：加载更多 */
  txtMore?: ReactNode;
  /** 文案：加载中 */
  txtLoading?: ReactNode;
  /** 自定义Loading */
  loadingProps?: LoadingProps;
  /** 自定义Empty */
  emptyProps?: EmptyProps;
  /** 文本样式 */
  textStyle?: GenericStyleProp<TextStyle>;
}
