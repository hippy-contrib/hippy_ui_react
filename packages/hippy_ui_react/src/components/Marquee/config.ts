import { PropsWithChildren } from 'react';
import { ScrollViewProps, ViewProps } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { MarqueeProps } from './PropsType';

/** 主题配置：滚动播放 */
export interface ThemeConfigMarquee {
  marqueeVerticalProps: ViewProps;
  marqueeVerticalContentProps: ViewProps;
  marqueeHorizontalProps: ScrollViewProps;
  marqueeHorizontalContentProps: ViewProps;
}

/** 自定义渲染：滚动播放 */
export interface MarqueeRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<MarqueeProps>;
  shouldLoop: boolean;
}
export interface MarqueeRenderInfo {
  verticalWrapProps: ViewProps;
  verticalContentProps: ViewProps;
  horizontalWrapProps: ScrollViewProps;
  horizontalContentProps: ViewProps;
}
export type RenderInfoMarquee = (
  params: MarqueeRenderParams & { defaultRenderInfo: MarqueeRenderInfo },
) => MarqueeRenderInfo;

/**
 * Marquee 组件
 */
export const marqueeConfig: ThemeConfigMarquee = {
  marqueeVerticalProps: {
    style: {
      overflow: 'hidden',
    },
  },
  marqueeVerticalContentProps: {
    style: {
      overflow: 'visible',
    },
  },
  marqueeHorizontalProps: {
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    scrollEnabled: false,
    style: {
      flexDirection: 'row',
    },
  },
  marqueeHorizontalContentProps: {
    style: {
      overflow: 'visible',
      flexDirection: 'row',
      flexShrink: 0,
    },
  },
};
