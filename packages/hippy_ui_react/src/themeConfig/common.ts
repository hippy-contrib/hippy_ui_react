import { BackAndroid, Platform } from '@hippy/react';

/** 主题配置：通用 */
export interface ThemeConfigCommon {
  commonTxtBtn: string;
  commonTxtChecked: string;
  commonListenActiveAdd?: (callBack: (active: boolean) => void) => void;
  commonListenActiveRemove?: (callBack: (active: boolean) => void) => void;
  commonListenBackAdd?: (callBack: () => boolean) => void;
  commonListenBackRemove?: (callBack: () => boolean) => void;
}

/**
 * Common 通用配置
 */
export const commonConfig: ThemeConfigCommon = {
  commonTxtBtn: '按钮',
  commonTxtChecked: '已选中',
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
