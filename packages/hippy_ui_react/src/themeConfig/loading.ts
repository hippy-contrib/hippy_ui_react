import { ThemeConfigLoading } from './types/loading';

/**
 * Loading 组件
 */
export const loadingConfig: ThemeConfigLoading = {
  loadingProps: {
    style: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
    },
  },
  loadingPreGifProps: {
    style: {
      marginRight: 6,
    },
  },
  loadingTextProps: {
    size: 12,
  },
};
