import React, { FC } from 'react';
import { View } from '@hippy/react';
import { HiText, ThemeMode, Toast } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * HiText 文本
 * */
const HiTextExample: FC = () => {
  return (
    <View>
      {/* 基础用法 */}
      <ComExample
        title={'基础用法'}
        desc={'可以通过`size`、`weight`、`color`、`lineHeight`设置文字大小、粗细、颜色、行高。'}
      >
        <HiText color={HiText.color.theme} weight={HiText.weight.bold}>
          {'【1. 默认文字】'}
        </HiText>
        <HiText>{'大小：配置——themeConfig.hiTextSizeDefault'}</HiText>
        <HiText>{'粗细：HiText.weight.regular'}</HiText>
        <HiText>{'颜色：HiText.color.textBase'}</HiText>

        <HiText color={HiText.color.theme} weight={HiText.weight.bold} style={{ marginTop: 10 }}>
          {'【2. 文字大小】'}
        </HiText>
        <HiText size={15}>{'自定义大小：15'}</HiText>

        <HiText color={HiText.color.theme} weight={HiText.weight.bold} style={{ marginTop: 10 }}>
          {'【3. 文字粗细】'}
        </HiText>
        <HiText weight={HiText.weight.bold}>{'粗   ：HiText.weight.bold'}</HiText>
        <HiText weight={HiText.weight.medium}>{'中   ：HiText.weight.medium'}</HiText>
        <HiText weight={HiText.weight.regular}>{'常规：HiText.weight.regular'}</HiText>

        <HiText color={HiText.color.theme} weight={HiText.weight.bold} style={{ marginTop: 10 }}>
          {'【4. 文字颜色】'}
        </HiText>
        <HiText color={HiText.color.textBase}>{'主色：HiText.color.textBase'}</HiText>
        <HiText color={HiText.color.textSecondary}>{'次级色：HiText.color.textSecondary'}</HiText>
        <HiText color={HiText.color.theme}>{'主题色：HiText.color.theme'}</HiText>
        <HiText color={HiText.color.link}>{'链接色：HiText.color.link'}</HiText>

        <HiText color={HiText.color.theme} weight={HiText.weight.bold} style={{ marginTop: 10 }}>
          {'【5. 文字行高】'}
        </HiText>
        <HiText size={10} lineHeight={15}>
          {'自定义行高：15'}
        </HiText>
      </ComExample>

      {/* 文字色彩 */}
      <ComExample
        title={'文字色彩'}
        desc={
          '可以通过`color`设置文字颜色。值类型有：\n' +
          '1. `HiText.color.xxx`：可以随黑暗模式变化的概念颜色\n' +
          '2. `rgba(x,x,x,x)` / `#xxxxxxxx`：自定义颜色（不随黑暗模式变化）'
        }
      >
        <HiText color={HiText.color.theme} weight={HiText.weight.bold}>
          {'【1. HiText.color.xxx（随黑暗模式变化颜色）】'}
        </HiText>
        <HiText color={HiText.color.textBase}>{'主颜色：HiText.color.textBase（默认）'}</HiText>
        <HiText color={HiText.color.textSecondary}>{'次级色：HiText.color.textSecondary'}</HiText>
        <HiText color={HiText.color.theme}>{'主题色：HiText.color.theme'}</HiText>
        <HiText color={HiText.color.link}>{'链接色：HiText.color.link'}</HiText>

        <HiText color={HiText.color.theme} weight={HiText.weight.bold} style={{ marginTop: 10 }}>
          {'【2. #xxxxxxxx（自定义颜色，不跟黑暗模式）】'}
        </HiText>
        <HiText color={'#0000FF'}>{'自定义颜色：#0000FF'}</HiText>
      </ComExample>

      {/* 文字大小 */}
      <ComExample title={'文字大小'} desc={'可以通过`size`设置文字大小。'}>
        <HiText>{'大小：默认'}</HiText>
        <HiText size={18} lineHeight={20}>
          {'文字大小：自定义-18'}
        </HiText>
      </ComExample>

      {/* 文字粗细 */}
      <ComExample title={'文字粗细'} desc={'可以通过`weight`设置文字粗细。'}>
        <HiText weight={HiText.weight.bold}>{'组件定义-粗：HiText.weight.bold'}</HiText>
        <HiText weight={HiText.weight.medium}>{'组件定义-中：HiText.weight.medium'}</HiText>
        <HiText weight={HiText.weight.regular}>{'组件定义-常规（默认）：HiText.weight.regular'}</HiText>
        <HiText weight={'bold'}>{'自定义：bold'}</HiText>
        <HiText weight={'400'}>{'自定义：400'}</HiText>
      </ComExample>

      {/* 其他用法 */}
      <ComExample
        title={'其他用法'}
        desc={'- 可以通过`theme={ ThemeMode.dark }`手动设置使用深色主题字体颜色。\n' + '- 自带`html编解码`静态函数。'}
      >
        <View style={{ backgroundColor: '#282828' }}>
          <HiText theme={ThemeMode.dark}>{'手动固化深色主题'}</HiText>
        </View>
        <HiText
          onClick={() => {
            Toast.show('点击事件');
          }}
        >
          {'点击事件：<꧁꫞꯭翱翔꫞꧂🌝>&quot;'}
        </HiText>
        <HiText numberOfLines={2}>
          超长文本超长文本超长文本超长文本超长文本超长文本超长文本超长文本超长文本超长文本超长文本
          超长文本超长文本超长文本超长文本超长文本超长文本超长文本超长文本超长文本超长文本超长文本
        </HiText>
      </ComExample>
    </View>
  );
};

export default HiTextExample;
