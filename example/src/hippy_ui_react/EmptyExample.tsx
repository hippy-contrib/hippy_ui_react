import React, { FC } from 'react';
import { View } from '@hippy/react';
import { Empty, Toast } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * Empty 空状态
 * */
const EmptyExample: FC = () => {
  return (
    <View>
      {/* 基础用法 */}
      <ComExample title={'基础用法'}>
        <Empty
          onPress={() => {
            Toast.show('用户点击');
          }}
        />
      </ComExample>

      {/* 自定义图片 */}
      <ComExample
        title={'自定义图片'}
        desc={'- `image`可以自定义图片链接或传入自定义节点，`desc`传入文案或传入自定义节点。'}
      >
        <Empty image={'https://qzonestyle.gtimg.cn/aoi/sola/20200326162512_215xmdVIwm.png'} desc={'数据为空'} />
      </ComExample>
    </View>
  );
};

export default EmptyExample;
