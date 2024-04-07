import { ThemeConfigCommon } from '../themeConfig/types/common';
import { ThemeConfig } from '../themeConfig/types';

// 全局通用配置
export const ConfigCommon: ThemeConfigCommon = {};

export const setConfigCommon = (config: ThemeConfig) => {
  ConfigCommon.commonListenActiveRemove = config.commonListenActiveRemove;
  ConfigCommon.commonListenActiveAdd = config.commonListenActiveAdd;
  ConfigCommon.commonListenBackAdd = config.commonListenBackAdd;
  ConfigCommon.commonListenBackRemove = config.commonListenBackRemove;
};
