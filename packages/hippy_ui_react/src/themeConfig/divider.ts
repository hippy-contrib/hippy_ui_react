import { ThemeConfigDivider } from './types/divider';
import { PixelRatio } from '@hippy/react';

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
