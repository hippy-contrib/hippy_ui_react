import { ThemeMode } from '../index';
import { ThemeConfigColor } from './color';
import { ThemeConfigZIndex } from './zIndex';
import { RenderInfoButton, ThemeConfigButton } from './button';
import { RenderInfoHiText, ThemeConfigHiText } from './hiText';
import { RenderInfoEmpty, ThemeConfigEmpty } from './empty';
import { RenderInfoRadio, ThemeConfigRadio } from './radio';
import { RenderInfoSwitch, ThemeConfigSwitch } from './switch';
import { RenderInfoToast, ThemeConfigToast } from './toast';
import { RenderInfoMask, ThemeConfigMask } from './mask';
import { RenderInfoPopup, ThemeConfigPopup } from './popup';
import { RenderInfoUImage, ThemeConfigUImage } from './uImage';
import { RenderInfoListItem, ThemeConfigListItem } from './listItem';
import { ThemeConfigLoadingGif } from './loadingGif';
import { RenderInfoLoading, ThemeConfigLoading } from './loading';
import { RenderInfoDivider, ThemeConfigDivider } from './divider';
import { RenderInfoSearch, ThemeConfigSearch } from './search';
import { RenderInfoIndicator, ThemeConfigIndicator } from './indicator';
import { ThemeConfigTabs, RenderInfoTabs } from './tabs';
import { RenderInfoTag, ThemeConfigTag } from './tag';
import { RenderInfoTable, RenderInfoTableCell, ThemeConfigTable } from './table';
import { ThemeConfigSlider, RenderInfoSlider } from './slider';
import { RenderInfoMarquee, ThemeConfigMarquee } from './marquee';
import { RenderInfoBadge, ThemeConfigBadge } from './badge';
import { RenderInfoNavigator, ThemeConfigNavigator } from './navigator';
import { RenderInfoModal, ThemeConfigModal } from './modal';
import { RenderInfoCascader, ThemeConfigCascader } from './cascader';
import { ThemeConfigCommon } from './common';

/** 主题配置 */
export type ThemeConfig = ThemeConfigColor &
  ThemeConfigButton &
  ThemeConfigSwitch &
  ThemeConfigHiText &
  ThemeConfigZIndex &
  ThemeConfigToast &
  ThemeConfigRadio &
  ThemeConfigEmpty &
  ThemeConfigMask &
  ThemeConfigPopup &
  ThemeConfigUImage &
  ThemeConfigListItem &
  ThemeConfigLoadingGif &
  ThemeConfigLoading &
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
  ThemeConfigCascader &
  ThemeConfigCommon &
  Record<string, any>;

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
