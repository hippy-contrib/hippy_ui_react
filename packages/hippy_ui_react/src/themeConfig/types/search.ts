import { PropsWithChildren, ReactNode } from 'react';
import { ViewProps, ImageProps, TextInputProps } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { SearchProps, SearchState } from '../../components/Search/PropsType';

/** 主题配置：搜索 */
export interface ThemeConfigSearch {
  searchWrapPropsFn: (params: SearchRenderParams) => ViewProps;
  searchLeftIconPropsFn: (params: SearchRenderParams) => ImageProps;
  searchClearIconPropsFn: (params: SearchRenderParams) => ImageProps;
  searchInputPropsFn: (params: SearchRenderParams) => TextInputProps;
}

/** 自定义渲染：搜索 */
export interface SearchRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<SearchProps>;
  state: SearchState;
  onClear: () => void;
}
export interface SearchRenderInfo {
  wrapProps: ViewProps;
  leftIcon: ReactNode;
  rightIcon: ReactNode;
  clearIcon: ReactNode;
  inputProps: TextInputProps;
}
export type RenderInfoSearch = (
  params: SearchRenderParams & { defaultRenderInfo: SearchRenderInfo },
) => SearchRenderInfo;
