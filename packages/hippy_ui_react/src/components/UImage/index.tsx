import React, { Component } from 'react';
import { Platform, Image } from '@hippy/react';
import Consumer from '../../provider/Consumer';
import { UImageProps, UImageState } from './PropsType';
import getRenderInfo from './renderInfo';

/**
 * @visibleName UImage 图片
 */
export class UImage extends Component<UImageProps, UImageState> {
  constructor(props: UImageProps) {
    super(props);
    this.isLoad = false;
    this.state = {
      isError: false,
    };
  }

  componentDidUpdate(prevProps: UImageProps) {
    if (prevProps.src !== this.props.src) {
      // 检测到图片有更新，需要重新加载
      this.state.isError &&
        this.setState({
          isError: false,
        });
      this.isLoad = false;
    }
  }

  private isLoad: boolean;
  static resizeMode = Image.resizeMode;

  onError = (e) => {
    if (!this.state.isError) {
      this.setState({
        isError: true,
      });
      this.props.onError?.();
    }
  };

  onLoad = () => {
    this.isLoad = true;
    this.props.onSuccess?.();
  };

  onLoadEnd = () => {
    if (!this.isLoad && !this.state.isError) {
      this.setState({
        isError: true,
      });
      this.props.onError?.();
    }
  };

  render() {
    return (
      <Consumer>
        {(consumerValue) => {
          const { children, onError, onSuccess } = this.props;

          const { imgProps, imgSrc, imgRealSrc } = getRenderInfo({
            consumerValue,
            props: this.props,
            state: this.state,
          });

          // 图片加载错误处理（双端表现有差异，为提高性能，优先级：defaultSource > onError > onLoad+onLoadEnd）
          let useOnError = false; // 是否使用onError来处理图片加载错误
          let useSpecialError = true; // 是否使用特殊事件（onLoad+onLoadEnd）来处理图片加载错误
          if (onError || onSuccess) {
            useOnError = true;
            useSpecialError = true;
          } else if (Platform.OS === 'ios') {
            // IOS可以用onError事件。【如果兜底图是base64，可以用defaultSource替代onError，但怕不稳定，不用了】
            useOnError = true;
            useSpecialError = false;
          } else if (Platform.OS === 'android' && imgSrc.startsWith('http')) {
            // 安卓，如果src是http，可以用onError事件。[如果兜底图也是http，可以用defaultSource替代onError，但好像经常出现加载异常，不用这个]
            useOnError = true;
            useSpecialError = false;
          }

          return (
            <Image
              source={{ uri: imgRealSrc }}
              onError={useOnError ? this.onError : undefined}
              onLoad={useSpecialError ? this.onLoad : undefined}
              onLoadEnd={useSpecialError ? this.onLoadEnd : undefined}
              // defaultSource={useDefaultSource ? _defaultImage : undefined}
              {...imgProps}
            >
              {children}
            </Image>
          );
        }}
      </Consumer>
    );
  }
}

export default UImage;
