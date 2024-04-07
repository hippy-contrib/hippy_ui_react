import { BackAndroid, Platform } from '@hippy/react';
import { ThemeConfigCommon } from './types/common';

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
