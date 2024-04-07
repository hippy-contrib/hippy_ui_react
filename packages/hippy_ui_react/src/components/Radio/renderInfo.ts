import { ViewStyle } from '@hippy/react';
import { HiTextProps } from '../HiText/PropsType';
import { RadioRenderInfo, RadioRenderParams } from '../../themeConfig/types/radio';
import { transferStyle } from '../../utils/Styles';

/** Radio：获取渲染信息 */
export default function getRenderInfo(params: RadioRenderParams): RadioRenderInfo {
  const {
    consumerValue: { renderInfo, themeConfig },
    state: { checked },
  } = params;
  const { wrapStyle, imgStyle, textProps } = getStyle(params);
  const result: RadioRenderInfo = {
    wrapProps: { style: wrapStyle, accessible: true },
    imgProps: {
      source: {
        uri: themeConfig.radioCheckImg[checked ? 'checked' : 'noCheck'],
      },
      style: imgStyle,
      accessibilityLabel: checked ? '已选中' : '未选中',
    },
    textProps,
  };
  return renderInfo?.radio?.({ ...params, defaultRenderInfo: result }) || result;
}

function getStyle(params: RadioRenderParams) {
  const {
    consumerValue: { themeConfig },
    props: { style, disabled, label, children },
  } = params;

  let wrapStyle: ViewStyle = themeConfig.radioStyle;
  if (!label && !children) {
    wrapStyle.marginRight = 0;
  }
  wrapStyle = transferStyle([wrapStyle, style, disabled && themeConfig.radioDisabledStyle]);
  const imgStyle: ViewStyle = themeConfig.radioImgStyle;
  const textProps: HiTextProps = themeConfig.radioTextProps;

  return {
    wrapStyle,
    imgStyle,
    textProps,
  };
}
