import { BackAndroid, Platform } from '@hippy/react';

/** 主题配置：通用 */
export interface ThemeConfigCommon {
  commonListenActiveAdd?: (callBack: (active: boolean) => void) => void;
  commonListenActiveRemove?: (callBack: (active: boolean) => void) => void;
  commonListenBackAdd?: (callBack: () => boolean) => void;
  commonListenBackRemove?: (callBack: () => boolean) => void;
}

/**
 * Common 通用配置
 */
export const commonConfig: ThemeConfigCommon = {
  commonListenBackAdd(cb) {
    if (Platform.OS === 'android') {
      BackAndroid.addListener(cb);
    }
  },
  commonListenBackRemove(cb) {
    if (Platform.OS === 'android') {
      BackAndroid.removeListener(cb);
    }
  },
};
