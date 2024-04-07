import { PropsWithChildren } from 'react';
import { ViewProps } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { DividerProps } from '../../components/Divider/PropsType';

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
