import { PropsWithChildren, ReactNode } from 'react';
import { ImageProps, ViewProps, ViewStyle } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { ButtonProps, ButtonState } from '../../components/Button/PropsType';
import { HiTextProps } from '../../components/HiText/PropsType';

/** 主题配置：按钮 */
export interface ThemeConfigButton {
  buttonWrapStyleFn: (params: ButtonRenderParams) => ViewStyle;
  buttonPressStyleFn: (params: ButtonRenderParams) => ViewStyle;
  buttonImgStyleFn: (params: ButtonRenderParams) => ViewStyle;
  buttonTextPropsFn: (params: ButtonRenderParams) => HiTextProps;
  // 前置image（返回空字符串可取消展示）
  buttonPreImgFn?: (params: ButtonRenderParams) => string | ReactNode | undefined | null;
  // 后置角标（返回空字符串可取消展示）
  buttonBadgeFn?: (params: ButtonRenderParams) => string | ReactNode | undefined | null;
}

/** 自定义渲染：按钮 */
export interface ButtonRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<ButtonProps>;
  state: ButtonState;
}
export interface ButtonRenderInfo {
  wrapProps: ViewProps;
  textProps: HiTextProps;
  imageProps: ImageProps;
  badgeProps: ImageProps;
  pressProps: ViewProps;
}
export type RenderInfoButton = (
  params: ButtonRenderParams & { defaultRenderInfo: ButtonRenderInfo },
) => ButtonRenderInfo;
