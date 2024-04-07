import React, { FC } from 'react';
import { View } from '@hippy/react';
import { TimeDown } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * TimeDown 倒计时
 * */
const TimeDownExample: FC = () => {
  return (
    <View>
      {/* 基础用法 */}
      <ComExample title={'基础用法'} desc={'- 传入目标时间'}>
        <TimeDown time={new Date(new Date().getTime() + 60 * 60 * 1000)} />
      </ComExample>
    </View>
  );
};

export default TimeDownExample;
