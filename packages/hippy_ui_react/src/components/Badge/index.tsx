import React, { Component } from 'react';
import { View } from '@hippy/react';
import { BadgeProps } from './PropsType';
import Consumer from '../../provider/Consumer';
import getRenderInfo from './renderInfo';

/**
 * @visibleName Badge 标记
 */
export class Badge extends Component<BadgeProps, {}> {
  static defaultProps = {
    maxValue: 99,
  };

  render() {
    return (
      <Consumer>
        {(consumerValue) => {
          const { children } = this.props;
          const { badgeText, badgeProps, wrapProps } = getRenderInfo({ consumerValue, props: this.props });

          return (
            <View {...wrapProps}>
              {children}
              <View {...badgeProps}>{badgeText}</View>
            </View>
          );
        }}
      </Consumer>
    );
  }
}

export default Badge;
