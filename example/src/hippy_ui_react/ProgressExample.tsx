import React, { FC } from 'react';
import { View } from '@hippy/react';
import { Progress, HiText, Button } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * Progress 进度条
 * */
const ProgressExample: FC = () => {
  const [p1, setP1] = React.useState(10);
  const [p2, setP2] = React.useState(10);
  return (
    <View>
      {/* 线形进度 */}
      <ComExample
        title={'线形进度'}
        desc={
          '- 通过`percent`设置百分比进度。\n' +
          '- 通过`strokeWidth`设置进度条宽度。\n' +
          '- 通过`color`设置进度条颜色。\n' +
          '- 通过`duration`设置进度条动画时长（毫秒）。\n' +
          '- 可嵌套`children`做文案提示。'
        }
      >
        <Progress percent={60} color={'linear-gradient(to right, #ff0000, #ffff00);'} />

        <Progress
          strokeWidth={20}
          percent={p1}
          duration={1000}
          style={{ marginTop: 10 }}
          color={'#67C23A'}
          underColor={'#F2F6FC'}
        >
          <HiText style={{ color: '#fff', textAlign: 'right', marginRight: 6, lineHeight: 20 }}>{`${p1}%`}</HiText>
        </Progress>

        <Button style={{ marginTop: 10 }} onPress={() => setP1(Math.min(p1 + 10, 100))}>
          增加进度{' '}
        </Button>
        <Button style={{ marginTop: 10 }} onPress={() => setP1(Math.max(p1 - 10, 0))}>
          减少进度
        </Button>
      </ComExample>

      {/* 环形进度 */}
      <ComExample title={'线形进度'} desc={'- 通过`size`设置直径大小。'}>
        <Progress
          type={Progress.type.circle}
          size={200}
          strokeWidth={16}
          percent={p2}
          color={'#E6A23C'}
          duration={1000}
        >
          <HiText>{`动态进度：${p2}%`}</HiText>
        </Progress>

        <Button style={{ marginTop: 10 }} onPress={() => setP2(Math.min(p2 + 10, 100))}>
          增加进度{' '}
        </Button>
        <Button style={{ marginTop: 10 }} onPress={() => setP2(Math.max(p2 - 10, 0))}>
          减少进度
        </Button>
      </ComExample>
    </View>
  );
};

export default ProgressExample;
