import { PropsWithChildren } from 'react';
import { ViewProps, Animation, ViewStyle } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { SwitchProps, SwitchState } from './PropsType';

/** 主题配置：开关 */
export interface ThemeConfigSwitch {
  switchStyle: ViewStyle;
  switchCircleStyle: ViewStyle;
}

/** 自定义渲染：开关 */
export interface SwitchRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<SwitchProps>;
  state: SwitchState;
  translateXAnimation?: Animation;
}
export interface SwitchRenderInfo {
  wrapProps: ViewProps;
  circleProps: ViewProps;
  translateX: number;
}
export type RenderInfoSwitch = (
  params: SwitchRenderParams & { defaultRenderInfo: SwitchRenderInfo },
) => SwitchRenderInfo;

/**
 * Switch 组件
 */
export const switchConfig: ThemeConfigSwitch = {
  switchStyle: {
    width: 40,
    height: 26,
    padding: 3,
    borderRadius: 13,
    cursor: 'pointer',
  },
  switchCircleStyle: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
};
