import React, { Component } from 'react';
import { View } from '@hippy/react';
import Consumer from '../../provider/Consumer';
import getRenderInfo from './renderInfo';
import { ListItemProps } from './PropsType';
import Button from '../Button';

/**
 * @visibleName ListItem 列表条目
 */
export class ListItem extends Component<ListItemProps, any> {
  static defaultProps = {
    leftAccessible: true,
  };

  render() {
    return (
      <Consumer>
        {(consumerValue) => {
          const { extraOperate } = this.props;
          const { wrapProps, leftProps, leftInfoProps, rank, thumb, title, note, moreNote, buttonProps } =
            getRenderInfo({ consumerValue, props: this.props });
          return (
            <View {...wrapProps}>
              <View {...leftProps}>
                {rank}
                {thumb}
                <View {...leftInfoProps}>
                  {title}
                  {note}
                  {moreNote}
                </View>
              </View>
              {extraOperate ?? null}
              {buttonProps ? <Button {...buttonProps} /> : null}
            </View>
          );
        }}
      </Consumer>
    );
  }
}

export default ListItem;
