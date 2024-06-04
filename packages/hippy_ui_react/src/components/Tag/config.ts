import { PropsWithChildren, ReactNode } from 'react';
import { ViewProps, Style } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { UtilStyles } from '../../utils/Styles';
import { TagProps, TagType } from './PropsType';

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

/**
 * Tag 组件
 */
export const tagConfig: ThemeConfigTag = {
  tagStyle: {
    ...UtilStyles.flexCenter,
    flexDirection: 'row',
    height: 14,
    borderRadius: 3,
    paddingHorizontal: 3,
    overflow: 'hidden',
    fontSize: 10,
  },
  tagTypeStyleFn: (params) => {
    const {
      props: { type },
    } = params;
    const map: Record<TagType, Style> = {
      [TagType.black]: {
        color: '#111111',
        backgroundColor: '#F2F2F6',
      },
      [TagType.blackBold]: {
        color: '#fff',
        backgroundColor: '#111111',
      },
      [TagType.blue]: {
        color: '#5D90F8',
        backgroundColor: '#EFF4FE',
      },
      [TagType.blueBold]: {
        color: '#fff',
        backgroundColor: '#5D90F8',
      },
      [TagType.red]: {
        color: '#FE4F4F',
        backgroundColor: '#FFEEEE',
      },
      [TagType.redBold]: {
        color: '#fff',
        backgroundColor: '#FE4F4F',
      },
      [TagType.green]: {
        color: '#1ED272',
        backgroundColor: '#E9FBF1',
      },
      [TagType.greenBold]: {
        color: '#fff',
        backgroundColor: '#1ED272',
      },
      [TagType.yellow]: {
        color: '#F6B134',
        backgroundColor: '#FFF4E0',
      },
      [TagType.yellowBold]: {
        color: '#fff',
        backgroundColor: '#F6B134',
      },
      [TagType.purple]: {
        color: '#974BF7',
        backgroundColor: '#F4EBFF',
      },
      [TagType.purpleBold]: {
        color: '#fff',
        backgroundColor: '#974BF7',
      },
      [TagType.pink]: {
        color: '#F74670',
        backgroundColor: '#FFEDF1',
      },
      [TagType.pinkBold]: {
        color: '#fff',
        backgroundColor: '#F74670',
      },
    };
    return map[type] || map[TagType.black];
  },
};
