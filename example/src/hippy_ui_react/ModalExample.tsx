import React, { FC } from 'react';
import { View, Image } from '@hippy/react';
import { Modal, Toast, HiText, Button } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * Modal 对话框
 * */
const ModalExample: FC = () => {
  return (
    <View>
      {/* 基础用法 */}
      <ComExample
        title={'基础用法'}
        desc={'- `title`：弹窗主标题（建议十二字内）\n' + '- `content`：文案描述，长度小于14时居中'}
      >
        <View style={{ height: 200 }}>
          <Modal title="标题" content="文案描述" confirmText="确认" cancelText="取消" />
        </View>

        <View style={{ height: 250 }}>
          <Modal
            title="标题"
            content="文案描述, 按钮类型为：vertical"
            btnType={Modal.btnType.vertical}
            confirmText="确认"
            cancelText="取消"
          />
        </View>

        <View style={{ height: 280 }}>
          <Modal
            title="弹窗主标题（十二字内）"
            content={'文案描述，这段文字超过一行。按钮类型为：primary'}
            confirmText="确认"
            cancelText="取消"
            closeType={Modal.closeType.themeMode}
            btnType={Modal.btnType.primary}
            onClose={() => {
              Toast.show('onClose');
            }}
            onConfirm={() => {
              Toast.show('onConfirm');
            }}
            onCancel={() => {
              Toast.show('onCancel');
            }}
            onPress={() => {
              Toast.show('onPress');
            }}
          ></Modal>
        </View>
      </ComExample>

      {/* 自定义内容 */}
      <ComExample
        title={'自定义内容'}
        desc={
          '- `title/content/confirmText/cancelText/children`可以传入自定义元素\n' +
          '- 默认间距：上下间距30；左右间距22；`header`下面留24；`title`下面留15；内容与操作按钮区间距30。'
        }
      >
        <View style={{ height: 300 }}>
          <Modal
            title={
              <HiText size={17} color={HiText.color.theme} style={{ marginTop: 30, textAlign: 'center' }}>
                {'自定义标题'}
              </HiText>
            }
            content={
              <HiText size={17} color={HiText.color.theme} style={{ marginTop: 15, textAlign: 'center' }}>
                {'自定义描述'}
              </HiText>
            }
            confirmText={<HiText>{'自定义确认'}</HiText>}
            cancelText={<HiText>{'自定义取消'}</HiText>}
          />
        </View>

        <View style={{ height: 300 }}>
          <Modal
            header={
              <Image
                source={{ uri: 'https://y.gtimg.cn/music/common/upload/t_k_guild_comeptition_join_list/1799661.png' }}
                style={{ left: 0, right: 0, height: 100 }}
                resizeMode="cover"
              />
            }
            title={
              <HiText size={17} color={HiText.color.theme} style={{ marginTop: 24, textAlign: 'center' }}>
                {'自定义标题'}
              </HiText>
            }
            confirmText={'确认'}
            cancelText={'取消'}
            closeType={Modal.closeType.white}
          >
            <View
              style={{ marginTop: 15, marginHorizontal: 22, backgroundColor: '#f1f1f1', padding: 10, borderRadius: 6 }}
            >
              <HiText>{'自定义元素'}</HiText>
            </View>
          </Modal>
        </View>
      </ComExample>

      {/* 全局使用 */}
      <ComExample
        title={'全局使用'}
        desc={
          '- 使用`Modal.show()`和`Modal.hide()`做全局展示（需有`Provider`）。\n' +
          '- `Modal.show`自动设置非`onConfirm`事件为关闭，可自行覆盖。'
        }
      >
        <Button
          onPress={() => {
            Modal.show({
              title: '确认删除吗',
              confirmText: '确认',
              cancelText: '取消',
              onConfirm: () => {
                Modal.hide();
                Toast.show('删除成功');
              },
            });
          }}
        >
          {'点击确认删除'}
        </Button>
      </ComExample>
    </View>
  );
};

export default ModalExample;
