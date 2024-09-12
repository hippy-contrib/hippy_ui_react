import React, { Component, ReactElement, PropsWithChildren } from 'react';
import { View } from '@hippy/react';
import { GlobalViewMaskInfo, MaskProps } from './PropsType';
import Consumer from '../../provider/Consumer';
import getRenderInfo from './renderInfo';
import Provider from '../../provider/Provider';

/**
 * 注册 Provider globalView 的key：Mask
 * */
const GLOBAL_VIEW_KEY_MASK = 'HRUMask';
// 多蒙层信息
let GLOBAL_VIEW_MASK_LIST: GlobalViewMaskInfo[] = [];

/**
 * - 带有默认样式的`View`组件
 * @visibleName Mask 蒙层
 */
export class Mask extends Component<PropsWithChildren<MaskProps>, {}> {
  /**
   * 显示Mask
   * @param view 插入的视图
   * @param options 扩展参数
   * @param options.key 用于支持多个同时展示，不传默认使用同个节点。
   * @param options.backToClose 拦截系统回退，关闭此Mask。
   * */
  static show(view: ReactElement, options?: { key?: string; backToClose?: boolean }) {
    const { key = 'default', backToClose = true } = options || {};
    const onBackToClose = backToClose
      ? () => {
          Mask.hide({ key });
          return true;
        }
      : undefined;
    if (
      !GLOBAL_VIEW_MASK_LIST.some((mask) => {
        if (mask.key === key) {
          mask.view = view;
          mask.onBackToClose = onBackToClose;
          return true;
        } else {
          return false;
        }
      })
    ) {
      GLOBAL_VIEW_MASK_LIST.push({
        key,
        view,
        onBackToClose,
      });
    }
    Provider.updateGlobalView({
      [GLOBAL_VIEW_KEY_MASK]: {
        data: GLOBAL_VIEW_MASK_LIST,
      },
    });
  }

  /**
   * 收起Mask
   * */
  static hide(options?: { key?: string }) {
    const { key = 'default' } = options || {};
    if (!key) {
      GLOBAL_VIEW_MASK_LIST = [];
    } else {
      GLOBAL_VIEW_MASK_LIST = GLOBAL_VIEW_MASK_LIST.filter((v) => v.key !== key);
    }
    Provider.updateGlobalView({
      [GLOBAL_VIEW_KEY_MASK]: {
        data: GLOBAL_VIEW_MASK_LIST,
      },
    });
  }

  render() {
    return (
      <Consumer>
        {(consumerValue) => {
          const { maskProps, coverView } = getRenderInfo({ consumerValue, props: this.props });
          const { children } = this.props;
          return (
            <View {...maskProps}>
              {/* 防止ios无障碍阅读穿透到后面 */}
              {coverView}
              {children}
            </View>
          );
        }}
      </Consumer>
    );
  }
}

export default Mask;
