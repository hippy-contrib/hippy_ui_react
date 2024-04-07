import React, { FC } from 'react';
import { View, Image } from '@hippy/react';
import { Search, Button, Toast } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * Search 搜索框
 * */
const SearchExample: FC = () => {
  const refSearch = React.useRef<Search | null>(null);
  return (
    <View>
      {/* 基础用法 */}
      <ComExample
        title={'基础用法'}
        desc={
          '- `hippy-react-web`通过`blur`事件触发输入框的提交事件，要注意兼容。\n' +
          '- （可以用按下事件`onPressIn/onMouseDown`来早于`blur`标记下次是否触发`submit`。）\n' +
          '- 公共函数`blur/clear`支持参数`noNextSubmit`。'
        }
      >
        <Search
          ref={(r) => {
            refSearch.current = r;
          }}
          wrapProps={{ style: { margin: 16 } }}
          inputProps={{
            onChangeText(txt) {
              console.log('输入', txt);
            },
            onEndEditing(e?: any) {
              Toast.show(`搜索：${e.text}`);
            },
          }}
          rightIcon={
            <Image
              source={{
                uri: 'data:image/png;base64,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',
              }}
              style={{
                marginLeft: 6,
                backgroundColor: 'transparent',
                width: 20,
                height: 20,
              }}
              accessible={true}
              accessibilityLabel={'语音搜索 按钮'}
            />
          }
        />
        <Button
          onPress={() => {
            refSearch.current?.clear();
          }}
        >
          {'清空数据'}
        </Button>
      </ComExample>
    </View>
  );
};

export default SearchExample;
