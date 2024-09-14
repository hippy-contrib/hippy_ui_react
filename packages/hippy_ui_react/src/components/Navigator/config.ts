import { PropsWithChildren, ReactNode } from 'react';
import { ViewStyleProp, ImageProps } from '@hippy/react';
import { ThemeMode } from '../../themeConfig/index';
import { ConsumerValue } from '../../provider/PropsType';
import { STATUSBAR_HEIGHT } from '../../utils/Dimensions';
import { NavigatorProps } from './PropsType';
import { HiTextProps } from '../HiText/PropsType';

/** 主题配置：导航栏 */
export interface ThemeConfigNavigator {
  navigatorBackPropsFn: (params: NavigatorRenderParams) => ImageProps;
  navigatorStyle: ViewStyleProp;
  navigatorTitlePropsFn: (params: NavigatorRenderParams) => HiTextProps;
  navigatorStatusBarStyle: ViewStyleProp;
  navigatorWrapStyle: ViewStyleProp;
}

/** 自定义渲染：导航栏 */
export interface NavigatorRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<NavigatorProps>;
}
export interface NavigatorRenderInfo {
  wrapStyle: ViewStyleProp;
  statusBarStyle: ViewStyleProp;
  navigatorStyle: ViewStyleProp;
  back: ReactNode;
  title: ReactNode;
}
export type RenderInfoNavigator = (
  params: NavigatorRenderParams & { defaultRenderInfo: NavigatorRenderInfo },
) => NavigatorRenderInfo;

/**
 * Navigator 组件
 */
export const navigatorConfig: ThemeConfigNavigator = {
  navigatorWrapStyle: {},
  navigatorStatusBarStyle: {
    height: STATUSBAR_HEIGHT(),
  },
  navigatorStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
  },
  navigatorBackPropsFn: (params) => {
    const {
      consumerValue: { theme },
      props: { back, theme: propsTheme },
    } = params;
    const uriWhite =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAkUExURUdwTP///////////////////////////////////////////xR6XWcAAAALdFJOUwDdIIFfMO9IoxBvT6WWbwAAAKhJREFUOMvN07EOAUEUheEba4NOdLINtUYp2Ual0dB4A5VGr9HqPIJaJyNWnJez+vNLJIqd8p58xZw7E9GQ07uOfDDW0M5bhe4AVAFQH8DtDODkwFp6unm+k44u2HwBUxcspOTmbQFY/gpKABmBiaDvg3QJEAMbdOvC/bZLItmfyTagrccqoF9/+069wnnA0l82yAuo+PMSEz12JhWRRD+qgj8420fDzxvSrEzZSe8rLgAAAABJRU5ErkJggg==';
    const uriBlack =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIBAMAAACnw650AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAhUExURUdwTBERERERERAQEBERERERERAQEBAQEBAQEBAQEBEREfZ+ZJQAAAAKdFJOUwCB5SCizmIQNFBZusZZAAAA+UlEQVRIx+2WsQqCUBSGjxjW6NLSJAglThG0C229gOAUtTU11F4+QfQGWVacp8zr3f1/4rZ55o9P7/X/D4r089v44xWGFqpXxIxS1QhBpao+CJG+AXRrGM26mcAw1bwb2hsoJkQ1EE0MlHczXis6OBI9GVHGiMSR6A5EawOF3czAlehEiIaFI5HfijawRqov5mhAJOZpU1Q20yNY2wLH3wYAFcl+uESI41VnIcKUMG8Fb8pj7tyqQnEQcbtQkCqgVFtG1a5LqCqJCoufElvFpjhnVDWlihkVTN+SUbV1h6qjUUVMkD9CdAJCJn0zCHk4681cdv0vzR/nC3vQowVgv1ZeAAAAAElFTkSuQmCC';
    return {
      accessible: true,
      accessibilityLabel: '返回 按钮',
      source: { uri: typeof back === 'string' ? back : (propsTheme || theme) === ThemeMode.dark ? uriWhite : uriBlack },
      style: {
        width: 24,
        height: 24,
        backgroundColor: 'transparent',
      },
    };
  },
  navigatorTitlePropsFn: (params) => {
    return {
      numberOfLines: 1,
      theme: params.props.theme,
      style: {
        flex: 1,
        flexShrink: 1,
        marginHorizontal: 16,
        fontSize: 17,
        fontWeight: '500',
      },
    };
  },
};
