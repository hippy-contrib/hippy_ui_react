import React, { isValidElement } from 'react';
import { View, ViewStyle } from '@hippy/react';
import { TabsRenderParams, TabsRenderInfo, tabsConfig, applyTabsLevel } from './config';
import { transferStyle, UtilStyles } from '../../utils/Styles';
import Badge from '../Badge';
import Tabs from './index';

/** Tabs：获取渲染信息 */
export default function getRenderInfo(params: TabsRenderParams): TabsRenderInfo {
  const {
    consumerValue: { renderInfo, themeConfig: _themeConfig },
    state: { activeIndex, itemWidths },
    props: {
      values,
      style,
      level,
      itemStyleFn,
      activeStyleFn,
      underlineStyleFn,
      badgeList,
      initialContentOffset,
      onClick,
      onScroll,
    },
  } = params;

  // 层级预设一次性合并进 themeConfig，后续直接读 themeConfig.*
  const themeConfig = applyTabsLevel({ ...tabsConfig, ..._themeConfig }, level);
  // 结果
  const result: TabsRenderInfo = {
    wrapProps: {
      ...themeConfig.tabsProps,
      initialContentOffset,
      style: transferStyle([themeConfig.tabsProps.style, style]),
      onClick,
      onScroll,
    },
    itemPropsList: values.map((v, i) => {
      const isActive = activeIndex === i;
      const activeProps = isActive ? themeConfig.tabsItemActiveProps : null;
      return {
        ...themeConfig.tabsItemProps,
        ...activeProps,
        accessible: true,
        accessibilityLabel:
          (isActive && values.length > 1 ? `${themeConfig.commonTxtChecked} ` : '') +
          Tabs.getTabInfo(v).text +
          (values.length > 1 ? ` ${themeConfig.commonTxtBtn}` : ''),
        style: transferStyle([
          { color: themeConfig.colorTextSecondary, fontWeight: themeConfig.hiTextWeightRegular },
          themeConfig.tabsItemProps.style,
          i === 0 && themeConfig.tabsItemStartStyle,
          i === values.length - 1 && themeConfig.tabsItemEndStyle,
          itemStyleFn?.(i),
          isActive && {
            color: themeConfig.colorTextBase,
            fontWeight: themeConfig.hiTextWeightMedium,
          },
          isActive && themeConfig.tabsItemActiveProps.style,
          isActive && activeStyleFn?.(i),
        ]),
      };
    }),
    badgeList: badgeList
      ? badgeList.map((v) => {
          return {
            index: v.index,
            view: isValidElement(v.view) ? (
              v.view
            ) : (
              <Badge
                {...themeConfig.tabsBadgeProps}
                {...v.badgeProps}
                style={transferStyle([themeConfig.tabsBadgeProps.style, v.badgeProps?.style])}
              />
            ),
          };
        })
      : [],
    underline: (index: number) => {
      const itemStyle: ViewStyle = result.itemPropsList[index].style;
      const padLeft = Number(itemStyle.paddingLeft) || 0;
      const padRight = Number(itemStyle.paddingRight) || 0;
      // 二级下划线宽度 = 文字宽度 × 比例 = (item 实测宽度 - 左右 padding) × ratio
      const itemWidth = itemWidths?.[index];
      const widthOverride = itemWidth != null ? { width: (itemWidth - padLeft - padRight) * 0.5 } : null;
      return (
        <View style={[UtilStyles.mask, { marginLeft: padLeft - padRight }]}>
          <View
            {...themeConfig.tabsUnderlineProps}
            style={transferStyle([
              { backgroundColor: themeConfig.colorTheme },
              themeConfig.tabsUnderlineProps.style,
              widthOverride,
              underlineStyleFn?.(index),
            ])}
          />
        </View>
      );
    },
  };

  return renderInfo?.tabs?.({ ...params, defaultRenderInfo: result }) || result;
}
