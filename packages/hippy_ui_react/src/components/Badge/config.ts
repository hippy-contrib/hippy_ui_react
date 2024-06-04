import { PropsWithChildren, ReactNode } from 'react';
import { ViewProps, ViewStyleProp, PixelRatio } from '@hippy/react';
import { BadgeProps } from './PropsType';
import { HiTextProps } from '../HiText/PropsType';
import { ConsumerValue } from '../../provider/PropsType';
import { isWeb } from '../../utils/Utils';

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

/**
 * Badge 组件
 */
export const badgeConfig: ThemeConfigBadge = {
  badgeStyle: {
    borderColor: 'rgba(42,42,42,0.05)',
    borderWidth: isWeb() ? ('scaleY(0.5)' as any) : 1 / PixelRatio.get(),
    backgroundColor: '#FF6A6A',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: 4,
    height: 4,
  },
  badgeWithTxtStyle: {
    width: undefined,
    paddingHorizontal: 3,
    height: 14,
  },
  badgeWithTxtOneStyle: {
    width: 14,
    height: 14,
  },
  badgeWithChildrenStyle: {
    marginLeft: -2,
    top: -2,
  },
  badgeTxtWithChildrenStyle: {
    marginLeft: 0,
    top: -7,
  },
  badgeTxtProps: {
    style: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 10,
      textAlign: 'center',
    },
  },
  badgeWrapProps: {
    style: {
      flexDirection: 'row',
      overflow: 'visible',
    },
  },
};
