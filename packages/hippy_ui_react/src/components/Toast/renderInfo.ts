import { TextStyle, ViewStyle } from '@hippy/react';
import { ToastRenderInfo, ToastRenderParams, toastConfig } from './config';
import { pickTextStyle, transferStyle, UtilStyles } from '../../utils/Styles';

/** Toast：获取渲染信息 */
export default function getRenderInfo(params: ToastRenderParams): ToastRenderInfo {
  const {
    consumerValue: { renderInfo },
    props: { pointerEvents },
  } = params;
  const { mainStyle, maskStyle, textStyle } = getStyles(params);

  const result: ToastRenderInfo = {
    maskProps: {
      style: maskStyle,
    },
    mainProps: {
      style: mainStyle,
    },
    textProps: {
      style: textStyle,
    },
  };
  if (pointerEvents !== 'none') {
    result.maskProps.onClick = () => {};
  }
  return renderInfo?.toast?.({ ...params, defaultRenderInfo: result }) || result;
}

/** Toast：获取渲染样式 */
function getStyles(params: ToastRenderParams) {
  const {
    consumerValue: { themeConfig: _themeConfig },
    props: { style },
  } = params;

  const themeConfig = { ...toastConfig, ..._themeConfig };
  const maskStyle: ViewStyle = {
    ...UtilStyles.mask,
    justifyContent: 'center',
    zIndex: themeConfig.zIndexToast,
  };
  const mainStyle: ViewStyle = transferStyle([themeConfig.toastStyle, style]);

  const _txtStyle = pickTextStyle(style);
  const textStyle: TextStyle = transferStyle([themeConfig.toastTextStyle, _txtStyle]);

  return {
    mainStyle,
    maskStyle,
    textStyle,
  };
}
