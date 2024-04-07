import React, { Component } from 'react';
import { View } from '@hippy/react';
import Consumer from '../../provider/Consumer';
import { IndicatorProps } from './PropsType';
import getRenderInfo from './renderInfo';

/**
 * @visibleName Indicator 指示器
 */
export class Indicator extends Component<IndicatorProps, {}> {
  render() {
    return (
      <Consumer>
        {(consumerValue) => {
          const { wrapProps, itemList } = getRenderInfo({ consumerValue, props: this.props });
          return <View {...wrapProps}>{itemList}</View>;
        }}
      </Consumer>
    );
  }
}

export default Indicator;
