import { PropsWithChildren, ReactNode } from 'react';
import { ViewProps } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { isNullOrUndefined } from '../../utils/Utils';
import { ListItemProps } from './PropsType';
import { ButtonProps, ButtonType } from '../Button/PropsType';
import { HiTextProps } from '../HiText/PropsType';
import { UImageProps } from '../UImage/PropsType';

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

/**
 * ListItem 组件
 */
export const listItemConfig: ThemeConfigListItem = {
  listItemWrapPropsFn: (params) => {
    const {
      props: { note, moreNote, rank },
    } = params;
    return {
      style: {
        paddingLeft: isNullOrUndefined(rank) ? 16 : 0,
        paddingRight: 16,
        height: moreNote ? 84 : note ? 72 : 64,
        flexDirection: 'row',
        alignItems: 'center',
      },
    };
  },
  listItemLeftProps: {
    style: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      flexShrink: 1,
      overflow: 'hidden',
    },
  },
  listItemLeftInfoProps: {
    style: {
      justifyContent: 'center',
      flex: 1,
      flexShrink: 1,
      overflow: 'hidden',
    },
  },
  listItemButtonProps: {
    type: ButtonType.normal,
    style: {
      marginLeft: 4,
    },
  },
  listItemRankPropsFn: (params) => {
    const {
      props: { rank },
      consumerValue,
    } = params;
    return {
      style: {
        width: 52,
        textAlign: 'center',
        flexShrink: 0,
        fontSize: consumerValue.themeConfig.hiTextSizeDefault,
        color:
          typeof rank === 'number' && rank <= 3
            ? consumerValue.themeConfig.colorTheme
            : consumerValue.themeConfig.colorTextSecondary,
        fontWeight: consumerValue.themeConfig.hiTextWeightBold,
      },
    };
  },
  listItemThumbPropsFn: (params) => {
    const {
      props: { thumb, thumbCircle, moreNote },
    } = params;
    const size = moreNote ? 64 : 48;
    return {
      src: thumb as string,
      style: {
        width: size,
        height: size,
        borderRadius: thumbCircle ? size / 2 : 8,
        marginRight: moreNote ? 15 : 10,
      },
    };
  },
  listItemTitlePropsFn: (params) => {
    const {
      props: { titleNoHeight },
    } = params;
    return titleNoHeight
      ? {
          numberOfLines: 1,
          style: {
            fontSize: 16,
            flex: 1,
            flexShrink: 1,
            lineHeight: undefined,
          },
        }
      : {
          numberOfLines: 1,
          style: {
            fontSize: 16,
            flex: 1,
            flexShrink: 1,
            lineHeight: 20,
          },
        };
  },
  listItemNotePropsFn: (params) => {
    const { consumerValue } = params;
    return {
      numberOfLines: 1,
      style: {
        fontSize: 14,
        color: consumerValue.themeConfig.colorTextSecondary,
        flex: 1,
        flexShrink: 1,
        lineHeight: 20,
      },
    };
  },
  listItemMoreNotePropsFn: (params) => {
    const { consumerValue } = params;
    return {
      numberOfLines: 1,
      style: {
        fontSize: 14,
        color: consumerValue.themeConfig.colorTextSecondary,
        flex: 1,
        flexShrink: 1,
        lineHeight: 20,
      },
    };
  },
};
