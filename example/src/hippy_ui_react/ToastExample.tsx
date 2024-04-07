import React, { FC } from 'react';
import { View } from '@hippy/react';
import { Toast, Button, HiText, ThemeMode } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * Toast 提示
 * */
const ToastExample: FC = () => {
  return (
    <View>
      {/* 全局使用 */}
      <ComExample title={'全局使用'} desc={'- 可直接调用`Toast.show()`提示（需要有`Provider`）。'}>
        <Button onPress={() => Toast.show('文案提示')}>{'点击提示'}</Button>
      </ComExample>

      {/* 基本用法 */}
      <ComExample
        title={'基本用法'}
        desc={'- 可配置文本，若超过 12 个汉字长度，建议使用弹窗并进行二次确认'}
        style={{ height: 100 }}
      >
        <Toast duration={0} text="相亲申请已提交，上麦成功支付20钻石" />
      </ComExample>

      {/* 自定义内容 */}
      <ComExample title={'自定义内容'} style={{ height: 100 }}>
        <Toast duration={0}>
          <HiText theme={ThemeMode.dark}>{'自定义Node'}</HiText>
        </Toast>
      </ComExample>
    </View>
  );
};

export default ToastExample;
