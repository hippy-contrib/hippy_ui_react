import { PropsWithChildren } from 'react';
import { ScrollViewProps, ViewStyleProp, ViewStyle, GenericStyleProp } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { CascaderProps } from './PropsType';
import { HiTextProps, HiTextColor } from '../HiText/PropsType';

/** 主题配置：联级选择 */
export interface ThemeConfigCascader {
  cascaderWrapStyle: ViewStyleProp;
  cascaderMarkStyle: ViewStyleProp;
  cascaderScrollViewPropsFn: (index: number) => ScrollViewProps;
  cascaderItemStyle: GenericStyleProp<ViewStyle>;
  cascaderItemActiveStyle: ViewStyleProp;
  cascaderItemTxtProps: HiTextProps;
  cascaderItemActiveTxtProps: HiTextProps;
}

/** 自定义渲染：联级选择 */
export interface CascaderRenderParams<T> {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<CascaderProps<T>>;
}
export interface CascaderRenderInfo {
  wrapStyle: ViewStyleProp;
  markStyle: ViewStyleProp;
  scrollViewPropsFn: (index: number) => ScrollViewProps;
  itemStyle: ViewStyleProp;
  itemActiveStyle: ViewStyleProp;
  itemTxtProps: HiTextProps;
  itemActiveTxtProps: HiTextProps;
}
export type RenderInfoCascader<T> = (
  params: CascaderRenderParams<T> & { defaultRenderInfo: CascaderRenderInfo },
) => CascaderRenderInfo;

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
