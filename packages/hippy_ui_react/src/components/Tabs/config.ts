import { PropsWithChildren, ReactNode } from 'react';
import { ViewProps, ScrollViewProps, ViewStyle, TextStyle } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { TabsProps, TabsState, TabsLevel } from './PropsType';
import { BadgeProps } from '../Badge/PropsType';
import { hiTextConfig } from '../HiText/config';
import { transferStyle } from '../../utils/Styles';

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

/** 标签页层级样式预设（default 不录入 → 走默认 tabsConfig，保留原实现） */
export interface TabsLevelStyle {
  /** tab item 基础样式覆盖 */
  itemStyle: ViewStyle;
  /** 选中态样式 */
  activeStyle: TextStyle;
  /** 首项左间距 */
  tabsItemStartStyle: ViewStyle;
  /** 尾项右间距 */
  tabsItemEndStyle: ViewStyle;
  /** 下划线样式覆盖（二级） */
  underlineStyle?: ViewStyle;
  /** 是否默认显示下划线 */
  showUnderline?: boolean;
}

export const tabsLevelStyleMap: Partial<Record<TabsLevel, TabsLevelStyle>> = {
  [TabsLevel.secondary]: {
    // 二级 tabs：字号 16、行高 20、选中 Semibold、padding 撑开间距、黑色短下划线（文字宽度一半）
    itemStyle: {
      height: 24.5,
      lineHeight: 20,
      fontSize: 16,
      paddingLeft: 8,
      paddingRight: 8,
      fontWeight: hiTextConfig.hiTextWeightRegular,
    },
    activeStyle: { fontWeight: hiTextConfig.hiTextWeightBold, fontSize: 16 },
    tabsItemStartStyle: { paddingLeft: 16 },
    tabsItemEndStyle: { paddingRight: 16 },
    underlineStyle: { height: 1.5, borderRadius: 4.5 },
    showUnderline: true,
  },
  [TabsLevel.tertiary]: {
    // 三级 tabs：字号 14、行高 20、选中 Semibold、padding 撑开间距、无下划线
    itemStyle: {
      height: 20,
      lineHeight: 20,
      fontSize: 14,
      paddingLeft: 8,
      paddingRight: 8,
      fontWeight: hiTextConfig.hiTextWeightRegular,
    },
    activeStyle: { fontWeight: hiTextConfig.hiTextWeightBold, fontSize: 16 },
    tabsItemStartStyle: { paddingLeft: 16 },
    tabsItemEndStyle: { paddingRight: 16 },
    showUnderline: false,
  },
};

type TabsThemeConfig = ConsumerValue['themeConfig'] & ThemeConfigTabs;

/**
 * 将层级预设合并进 themeConfig，返回带层级覆盖的配置。
 * 合并后 renderInfo 直接读取 themeConfig.* 即可，无需逐处判断 level。
 */
export function applyTabsLevel(config: TabsThemeConfig, level?: TabsLevel): TabsThemeConfig {
  const levelStyle = level ? tabsLevelStyleMap[level] : undefined;
  if (!levelStyle) return config;
  return {
    ...config,
    tabsItemProps: {
      ...config.tabsItemProps,
      style: transferStyle([config.tabsItemProps.style, levelStyle.itemStyle]),
    },
    tabsItemStartStyle: levelStyle.tabsItemStartStyle ?? config.tabsItemStartStyle,
    tabsItemEndStyle: levelStyle.tabsItemEndStyle ?? config.tabsItemEndStyle,
    tabsItemActiveProps: {
      ...config.tabsItemActiveProps,
      // 选中态：用层级字重 + 字号不放大（覆盖默认 fontSize 17）
      style: transferStyle([config.tabsItemActiveProps.style, levelStyle.activeStyle]),
    },
    tabsUnderlineProps: levelStyle.underlineStyle
      ? {
          ...config.tabsUnderlineProps,
          // 二级下划线用文字色（黑/暗色白）
          style: transferStyle([
            config.tabsUnderlineProps.style,
            { backgroundColor: config.colorTextBase },
            levelStyle.underlineStyle,
          ]),
        }
      : config.tabsUnderlineProps,
  };
}
