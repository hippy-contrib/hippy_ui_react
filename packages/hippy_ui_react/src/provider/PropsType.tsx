import { createContext, ReactElement, ReactNode } from 'react';
import { ThemeMode } from '../themeConfig';
import { getThemeConfigFunction, RenderInfoFunc, ThemeConfig } from '../themeConfig/index';
import { ViewProps } from '@hippy/react';

/** Provider */
export interface ProviderValue {
  /** 主题模式：亮/暗 */
  theme: ThemeMode;
  /** 自定义主题配置 */
  themeConfigFunc?: getThemeConfigFunction;
  /** 自定义渲染 */
  renderInfo?: Partial<RenderInfoFunc>;
}
export type ProviderProps = Partial<
  ProviderValue & {
    /** 不使用容器（过渡渲染优化，根节点不可使用此配置） */
    noWrap: boolean;
    /** 不监听全局节点插入（避免多处使用） */
    noGlobalView: boolean;
  }
> &
  ViewProps;
export interface ProviderState {
  globalViews: UpdateGlobalViewData;
}

/** Consumer */
export type ConsumerValue = Omit<ProviderValue, 'themeConfigFunc'> & { themeConfig: ThemeConfig };
export interface ConsumerProps {
  children: (value: ConsumerValue) => ReactNode;
  theme?: ThemeMode | undefined;
}

/** 获取 Provider 值 */
export function getProviderValue(props: ProviderProps): ProviderValue {
  const { theme = ThemeMode.light, themeConfigFunc, renderInfo } = props;
  return {
    theme,
    themeConfigFunc,
    renderInfo,
  };
}

export const HippyReactUIContext = createContext(getProviderValue({}));

export interface GlobalViewData {
  /** 渲染视图 */
  view: ReactElement;
  /** 监听系统后退事件，关闭弹窗（返回true拦截系统后退） */
  onBackToClose?: () => boolean;
}

export type UpdateGlobalViewData = Record<
  string,
  {
    /** 序号，越大越往后排 */
    order?: number;
    data: GlobalViewData[];
  }
>;
