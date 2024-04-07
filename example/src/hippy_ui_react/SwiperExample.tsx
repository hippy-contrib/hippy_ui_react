import React, { FC } from 'react';
import { View } from '@hippy/react';
import { Swiper, Button } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';
import { WINDOW_WIDTH } from '../utils/style';

/**
 * Swiper 走马灯
 * */
const SwiperExample: FC = () => {
  const refSwiper = React.useRef<Swiper | null>(null);
  const contentWidth = WINDOW_WIDTH - 21;
  const itemWidth1 = contentWidth - 40;
  const itemWidth2 = contentWidth;
  const itemWidth3 = contentWidth / 2 - 20;

  return (
    <View>
      {/* 基础用法 */}
      <ComExample
        title={'基础用法'}
        desc={'- 可以通过`spacing`设置间距（也可以自己设置条目的`margin/padding`样式来实现）。'}
      >
        <Swiper spacing={{ between: 10, startAndEnd: 20 }} ref={(e) => (refSwiper.current = e)}>
          <View style={{ width: itemWidth1, height: 400, backgroundColor: 'rgba(39,158,181,0.25)' }}>1</View>
          <View style={{ width: itemWidth1, height: 400, backgroundColor: 'rgba(191,34,62,0.25)' }}>2</View>
          <View style={{ width: itemWidth1, height: 400, backgroundColor: 'rgba(109,85,183,0.5)' }}>3</View>
          <View style={{ width: itemWidth1, height: 400, backgroundColor: 'rgba(139,18,181,0.25)' }}>4</View>
          <View style={{ width: itemWidth1, height: 400, backgroundColor: 'rgba(111,34,62,0.25)' }}>5</View>
          <View style={{ width: itemWidth1, height: 400, backgroundColor: 'rgba(19,85,183,0.5)' }}>6</View>
        </Swiper>
        <Button
          type={Button.type.primary}
          style={{ marginTop: 10 }}
          onPressIn={() => {
            refSwiper.current?.setIndex(1);
          }}
        >
          {'滑动到第二个条目'}
        </Button>
      </ComExample>

      {/* 轮播 */}
      <ComExample
        title={'轮播'}
        desc={
          '- 通过`autoplay`设置轮播（当条目宽度比较小时，可以用`autoScrollWidth`来解决一些交互问题）。\n' +
          '- 通过`indicatorProps`开启指示器（渲染和`ScrollView`同级，需要用`View`包裹跑马灯）'
        }
      >
        <Swiper autoplay={3000} indicatorProps={{}}>
          <View style={{ width: itemWidth2, height: 400, backgroundColor: 'rgba(39,158,181,0.25)' }}>1</View>
          <View style={{ width: itemWidth2, height: 400, backgroundColor: 'rgba(191,34,62,0.25)' }}>2</View>
          <View style={{ width: itemWidth2, height: 400, backgroundColor: 'rgba(109,85,183,0.5)' }}>3</View>
        </Swiper>
      </ComExample>

      {/* 窄条目 */}
      <ComExample
        title={'窄条目'}
        desc={'- 通过`cardPosition`设置卡片靠左 / 居中。\n' + '- 通过`pagingEnabled`设置整屏滑动。'}
      >
        <Swiper
          autoplay={3000}
          indicatorProps={{}}
          cardPosition={Swiper.cardPosition.left}
          pagingEnabled={true}
          spacing={{ between: 7, startAndEnd: 16 }}
        >
          <View style={{ width: itemWidth3, height: 106, backgroundColor: 'rgba(39,158,181,0.25)' }}>1</View>
          <View style={{ width: itemWidth3, height: 106, backgroundColor: 'rgba(191,34,62,0.25)' }}>2</View>
          <View style={{ width: itemWidth3, height: 106, backgroundColor: 'rgba(109,85,183,0.5)' }}>3</View>
          <View style={{ width: itemWidth3, height: 106, backgroundColor: 'rgba(139,18,181,0.25)' }}>4</View>
          <View style={{ width: itemWidth3, height: 106, backgroundColor: 'rgba(111,34,62,0.25)' }}>5</View>
          <View style={{ width: itemWidth3, height: 106, backgroundColor: 'rgba(19,85,183,0.5)' }}>6</View>
        </Swiper>
      </ComExample>
    </View>
  );
};

export default SwiperExample;
