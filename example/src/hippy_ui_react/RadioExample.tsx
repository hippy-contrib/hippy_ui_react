import React, { FC } from 'react';
import { View } from '@hippy/react';
import { Radio } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * Radio 选择框
 * */
const RadioExample: FC = () => {
  const [checked, setChecked] = React.useState(true);

  return (
    <View>
      {/* 基础用法 */}
      <ComExample title={'基础用法'}>
        <Radio
          checked={checked}
          label={'点击选择'}
          onChange={(nextChecked) => {
            setChecked(nextChecked);
          }}
        />
      </ComExample>
    </View>
  );
};

export default RadioExample;
