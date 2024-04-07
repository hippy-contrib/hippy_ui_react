import { getThemeConfigFunction, ThemeConfig } from './types';
import { extendObj } from '../utils/Utils';
import { colorConfigLight, colorConfigDark } from './color';
import { buttonConfig } from './button';
import { emptyConfig } from './empty';
import { hiTextConfig } from './hiText';
import { radioConfig } from './radio';
import { switchConfig } from './switch';
import { toastConfig } from './toast';
import { zIndexConfig } from './zIndex';
import { maskConfig } from './mask';
import { popupConfig } from './popup';
import { uImageConfig } from './uImage';
import { loadingConfig } from './loading';
import { loadingGifConfig } from './loadingGif';
import { dividerConfig } from './divider';
import { searchConfig } from './search';
import { indicatorConfig } from './indicator';
import { tabsConfig } from './tabs';
import { tagConfig } from './tag';
import { tableConfig } from './table';
import { sliderConfig } from './slider';
import { marqueeConfig } from './marquee';
import { badgeConfig } from './badge';
import { navigatorConfig } from './navigator';
import { modalConfig } from './modal';
import { cascaderConfig } from './cascader';
import { commonConfig } from './common';
import { listItemConfig } from './listItem';

/** 主题模式 */
export enum ThemeMode {
  light = 'light',
  dark = 'dark',
}

/**
 * 默认主题配置
 */
export const defaultThemeConfig: ThemeConfig = {
  ...zIndexConfig,
  ...colorConfigLight,
  ...buttonConfig,
  ...switchConfig,
  ...hiTextConfig,
  ...toastConfig,
  ...radioConfig,
  ...emptyConfig,
  ...maskConfig,
  ...popupConfig,
  ...uImageConfig,
  ...listItemConfig,
  ...loadingConfig,
  ...loadingGifConfig,
  ...dividerConfig,
  ...searchConfig,
  ...indicatorConfig,
  ...tabsConfig,
  ...tagConfig,
  ...tableConfig,
  ...sliderConfig,
  ...marqueeConfig,
  ...badgeConfig,
  ...navigatorConfig,
  ...modalConfig,
  ...cascaderConfig,
  ...commonConfig,
};
/**
 * 使用主题配置
 */
export function useTheme(theme?: ThemeMode): ThemeConfig {
  return extendObj(defaultThemeConfig, theme === ThemeMode.dark ? colorConfigDark : colorConfigLight);
}
/**
 * 获取主题配置
 */
export const getThemeConfig = (params: {
  theme?: ThemeMode;
  themeConfigFunc?: getThemeConfigFunction;
}): ThemeConfig => {
  const { theme = ThemeMode.light, themeConfigFunc } = params;
  const config = useTheme(theme);
  return themeConfigFunc?.({ theme, defaultConfig: config }) ?? config;
};
