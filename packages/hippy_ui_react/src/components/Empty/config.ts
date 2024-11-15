import { PropsWithChildren, ReactNode } from 'react';
import { ViewProps, ImageProps } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { HiTextProps } from '../HiText/PropsType';
import { EmptyProps } from './PropsType';

/** 主题配置：空状态 */
export interface ThemeConfigEmpty {
  emptyWrap: ViewProps;
  emptyImg: ImageProps;
  emptyText: HiTextProps;
  emptyTxtDesc: ReactNode;
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

/**
 * Empty 组件
 */
export const emptyConfig: ThemeConfigEmpty = {
  emptyWrap: {
    style: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  emptyImg: {
    source: {
      uri: 'data:image/png;base64,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',
    },
    style: {
      width: 200,
      height: 200,
      backgroundColor: 'transparent',
    },
  },
  emptyText: {
    style: {
      marginTop: 15,
    },
  },
  emptyTxtDesc: '数据为空',
};
