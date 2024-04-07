import React, { FC } from 'react';
import { View } from '@hippy/react';
import { Slider } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * Slider 滑动选择器
 * */
const SliderExample: FC = () => {
  return (
    <View>
      {/* 基础用法 */}
      <ComExample title={'基础用法'}>
        <Slider />
      </ComExample>
    </View>
  );
};

export default SliderExample;
