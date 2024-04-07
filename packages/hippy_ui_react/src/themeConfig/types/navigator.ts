import { PropsWithChildren, ReactNode } from 'react';
import { ViewStyleProp, ImageProps } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { NavigatorProps } from '../../components/Navigator/PropsType';
import { HiTextProps } from '../../components/HiText/PropsType';

/** 主题配置：导航栏 */
export interface ThemeConfigNavigator {
  navigatorBackPropsFn: (params: NavigatorRenderParams) => ImageProps;
  navigatorStyle: ViewStyleProp;
  navigatorTitlePropsFn: (params: NavigatorRenderParams) => HiTextProps;
  navigatorStatusBarStyle: ViewStyleProp;
  navigatorWrapStyle: ViewStyleProp;
}

/** 自定义渲染：导航栏 */
export interface NavigatorRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<NavigatorProps>;
}
export interface NavigatorRenderInfo {
  wrapStyle: ViewStyleProp;
  statusBarStyle: ViewStyleProp;
  navigatorStyle: ViewStyleProp;
  back: ReactNode;
  title: ReactNode;
}
export type RenderInfoNavigator = (
  params: NavigatorRenderParams & { defaultRenderInfo: NavigatorRenderInfo },
) => NavigatorRenderInfo;
