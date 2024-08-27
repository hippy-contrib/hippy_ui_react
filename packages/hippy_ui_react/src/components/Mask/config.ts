import { PropsWithChildren, ReactNode } from 'react';
import { ViewProps } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { MaskProps } from './PropsType';

/** 主题配置：蒙层 */
export interface ThemeConfigMask {
  maskProps: ViewProps;
}

/** 自定义渲染：蒙层 */
export interface MaskRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<MaskProps>;
}
export interface MaskRenderInfo {
  maskProps: ViewProps;
  coverView: ReactNode;
}
export type RenderInfoMask = (params: MaskRenderParams & { defaultRenderInfo: MaskRenderInfo }) => MaskRenderInfo;

/**
 * Mask 组件
 */
export const maskConfig: ThemeConfigMask = {
  maskProps: {
    style: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  },
};
