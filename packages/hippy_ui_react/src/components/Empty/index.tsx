import React, { Component } from 'react';
import { View } from '@hippy/react';
import Consumer from '../../provider/Consumer';
import { EmptyProps } from './PropsType';
import getRenderInfo from './renderInfo';

/**
 * @visibleName Empty 空状态
 */
export class Empty extends Component<EmptyProps, {}> {
  render() {
    return (
      <Consumer>
        {(consumerValue) => {
          const { wrapProps, img, text } = getRenderInfo({ consumerValue, props: this.props });
          return (
            <View {...wrapProps}>
              {img}
              {text}
            </View>
          );
        }}
      </Consumer>
    );
  }
}

export default Empty;
