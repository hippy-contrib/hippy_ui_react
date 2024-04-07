import { PropsWithChildren, ReactNode } from 'react';
import { ViewProps, ScrollViewProps, ViewStyle } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { TabsProps, TabsState } from '../../components/Tabs/PropsType';
import { BadgeProps } from '../../components/Badge/PropsType';

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
