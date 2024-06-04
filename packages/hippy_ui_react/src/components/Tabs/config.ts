import { PropsWithChildren, ReactNode } from 'react';
import { ViewProps, ScrollViewProps, ViewStyle } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { TabsProps, TabsState } from './PropsType';
import { BadgeProps } from '../Badge/PropsType';

/** 主题配置：标签页 */
export interface ThemeConfigTabs {
  tabsProps: ScrollViewProps;
  tabsItemStartStyle: ViewStyle;
  tabsItemEndStyle: ViewStyle;
  tabsItemProps: ViewProps;
  tabsItemActiveProps: ViewProps;
  tabsUnderlineProps: ViewProps;
  tabsBadgeProps: BadgeProps;
}

/** 自定义渲染：标签页 */
export interface TabsRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<TabsProps>;
  state: TabsState;
}
export interface TabsRenderInfo {
  wrapProps: ScrollViewProps;
  itemPropsList: ViewProps[];
  badgeList: Array<{ index: number; view: ReactNode }>;
  underline: (index: number) => ReactNode;
}
export type RenderInfoTabs = (params: TabsRenderParams & { defaultRenderInfo: TabsRenderInfo }) => TabsRenderInfo;

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
