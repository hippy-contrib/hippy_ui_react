import React, { Component } from 'react';
import { View, StyleSheet, ViewStyle } from '@hippy/react';
import UImage from '../UImage';
import { GroupImageProps } from './PropsType';
import { transferStyle } from '../../utils/Styles';

/**
 * @visibleName GroupImage 拼图
 */
export class GroupImage extends Component<GroupImageProps, {}> {
  render() {
    const { size, sources, style } = this.props;
    return (
      <View style={transferStyle([{ width: size, height: size, overflow: 'hidden' }, style])}>
        {sources.length === 1 ? (
          <UImage src={sources[0]} style={{ width: size, height: size }} />
        ) : (
          <>
            {sources.map((item, i) => {
              const itemSize = size / 2 - 0.5;
              const itemPosition =
                sources.length === 2
                  ? i === 0
                    ? styles.tl
                    : styles.tr
                  : sources.length === 3
                    ? i === 0
                      ? styles.tl
                      : i === 1
                        ? styles.tr
                        : styles.br
                    : i === 0
                      ? styles.tl
                      : i === 1
                        ? styles.tr
                        : i === 2
                          ? styles.bl
                          : styles.br;
              const itemStyle: ViewStyle = {
                position: 'absolute',
                width: itemSize,
                height:
                  sources.length === 2
                    ? size
                    : sources.length === 3
                      ? i === 0
                        ? size
                        : size / 2 - 0.5
                      : size / 2 - 0.5,
                ...itemPosition,
              };

              return <UImage src={item} key={i} resizeMode="cover" style={itemStyle} />;
            })}
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tl: {
    top: 0,
    left: 0,
  },
  tr: {
    top: 0,
    right: 0,
  },
  bl: {
    bottom: 0,
    left: 0,
  },
  br: {
    bottom: 0,
    right: 0,
  },
});

export default GroupImage;
