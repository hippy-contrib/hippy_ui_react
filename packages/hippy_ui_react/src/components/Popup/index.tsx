import React, { Component } from 'react';
import { AnimationOptions, View } from '@hippy/react';
import Mask from '../Mask';
import { PopupProps, PopupState } from './PropsType';
import Consumer from '../../provider/Consumer';
import getRenderInfo from './renderInfo';
import { transferStyle } from '../../utils/Styles';
import { getSlideManager } from '../../utils/Animation';
import { WINDOW_HEIGHT } from '../../utils/Dimensions';
import { isWeb } from '../../utils/Utils';

/**
 * @visibleName Popup 半屏弹窗
 */
export class Popup extends Component<PopupProps, PopupState> {
  static defaultAnimation: Partial<AnimationOptions> = {
    duration: 300,
    timingFunction: 'linear',
    delay: 0,
  };

  static defaultProps = {
    animated: true,
    onMaskClick: () => {},
  };

  constructor(props: PopupProps) {
    super(props);
    const { animationOption, style, animated } = props;
    if (animated) {
      this.animateHasEnd = false;
      const userHeight = transferStyle(style).height;
      this.slideManager = getSlideManager({
        startValue: userHeight && typeof userHeight === 'number' ? userHeight : WINDOW_HEIGHT(),
        toValue: 0,
        ...Popup.defaultAnimation,
        ...animationOption,
      });
    }

    this.state = {
      isShow: true,
    };
  }

  componentWillUnmount() {
    if (this.slideManager) {
      this.slideManager.destroy();
      this.slideManager = null;
    }
  }

  private slideManager: ReturnType<typeof getSlideManager> | null = null;
  private animateHasEnd = true;

  /**
   * 显示弹窗
   * */
  public show = () => {
    if (!this.state.isShow) {
      this.animateHasEnd = !this.slideManager;
      this.setState({
        isShow: true,
      });
    }
  };

  /**
   * 收起弹窗
   * */
  public hide = async () => {
    try {
      await this.slideManager?.hide();
    } catch (e) {}
    return await new Promise((resolve) => {
      this.setState(
        {
          ...this.state,
          isShow: false,
        },
        () => {
          resolve(true);
        },
      );
    });
  };

  animateShow = () => {
    if (this.slideManager) {
      this.slideManager
        .show()
        .then(() => {
          this.animateHasEnd = true;
          this.props.onShow?.();
        })
        .catch(() => {});
    } else {
      this.animateHasEnd = true;
      this.props.onShow?.();
    }
  };

  render() {
    return (
      <Consumer>
        {(consumerValue) => {
          const { children, maskStyle, onMaskClick, animated, maskAccessible, maskAccessibilityLabel } = this.props;
          const { isShow } = this.state;
          const { mainProps } = getRenderInfo({ consumerValue, props: this.props });

          return isShow ? (
            <Mask
              style={maskStyle}
              onClick={onMaskClick}
              accessible={maskAccessible}
              accessibilityLabel={maskAccessibilityLabel}
            >
              <View
                style={transferStyle([
                  mainProps.style,
                  this.slideManager &&
                    animated && {
                      transform: !isWeb()
                        ? [{ translateY: this.slideManager.animation || 0 }]
                        : (`translateY(${
                            this.animateHasEnd ? 0 : (this.slideManager.options.startValue as number)
                          }px)` as any),
                    },
                ])}
                onAttachedToWindow={this.animateShow}
                ref={(r) => {
                  // web兼容
                  isWeb() && this.slideManager?.setRef({ ref: r, transformStyleAttribute: 'translateY' });
                }}
              >
                {children}
              </View>
            </Mask>
          ) : null;
        }}
      </Consumer>
    );
  }
}

export default Popup;
