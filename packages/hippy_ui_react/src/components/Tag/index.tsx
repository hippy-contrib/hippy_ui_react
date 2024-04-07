import React, { Component } from 'react';
import { View } from '@hippy/react';
import Consumer from '../../provider/Consumer';
import { TagProps } from './PropsType';
import getRenderInfo from './renderInfo';

/**
 * @visibleName Tag 标签
 */
export class Tag extends Component<TagProps, {}> {
  static defaultProps = {
    accessible: true,
    maxLength: 0,
  };

  render() {
    const { prefix, theme } = this.props;
    return (
      <Consumer theme={theme}>
        {(consumerValue) => {
          const { txtNode, tagProps } = getRenderInfo({ consumerValue, props: this.props });
          return (
            <View {...tagProps}>
              {prefix}
              {txtNode}
            </View>
          );
        }}
      </Consumer>
    );
  }
}

export default Tag;
