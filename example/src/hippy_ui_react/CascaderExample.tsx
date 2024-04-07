import React, { FC } from 'react';
import { View } from '@hippy/react';
import { Cascader, HiText } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * Cascader 联级选择
 * */
const CascaderExample: FC = () => {
  const [value, setValue] = React.useState([]);

  return (
    <View>
      {/* 基础用法 */}
      <ComExample title={'基础用法'}>
        <Cascader
          active={value}
          onChange={(v) => {
            setValue(v);
          }}
          data={[
            {
              id: '2022',
              name: '2022',
              children: [
                { id: '2022/01', name: '01' },
                { id: '2022/02', name: '02' },
                { id: '2022/03', name: '03' },
                { id: '2022/04', name: '04' },
                { id: '2022/05', name: '05' },
                { id: '2022/06', name: '06' },
                { id: '2022/07', name: '07' },
                { id: '2022/08', name: '08' },
                { id: '2022/09', name: '09' },
                { id: '2022/10', name: '10' },
                { id: '2022/11', name: '11' },
                { id: '2022/12', name: '12' },
              ],
            },
            {
              id: '2023',
              name: '2023',
              children: [
                { id: '2023/01', name: '01' },
                { id: '2023/02', name: '02' },
                { id: '2023/03', name: '03' },
                { id: '2023/04', name: '04' },
                { id: '2023/05', name: '05' },
                { id: '2023/06', name: '06' },
                { id: '2023/07', name: '07' },
                { id: '2023/08', name: '08' },
                { id: '2023/09', name: '09' },
                { id: '2023/10', name: '10' },
                { id: '2023/11', name: '11' },
                { id: '2023/12', name: '12' },
              ],
            },
          ]}
        />
        <HiText>{`已选中：${value[value.length - 1]?.id || ''}`}</HiText>
      </ComExample>
    </View>
  );
};

export default CascaderExample;
