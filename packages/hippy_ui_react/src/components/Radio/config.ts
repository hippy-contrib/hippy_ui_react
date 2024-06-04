import { PropsWithChildren } from 'react';
import { ViewProps, ViewStyle, ImageProps } from '@hippy/react';
import { ConsumerValue } from '../../provider/PropsType';
import { RadioProps, RadioState } from './PropsType';
import { HiTextProps } from '../HiText/PropsType';

/** 主题配置：选择框 */
export interface ThemeConfigRadio {
  radioStyle: ViewStyle;
  radioDisabledStyle: ViewStyle;
  radioImgStyle: ViewStyle;
  radioCheckImg: {
    checked: string;
    noCheck: string;
  };
  radioTextProps: HiTextProps;
}

/** 自定义渲染：选择框 */
export interface RadioRenderParams {
  consumerValue: ConsumerValue;
  props: PropsWithChildren<RadioProps>;
  state: RadioState;
}
export interface RadioRenderInfo {
  wrapProps: ViewProps;
  imgProps: ImageProps;
  textProps: HiTextProps;
}
export type RenderInfoRadio = (params: RadioRenderParams & { defaultRenderInfo: RadioRenderInfo }) => RadioRenderInfo;

/**
 * Radio 组件
 */
export const radioConfig: ThemeConfigRadio = {
  radioStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
  },
  radioDisabledStyle: {
    opacity: 0.5,
  },
  radioImgStyle: {
    width: 18,
    height: 18,
    backgroundColor: 'transparent',
  },
  radioCheckImg: {
    checked:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAB7UExURUdwTP0YGP+AgP////8ZGf0XF/0YGP0YGP0YGPwYGP8gIP8aGv0XF/0YGP0YGP0XF/0YGPwXF/////78/P1nZ/7W1vwqKv1oaPwpKf7f3/xISPwYGPwkJPwdHf7Pz/woKP76+v7s7P1tbfwmJv7AwPxFRfxiYv7Q0PxGRqI4VCIAAAARdFJOUwDiAgFThXbp2b8IPPOMqPKLUXlpxAAAAN9JREFUOMvF1NsSgiAQBmBRUVGwFjO187ne/wlLRZLTDFf1X+HwzYi7rEHwv4QFIxmlGWFF6CB5koJMmuQ2EyNQgmKDRBiM4EgzJVhSqgqDNVg5DzgyO1eOXAh9vzEBZxJZw9TcvF52Y72mqhamWdf8sB1WhUDMZvjpOCyZQMRmqtW4JgJlYm9vMZAJRMfHzfnZGgaoim6c161uYKG+7lH1SjPyddPBm4/qOtXIg8sS9EozsDSK2SvVyGLO2tJUmpFtmTf4dXc02O+qeF06v+vrNwheI+U3nJ5j7vfD+EXeoU8v5fbmN2QAAAAASUVORK5CYII=',
    noCheck:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABaUExURUdwTKurq7+/v7+/v6urq7GxsaysrP///////62traysrKysrK2tra2tra6urqysrKysrP///6ysrK6urqurq6ysrKurq6urq6ysrKysrKurq6ysrKysrKurq53Vel0AAAAddFJOUwDlCAyxDVMCAYXZ4nZkJr/jA5Q8SenzjKiRkvKLZ+ecTAAAAN1JREFUOMvFVNkSgyAMVFHxBMEDe+z//2bjjFoP2okvbZ5CXMNmkxAE/zPZOl0MQ6FdKz9AoqrHan0V+TBpiZ2V6QmS5dOHxnZKCNXZZjrl2QEzUjCszXI2dUiBcY+a8sTJNpLEU64dHwrcDgXJOwU3vCLiHJ+KlpSrfNdYEZ/kXG9CvKr1F9Kn9qlSk17LBS3VbnwgQ0q0s+8A62+CBdzsaqDzgzpAz24BKD9IAcXsDoDwgwQwcECPK9exiH+V4HlFTFZbWA3mjQpr6Hjjy1sE1krxlpO55rwH4xf2AnoNHD3thbiJAAAAAElFTkSuQmCC',
  },
  radioTextProps: {
    style: {
      marginLeft: 12,
    },
  },
};
