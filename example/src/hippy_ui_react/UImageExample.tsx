import React, { FC } from 'react';
import { View } from '@hippy/react';
import { UImage } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * UImage 图片
 * */
const UImageExample: FC = () => {
  return (
    <View>
      {/* 基础用法 */}
      <ComExample title={'基础用法'} desc={'- 对`Image`组件的优化处理（默认值、成功/失败回调）。'}>
        <UImage
          src={'https://y.qq.com/music/common/upload/t_cm3_photo_publish/1969717.jpg?r=1579098322725'}
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />
        <UImage
          src={'https://y.qq.com/music/common/upload/t_cm3_photo_publish/404.jpg'}
          style={{ width: 100, height: 100, marginBottom: 10 }}
        />
      </ComExample>
    </View>
  );
};

export default UImageExample;
