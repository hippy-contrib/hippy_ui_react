import React, { Component, isValidElement, ReactElement } from 'react';
import { View, ViewProps, ScrollView, PixelRatio, ViewStyle } from '@hippy/react';
import { MarqueeProps, MarqueeState } from './PropsType';
import Consumer from '../../provider/Consumer';
import getRenderInfo from './renderInfo';
import { getObjectType, isWeb, ObjectType } from '../../utils/Utils';
import { getElementFromFiberRef, getWebElementFromFiberRef, HippyElement } from '../../utils/Polyfill';
import { ConfigCommon } from '../../provider/ConfigCommon';

/**
 * Children变更会导致动画从头开始
 * @visibleName Marquee 滚动播放
 */
export class Marquee extends Component<MarqueeProps, MarqueeState> {
  static defaultProps = {
    animationInterval: 20,
    animationOffset: 1,
    spacing: 20,
  };

  constructor(props: MarqueeProps) {
    super(props);
    this.state = {
      horizontalWrapWidth: 0,
      horizontalChildrenWidth: 0,
    };
  }

  componentDidMount() {
    this.start({ delay: this.getAnimationDelay() });
    ConfigCommon.commonListenActiveAdd?.(this.onPageActiveChange);
  }

  shouldComponentUpdate(
    nextProps: Readonly<MarqueeProps>,
    nextState: Readonly<MarqueeState>,
    nextContext: any,
  ): boolean {
    // children变更
    if (this.getChildren().length !== this.getChildren(nextProps).length) {
      this.currentIndex = 0;
      this.contentOffset = 0;
    }
    if (
      this.state.horizontalWrapWidth !== nextState.horizontalWrapWidth ||
      this.state.horizontalChildrenWidth !== nextState.horizontalChildrenWidth
    ) {
      this.contentOffset = 0;
    }
    return true;
  }

  componentDidUpdate(prevProps: Readonly<MarqueeProps>, prevState: Readonly<MarqueeState>, snapshot?: any) {
    // disabled
    if (this.props.disabled && !prevProps.disabled) {
      this.stop();
    } else if (!this.props.disabled && prevProps.disabled) {
      this.start();
    }
    // 横向滚动布局变更
    if (
      this.state.horizontalWrapWidth !== prevState.horizontalWrapWidth ||
      this.state.horizontalChildrenWidth !== prevState.horizontalChildrenWidth
    ) {
      this.start({ delay: this.getAnimationDelay() });
    }
    // children变更
    if (this.props.children !== prevProps.children && isWeb()) {
      if (this.props.vertical) {
        Object.keys(this.childrenRefs).forEach((index) => {
          const idx = Number(index);
          const node = getWebElementFromFiberRef(this.childrenRefs[idx]);
          this.childrenLayouts[idx] = node?.offsetTop + node?.clientHeight;
        });
        this.start({ delay: this.getAnimationDelay() });
      } else {
        const horizontalWrapWidth = this.refWrap?.node?.clientWidth || 0;
        const horizontalChildrenWidth = this.refContent?.node?.clientWidth || 0;
        (horizontalWrapWidth !== this.state.horizontalWrapWidth ||
          horizontalChildrenWidth !== this.state.horizontalChildrenWidth) &&
          this.setState({
            ...this.state,
            horizontalWrapWidth,
            horizontalChildrenWidth,
          });
      }
    }
  }

  componentWillUnmount() {
    this.stop();
    ConfigCommon.commonListenActiveRemove?.(this.onPageActiveChange);
  }

  private pageActive = true;
  private currentIndex = 0;
  private refWrap: ((View | ScrollView) & { node?: HTMLElement }) | null = null;
  private refContent: (View & { node?: HTMLElement }) | null = null;
  private refContentElement: HippyElement | null;
  private childrenLayouts: Record<number, number> = {};
  private childrenRefs: Record<number, (View & { node?: HTMLElement }) | null> = {};
  private contentOffset = 0;
  private timer: any;
  private contentStyle: ViewStyle = {};

  // 页面活跃状态变更
  onPageActiveChange = (pageActive: boolean) => {
    this.pageActive = pageActive;
    this.start();
  };

  getAnimationDelay = () => {
    const { vertical, animationDelay = vertical ? 3000 : 0 } = this.props;
    return animationDelay;
  };

  /**
   * 动画：开始
   */
  public start = (options?: { delay?: number }) => {
    this.stop();
    if (!this.shouldLoop() || !this.pageActive) {
      return;
    }
    const { vertical } = this.props;
    if (vertical) {
      this.startVerticalAnimation(options);
    } else {
      this.startHorizontalAnimation(options);
    }
  };

  // 上下滚动
  startVerticalAnimation = (options?: { delay?: number }) => {
    const { delay } = options || {};
    const { animationOffset, animationInterval, animationDelay = 3000, onChange } = this.props;
    let toValue = this.childrenLayouts[this.currentIndex];
    if (!toValue) {
      if (isWeb()) {
        const node = getWebElementFromFiberRef(this.childrenRefs[this.currentIndex]);
        if (node) {
          this.childrenLayouts[this.currentIndex] = node.offsetTop + node.clientHeight;
          toValue = this.childrenLayouts[this.currentIndex];
        }
      }
      if (!toValue) {
        return;
      }
    }
    const childrenArray = this.getChildren();
    const pixelRatio = isWeb() ? 1 : PixelRatio.get();
    let time;
    let newOffset;
    let _onChange;
    if (delay) {
      time = delay;
      newOffset = this.contentOffset;
    } else if (this.contentOffset >= toValue) {
      time = animationDelay;
      newOffset = toValue;
      _onChange = onChange;
      if (this.currentIndex >= childrenArray.length - 1) {
        this.currentIndex = 0;
        newOffset = 0;
      } else {
        this.currentIndex = this.currentIndex + 1;
      }
    } else {
      time = animationInterval / pixelRatio;
      newOffset = Math.min(toValue, this.contentOffset + animationOffset / pixelRatio);
    }
    this.contentOffset = newOffset;
    if (isWeb()) {
      this.refContent?.node && (this.refContent.node.style.transform = `translateY(-${this.contentOffset}px)`);
    } else {
      // todo 无效？
      // this.refContentElement?.setNativeProps({
      //   style: {
      //     ...this.contentStyle,
      //     transform: [{ translateY: -this.contentOffset }],
      //   },
      // });
      this.setState({
        ...this.state,
      });
    }
    this.timer = setTimeout(() => {
      this.timer = null;
      this.start();
    }, time);
    _onChange?.(this.currentIndex);
  };

  // 左右滚动
  startHorizontalAnimation = (options?: { delay?: number }) => {
    const { delay } = options || {};
    const { animationOffset, animationInterval, spacing, animationDelay = 0 } = this.props;
    const { horizontalChildrenWidth } = this.state;
    const pixelRatio = isWeb() ? 1 : PixelRatio.get();
    let newOffset;
    let time;
    if (delay) {
      newOffset = this.contentOffset;
      time = delay;
    } else if (this.contentOffset >= horizontalChildrenWidth + spacing) {
      newOffset = 0;
      time = animationDelay;
    } else {
      newOffset = Math.min(horizontalChildrenWidth + spacing, this.contentOffset + animationOffset / pixelRatio);
      time = animationInterval / pixelRatio;
    }
    this.contentOffset = newOffset;
    if (isWeb()) {
      this.refContent?.node && (this.refContent.node.style.transform = `translateX(-${this.contentOffset}px)`);
    } else {
      // todo 无效？
      // this.refContentElement?.setNativeProps({
      //   style: {
      //     ...this.contentStyle,
      //     transform: [{ translateX: -this.contentOffset }],
      //   },
      // });
      this.setState({
        ...this.state,
      });
    }
    this.timer = setTimeout(() => {
      this.timer = null;
      this.start();
    }, time);
  };

  /**
   * 动画：停止
   */
  public stop = () => {
    this.timer && clearTimeout(this.timer);
    this.timer = null;
  };

  // 判断是否轮播
  shouldLoop = (): boolean => {
    const { vertical, disabled } = this.props;
    if (vertical) {
      // 上下滚动
      if (disabled) {
        return false;
      } else if (this.getChildren().length <= 1) {
        return false;
      } else {
        return true;
      }
    } else {
      // 左右滚动
      const { horizontalWrapWidth, horizontalChildrenWidth } = this.state;
      if (disabled) {
        return false;
      } else if (!horizontalWrapWidth || !horizontalChildrenWidth) {
        return false;
      } else if (horizontalChildrenWidth <= horizontalWrapWidth + 1) {
        return false;
      } else {
        return true;
      }
    }
  };

  // 渲染：左右滚动
  renderHorizontal = () => {
    return (
      <Consumer>
        {(consumerValue) => {
          const { children, spacing, copyChildren } = this.props;
          const shouldLoop = this.shouldLoop();
          const { horizontalWrapProps, horizontalContentProps } = getRenderInfo({
            consumerValue,
            props: this.props,
            shouldLoop,
          });
          this.contentStyle = horizontalContentProps.style;

          const childrenArray = this.getChildren();
          const copyChildrenNum = copyChildren ?? childrenArray.length;

          const Wrap: any = isWeb() ? View : ScrollView;
          return (
            <Wrap
              {...horizontalWrapProps}
              onLayout={(e) => {
                this.state.horizontalWrapWidth !== e.layout.width &&
                  this.setState({ ...this.state, horizontalWrapWidth: e.layout.width });
                horizontalWrapProps.onLayout?.(e);
              }}
              ref={(r) => {
                this.refWrap = r;
              }}
            >
              <View
                style={{
                  ...this.contentStyle,
                  transform: [{ translateX: -this.contentOffset }],
                }}
                ref={(r) => {
                  this.refContent = r;
                  this.refContentElement = getElementFromFiberRef(this.refContent);
                }}
              >
                {children}
                <View
                  style={{ width: shouldLoop ? spacing : 0 }}
                  onLayout={(e) => {
                    this.state.horizontalChildrenWidth !== e.layout.x &&
                      this.setState({
                        ...this.state,
                        horizontalChildrenWidth: e.layout.x,
                      });
                  }}
                />
                {shouldLoop
                  ? childrenArray.slice(0, copyChildrenNum).map((child, idx) => {
                      return React.cloneElement(child as ReactElement, { key: 'HRU_' + idx });
                    })
                  : null}
              </View>
            </Wrap>
          );
        }}
      </Consumer>
    );
  };

  // 渲染：上下滚动
  renderVertical = () => {
    return (
      <Consumer>
        {(consumerValue) => {
          const { copyChildren } = this.props;
          const shouldLoop = this.shouldLoop();
          const { verticalWrapProps, verticalContentProps } = getRenderInfo({
            consumerValue,
            props: this.props,
            shouldLoop,
          });
          this.contentStyle = verticalContentProps.style;

          const childrenArray = this.getChildren();
          const copyChildrenNum = copyChildren ?? 1;

          return (
            <View {...verticalWrapProps}>
              <View
                style={{
                  ...this.contentStyle,
                  transform: [{ translateY: -this.contentOffset }],
                }}
                ref={(r) => {
                  this.refContent = r;
                  this.refContentElement = getElementFromFiberRef(this.refContent);
                }}
              >
                {childrenArray.map((child: ReactElement, index) => {
                  const ref = child.props.ref;
                  const onLayout = child.props.onLayout;
                  const newProps: ViewProps & { ref: any } = {
                    ref: (r) => {
                      this.childrenRefs[index] = r;
                      const refType = getObjectType(ref);
                      if (refType === ObjectType.Function) {
                        ref(r);
                      } else if (
                        getObjectType(ref) === ObjectType.Object &&
                        Object.prototype.hasOwnProperty.call(ref, 'current')
                      ) {
                        ref.current = r;
                      }
                    },
                    onLayout: (e) => {
                      this.childrenLayouts[index] = e.layout.y + e.layout.height;
                      onLayout?.(e);
                      this.start({ delay: this.getAnimationDelay() });
                    },
                  };
                  return React.cloneElement(child as ReactElement, newProps);
                })}
                {shouldLoop
                  ? childrenArray.slice(0, copyChildrenNum).map((child, idx) => {
                      const newProps: ViewProps & { key: string | number; ref: any } = {
                        key: 'HRU_' + idx,
                        ref: undefined,
                        onLayout: undefined,
                      };
                      return React.cloneElement(child as ReactElement, newProps);
                    })
                  : null}
              </View>
            </View>
          );
        }}
      </Consumer>
    );
  };

  // 获取children
  getChildren = (props?: MarqueeProps): ReactElement[] => {
    const _props = props || this.props;
    return React.Children.toArray(_props.children).filter((v) => isValidElement(v)) as ReactElement[];
  };

  render() {
    return this.props.vertical ? this.renderVertical() : this.renderHorizontal();
  }
}

export default Marquee;
