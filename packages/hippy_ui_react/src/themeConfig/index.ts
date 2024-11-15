import { ThemeConfigCommon, commonConfig } from './common';
import { ThemeConfigColor, colorConfigLight, colorConfigDark } from './color';
import { ThemeConfigZIndex, zIndexConfig } from './zIndex';
import { RenderInfoButton, ThemeConfigButton } from '../components/Button/config';
import { RenderInfoHiText, ThemeConfigHiText } from '../components/HiText/config';
import { RenderInfoEmpty, ThemeConfigEmpty } from '../components/Empty/config';
import { RenderInfoRadio, ThemeConfigRadio } from '../components/Radio/config';
import { RenderInfoSwitch, ThemeConfigSwitch } from '../components/Switch/config';
import { RenderInfoToast, ThemeConfigToast } from '../components/Toast/config';
import { RenderInfoMask, ThemeConfigMask } from '../components/Mask/config';
import { RenderInfoPopup, ThemeConfigPopup } from '../components/Popup/config';
import { RenderInfoUImage, ThemeConfigUImage } from '../components/UImage/config';
import { RenderInfoListItem, ThemeConfigListItem } from '../components/ListItem/config';
import { ThemeConfigLoadingGif } from '../components/LoadingGif/config';
import { RenderInfoLoading, ThemeConfigLoading } from '../components/Loading/config';
import { ThemeConfigLoadingTip } from '../components/LoadingTip/config';
import { RenderInfoDivider, ThemeConfigDivider } from '../components/Divider/config';
import { RenderInfoSearch, ThemeConfigSearch } from '../components/Search/config';
import { RenderInfoIndicator, ThemeConfigIndicator } from '../components/Indicator/config';
import { ThemeConfigTabs, RenderInfoTabs } from '../components/Tabs/config';
import { RenderInfoTag, ThemeConfigTag } from '../components/Tag/config';
import { RenderInfoTable, RenderInfoTableCell, ThemeConfigTable } from '../components/Table/config';
import { ThemeConfigSlider, RenderInfoSlider } from '../components/Slider/config';
import { RenderInfoMarquee, ThemeConfigMarquee } from '../components/Marquee/config';
import { RenderInfoBadge, ThemeConfigBadge } from '../components/Badge/config';
import { RenderInfoNavigator, ThemeConfigNavigator } from '../components/Navigator/config';
import { RenderInfoModal, ThemeConfigModal } from '../components/Modal/config';
import { RenderInfoCascader, ThemeConfigCascader } from '../components/Cascader/config';
import { extendObj } from '../utils/Utils';

/** 主题模式 */
export enum ThemeMode {
  light = 'light',
  dark = 'dark',
}
/** 主题配置 */
export type ThemeConfig = ThemeConfigCommon &
  ThemeConfigColor &
  ThemeConfigZIndex &
  Partial<
    ThemeConfigButton &
      ThemeConfigSwitch &
      ThemeConfigHiText &
      ThemeConfigToast &
      ThemeConfigRadio &
      ThemeConfigEmpty &
      ThemeConfigMask &
      ThemeConfigPopup &
      ThemeConfigUImage &
      ThemeConfigListItem &
      ThemeConfigLoadingGif &
      ThemeConfigLoading &
      ThemeConfigLoadingTip &
      ThemeConfigDivider &
      ThemeConfigSearch &
      ThemeConfigIndicator &
      ThemeConfigTabs &
      ThemeConfigTag &
      ThemeConfigTable &
      ThemeConfigSlider &
      ThemeConfigMarquee &
      ThemeConfigBadge &
      ThemeConfigNavigator &
      ThemeConfigModal &
      ThemeConfigCascader
  > &
  Record<string, any>;

/**
 * 默认主题配置
 */
export const defaultThemeConfig: ThemeConfig = {
  ...commonConfig,
  ...zIndexConfig,
  ...colorConfigLight,
};

/**
 * 使用主题配置
 */
export function useTheme(theme?: ThemeMode): ThemeConfig {
  return extendObj(defaultThemeConfig, theme === ThemeMode.dark ? colorConfigDark : colorConfigLight);
}

/** 函数：自定义主题配置 */
export type getThemeConfigFunction = (params: { theme: ThemeMode; defaultConfig: ThemeConfig }) => ThemeConfig;

/** 自定义渲染 */
export interface RenderInfoFunc {
  button: RenderInfoButton;
  switch: RenderInfoSwitch;
  hiText: RenderInfoHiText;
  toast: RenderInfoToast;
  radio: RenderInfoRadio;
  empty: RenderInfoEmpty;
  mask: RenderInfoMask;
  popup: RenderInfoPopup;
  uImage: RenderInfoUImage;
  listItem: RenderInfoListItem;
  loading: RenderInfoLoading;
  divider: RenderInfoDivider;
  search: RenderInfoSearch;
  indicator: RenderInfoIndicator;
  tabs: RenderInfoTabs;
  table: RenderInfoTable;
  tableCell: RenderInfoTableCell;
  tag: RenderInfoTag;
  slider: RenderInfoSlider;
  marquee: RenderInfoMarquee;
  badge: RenderInfoBadge;
  navigator: RenderInfoNavigator;
  modal: RenderInfoModal;
  cascader: RenderInfoCascader<any>;
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
