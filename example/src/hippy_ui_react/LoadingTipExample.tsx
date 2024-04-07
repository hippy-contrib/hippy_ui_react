import React, { FC } from 'react';
import { View } from '@hippy/react';
import { LoadingTip } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * LoadingTip 加载提示
 * */
const LoadingTipExample: FC = () => {
  return (
    <View>
      {/* 有数据 */}
      <ComExample
        title={'有数据'}
        desc={'- 自动根据`hasData`决定显示`Empty`组件还是`Loading`组件。\n' + '- 自动根据`status`显示对应文案。'}
      >
        <LoadingTip status={LoadingTip.status.ready} hasData={true} />
        <LoadingTip status={LoadingTip.status.loading} hasData={true} />
        <LoadingTip status={LoadingTip.status.error} hasData={true} />
        <LoadingTip status={LoadingTip.status.finish} hasData={true} />
      </ComExample>

      {/* 无数据 */}
      <ComExample title={'无数据'}>
        <LoadingTip status={LoadingTip.status.finish} hasData={false} />
      </ComExample>
    </View>
  );
};

export default LoadingTipExample;
