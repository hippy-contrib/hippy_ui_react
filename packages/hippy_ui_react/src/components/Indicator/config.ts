import { PropsWithChildren, ReactNode } from 'react';
import { ViewProps } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { IndicatorProps } from './PropsType';

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

/**
 * Indicator 组件
 */
export const indicatorConfig: ThemeConfigIndicator = {
  indicatorWrapProps: {
    style: {
      height: 25,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  indicatorItemProps: {
    style: {
      width: 4,
      height: 3,
      borderRadius: 1.5,
      marginHorizontal: 4,
    },
  },
  indicatorActiveProps: {
    style: {
      width: 8,
    },
  },
};
