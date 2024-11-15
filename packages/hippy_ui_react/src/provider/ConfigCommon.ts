import { ThemeConfigCommon } from '../themeConfig/common';
import { ThemeConfig } from '../themeConfig/index';

// 全局通用配置
export const ConfigCommon: Partial<ThemeConfigCommon> = {};

export const setConfigCommon = (config: ThemeConfig) => {
  ConfigCommon.commonListenActiveRemove = config.commonListenActiveRemove;
  ConfigCommon.commonListenActiveAdd = config.commonListenActiveAdd;
  ConfigCommon.commonListenBackAdd = config.commonListenBackAdd;
  ConfigCommon.commonListenBackRemove = config.commonListenBackRemove;
};
