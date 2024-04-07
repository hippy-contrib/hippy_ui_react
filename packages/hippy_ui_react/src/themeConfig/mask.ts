import { ThemeConfigMask } from './types/mask';
import { ViewStyle } from '@hippy/react';
import { UtilStyles } from '../utils/Styles';

/**
 * Mask 组件
 */
export const maskConfig: ThemeConfigMask = {
  maskProps: {
    style: {
      ...(UtilStyles.mask as ViewStyle),
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  },
};
