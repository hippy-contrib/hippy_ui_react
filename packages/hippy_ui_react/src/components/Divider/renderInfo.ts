import { ViewStyle } from '@hippy/react';
import { DividerRenderInfo, DividerRenderParams } from '../../themeConfig/types/divider';
import { transferStyle } from '../../utils/Styles';

/** Divider：获取渲染信息 */
export default function getRenderInfo(params: DividerRenderParams): DividerRenderInfo {
  const {
    consumerValue: { themeConfig, renderInfo },
    props: { vertical, color, style: userStyle },
  } = params;

  const style: ViewStyle = transferStyle([
    themeConfig.dividerProps.style,
    vertical ? { width: themeConfig.dividerWidth } : { height: themeConfig.dividerWidth },
    color && { backgroundColor: color },
    userStyle,
  ]);

  const result: DividerRenderInfo = {
    dividerProps: {
      ...themeConfig.dividerProps,
      style,
    },
  };

  return renderInfo?.divider?.({ ...params, defaultRenderInfo: result }) || result;
}
