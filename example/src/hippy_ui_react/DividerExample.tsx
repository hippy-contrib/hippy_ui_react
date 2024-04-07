import React, { FC } from 'react';
import { View } from '@hippy/react';
import { Divider, HiText } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * Divider 分割线
 * */
const DividerExample: FC = () => {
  return (
    <View>
      {/* 基础用法 */}
      <ComExample title={'基础用法'}>
        <View>
          <HiText>{'横线'}</HiText>
          <Divider style={{ margin: 10 }} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <HiText>{'竖线左边'}</HiText>
          <Divider vertical={true} style={{ marginLeft: 5, marginRight: 5 }} />
          <HiText>{'竖线右边'}</HiText>
        </View>
      </ComExample>
    </View>
  );
};

export default DividerExample;
