import React, { FC } from 'react';
import { View } from '@hippy/react';
import { TabPager, Button, Toast } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * TabPager 标签滑动页
 * */
const TabPagerExample: FC = () => {
  const refTabPager = React.useRef<TabPager | null>();

  return (
    <View>
      {/* 基础用法 */}
      <ComExample title={'基础用法'} desc={'- 传入data数据'} style={{ height: 400 }}>
        <TabPager
          data={[
            { name: 'Tab1', page: <View style={{ backgroundColor: '#F56C6C', flex: 1, height: 300 }} /> },
            { name: 'Tab2', page: <View style={{ backgroundColor: '#67C23A', flex: 1, height: 300 }} /> },
            { name: 'Tab3', page: <View style={{ backgroundColor: '#409EFF', flex: 1, height: 300 }} /> },
          ]}
          onChange={(index) => {
            Toast.show(`切换到：${index}`);
          }}
          ref={(r) => {
            refTabPager.current = r;
          }}
        />
        <Button
          style={{ marginTop: 10 }}
          onPress={() => {
            refTabPager.current?.setIndex(1);
          }}
        >
          {'选择第2个'}
        </Button>
      </ComExample>
    </View>
  );
};

export default TabPagerExample;
