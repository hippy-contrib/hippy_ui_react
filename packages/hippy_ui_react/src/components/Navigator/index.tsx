import React, { Component } from 'react';
import { View } from '@hippy/react';
import { NavigatorProps, NavigatorState } from './PropsType';
import Consumer from '../../provider/Consumer';
import { STATUSBAR_HEIGHT } from '../../utils/Dimensions';
import getRenderInfo from './renderInfo';

/**
 * @visibleName Navigator 导航栏
 */
export class Navigator extends Component<NavigatorProps, NavigatorState> {
  static defaultProps = {
    titleCenter: true,
  };

  /**
   * 导航栏高度
   * */
  static height = STATUSBAR_HEIGHT() + 48;

  constructor(props: NavigatorProps) {
    super(props);
    this.state = {
      leftExtWidth: 0,
      rightExtWidth: 0,
    };
  }

  private leftWidth = 0;
  private navigatorWidth = 0;
  private rightStartX = 0;

  // 保持左右宽度一致，以便标题能居中
  initTitleCenter = () => {
    const { leftWidth, navigatorWidth, rightStartX } = this;
    if (leftWidth && navigatorWidth && rightStartX) {
      const rightWidth = navigatorWidth - rightStartX;
      let leftExtWidth = 0;
      let rightExtWidth = 0;
      if (rightWidth > leftWidth) {
        leftExtWidth = rightWidth - leftWidth;
      } else if (leftWidth > rightWidth) {
        rightExtWidth = leftWidth - rightWidth;
      }
      if (leftExtWidth !== this.state.leftExtWidth || rightExtWidth !== this.state.rightExtWidth) {
        this.setState({
          leftExtWidth,
          rightExtWidth,
        });
      }
    }
  };

  render() {
    const { leftNodes, rightNodes, titleCenter, theme } = this.props;
    return (
      <Consumer theme={theme}>
        {(consumerValue) => {
          const { leftExtWidth, rightExtWidth } = this.state;
          const { wrapStyle, statusBarStyle, navigatorStyle, title, back } = getRenderInfo({
            consumerValue,
            props: this.props,
          });
          return (
            <View
              style={wrapStyle}
              onLayout={(e) => {
                Navigator.height = e.layout.height;
              }}
            >
              <View style={statusBarStyle} />
              <View
                style={navigatorStyle}
                onLayout={(e) => {
                  if (this.navigatorWidth !== e.layout.width) {
                    this.navigatorWidth = e.layout.width;
                    this.initTitleCenter();
                  }
                }}
              >
                {back}
                {leftNodes}
                <View
                  style={titleCenter ? { width: leftExtWidth } : undefined}
                  onLayout={(e) => {
                    if (this.leftWidth !== e.layout.x) {
                      this.leftWidth = e.layout.x;
                      this.initTitleCenter();
                    }
                  }}
                />
                {title}
                <View
                  style={titleCenter ? { width: rightExtWidth } : undefined}
                  onLayout={(e) => {
                    const rightStartX = e.layout.x + e.layout.width;
                    if (rightStartX !== this.rightStartX) {
                      this.rightStartX = rightStartX;
                      this.initTitleCenter();
                    }
                  }}
                />
                {rightNodes}
              </View>
            </View>
          );
        }}
      </Consumer>
    );
  }
}

export default Navigator;
