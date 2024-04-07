import React, { FC } from 'react';
import { View, Image } from '@hippy/react';
import { Tag, HiText } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * Tag 标签
 * */
const TagExample: FC = () => {
  return (
    <View>
      {/* 基础用法 */}
      <ComExample
        title={'基础用法'}
        desc={
          '- 指定`type`类型（各个业务通过`< Provider themeConfigFunc={() => ({tagTypeStyle:()=>{}})}/>`配置支持的类型）。'
        }
      >
        <View style={{ flexDirection: 'row', paddingLeft: 5, marginBottom: 10 }}>
          <Tag style={{ marginRight: 5 }}>{'默认：black'}</Tag>
          <Tag type={'red'} style={{ marginRight: 5 }}>
            {'red'}
          </Tag>
          <Tag type={'purple'} style={{ marginRight: 5 }}>
            {'purple'}
          </Tag>
          <Tag type={'pink'} style={{ marginRight: 5 }}>
            {'pink'}
          </Tag>
          <Tag type={'yellow'} style={{ marginRight: 5 }}>
            {'yellow'}
          </Tag>
          <Tag type={'blue'} style={{ marginRight: 5 }}>
            {'blue'}
          </Tag>
          <Tag type={'green'} style={{ marginRight: 5 }}>
            {'green'}
          </Tag>
        </View>
        <View style={{ flexDirection: 'row', paddingLeft: 5 }}>
          <Tag type={'blackBold'} style={{ marginRight: 5 }}>
            {'blackBold'}
          </Tag>
          <Tag type={'redBold'} style={{ marginRight: 5 }}>
            {'redBold'}
          </Tag>
          <Tag type={'purpleBold'} style={{ marginRight: 5 }}>
            {'purpleBold'}
          </Tag>
          <Tag type={'pinkBold'} style={{ marginRight: 5 }}>
            {'pinkBold'}
          </Tag>
          <Tag type={'yellowBold'} style={{ marginRight: 5 }}>
            {'yellowBold'}
          </Tag>
          <Tag type={'blueBold'} style={{ marginRight: 5 }}>
            {'blueBold'}
          </Tag>
          <Tag type={'greenBold'} style={{ marginRight: 5 }}>
            {'greenBold'}
          </Tag>
        </View>
      </ComExample>

      {/* 自定义 */}
      <ComExample title={'自定义'}>
        <View style={{ flexDirection: 'row', paddingLeft: 5, marginBottom: 10 }}>
          <Tag style={{ marginRight: 5 }}>{<HiText size={10}>{'自定义元素'}</HiText>}</Tag>
          <Tag
            prefix={
              <Image
                source={{ uri: 'https://sola.gtimg.cn/aoi/sola/20200509171146_IaxkObm78O.png' }}
                style={{ width: 10, height: 10, marginRight: 3 }}
              />
            }
            style={{ marginRight: 5 }}
          >
            {'前置图片'}
          </Tag>
        </View>
      </ComExample>
    </View>
  );
};

export default TagExample;
