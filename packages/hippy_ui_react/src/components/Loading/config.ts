import { PropsWithChildren, ReactNode } from 'react';
import { ViewProps } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { LoadingProps } from './PropsType';
import { LoadingGifProps } from '../LoadingGif/PropsType';
import { HiTextProps } from '../HiText/PropsType';

/** 主题配置：加载中 */
export interface ThemeConfigLoading {
  loadingProps: ViewProps;
  loadingPreGifProps: LoadingGifProps;
  loadingTextProps: HiTextProps;
}

/** 自定义渲染：加载中 */
export interface LoadingRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<LoadingProps>;
}
export interface LoadingRenderInfo {
  loadingProps: ViewProps;
  gif: ReactNode;
  txt: ReactNode;
}
export type RenderInfoLoading = (
  params: LoadingRenderParams & { defaultRenderInfo: LoadingRenderInfo },
) => LoadingRenderInfo;

/**
 * Loading 组件
 */
export const loadingConfig: ThemeConfigLoading = {
  loadingProps: {
    style: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
    },
  },
  loadingPreGifProps: {
    style: {
      marginRight: 6,
    },
  },
  loadingTextProps: {
    size: 12,
  },
};
