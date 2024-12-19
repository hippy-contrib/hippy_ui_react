import React, { isValidElement } from 'react';
import { Image, ViewProps, ViewStyle } from '@hippy/react';
import { SearchRenderInfo, SearchRenderParams, searchConfig } from './config';
import { transferStyle } from '../../utils/Styles';
import { getObjectType, isWeb, ObjectType } from '../../utils/Utils';

/** Search：获取渲染信息 */
export default function getRenderInfo(params: SearchRenderParams): SearchRenderInfo {
  const {
    consumerValue: { renderInfo, themeConfig: _themeConfig },
    props: { leftIcon, inputProps, wrapProps, rightIcon, clearIcon },
    state: { value },
    onClear,
  } = params;
  const themeConfig = { ...searchConfig, ..._themeConfig };
  const { wrapStyle, leftIconStyle, clearIconStyle, inputStyle } = getStyle(params);

  const clearProps: ViewProps & { onMouseDown?: () => void } = isWeb()
    ? {
        onMouseDown: (e?: any) => {
          onClear();
          (clearIcon as any)?.onMouseDown?.(e);
        },
        onPressIn: (e?: any) => {
          onClear();
          (clearIcon as any)?.onPressIn?.(e);
        },
      }
    : {
        onClick(e?: any) {
          onClear();
          (clearIcon as any)?.onClear?.(e);
        },
      };

  const result: SearchRenderInfo = {
    wrapProps: { ...wrapProps, style: wrapStyle },
    leftIcon:
      leftIcon === null ? null : isValidElement(leftIcon) ? (
        leftIcon
      ) : (
        <Image {...themeConfig.searchLeftIconPropsFn(params)} {...(leftIcon as any)} style={leftIconStyle} />
      ),
    rightIcon,
    clearIcon:
      clearIcon === null ? null : isValidElement(clearIcon) ? (
        clearIcon
      ) : (
        <Image
          {...themeConfig.searchClearIconPropsFn(params)}
          {...(clearIcon as any)}
          style={clearIconStyle}
          {...clearProps}
        />
      ),
    inputProps: {
      ...themeConfig.searchInputPropsFn(params),
      ...inputProps,
      style: inputStyle,
    },
  };
  value && result.clearIcon && (result.rightIcon = result.clearIcon);
  return renderInfo?.search?.({ ...params, defaultRenderInfo: result }) || result;
}

/** Search：获取样式信息 */
function getStyle(params: SearchRenderParams) {
  const {
    consumerValue: { themeConfig: _themeConfig },
    props: { wrapProps, inputProps, clearIcon, leftIcon },
  } = params;

  const themeConfig = { ...searchConfig, ..._themeConfig };
  const wrapStyle: ViewStyle = transferStyle([themeConfig.searchWrapPropsFn(params).style, wrapProps?.style]);
  const leftIconStyle: ViewStyle = transferStyle([
    themeConfig.searchLeftIconPropsFn(params).style,
    getObjectType(leftIcon) === ObjectType.Object && (leftIcon as any)?.style,
  ]);
  const clearIconStyle: ViewStyle = transferStyle([
    themeConfig.searchClearIconPropsFn(params).style,
    getObjectType(clearIcon) === ObjectType.Object && (clearIcon as any)?.style,
  ]);
  const inputStyle: ViewStyle = transferStyle([themeConfig.searchInputPropsFn(params).style, inputProps?.style]);
  return {
    wrapStyle,
    leftIconStyle,
    clearIconStyle,
    inputStyle,
  };
}
