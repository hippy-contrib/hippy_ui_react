import { ThemeConfigCascader } from './types/cascader';
import { HiTextColor } from '../components/HiText/PropsType';

/**
 * Cascader 组件
 */
export const cascaderConfig: ThemeConfigCascader = {
  cascaderWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cascaderScrollViewPropsFn: () => {
    return {
      bounces: true,
      style: {
        flex: 1,
      },
    };
  },
  cascaderItemStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'move',
  },
  cascaderItemActiveStyle: {},
  cascaderItemTxtProps: {
    size: 17,
    color: HiTextColor.textSecondary,
  },
  cascaderItemActiveTxtProps: {
    color: HiTextColor.textBase,
  },
  cascaderMarkStyle: {
    pointerEvents: 'none',
    position: 'absolute',
    left: 16,
    right: 16,
    borderRadius: 8,
    backgroundColor: '#e4e4e480',
  } as any,
};
