import React, { FC } from 'react';
import { View } from '@hippy/react';
import { Indicator } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * Indicator 指示器
 * */
const IndicatorExample: FC = () => {
  return (
    <View>
      {/* 基础用法 */}
      <ComExample title={'基础用法'}>
        <Indicator length={3} activeIndex={1} />
      </ComExample>
    </View>
  );
};

export default IndicatorExample;
