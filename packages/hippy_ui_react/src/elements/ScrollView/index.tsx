import React, { Component, PropsWithChildren } from 'react';
import { ScrollViewProps, ScrollView as HippyScrollView, View } from '@hippy/react';
import { isPc, isWeb, Throttle, Debounce } from '../../utils/Utils';
import { transferStyle } from '../../utils/Styles';
import { getPageXY } from '../../utils/Touch';
import { styles } from './style';

interface WebScrollViewState {
  x: number;
  y: number;
  duration: number;
}

interface ScrollEvent {
  contentOffset: { x: number; y: number };
  contentInset: { top: number; left: number; bottom: number; right: number };
  contentSize: { width: number; height: number };
  layoutMeasurement: { width: number; height: number };
}
interface LayoutInfo {
  x: number;
  y: number;
  width: number;
  height: number;
}
interface LayoutEvent {
  nativeEvent: {
    layout: LayoutInfo;
  };
  layout: LayoutInfo;
  target: HTMLElement | null | undefined;
  timeStamp: number;
}

/**
 * web实现ScrollView
 * */
class WebScrollView extends Component<ScrollViewProps, WebScrollViewState> {
  static defaultProps = {
    scrollEnabled: true,
    bounces: true,
  };

  constructor(props: ScrollViewProps) {
    super(props);
    const { horizontal, initialContentOffset = 0, scrollEventThrottle = 16 } = props;
    this.state = {
      x: horizontal ? initialContentOffset : 0,
      y: horizontal ? 0 : initialContentOffset,
      duration: 0,
    };
    this.onScroll = new Throttle((e: ScrollEvent) => {
      this.props.onScroll?.(e);
    }, scrollEventThrottle);
  }

  componentDidUpdate(prevProps: Readonly<ScrollViewProps>, prevState: Readonly<WebScrollViewState>, snapshot?: any) {
    const { scrollEventThrottle = 16 } = this.props;
    if (this.props.scrollEventThrottle !== prevProps.scrollEventThrottle) {
      this.onScroll.cancel();
      this.onScroll = new Throttle((e: ScrollEvent) => {
        this.props.onScroll?.(e);
      }, scrollEventThrottle);
    }
    this.resetLayout();
  }

  componentWillUnmount() {
    this.onScroll.cancel();
    this.onMomentumScrollEnd.cancel();
    this.stopAnimateScrollTo();
  }

  private refWrap: (View & { node?: HTMLElement }) | null;
  private refContent: (View & { node?: HTMLElement }) | null;
  private wrapSize = 0;
  private contentSize = 0;
  private touchStart = 0;
  private touchStartScrollX = 0;
  private touchStartScrollY = 0;
  private scrollX = 0;
  private scrollY = 0;
  private onScroll: Throttle<[ScrollEvent]>;
  private wrapLayout: LayoutEvent;
  private readonly isPc = isPc();
  private isMomentumScrollBegin = false;
  private timerAnimateScrollTo: any;
  private scrollByCode = false;

  public scrollTo = (params: { x?: number; y?: number; animated?: boolean }) => {
    const { x = this.scrollX, y = this.scrollY, animated = true } = params;
    this.scrollToWithDuration(x, y, animated ? 200 : 0);
  };

  public scrollToWithDuration = (x: number, y: number, duration: number) => {
    const { bounces, overScrollEnabled, horizontal } = this.props;
    let _x = x;
    let _y = y;
    if (!bounces && !overScrollEnabled && this.wrapSize && this.contentSize) {
      if (horizontal) {
        _x = Math.max(0, Math.min(_x, this.contentSize - this.wrapSize));
      } else {
        _y = Math.max(0, Math.min(_y, this.contentSize - this.wrapSize));
      }
    }
    this.scrollX = _x;
    this.scrollY = _y;
    const _duration = duration / 1000;

    if (this.refContent?.node) {
      if (this.isPc) {
        this.refContent.node.style.transition = `transform ${_duration}s ease`;
        this.refContent.node.style.webkitTransition = `-webkit-transform ${_duration}s ease`;
        this.refContent.node.style.transform = `translate3d(${-this.scrollX}px, ${-this.scrollY}px, 0)`;
        this.refContent.node.style.webkitTransform = `-webkit-translate3d(${-this.scrollX}px, ${-this.scrollY}px, 0)`;
      } else {
        this.animateScrollTo(this.scrollX, this.scrollY, duration);
      }
    } else {
      this.setState({
        ...this.state,
        x: this.scrollX,
        y: this.scrollY,
        duration: _duration,
      });
    }
  };

  // 模拟动画滚动
  animateScrollTo = (x: number, y: number, leftDuration: number) => {
    this.stopAnimateScrollTo();
    if (this.refWrap?.node) {
      this.scrollByCode = true;
      const time = 10;
      const timerCount = leftDuration / time;
      if (timerCount > 0) {
        const scrollLeft = this.refWrap.node.scrollLeft;
        const scrollTop = this.refWrap.node.scrollTop;
        const xStep = (x - scrollLeft) / timerCount;
        const yStep = (y - scrollTop) / timerCount;
        this.refWrap.node.scrollTo(
          xStep > 0 ? Math.min(scrollLeft + xStep, x) : Math.max(scrollLeft + xStep, x),
          yStep > 0 ? Math.min(scrollTop + yStep, y) : Math.max(scrollTop + yStep, y),
        );
        this.timerAnimateScrollTo = setTimeout(() => {
          this.animateScrollTo(x, y, leftDuration - time);
        }, time);
      } else {
        this.refWrap.node.scrollTo(x, y);
        this.scrollByCode = false;
      }
    }
  };

  // 停止模拟动画滚动
  stopAnimateScrollTo = () => {
    if (this.timerAnimateScrollTo) {
      clearTimeout(this.timerAnimateScrollTo);
      this.timerAnimateScrollTo = null;
    }
  };

  // 获取触摸的页面偏移值
  getPageOffset = (e: any) => {
    const { horizontal } = this.props;
    const pageXY = getPageXY(e);
    return horizontal ? pageXY.pageX : pageXY.pageY;
  };

  // 获取滚动事件值
  getScrollEvent = (): ScrollEvent => {
    return {
      contentOffset: { x: this.scrollX, y: this.scrollY },
      contentInset: { top: 0, bottom: 0, right: 0, left: 0 },
      contentSize: { width: this.refContent?.node.clientWidth, height: this.refContent?.node.clientHeight },
      layoutMeasurement: { width: this.refWrap?.node.clientWidth, height: this.refWrap?.node.clientHeight },
    };
  };

  // web：触摸开始
  touchstart = (e: any) => {
    const { scrollEnabled, onScrollBeginDrag, onTouchDown } = this.props;
    const res = onTouchDown?.(e);
    if (!scrollEnabled) return res;
    this.touchStart = this.getPageOffset(e);
    this.touchStartScrollX = this.scrollX;
    this.touchStartScrollY = this.scrollY;
    // 重置状态
    this.scrollToWithDuration(this.scrollX, this.scrollY, 0);
    // @ts-expect-error
    onScrollBeginDrag?.(this.getScrollEvent());
    this.onScroll.flush(this.getScrollEvent());
    return res;
  };

  // web：触摸移动
  touchmove = (e: any) => {
    const { scrollEnabled, horizontal, onTouchMove } = this.props;
    const res = onTouchMove?.(e);
    if (!scrollEnabled || !this.touchStart) return res;
    // cancelable 浏览器默认行为是否可以被禁用;defaultPrevented 浏览器默认行为是否已经被禁用
    e.preventDefault && e.cancelable && !e.defaultPrevented && e.preventDefault();
    if (horizontal) {
      this.scrollToWithDuration(this.getTouchOffset(e).x, this.scrollY, 0);
    } else {
      this.scrollToWithDuration(this.scrollX, this.getTouchOffset(e).y, 0);
    }
    this.onScroll.flush(this.getScrollEvent());
    return res;
  };

  // web：移动端scroll事件
  onWebScroll = (e) => {
    e?.stopPropagation?.();
    this.scrollX = this.refWrap.node.scrollLeft;
    this.scrollY = this.refWrap.node.scrollTop;
    const scrollEvent = this.getScrollEvent();
    this.onScroll.flush(scrollEvent);
    // 惯性滚动
    if (!this.scrollByCode && !this.touchStart) {
      if (this.isMomentumScrollBegin) {
        this.onMomentumScrollEnd.flush(scrollEvent);
      } else {
        this.isMomentumScrollBegin = true;
        // @ts-expect-error
        this.props.onMomentumScrollBegin?.(scrollEvent);
        this.onMomentumScrollEnd.flush(scrollEvent);
      }
    }
  };

  // web：移动端惯性滚动
  onMomentumScrollEnd = new Debounce(
    (e: ScrollEvent) => {
      // @ts-expect-error
      this.props.onMomentumScrollEnd?.(e);
      this.isMomentumScrollBegin = false;
    },
    100,
    false,
  );

  // web：触摸结束
  touchend = (e: Event) => {
    const { scrollEnabled, onScrollEndDrag, onMomentumScrollBegin, horizontal, onMomentumScrollEnd, onTouchEnd } =
      this.props;
    // @ts-expect-error
    const res = onTouchEnd?.(e);
    if (!scrollEnabled || !this.touchStart) return res;
    if (this.isPc) {
      // pc端手动实现scroll
      const offset = this.getTouchOffset(e, true);
      if (horizontal) {
        this.scrollToWithDuration(offset.x, this.scrollY, 0);
      } else {
        this.scrollToWithDuration(this.scrollX, offset.y, 0);
      }

      // 回弹特效
      if (
        offset.x < offset.minOffset ||
        offset.x > offset.maxOffset ||
        offset.y < offset.minOffset ||
        offset.y > offset.maxOffset
      ) {
        if (onMomentumScrollEnd) {
          const onanimationend = () => {
            this.refContent.node.removeEventListener('transitionend', onanimationend);
            // @ts-expect-error
            onMomentumScrollEnd?.(this.getScrollEvent());
          };
          this.refContent.node.addEventListener('transitionend', onanimationend);
        }
        // @ts-expect-error
        onMomentumScrollBegin?.(this.getScrollEvent());
        this.scrollTo({
          x: Math.min(offset.maxOffset, Math.max(offset.minOffset, offset.x)),
          y: Math.min(offset.maxOffset, Math.max(offset.minOffset, offset.y)),
        });
      }
    }
    this.touchStart = 0;
    // @ts-expect-error
    onScrollEndDrag?.(this.getScrollEvent());
    return res;
  };

  // 根据触摸计算x,y偏移
  getTouchOffset = (e: any, isEnd = false) => {
    const { horizontal, bounces = true, overScrollEnabled, pagingEnabled } = this.props;
    let x = this.scrollX;
    let y = this.scrollY;
    const pageOffset = this.getPageOffset(e);
    const moveOffset = pageOffset - this.touchStart;
    const canOver = !pagingEnabled && (bounces || overScrollEnabled);
    const minOffset = 0;
    const maxOffset = this.contentSize - this.wrapSize;
    if (horizontal) {
      // 横向滚动
      x =
        isEnd && pagingEnabled
          ? this.touchStartScrollX + (moveOffset > 0 ? -1 : 1) * this.wrapSize
          : this.touchStartScrollX - moveOffset;

      if (x < minOffset) {
        x = canOver ? minOffset + (x - minOffset) / 3 : minOffset;
      } else if (x > maxOffset) {
        x = canOver ? maxOffset + (x - maxOffset) / 3 : maxOffset;
      }
    } else {
      // 竖向滚动
      y =
        isEnd && pagingEnabled
          ? this.touchStartScrollY + (moveOffset > 0 ? -1 : 1) * this.wrapSize
          : this.touchStartScrollY - moveOffset;
      if (y < minOffset) {
        y = canOver ? minOffset + (y - minOffset) / 3 : minOffset;
      } else if (x > maxOffset) {
        y = canOver ? maxOffset + (y - maxOffset) / 3 : maxOffset;
      }
    }
    return {
      x,
      y,
      maxOffset,
      minOffset,
    };
  };

  // 更新layout信息
  resetLayout = () => {
    const { horizontal, onLayout } = this.props;
    this.wrapSize = this.refWrap?.node?.[horizontal ? 'clientWidth' : 'clientHeight'];
    this.contentSize = this.refContent?.node?.[horizontal ? 'scrollWidth' : 'scrollHeight'];

    if (onLayout && this.refWrap?.node) {
      const layout = {
        x: this.refWrap.node.offsetLeft,
        y: this.refWrap.node.offsetTop,
        width: this.refWrap.node.clientWidth,
        height: this.refWrap.node.clientHeight,
      };
      const newWrapLayout: LayoutEvent = {
        nativeEvent: { layout },
        layout,
        target: this.refWrap.node,
        timeStamp: new Date().getTime(),
      };
      if (JSON.stringify(this.wrapLayout?.layout) !== JSON.stringify(newWrapLayout.layout)) {
        onLayout(newWrapLayout);
      }
    }
  };

  render() {
    const {
      children, // ok
      onScroll, // ok
      style, // ok
      contentContainerStyle, // ok
      scrollEnabled, // ok
      onScrollEndDrag, // ok
      onScrollBeginDrag, // ok
      onMomentumScrollEnd, // ok
      onMomentumScrollBegin, // ok
      pagingEnabled, // ok
      scrollEventThrottle, // ok
      scrollIndicatorInsets, // pass
      showScrollIndicator = true, // pass
      showsHorizontalScrollIndicator = true, // pass
      showsVerticalScrollIndicator = true, // pass
      keyboardDismissMode, // pass
      horizontal, // ok
      initialContentOffset, // ok
      bounces, // ok
      overScrollEnabled, // ok
      onLayout, // ok
      onTouchDown, // ok
      onTouchMove, // ok,
      onTouchEnd, // ok
      ...otherProps
    } = this.props;
    const { duration } = this.state;
    const _style = transferStyle([
      horizontal ? styles.baseHorizontal : styles.baseVertical,
      style,
      !scrollEnabled && styles.scrollDisable,
      pagingEnabled && (horizontal ? styles.pagingEnabledHorizontal : styles.pagingEnabledVertical),
      this.isPc && { overflowX: 'hidden', overflowY: 'hidden' },
      !showScrollIndicator && { scrollbarWidth: 'none', scrollbarHeight: 'none' },
      !showsHorizontalScrollIndicator && { scrollbarHeight: 'none' },
      !showsVerticalScrollIndicator && { scrollbarWidth: 'none' },
    ]);
    // web实现
    const touchable: any = scrollEnabled
      ? this.isPc
        ? {
            // pc
            onMouseDown: this.touchstart,
            onMouseMove: this.touchmove,
            onMouseUp: this.touchend,
            onMouseLeave: this.touchend,
          }
        : {
            // preact-web构建支持onResponder
            onResponderGrant: this.touchstart,
            // onResponderMove: this.touchmove,
            onResponderRelease: this.touchend,
            // hippy/react-web构建支持onTouch
            onTouchStart: this.touchstart,
            // onTouchDown: this.touchstart,
            // onTouchMove: this.touchmove,
            onTouchEnd: this.touchend,
            onTouchCancel: this.touchend,
          }
      : {};
    return (
      <View
        {...otherProps}
        {...touchable}
        onLayout={(e: any) => {
          this.wrapLayout = e;
          onLayout?.(e);
        }}
        ref={(ref) => {
          this.refWrap = ref;
          this.resetLayout();
        }}
        style={_style}
        onScroll={this.onWebScroll}
      >
        <View
          ref={(r) => {
            this.refContent = r;
            this.resetLayout();
          }}
          style={transferStyle([
            horizontal ? styles.contentContainerHorizontal : styles.contentContainerVertical,
            {
              cursor: 'move',
              // flexWrap: 'nowrap',
              // flex: 1,
              // overflow: 'visible',
              alignItems: _style.alignItems,
              justifyContent: _style.justifyContent,
            },
            this.isPc && {
              transform: `translate3d(${-this.scrollX}px, ${-this.scrollY}px, 0)`,
              transition: `transform ${duration}s ease`,
            },
            contentContainerStyle,
          ])}
        >
          {children}
        </View>
      </View>
    );
  }
}

export default class ScrollView extends Component<PropsWithChildren<ScrollViewProps>, any> {
  private refScrollView: HippyScrollView | WebScrollView | null;

  public scrollTo = (params: { x?: number; y?: number; animated?: boolean }) => {
    const { x = 0, y = 0, animated = true } = params;
    this.refScrollView?.scrollTo({ x, y, animated });
  };

  public scrollToWithDuration = (x: number, y: number, duration: number) => {
    this.refScrollView?.scrollToWithDuration(x, y, duration);
  };

  render() {
    return isWeb() ? (
      <WebScrollView
        {...this.props}
        ref={(r) => {
          this.refScrollView = r;
        }}
      />
    ) : (
      <HippyScrollView
        {...this.props}
        ref={(r) => {
          this.refScrollView = r;
        }}
      />
    );
  }
}
