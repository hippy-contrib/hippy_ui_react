import { PropsWithChildren, ReactNode } from 'react';
import { ViewProps } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { IndicatorProps } from '../../components/Indicator/PropsType';

/** 主题配置：轮播页码 */
export interface ThemeConfigIndicator {
  indicatorWrapProps?: ViewProps;
  indicatorItemProps?: ViewProps;
  indicatorActiveProps?: ViewProps;
}

/** 自定义渲染：轮播页码 */
export interface IndicatorRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<IndicatorProps>;
}
export interface IndicatorRenderInfo {
  wrapProps: ViewProps;
  itemList: ReactNode[];
}
export type RenderInfoIndicator = (
  params: IndicatorRenderParams & { defaultRenderInfo: IndicatorRenderInfo },
) => IndicatorRenderInfo;
