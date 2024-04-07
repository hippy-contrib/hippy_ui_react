import { ThemeConfigColor } from './types/color';

/**
 * 色彩：常用色彩集合
 */
export enum ColorAbsolute {
  red = '#FE4F4F',
  purple = '#974BF7',
  pink = '#F74670',
  yellow = '#F6B134',
  blue = '#5D90F8',
  green = '#1ED272',
  black = '#111111',
  black70 = 'rgba(17,17,17,0.7)', // "#111111B3",
  black50 = '#888888', // "#11111180",
  black30 = 'rgba(17,17,17,0.3)', // "#1111114D",
  blackBg = '#222222',
  white = '#FFFFFF',
  white90 = 'rgba(255,255,255,0.9)', // "#FFFFFFE6",
  white70 = 'rgba(255,255,255,0.7)', // "#FFFFFFB3",
  white50 = 'rgba(255,255,255,0.5)', // "#FFFFFF80",
  white10 = 'rgba(255,255,255,0.1)', // "#FFFFFF1A",
  grey = '#F2F2F6',
  lightRed = '#FFEEEE',
  lightPurple = '#F4EBFF',
  lightPink = '#FFEDF1',
  lightYellow = '#FFF4E0',
  lightBlue = '#EFF4FE',
  lightGreen = '#E9FBF1',
}

/**
 * 色彩：亮模式
 */
export const colorConfigLight: ThemeConfigColor = {
  colorTheme: ColorAbsolute.red, // 品牌色
  colorFillBase: ColorAbsolute.white, // 默认背景色
  colorFillBody: ColorAbsolute.grey, // 通用背景色
  colorFillOther: ColorAbsolute.grey, // 补充背景色
  colorTextBase: ColorAbsolute.black, // 基本文字
  colorTextSecondary: ColorAbsolute.black50, // 辅助颜色
  colorLink: ColorAbsolute.blue, // 链接色
  colorBg: ColorAbsolute.white, // 全局背景色
};
/**
 * 色彩：暗模式
 */
export const colorConfigDark: ThemeConfigColor = {
  colorTheme: ColorAbsolute.red, // 品牌色
  colorFillBase: ColorAbsolute.blackBg, // 默认背景色
  colorFillBody: ColorAbsolute.white10, // 通用背景色
  colorFillOther: ColorAbsolute.white10, // 补充背景色
  colorTextBase: ColorAbsolute.white90, // 基本文字
  colorTextSecondary: ColorAbsolute.white50, // 辅助颜色
  colorLink: ColorAbsolute.blue, // 链接色
  colorBg: ColorAbsolute.blackBg, // 全局背景色
};
