import React, { FC } from 'react';
import { View, Image } from '@hippy/react';
import { Loading } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * Loading 加载中
 * */
const LoadingExample: FC = () => {
  return (
    <View>
      {/* 基础用法 */}
      <ComExample title={'基础用法'} desc={'- 通过`text`指定文案。\n' + '- `gif`修改前置图。'}>
        <Loading />
        <Loading text={'加载中...'} />
        <Loading loadingGifProps={{ percent: 50 }} text={'加载中...'} />
        <Loading gif={null} text={'加载中...'} />
        <Loading
          gif={
            <Image
              source={{ uri: 'https://qzonestyle.gtimg.cn/aoi/sola/20200325165502_RfJy8RaWbr.gif' }}
              style={{ width: 15, height: 15, marginRight: 6, backgroundColor: 'transparent' }}
            />
          }
          text={'加载中...'}
        />
        <Loading
          gif={null}
          style={{
            width: 50,
            height: 50,
            backgroundColor: 'rgba(0,0,0,.8)',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <Image
            source={{
              uri: 'https://sola.gtimg.cn/aoi/sola/20200521200028_d6hXlqCYGf.gif',
            }}
            style={{
              width: 50,
              height: 50,
              backgroundColor: 'transparent',
            }}
          />
        </Loading>
      </ComExample>
    </View>
  );
};

export default LoadingExample;
