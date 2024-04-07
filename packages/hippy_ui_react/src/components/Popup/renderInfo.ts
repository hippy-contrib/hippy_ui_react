import { PopupRenderInfo, PopupRenderParams } from '../../themeConfig/types/popup';
import { transferStyle } from '../../utils/Styles';

/** Popup：获取渲染信息 */
export default function getRenderInfo(params: PopupRenderParams): PopupRenderInfo {
  const {
    consumerValue: { themeConfig, renderInfo },
    props: { style },
  } = params;

  const result: PopupRenderInfo = {
    mainProps: {
      ...themeConfig.popupWrap,
      style: transferStyle([{ backgroundColor: themeConfig.colorFillBase }, themeConfig.popupWrap.style, style]),
    },
  };

  return renderInfo?.popup?.({ ...params, defaultRenderInfo: result }) || result;
}
