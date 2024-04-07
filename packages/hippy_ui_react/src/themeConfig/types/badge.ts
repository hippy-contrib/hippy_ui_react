import { PropsWithChildren, ReactNode } from 'react';
import { ViewProps, ViewStyleProp } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { BadgeProps } from '../../components/Badge/PropsType';
import { HiTextProps } from '../../components/HiText/PropsType';

/** 主题配置：红点 */
export interface ThemeConfigBadge {
  badgeStyle: ViewStyleProp;
  badgeWithTxtStyle: ViewStyleProp;
  badgeWithTxtOneStyle: ViewStyleProp;
  badgeWithChildrenStyle: ViewStyleProp;
  badgeTxtWithChildrenStyle: ViewStyleProp;
  badgeTxtProps: HiTextProps;
  badgeWrapProps: ViewProps;
}

/** 自定义渲染：红点 */
export interface BadgeRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<BadgeProps>;
}
export interface BadgeRenderInfo {
  badgeProps: ViewProps;
  badgeText: ReactNode;
  wrapProps: ViewProps;
}
export type RenderInfoBadge = (params: BadgeRenderParams & { defaultRenderInfo: BadgeRenderInfo }) => BadgeRenderInfo;
