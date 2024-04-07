import { StyleSheet, Style, GenericStyleProp, TextStyle } from '@hippy/react';
import { deepCopy } from './Utils';

/**
 * 工具：解析styleProps（数组或空）为style
 * */
export function transferStyle(style: GenericStyleProp<Style | null | undefined | false>): Style {
  let result: Style = {};
  if (Array.isArray(style)) {
    style.forEach((item) => {
      result = Object.assign({}, result, transferStyle(item));
    });
  } else {
    result = deepCopy({ ...style });
  }
  return result;
}

/**
 * 获取style中关于文字的样式
 * */
export function pickTextStyle(style: GenericStyleProp<Style>) {
  const textStyle: TextStyle = {};
  const userStyle = transferStyle(style);
  Object.keys(userStyle).forEach((key) => {
    if (['color', 'fontSize', 'fontWeight', 'lineHeight', 'textAlign'].includes(key)) {
      textStyle[key] = userStyle[key];
    }
  });
  return textStyle;
}

export const UtilStyles = StyleSheet.create({
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mask: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
