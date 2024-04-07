import { ViewProps } from '@hippy/react';
import { GlobalViewData } from '../../provider/PropsType';

export type MaskProps = ViewProps;

// 可能有多个静态蒙层需求，这里记录一下
export interface GlobalViewMaskInfo extends GlobalViewData {
  key: string;
}
