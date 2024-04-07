import { PropsWithChildren, ReactNode } from 'react';
import { ViewProps } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { LoadingProps } from '../../components/Loading/PropsType';
import { LoadingGifProps } from '../../components/LoadingGif/PropsType';
import { HiTextProps } from '../../components/HiText/PropsType';

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
