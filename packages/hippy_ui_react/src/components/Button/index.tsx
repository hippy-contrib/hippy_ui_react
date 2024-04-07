import React, { Component, isValidElement, ReactNode } from 'react';
import { View, Image, TextProps } from '@hippy/react';
import { ButtonProps, ButtonSize, ButtonState, ButtonType } from './PropsType';
import { Debounce, extendObj, Throttle } from '../../utils/Utils';
import Consumer from '../../provider/Consumer';
import getRenderInfo from './renderInfo';
import HiText from '../HiText';

/**
 * - 支持自定义类型
 * - 支持自定义尺寸
 * @visibleName Button 按钮
 */
export class Button extends Component<ButtonProps, ButtonState> {
  constructor(props: ButtonProps) {
    super(props);
    this.state = {
      isPressIn: false,
    };
  }

  componentWillUnmount() {
    this.clickThrottle?.cancel();
    this.clickDebounce?.cancel();
  }

  static defaultProps: Partial<ButtonProps> = {
    accessible: true,
    type: ButtonType.default,
    size: ButtonSize.medium,
    activeStyle: true,
    round: true,
    throttle: false,
    debounce: false,
  };

  static type = ButtonType;
  static size = ButtonSize;
  private clickThrottle: Throttle<any> | null = null;
  private clickDebounce: Debounce<any> | null = null;

  // 事件：点击
  onClick = (e?: any) => {
    const { onPress, disabled, loading, throttle, debounce, onDisablePress } = this.props;
    if (disabled || loading) {
      return onDisablePress ? onDisablePress(e) : true;
    }
    if (!onPress) {
      return false;
    } else if (throttle) {
      // 节流
      !this.clickThrottle &&
        (this.clickThrottle = new Throttle(
          (e: any) => {
            const { onPress } = this.props;
            return !!onPress && onPress(e);
          },
          throttle,
          true,
        ));
      this.clickThrottle.flush(e);
    } else if (debounce) {
      // 防抖
      !this.clickDebounce &&
        (this.clickDebounce = new Debounce(
          (e: any) => {
            const { onPress } = this.props;
            return !!onPress && onPress(e);
          },
          debounce,
          true,
        ));
      this.clickDebounce.flush(e);
    } else {
      // 普通点击
      return onPress(e);
    }
  };

  // 事件：按下手势
  onPressIn = (e: any) => {
    const { disabled, loading, onPressIn } = this.props;
    if (disabled || loading) return;
    this.setState({
      isPressIn: true,
    });
    return !!onPressIn && onPressIn(e);
  };

  // 事件：抬起手势
  onPressOut = (e: any) => {
    const { disabled, loading, onPressOut } = this.props;
    this.setState({
      isPressIn: false,
    });
    if (disabled || loading) return;
    return !!onPressOut && onPressOut(e);
  };

  // 渲染：文字
  renderChildren = (children: ReactNode, textProps: TextProps): ReactNode => {
    return React.Children.map(children, (child) => {
      if (['string', 'number'].includes(typeof child)) {
        return <HiText {...textProps}>{child}</HiText>;
      } else if (isValidElement(child) && (child.type === 'Text' || child.type === 'HiText')) {
        const _textProps: TextProps = extendObj(textProps, child.props);
        return <HiText {..._textProps} />;
      } else {
        return child;
      }
    });
  };

  render() {
    const { children, activeStyle, onPress, onPressIn, onPressOut, onDisablePress, theme, disabled, loading } =
      this.props;
    const _showPress = activeStyle && this.state.isPressIn;
    const _disabled = disabled || loading;
    return (
      <Consumer theme={theme}>
        {(consumerValue) => {
          const { wrapProps, imageProps, badgeProps, textProps, pressProps } = getRenderInfo({
            consumerValue,
            props: this.props,
            state: this.state,
          });

          // events
          const events: any = {};
          if ((_disabled && onDisablePress) || (onPress && !_disabled)) {
            events.onClick = this.onClick;
          }
          if (activeStyle || onPressIn) {
            events.onPressIn = this.onPressIn;
            events.onMouseDown = this.onPressIn;
          }
          if (activeStyle || onPressOut) {
            events.onPressOut = this.onPressOut;
            events.onMouseUp = this.onPressOut;
          }

          return (
            <View {...events} {...wrapProps}>
              {imageProps.source ? <Image {...imageProps} /> : null}
              {this.renderChildren(children, textProps)}
              {badgeProps.source ? <Image {...badgeProps} /> : null}
              {_showPress ? <View {...pressProps} /> : null}
            </View>
          );
        }}
      </Consumer>
    );
  }
}

export default Button;
