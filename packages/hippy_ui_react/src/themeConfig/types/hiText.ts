import { PropsWithChildren, ReactNode } from 'react';
import { TextStyle, TextProps } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { HiTextProps } from '../../components/HiText/PropsType';

/** 主题配置：文本 */
export interface ThemeConfigHiText {
  hiTextWeightRegular: TextStyle['fontWeight'];
  hiTextWeightMedium: TextStyle['fontWeight'];
  hiTextWeightBold: TextStyle['fontWeight'];
  hiTextSizeDefault: number;
  hiTextFormat?: (child: ReactNode) => ReactNode;
}

/** 自定义渲染：文本 */
export interface HiTextRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<HiTextProps>;
}
export interface HiTextRenderInfo {
  textProps: TextProps;
}
export type RenderInfoHiText = (
  params: HiTextRenderParams & { defaultRenderInfo: HiTextRenderInfo },
) => HiTextRenderInfo;
