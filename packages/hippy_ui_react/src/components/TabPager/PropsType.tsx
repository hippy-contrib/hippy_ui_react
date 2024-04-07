import { ReactElement } from 'react';
import { ViewPagerProps } from '@hippy/react';
import { TabsProps, TabValue } from '../Tabs/PropsType';

export interface TabPagerData {
  name: TabValue | string;
  page: ReactElement;
}

export interface TabPagerProps {
  /** 页面列表 */
  data: TabPagerData[];
  /** 页面变更回调 */
  onChange?: (index: number) => void;
  /** 选中页码 */
  activeIndex?: number;
  /** tabs属性设置 */
  tabsProps?: TabsProps;
  /** pager属性设置 */
  pagerProps?: ViewPagerProps;
}

export interface TabPagerState {
  activeIndex: number;
}
