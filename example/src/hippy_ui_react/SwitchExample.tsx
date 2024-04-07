import React, { FC } from 'react';
import { View } from '@hippy/react';
import { Switch, Toast } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * Switch 开关
 * */
const SwitchExample: FC = () => {
  return (
    <View>
      {/* 基础用法 */}
      <ComExample title={'基础用法'}>
        <Switch
          onChange={(isChecked) => {
            Toast.show(isChecked ? '已选中' : '未选中');
          }}
        />
      </ComExample>
    </View>
  );
};

export default SwitchExample;
