import { ThemeConfigTabs } from './types/tabs';

/**
 * Tabs 组件
 */
export const tabsConfig: ThemeConfigTabs = {
  tabsProps: {
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    style: {
      flex: 0,
      flexGrow: 0,
    },
  },
  tabsItemStartStyle: {
    paddingLeft: 18,
  },
  tabsItemEndStyle: {
    paddingRight: 18,
  },
  tabsItemProps: {
    style: {
      cursor: 'pointer',
      flexDirection: 'row',
      height: 30,
      lineHeight: 30,
      paddingLeft: 9,
      paddingRight: 9,
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 16,
    },
  },
  tabsItemActiveProps: {
    style: {
      fontSize: 17,
    },
  },
  tabsUnderlineProps: {
    style: {
      height: 3,
      borderRadius: 1.5,
      width: 15,
      position: 'absolute',
      alignSelf: 'center',
      bottom: 1,
    },
  },
  tabsBadgeProps: {
    style: {
      marginLeft: 0,
      marginBottom: 15,
    },
  },
};
