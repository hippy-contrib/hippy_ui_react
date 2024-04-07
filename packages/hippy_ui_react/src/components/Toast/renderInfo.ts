import { TextStyle, ViewStyle } from '@hippy/react';
import { ToastRenderInfo, ToastRenderParams } from '../../themeConfig/types/toast';
import { UtilStyles } from '../../utils/Styles';

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
  return renderInfo?.toast({ ...params, defaultRenderInfo: result }) || result;
}

/** Toast：获取渲染样式 */
function getStyles(params: ToastRenderParams) {
  const {
    consumerValue: { themeConfig },
  } = params;

  const maskStyle: ViewStyle = {
    ...UtilStyles.mask,
    justifyContent: 'center',
    zIndex: themeConfig.zIndexToast,
  };
  const mainStyle: ViewStyle = {
    ...themeConfig.toastStyle,
  };
  const textStyle: TextStyle = {
    ...themeConfig.toastTextStyle,
  };

  return {
    mainStyle,
    maskStyle,
    textStyle,
  };
}
