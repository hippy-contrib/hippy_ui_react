/** 主题配置：通用 */
export interface ThemeConfigCommon {
  commonListenActiveAdd?: (callBack: (active: boolean) => void) => void;
  commonListenActiveRemove?: (callBack: (active: boolean) => void) => void;
  commonListenBackAdd?: (callBack: () => boolean) => void;
  commonListenBackRemove?: (callBack: () => boolean) => void;
}
