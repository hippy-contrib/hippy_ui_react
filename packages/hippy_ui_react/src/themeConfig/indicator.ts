import { ThemeConfigIndicator } from './types/indicator';

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
