import React, { FC } from 'react';
import { View, Image } from '@hippy/react';
import { Button, Toast, HiText } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * Button 按钮
 * */
const ButtonExample: FC = () => {
  return (
    <View>
      {/* 按钮类型 */}
      <ComExample title={'按钮类型'} desc={'通过指定 `type` 来设置按钮类型。'}>
        <Button>{'类型：Button.type.default（默认）'}</Button>
        <Button type={Button.type.normal} style={{ marginTop: 10 }}>
          {'类型：Button.type.normal'}
        </Button>
        <Button type={Button.type.primary} style={{ marginTop: 10 }}>
          {'类型：Button.type.primary'}
        </Button>
        <Button type={Button.type.text} style={{ marginTop: 10 }}>
          {'类型：Button.type.text'}
        </Button>
      </ComExample>

      {/* 按钮尺寸 */}
      <ComExample title={'按钮尺寸'} desc={'通过指定 `size` 来设置按钮尺寸。'}>
        <Button size={Button.size.small}>{'尺寸-S-24：Button.size.small'}</Button>
        <Button size={Button.size.medium} style={{ marginTop: 10 }}>
          {'尺寸-M-32：Button.size.medium'}
        </Button>
        <Button size={Button.size.big} style={{ marginTop: 10 }}>
          {'尺寸-B-36：Button.size.big'}
        </Button>
        <Button size={Button.size.huge} style={{ marginTop: 10 }}>
          {'尺寸-H-40：Button.size.huge'}
        </Button>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Button size={Button.size.small}>{'S'}</Button>
          <Button size={Button.size.medium}>{'M'}</Button>
          <Button size={Button.size.big}>{'B'}</Button>
          <Button size={Button.size.huge}>{'H'}</Button>
        </View>
      </ComExample>

      {/* 禁用和加载状态 */}
      <ComExample
        title={'禁用和加载状态'}
        desc={'通过指定 `disabled`、`loading` 来设置按钮不可点击。 可以用`onDisablePress`事件进行一些提示。'}
      >
        <Button
          disabled={true}
          onDisablePress={() => {
            Toast.show('不可点击');
          }}
        >
          {'禁止点击：Button.type.default'}
        </Button>
        <Button disabled={true} type={Button.type.normal} style={{ marginTop: 10 }}>
          {'禁止点击：Button.type.normal'}
        </Button>
        <Button loading={true} type={Button.type.primary} style={{ marginTop: 10 }}>
          {'加载中：Button.type.primary'}
        </Button>
        <Button loading={true} type={Button.type.text} style={{ marginTop: 10 }}>
          {'加载中：Button.type.text'}
        </Button>
      </ComExample>

      {/* 前置图标 */}
      <ComExample title={'前置图标'} desc={'通过 `image` 设置前置图像（传`ReactNode`时，会自动注入默认样式）。'}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Button image="search" size={Button.size.small}>
            {'内置搜索-small'}
          </Button>
          <Button image="search" size={Button.size.medium}>
            {'内置搜索-medium'}
          </Button>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Button image="search" size={Button.size.big}>
            {'内置搜索-big'}
          </Button>
          <Button image="search" size={Button.size.huge}>
            {'内置搜索-huge'}
          </Button>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Button image="https://kg.qq.com/gtimg/music/common/upload/image/R40BQUSMXPX5NEBA1QY1TU.png">
            {'传链接'}
          </Button>
          <Button
            image={
              <Image
                source={{ uri: 'https://qzonestyle.gtimg.cn/aoi/sola/20200325140943_1LOFHPZ0nD.png' }}
                style={{ marginRight: 2 }}
              />
            }
          >
            {'传元素'}
          </Button>
        </View>
      </ComExample>

      {/* 标记 */}
      <ComExample title={'标记'} desc={'通过 `badge` 设置右上角标记图片（传`ReactNode`时，会自动注入默认样式）。'}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: 10, flexWrap: 'wrap' }}>
          <Button badge="vip">{'内置Vip'}</Button>
          <Button badge="vip" type={Button.type.normal}>
            {'内置Vip'}
          </Button>
          <Button badge="vip" type={Button.type.primary}>
            {'内置Vip'}
          </Button>
          <Button badge="vip" type={Button.type.text}>
            {'内置Vip'}
          </Button>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: 10, flexWrap: 'wrap' }}>
          <Button badge="https://qzonestyle.gtimg.cn/aoi/sola/20200221171112_gkb3pgZr8Z.png">{'传链接'}</Button>
          <Button
            badge={<Image source={{ uri: 'https://qzonestyle.gtimg.cn/aoi/sola/20200221171112_gkb3pgZr8Z.png' }} />}
            type={Button.type.normal}
          >
            {'传元素'}
          </Button>
        </View>
      </ComExample>

      {/* 按钮形状 */}
      <ComExample
        title={'按钮形状'}
        desc={'通过 `round` 设置圆角， `circle` 设置圆形。'}
        style={{ flexDirection: 'row' }}
      >
        <Button circle>{'+'}</Button>
        <Button round={false}>{'按钮'}</Button>
        <Button>{'K歌'}</Button>
        <Button round={false} style={{ borderRadius: 10 }}>
          {'自定义'}
        </Button>
      </ComExample>

      {/* 防抖节流 */}
      <ComExample
        title={'防抖节流'}
        desc={
          '通过 `throttle` 设置节流（每隔一段时间执行一次点击事件），\n' +
          '通过 `debounce` 设置防抖（连续触发只执行第一次点击事件）。'
        }
      >
        <Button
          onPress={() => {
            Toast.show('普通点击');
          }}
        >
          {'普通点击'}
        </Button>
        <Button
          style={{ marginTop: 10 }}
          throttle={true}
          onPress={() => {
            Toast.show('开启节流');
          }}
        >
          {'开启节流'}
        </Button>
        <Button
          throttle={3000}
          onPress={() => {
            Toast.show('自定义节流时间');
          }}
          style={{ marginTop: 10 }}
        >
          {'自定义节流时间'}
        </Button>

        <Button
          style={{ marginTop: 10 }}
          debounce={true}
          onPress={() => {
            Toast.show('开启防抖');
          }}
        >
          {'开启防抖'}
        </Button>

        <Button
          style={{ marginTop: 10 }}
          debounce={3000}
          onPress={() => {
            Toast.show('自定义防抖时间');
          }}
        >
          {'自定义防抖时间'}
        </Button>
      </ComExample>

      {/* 自定义样式 */}
      <ComExample
        title={'自定义样式'}
        desc={
          '通过 `style` 设置按钮样式：\n' +
          '1. `style` 中的 `color`, `fontSize`, `fontWeight`, `lineHeight` 会被透传给里面的 Text，因此可以直接设置文字样式。这里也可以内嵌一个自定义的 `Text`。\n' +
          '2. 自定义按钮宽度时，要注意组件有默认的 `miniWidth`和 `paddingLeft/paddingRight`（优先级大于`padding`），需要覆盖掉。\n'
        }
      >
        <Button style={{ backgroundColor: '#FF3399', color: '#00ff00' }}>{'自定义文字style'}</Button>
        <Button style={{ marginTop: 10 }}>
          <HiText style={{ color: '#FF3399' }}>{'内嵌 Text'}</HiText>
        </Button>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Button style={{ minWidth: 45, paddingLeft: 5, paddingRight: 5 }}>{'宽度'}</Button>
        </View>
      </ComExample>
    </View>
  );
};

export default ButtonExample;
