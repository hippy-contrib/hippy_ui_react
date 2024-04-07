import React, { FC } from 'react';
import { View } from '@hippy/react';
import { Marquee, HiText, Button } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * Marquee 滚动播放
 * */
const MarqueeExample: FC = () => {
  const refMarquee = React.useRef<Marquee | null>(null);
  const [useLong, setUseLong] = React.useState(true);

  const refMarquee2 = React.useRef<Marquee | null>(null);
  const [useData2, setUseData2] = React.useState(false);

  return (
    <View>
      {/* 左右滚动 */}
      <ComExample title={'左右滚动'}>
        <Marquee
          ref={(r) => {
            refMarquee.current = r;
          }}
        >
          <HiText>{useLong ? '测试长文本测试长文本测试长文本测试长文本测试长文本测试长文本' : '测试短文本'}</HiText>
        </Marquee>

        <Button
          style={{ marginTop: 10 }}
          onPress={() => {
            refMarquee.current?.stop();
          }}
        >
          {'暂停'}
        </Button>
        <Button
          style={{ marginTop: 10 }}
          onPress={() => {
            refMarquee.current?.start();
          }}
        >
          {'启动'}
        </Button>
        <Button
          style={{ marginTop: 10 }}
          onPress={() => {
            setUseLong(!useLong);
          }}
        >
          {'变更文本'}
        </Button>
      </ComExample>

      {/* 上下滚动 */}
      <ComExample title={'上下滚动'} desc={'- 设置容器高度避免漏出'}>
        <Marquee
          vertical={true}
          style={{ height: 20, borderWidth: 1, borderColor: '#f00' }}
          ref={(r) => {
            refMarquee2.current = r;
          }}
        >
          {useData2
            ? [
                <HiText key={4}>{'文案4'}</HiText>,
                <HiText key={5}>{'文案5'}</HiText>,
                <HiText key={6}>{'文案6'}</HiText>,
                <HiText key={7}>{'文案7'}</HiText>,
              ]
            : [
                <HiText key={1}>{'文案1'}</HiText>,
                <HiText key={2}>{'文案2'}</HiText>,
                <HiText key={3}>{'文案3'}</HiText>,
              ]}
        </Marquee>

        <Button
          style={{ marginTop: 10 }}
          onPress={() => {
            refMarquee2.current?.stop();
          }}
        >
          {'暂停'}
        </Button>
        <Button
          style={{ marginTop: 10 }}
          onPress={() => {
            refMarquee2.current?.start();
          }}
        >
          {'启动'}
        </Button>
        <Button
          style={{ marginTop: 10 }}
          onPress={() => {
            setUseData2(!useData2);
          }}
        >
          {'变更文本'}
        </Button>
      </ComExample>
    </View>
  );
};

export default MarqueeExample;
