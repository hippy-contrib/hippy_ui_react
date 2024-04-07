import React, { Component } from 'react';
import { View } from '@hippy/react';
import Consumer from '../../provider/Consumer';
import { DividerProps } from './PropsType';
import getRenderInfo from './renderInfo';

/**
 * @visibleName Divider 分割线
 */
export class Divider extends Component<DividerProps, {}> {
  render() {
    return (
      <Consumer>
        {(consumerValue) => {
          const { dividerProps } = getRenderInfo({ consumerValue, props: this.props });
          return <View {...dividerProps} />;
        }}
      </Consumer>
    );
  }
}

export default Divider;
