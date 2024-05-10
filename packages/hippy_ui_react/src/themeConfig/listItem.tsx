import { ThemeConfigListItem } from './types/listItem';
import { ButtonType } from '../components/Button/PropsType';
import { isNullOrUndefined } from '../utils/Utils';

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
            height: 20,
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
        height: 20,
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
        height: 20,
      },
    };
  },
};
