import { PropsWithChildren, ReactNode } from 'react';
import { ViewProps, Style } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { TagProps } from '../../components/Tag/PropsType';

/** 主题配置：标签 */
export interface ThemeConfigTag {
  tagStyle: Style;
  tagTypeStyleFn: (params: TagRenderParams) => Style;
}

/** 自定义渲染：标签 */
export interface TagRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<TagProps>;
}
export interface TagRenderInfo {
  tagProps: ViewProps;
  txtNode: ReactNode;
}
export type RenderInfoTag = (params: TagRenderParams & { defaultRenderInfo: TagRenderInfo }) => TagRenderInfo;
