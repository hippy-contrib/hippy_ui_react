import { ThemeConfigMarquee } from './types/marquee';

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
