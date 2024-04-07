import { ViewStyle } from '@hippy/react';
import { hiTextConfig } from './hiText';
import { ThemeConfigButton } from './types/button';
import { ThemeMode } from './index';
import { ButtonSize, ButtonType } from '../components/Button/PropsType';
import { transferStyle, UtilStyles } from '../utils/Styles';
import { HiTextProps } from '../components/HiText/PropsType';

/**
 * Button 组件
 */
export const buttonConfig: ThemeConfigButton = {
  // 容器样式
  buttonWrapStyleFn: (params) => {
    const {
      props: { size, type, disabled, loading, image },
      consumerValue: { themeConfig, theme },
    } = params;
    const _disabled = disabled || loading;
    let wrapperStyle: ViewStyle = {
      ...UtilStyles.flexCenter,
      flexDirection: 'row',
      overflow: 'hidden',
      outline: 'none',
    };
    const buttonBorderColor = theme === ThemeMode.dark ? 'rgba(255,255,255,0.1)' : '#F2F2F6';
    // 1. type
    if (type === ButtonType.normal) {
      wrapperStyle.borderWidth = 1;
      wrapperStyle.borderColor = buttonBorderColor;
      wrapperStyle.backgroundColor = themeConfig.colorBg;
    } else if (type === ButtonType.primary) {
      wrapperStyle.backgroundColor = _disabled ? buttonBorderColor : themeConfig.colorTheme;
    } else if (type === ButtonType.text) {
      // pass
    } else {
      wrapperStyle.backgroundColor = _disabled ? buttonBorderColor : themeConfig.colorFillBody;
    }
    // 2. size
    if (size === ButtonSize.huge) {
      // 2.1 ButtonSize.huge
      wrapperStyle = transferStyle([
        wrapperStyle,
        {
          borderRadius: 3.6,
          height: 36,
          paddingLeft: 32,
          paddingRight: 32,
        },
        image && {
          paddingLeft: 22,
          paddingRight: 24,
        },
      ]);
    } else if (size === ButtonSize.big) {
      // 2.1 ButtonSize.big
      wrapperStyle = transferStyle([
        wrapperStyle,
        {
          borderRadius: 4,
          height: 40,
          paddingLeft: 32,
          paddingRight: 32,
        },
        image && {
          paddingLeft: 18,
          paddingRight: 20,
        },
      ]);
    } else if (size === ButtonSize.small) {
      // 2.1 ButtonSize.small
      wrapperStyle = transferStyle([
        wrapperStyle,
        {
          borderRadius: 2.4,
          height: 24,
          minWidth: 52,
          paddingLeft: 16,
          paddingRight: 16,
        },
        image && {
          paddingLeft: 6,
          paddingRight: 8,
        },
      ]);
    } else {
      // 2.4 ButtonSize.medium
      wrapperStyle = transferStyle([
        wrapperStyle,
        {
          borderRadius: 3.2,
          height: 32,
          minWidth: 64,
          paddingLeft: 20,
          paddingRight: 20,
        },
        image && {
          paddingLeft: 10,
          paddingRight: 12,
        },
      ]);
    }
    return wrapperStyle;
  },
  // 图片样式
  buttonImgStyleFn: (params) => {
    const {
      props: { size },
    } = params;
    let imageStyle: ViewStyle = {};
    if (size === ButtonSize.huge) {
      // ButtonSize.huge
      imageStyle = transferStyle([
        imageStyle,
        {
          width: 24,
          height: 24,
          marginRight: 2,
        },
      ]);
    } else if (size === ButtonSize.big) {
      // ButtonSize.big
      imageStyle = transferStyle([
        imageStyle,
        {
          width: 24,
          height: 24,
          marginRight: 2,
        },
      ]);
    } else if (size === ButtonSize.small) {
      // ButtonSize.small
      imageStyle = transferStyle([
        imageStyle,
        {
          width: 16,
          height: 16,
          marginRight: 2,
        },
      ]);
    } else {
      // ButtonSize.medium
      imageStyle = transferStyle([
        imageStyle,
        {
          width: 20,
          height: 20,
          marginRight: 2,
        },
      ]);
    }
    return imageStyle;
  },
  // 遮罩样式
  buttonPressStyleFn: () => {
    return {
      backgroundColor: 'rgba(0,0,0,0.2)',
    };
  },
  // 文本属性
  buttonTextPropsFn: (params) => {
    const {
      props: { type, size, disabled, loading },
      consumerValue: { themeConfig, theme },
    } = params;
    const _disabled = disabled || loading;
    const textProps: HiTextProps = { style: {} };
    if (type === ButtonType.normal) {
      textProps.color = themeConfig.colorTheme;
    } else if (type === ButtonType.primary) {
      textProps.color = '#fff';
    } else if (type === ButtonType.text) {
      textProps.color = themeConfig.colorTheme;
    } else {
      textProps.color = themeConfig.colorTextBase;
    }

    if (size === ButtonSize.huge) {
      textProps.size = 15;
      textProps.weight = hiTextConfig.hiTextWeightBold;
    } else if (size === ButtonSize.big) {
      textProps.size = 14;
      textProps.weight = hiTextConfig.hiTextWeightMedium;
    } else if (size === ButtonSize.small) {
      textProps.size = 12;
      textProps.weight = hiTextConfig.hiTextWeightMedium;
    } else {
      textProps.size = 14;
      textProps.weight = hiTextConfig.hiTextWeightMedium;
    }

    _disabled && (textProps.color = theme === ThemeMode.dark ? 'rgba(255,255,255,0.2)' : 'rgba(17,17,17,0.2)');
    return textProps;
  },
  // 前置图
  buttonPreImgFn: (params) => {
    const {
      props: { image },
      consumerValue: { theme },
    } = params;
    if (image === 'search') {
      return theme === ThemeMode.dark
        ? `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAtUExURUdwTP///////////////////////////////////////////////////////81e3QIAAAAOdFJOUwAg3+/DoYBbQBCQcDCPtYV/nAAAAVZJREFUOMvNk7FKA0EQhjfBmJyxOCJaa2d1xNLmsAhaCOEK09umOYyFWknKVCIINraCXbDwASQPID6B4G2iIcT/Gdw792Zn9GzFrf6bb3ZmdmZOqT89pcHALzB7DyGg936gWhvZmXwj3gvs+bgUYGRMutUy0bAhAhnLvgmyfGx4n4EnYPNLGTJnhYaY5aFjaJe/DBzmehHYIRDjTRV9lAJEDlSg87B1JOxZXkhxy3jntcdoWnWBbQ6uMCWXiIMKZW/jiIMqJgQexVyQWAWIjnrQBOQM6PtXEMCXOXRxVTWMrRrimYMlzKw6xzoHrkOuB7ZDr1YtUFCbMqJsuOcdQd/5bDmwQq1KtZuUGafzqrM1G4m4Q1qTa7OLYgGQ9FJxE6SLLeYM7J6d3qa/grhSDfJt171AXFnN7V3VgOjdWnYn6WYFN8UYTg46d9lzGrKpzKXjq396PgEWbrzS6GU46wAAAABJRU5ErkJggg==`
        : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAYAAACcXioiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOkSURBVHgB7VkxU9RAFH45CxiqHDMMQ5draTisriP+AsDKDvQHqP+Ao3JsFCupBH6BUGqhoTsbCX8AQkN7KaEA/N7x1GRNdrO53Hk6+WZ2kt1k973vvd2X3ReiGjVq1PibcKgiuK7r4bKK0nYcx+cmKYwYJeJyd3cX4HoUx3FEFWBoAlB8Ewpv4NYnO4QgswMiBzQEShOA4j4U38OtR8OBvdItS+QBWQKKuzMzM69wu0u/p8gwcGGINYzpTk1NfbsCbDpbeYDnOYR9xG0767nM70OUY5QIVo2lnyt9llDWZI1kgb3xyGZ9FCYgyn+ljCkDofu4bBcVLAu+K2tHhRWJQgTYghB2Qn8qz8LWISykEtAYJRQSsWmMBhVAo9HYUoVA8AGELJdVnsFW5jFQDpVHbZFphNEDEib3km0sEMLXqULMzs7uY9wNRQ57IdD1M3oAyquWiFCeUsW4vb19KWMnZe+Z+mkJsPVJmTpF56YteExeT0qzBx02dP20BGCBF8k6R5uqtgBZ4PUEGQeKDpu6PrlrQCLEebINg7dGSaCMXJ0H1pR6MGrlGRKZAtLr8gu5BGCFlWQdgx7R+KDKWsp7UecBT6mXjvclECQrmq3HxBKIlHruplFHINVpFKEzDxmyShH4J6AjkLKCbInHggxZud4vTICGP3nZQD1vRHkv5hJA2DxWmnwaH1IEoMtF3os6D6SiDkLZqu/7NCasKvUg78X/dyuR9UnnQ8bi4iKNEpDRVZpCndFMYTS1MwShzcvLy+Vut0ujAFs/41Czo+tjPJE1m80zXFqJJvbMQ1ilTxUi59wd9fv9lq6f8UMGZZ8pTR7c/GZ+ft6p0hNZSTJOeJn6GRNbyDNF09PTbJ1Oorl9c3Oz1Ov1Pnc6nasoiqgsJFH2HrdPku2Q9w7Wf23qX3QrsY1yorRxgup7GIathYUFp0yIhe6cCD7htaU+wxk5KjJGIQJyXn2M23PlEYe8s+vr6w9MZG5uzkF2gTzPI9304sXKWYicXNMAePbWdB4evEcWkBj9hdKLOolADj6ndB/++tLPFUVXOA9KFl919o4u8WudnRZltuTAX9n/BZ7zPG3Y8uozHQnr7PTVPT5hYV9AGB/1mNAwRAbpSSzYXYzbk3FTZ2Cuoz3C81O1cyU/OHB5DiFtmzHlK7+fZdmsbCAQg2RTfXcUv5g4GcBrhes/BfLWPBaleZNo/MWUQcL4UZs4MAnsBM5R+uLpGjVq1Jgw/ADteL4cZYbYpAAAAABJRU5ErkJggg==`;
    } else {
      return undefined;
    }
  },
  // 标记图
  buttonBadgeFn: (params) => {
    const {
      props: { badge, type },
    } = params;
    if (badge === 'vip') {
      return type === ButtonType.primary
        ? `https://qzonestyle.gtimg.cn/aoi/sola/20200221170128_I0UnbUr36c.png`
        : `https://qzonestyle.gtimg.cn/aoi/sola/20200221170128_ZR0A9LvMVN.png`;
    } else {
      return undefined;
    }
  },
};
