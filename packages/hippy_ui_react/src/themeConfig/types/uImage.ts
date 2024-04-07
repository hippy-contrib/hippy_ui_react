import { PropsWithChildren } from 'react';
import { ImageProps } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { UImageProps, UImageState } from '../../components/UImage/PropsType';

/** 主题配置：UImage */
export interface ThemeConfigUImage {
  uImageProps: Partial<ImageProps>;
  uImageDefaultSrcFn: (params: UImageRenderParams) => string;
}

/** 自定义渲染：UImage */
export interface UImageRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<UImageProps>;
  state: UImageState;
}
export interface UImageRenderInfo {
  imgProps: Partial<ImageProps>;
  imgSrc: string;
  imgDefaultSrc: string;
  imgRealSrc: string;
}
export type RenderInfoUImage = (
  params: UImageRenderParams & { defaultRenderInfo: UImageRenderInfo },
) => UImageRenderInfo;
