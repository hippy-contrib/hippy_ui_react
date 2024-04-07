import React, { FC } from 'react';
import { View } from '@hippy/react';
import { LoadingGif, Button, HiText } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * LoadingGif 加载动图
 * */
const LoadingGifExample: FC = () => {
  const [percent, setPercent] = React.useState(50);

  return (
    <View>
      {/* 基础用法 */}
      <ComExample
        title={'基础用法'}
        desc={'1. 直接使用当做动图\n' + '2. 设置`defaultColor/activeColor`自定义颜色\n' + '3. 设置`percent`进度'}
      >
        <LoadingGif />
        <LoadingGif defaultColor={'#FFC391'} activeColor={'#E39356'} />
        <View style={{ flexDirection: 'row' }}>
          <LoadingGif percent={percent} />
          <HiText>{`动态进度：${percent}`}</HiText>
        </View>
        <Button style={{ marginTop: 10 }} onPress={() => setPercent(Math.min(100, percent + 10))}>
          {'加进度'}
        </Button>
        <Button style={{ marginTop: 10 }} onPress={() => setPercent(Math.max(0, percent - 10))}>
          {'减进度'}
        </Button>
      </ComExample>
    </View>
  );
};

export default LoadingGifExample;
