import React, { FC } from 'react';
import { View } from '@hippy/react';
import { GroupImage } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * GroupImage 拼图
 * */
const GroupImageExample: FC = () => {
  const AVATAR = 'https://qzonestyle.gtimg.cn/aoi/sola/20200323143705_SFlaa8ofC4.png';
  return (
    <View>
      {/* 基础用法 */}
      <ComExample title={'基础用法'} desc={'- 最多支持4个图片拼接'}>
        <GroupImage sources={[AVATAR]} size={50} style={{ marginBottom: 10 }} />
        <GroupImage sources={[AVATAR, AVATAR]} size={50} style={{ marginBottom: 10, borderRadius: 25 }} />
        <GroupImage sources={[AVATAR, AVATAR, AVATAR]} size={50} style={{ marginBottom: 10, borderRadius: 5 }} />
        <GroupImage
          sources={[AVATAR, AVATAR, AVATAR, AVATAR]}
          size={50}
          style={{ marginBottom: 10, borderRadius: 25 }}
        />
      </ComExample>
    </View>
  );
};

export default GroupImageExample;
