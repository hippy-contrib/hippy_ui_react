import { Dimensions } from '@hippy/react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const statusBarHeight = Dimensions.get('window').statusBarHeight;
/**
 * 屏宽（用函数，为服务端渲染留下口径）
 * */
export const WINDOW_WIDTH = () => {
  return windowWidth;
};
/**
 * 屏高（用函数，为服务端渲染留下口径）
 * */
export const WINDOW_HEIGHT = () => {
  return windowHeight;
};
/**
 * 电池栏高度
 * */
export const STATUSBAR_HEIGHT = () => {
  return statusBarHeight;
};
