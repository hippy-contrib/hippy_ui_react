import { ReactNode } from 'react';

/** 主题配置：加载提示 */
export interface ThemeConfigLoadingTip {
  loadingTipTxtEmpty: ReactNode;
  loadingTipTxtLoading: ReactNode;
  loadingTipTxtFinish: ReactNode;
  loadingTipTxtError: ReactNode;
  loadingTipTxtMore: ReactNode;
}

/**
 * LoadingTip 组件
 */
export const loadingTipConfig: ThemeConfigLoadingTip = {
  loadingTipTxtEmpty: '数据为空',
  loadingTipTxtLoading: '加载中',
  loadingTipTxtFinish: '加载完成',
  loadingTipTxtError: '加载异常',
  loadingTipTxtMore: '加载更多',
};
