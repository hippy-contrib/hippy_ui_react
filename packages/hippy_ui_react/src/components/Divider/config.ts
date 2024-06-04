import { PropsWithChildren } from 'react';
import { ViewProps, PixelRatio } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { DividerProps } from './PropsType';

/** 主题配置：分割线 */
export interface ThemeConfigDivider {
  dividerProps: ViewProps;
  dividerWidth: number;
}

/** 自定义渲染：分割线 */
export interface DividerRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<DividerProps>;
}
export interface DividerRenderInfo {
  dividerProps: ViewProps;
}
export type RenderInfoDivider = (
  params: DividerRenderParams & { defaultRenderInfo: DividerRenderInfo },
) => DividerRenderInfo;

/**
 * Divider 组件
 */
export const dividerConfig: ThemeConfigDivider = {
  dividerProps: {
    style: {
      backgroundColor: '#F2F2F6',
    },
  },
  dividerWidth: 1 / PixelRatio.get(),
};
