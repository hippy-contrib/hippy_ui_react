import React, { Component } from 'react';
import { View, StyleSheet } from '@hippy/react';
import { isWeb } from '../../utils/Utils';
import { LoadingGifProps, LoadingGifState } from './PropsType';
import Consumer from '../../provider/Consumer';
import { transferStyle } from '../../utils/Styles';
import { ThemeConfigLoadingGif } from '../../themeConfig/types/loadingGif';
import { getElementFromFiberRef, HippyElement } from '../../utils/Polyfill';
import { ConfigCommon } from '../../provider/ConfigCommon';

const ITEM_NUMBER = 5; // 柱子数量
const ITEM_MIN_HEIGHT = 6; // 柱子默认高度
const ITEM_ADD_HEIGHT = 10; // 柱子增加的高度
const ITEM_PERCENT_APPEAR = 2; // 柱子高度经过几个柱子变到最大
const ITEM_ONE_PERCENT = 1 / (ITEM_NUMBER - 1 + 2 * ITEM_PERCENT_APPEAR); // 一次柱子变化的时间

/**
 * 模拟加载gift图，可自定义控制进度
 * @visibleName LoadingGif 加载动图
 */
class LoadingGif extends Component<LoadingGifProps, LoadingGifState> {
  static defaultProps = {
    animationDuration: 1000,
    animationFrames: 24,
    animationDelay: 100,
  };

  constructor(props: LoadingGifProps) {
    super(props);
    this.state = {
      myPercent: 0,
    };
  }

  componentDidMount() {
    this.initAnimation(this.props, this.state);
    ConfigCommon.commonListenActiveAdd?.(this.onPageActiveChange);
  }

  shouldComponentUpdate(
    nextProps: Readonly<LoadingGifProps>,
    nextState: Readonly<LoadingGifState>,
    nextContext: any,
  ): boolean {
    if (this.props.percent !== nextProps.percent) {
      this.initAnimation(nextProps, nextState);
    }
    if (!isWeb()) {
      // Hippy直接修改客户端样式，优化渲染性能（demo未成效，先普通渲染）
      // this.setHippyNativeProps(nextProps, nextState);
      // return true;
      return nextProps.style !== this.props.style || nextState.myPercent !== this.state.myPercent;
    } else {
      return nextProps.style !== this.props.style || nextState.myPercent !== this.state.myPercent;
    }
  }

  componentWillUnmount() {
    this.isMount = false;
    this.stopAnimation();
    this.refItemListDom = {};
    this.refWrapDom = null;
    ConfigCommon.commonListenActiveRemove?.(this.onPageActiveChange);
  }

  private pageActive = true;
  private timer: any;
  private startTime = new Date().getTime();
  private isMount = true;
  private lastPercent = 0;
  private refItemList: any = {};
  private refItemListDom: Record<number | string, HippyElement | null> = {};
  private refWrap: any;
  private refWrapDom: HippyElement | null;
  private config: ThemeConfigLoadingGif | null = null;

  // 页面活跃状态变更
  onPageActiveChange = (pageActive: boolean) => {
    this.pageActive = pageActive;
    this.startAnimation();
  };

  // 动画：初始化
  initAnimation(props: LoadingGifProps, state: LoadingGifState) {
    this.lastPercent = this.state.myPercent;
    // this.stopAnimation();
    this.startTime = new Date().getTime();
    this.startAnimation(props, state);
  }

  /**
   * 动画：开始
   */
  public startAnimation(_props?: LoadingGifProps, _state?: LoadingGifState) {
    this.stopAnimation();
    const props = _props || this.props;
    const state = _state || this.state;
    if (!this.isMount || (props.isActive && !props.isActive()) || !this.pageActive) {
      return;
    }
    const { animationDuration, animationFrames, animationDelay, percent } = props;
    const startNext = (_animationFrames = animationFrames) => {
      this.timer = setTimeout(() => {
        this.startAnimation(props, state);
      }, 1000 / _animationFrames);
    };
    const time = new Date().getTime() - this.startTime;
    if (percent !== undefined && percent !== null) {
      // 用户定义了percent，要滚动过去
      const _percent = Math.max(Math.min(percent / 100, 1), 0); // 要达到的进度
      const _proCount = _percent - this.lastPercent; // 记录上次进度差值多少
      const _times = Math.ceil(Math.abs(_proCount) * 5); // 帧率和持续时间的倍数（当开发者设置的进度跨度大时，应该更快地滚动过去）
      const _animationDuration = (animationDuration / _times) * Math.abs(_proCount); // 持续时间
      if (time >= _animationDuration || _percent === 0) {
        this.setState({
          myPercent: _percent,
        });
      } else {
        this.setState({
          myPercent: this.lastPercent + (time / _animationDuration) * _proCount,
        });
        startNext(animationFrames * _times);
      }
    } else {
      // 正常轮询
      if (time >= animationDuration) {
        this.setState({
          myPercent: 1,
        });
        this.timer = setTimeout(() => {
          this.startTime = new Date().getTime();
          startNext();
        }, animationDelay);
      } else {
        this.setState({
          myPercent: time / animationDuration,
        });
        startNext();
      }
    }
  }

  /**
   * 动画：停止
   */
  public stopAnimation = () => {
    this.timer && clearTimeout(this.timer);
    this.timer = null;
  };

  // 渲染：使用Hippy的setNativeProps优化渲染
  setHippyNativeProps(nextProps: Readonly<LoadingGifProps>, nextState: Readonly<LoadingGifState>) {
    if (!this.isMount) {
      return;
    }
    // 父容器样式
    if (nextProps.style !== this.props.style) {
      if (!this.refWrapDom && this.refWrap) {
        this.refWrapDom = getElementFromFiberRef(this.refWrap);
      }
      this.refWrapDom?.setNativeProps({
        style: transferStyle([styles.wrap, nextProps.style]),
      });
    }
    // 条目样式
    if (nextState.myPercent !== this.state.myPercent) {
      const List = new Array(ITEM_NUMBER).fill(0);
      List.forEach((v, i) => {
        if (!this.refItemListDom[i] && this.refItemList[i]) {
          this.refItemListDom[i] = getElementFromFiberRef(this.refItemList[i]);
        }
        this.refItemListDom[i]?.setNativeProps({
          style: {
            ...styles.item,
            ...this.getItemStyle(nextState.myPercent, i),
          },
        });
      });
    }
  }

  // 渲染：获取条目样式
  getItemStyle(myPercent: number, index: number) {
    const realPercent = Math.max(Math.min(myPercent, 1), 0);
    const juli = Math.abs(realPercent - (index + ITEM_PERCENT_APPEAR) * ITEM_ONE_PERCENT);
    const itemPercent =
      juli > ITEM_PERCENT_APPEAR * ITEM_ONE_PERCENT ? 0 : 1 - juli / (ITEM_ONE_PERCENT * ITEM_PERCENT_APPEAR);
    return itemPercent
      ? {
          height: ITEM_MIN_HEIGHT + itemPercent * ITEM_ADD_HEIGHT,
          opacity: itemPercent,
          backgroundColor: this.props.activeColor || this.config.loadingGifItemActiveColor,
        }
      : {
          backgroundColor: this.props.defaultColor || this.config.loadingGifItemColor,
        };
  }

  render() {
    return (
      <Consumer>
        {(consumerValue) => {
          const { onPress, style } = this.props;
          const { myPercent } = this.state;
          const List = new Array(ITEM_NUMBER).fill(0);
          this.config = {
            loadingGifItemColor: consumerValue.themeConfig.loadingGifItemColor,
            loadingGifItemActiveColor: consumerValue.themeConfig.loadingGifItemActiveColor,
          };
          return (
            <View
              style={transferStyle([styles.wrap, style])}
              onClick={onPress}
              ref={(ref) => {
                this.refWrap = ref;
              }}
            >
              {List.map((v, i) => {
                const itemStyle = this.getItemStyle(myPercent, i);
                return (
                  <View
                    key={i}
                    style={{ ...styles.item, ...itemStyle }}
                    ref={(ref) => {
                      this.refItemList[i] = ref;
                    }}
                  />
                );
              })}
            </View>
          );
        }}
      </Consumer>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
  },
  item: {
    width: 3,
    height: ITEM_MIN_HEIGHT,
    borderRadius: 1,
    marginLeft: 1.5,
    marginRight: 1.5,
  },
});

export default LoadingGif;
