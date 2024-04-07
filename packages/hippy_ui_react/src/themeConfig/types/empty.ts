import { PropsWithChildren, ReactNode } from 'react';
import { ViewProps, ImageProps } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { HiTextProps } from '../../components/HiText/PropsType';
import { EmptyProps } from '../../components/Empty/PropsType';

/** 主题配置：空状态 */
export interface ThemeConfigEmpty {
  emptyWrap: ViewProps;
  emptyImg: ImageProps;
  emptyText: HiTextProps;
}

/** 自定义渲染：空状态 */
export interface EmptyRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<EmptyProps>;
}
export interface EmptyRenderInfo {
  wrapProps: ViewProps;
  img: ReactNode;
  text: ReactNode;
}
export type RenderInfoEmpty = (params: EmptyRenderParams & { defaultRenderInfo: EmptyRenderInfo }) => EmptyRenderInfo;
