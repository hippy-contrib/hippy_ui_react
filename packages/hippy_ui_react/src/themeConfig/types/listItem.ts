import { PropsWithChildren, ReactNode } from 'react';
import { ViewProps } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { ListItemProps } from '../../components/ListItem/PropsType';
import { ButtonProps } from '../../components/Button/PropsType';
import { HiTextProps } from '../../components/HiText/PropsType';
import { UImageProps } from '../../components/UImage/PropsType';

/** 主题配置：列表条目 */
export interface ThemeConfigListItem {
  listItemWrapPropsFn: (params: ListItemRenderParams) => ViewProps;
  listItemLeftProps: ViewProps;
  listItemLeftInfoProps: ViewProps;
  listItemButtonProps: Partial<ButtonProps>;
  listItemRankPropsFn: (params: ListItemRenderParams) => HiTextProps;
  listItemThumbPropsFn: (params: ListItemRenderParams) => UImageProps;
  listItemTitlePropsFn: (params: ListItemRenderParams) => HiTextProps;
  listItemNotePropsFn: (params: ListItemRenderParams) => HiTextProps;
  listItemMoreNotePropsFn: (params: ListItemRenderParams) => HiTextProps;
}

/** 自定义渲染：列表条目 */
export interface ListItemRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<ListItemProps>;
}
export interface ListItemRenderInfo {
  wrapProps: ViewProps;
  leftProps: ViewProps;
  leftInfoProps: ViewProps;
  rank: ReactNode;
  thumb: ReactNode;
  title: ReactNode;
  note: ReactNode;
  moreNote: ReactNode;
  buttonProps: Partial<ButtonProps>;
}
export type RenderInfoListItem = (
  params: ListItemRenderParams & { defaultRenderInfo: ListItemRenderInfo },
) => ListItemRenderInfo;
