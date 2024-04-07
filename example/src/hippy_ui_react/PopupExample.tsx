import React, { FC } from 'react';
import { View } from '@hippy/react';
import { Button, Popup, Mask, Toast } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * Popup 半屏弹窗
 * */
const PopupExample: FC = () => {
  const refFloat = React.useRef<Popup | null>(null);

  // 收起半屏弹窗
  const hide = () => {
    refFloat.current
      ?.hide()
      .then(() => {
        Toast.show('收起完毕');
      })
      .catch(() => {});
  };

  return (
    <View>
      {/* 基础用法 */}
      <ComExample title={'基础用法'} desc={'- 支持动画弹出。\n' + '- 使用`hide`方法动画退出。'} style={{ height: 400 }}>
        <Popup
          ref={(r) => {
            refFloat.current = r;
          }}
          style={{
            height: 200,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            justifyContent: 'center',
          }}
          onShow={() => {
            Toast.show('弹出完毕');
          }}
          onMaskClick={hide}
        >
          <Button onPress={hide}>{'点击收起'}</Button>
        </Popup>
        <Button
          onPress={() => {
            refFloat.current?.show();
          }}
        >
          {'点击弹出'}
        </Button>
      </ComExample>

      {/* 全局弹窗 */}
      <ComExample title={'全局弹窗'} desc={'- 可以结合`Mask.show()`来做全局弹出'} style={{ height: 400 }}>
        <Button
          onPress={() => {
            Mask.show(
              <Popup
                style={{
                  height: 200,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  justifyContent: 'center',
                }}
                onShow={() => {
                  Toast.show('弹出完毕');
                }}
              >
                <Button
                  onPress={() => {
                    Mask.hide();
                  }}
                >
                  {'点击收起'}
                </Button>
              </Popup>,
            );
          }}
        >
          {'点击弹出'}
        </Button>
      </ComExample>
    </View>
  );
};

export default PopupExample;
