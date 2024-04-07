import { Style } from '@hippy/react';
import { ThemeConfigTag } from './types/tag';
import { UtilStyles } from '../utils/Styles';
import { TagType } from '../components/Tag/PropsType';

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
