import React, { Component } from 'react';
import { View } from '@hippy/react';
import { LoadingProps } from './PropsType';
import Consumer from '../../provider/Consumer';
import getRenderInfo from './renderInfo';

/**
 * @visibleName Loading 加载中
 */
export class Loading extends Component<LoadingProps, {}> {
  static defaultProps = {
    accessible: true,
  };

  render() {
    return (
      <Consumer>
        {(consumerValue) => {
          const { children } = this.props;
          const { loadingProps, gif, txt } = getRenderInfo({ consumerValue, props: this.props });
          return (
            <View {...loadingProps}>
              {gif}
              {txt}
              {children}
            </View>
          );
        }}
      </Consumer>
    );
  }
}

export default Loading;
