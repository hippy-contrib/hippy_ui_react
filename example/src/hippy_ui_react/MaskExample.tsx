import React, { FC } from 'react';
import { View } from '@hippy/react';
import { Mask, Toast, HiText, Button } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * Mask 蒙层
 * */
const MaskExample: FC = () => {
  return (
    <View>
      {/* 基础用法 */}
      <ComExample title={'基础用法'} desc={'- 带有默认样式的`View`组件。'} style={{ height: 250 }}>
        <Mask
          onClick={() => {
            Toast.show('点击事件');
          }}
        >
          <HiText style={{ marginTop: 100, textAlign: 'center' }}>{'蒙层'}</HiText>
        </Mask>
      </ComExample>

      {/* 全局调用 */}
      <ComExample
        title={'全局调用'}
        desc={
          '- 需引入`Provider`。\n' +
          '- 使用`Mask.show()`显示蒙层（可通过指定`key`来新增不同蒙层，默认用同一个）。\n' +
          '- 使用`Mask.hide()`收起蒙层（可通过指定`key`来收起指定蒙层，传空字符串收起全部）。'
        }
      >
        <Button
          onPress={() => {
            Mask.show(
              <Mask onClick={() => Mask.hide()} style={{ justifyContent: 'center' }}>
                <Button
                  onPress={() => {
                    Mask.show(
                      <Mask
                        style={{ justifyContent: 'center', backgroundColor: '#f00' }}
                        onClick={() => Mask.hide({ key: 'mask2' })}
                      >
                        <Button onPress={() => Mask.hide({ key: '' })}>
                          {'当前蒙层2，点击空白处收起蒙层2，点此收起全部'}
                        </Button>
                      </Mask>,
                      { key: 'mask2' },
                    );
                  }}
                >
                  {'当前蒙层1，点击再加蒙层2'}
                </Button>
              </Mask>,
            );
          }}
        >
          {'显示蒙层1'}
        </Button>
      </ComExample>
    </View>
  );
};

export default MaskExample;
