import React, { FC } from 'react';
import { View } from '@hippy/react';
import { CountUp, Button } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * CountUp 滚动数
 * */
const CountUpExample: FC = () => {
  const [value, setValue] = React.useState(100);

  return (
    <View>
      {/* 基础用法 */}
      <ComExample title={'基础用法'} desc={'- 传入`value`值即可。'}>
        <CountUp value={value} />
        <Button
          onPress={() => {
            setValue(value + 10);
          }}
          style={{ marginTop: 10 }}
        >
          {'加10'}
        </Button>
        <Button
          onPress={() => {
            setValue(value - 10);
          }}
          style={{ marginTop: 10 }}
        >
          {'减10'}
        </Button>
      </ComExample>
    </View>
  );
};

export default CountUpExample;
