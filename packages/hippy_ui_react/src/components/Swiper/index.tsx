import React, { cloneElement, Component, isValidElement, ReactElement, ReactNode } from 'react';
import { Platform, View } from '@hippy/react';
import ScrollView from '../../elements/ScrollView';

import { SwiperCardPosition, SwiperProps, SwiperState, ScrollEvent } from './PropsType';
import { WINDOW_WIDTH } from '../../utils/Dimensions';
import { isWeb } from '../../utils/Utils';
import { transferStyle } from '../../utils/Styles';
import { IndicatorProps } from '../Indicator/PropsType';
import Indicator from '../Indicator';

/**
 * @visibleName Swiper 走马灯
 */
export class Swiper extends Component<SwiperProps, SwiperState> {
  constructor(props: SwiperProps) {
    super(props);
    this.state = {
      activeIndex: 0,
      offsetX: 0,
    };
    this.wrapWidth = transferStyle(props.style).width || WINDOW_WIDTH();
  }

  static defaultProps = {
    autoScrollWidth: 40,
    scrollEnabled: true,
    cardPosition: SwiperCardPosition.center,
    spacing: { between: 0, startAndEnd: 0 },
  };

  static defaultIndicator: Partial<IndicatorProps> = {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 10,
    },
  };

  static cardPosition = SwiperCardPosition;

  componentDidMount() {
    this.autoplay();
  }

  componentDidUpdate(prevProps: Readonly<SwiperProps>, prevState: Readonly<SwiperState>, snapshot?: any) {
    this.resetWebLayout();
    this.autoplay();
  }

  componentWillUnmount() {
    this.stopAutoplay();
    this.clearWaitScrollEnd();
  }

  wrapWidth: number; // 容器宽度
  spacingLayout: Record<number | string, number> = {};
  refSpacing: Record<number | string, any> = {};
  refWrap: ScrollView | null;
  refContent: (View & { node?: HTMLElement }) | null;
  autoplayTimer: any; // 轮播定时器
  scrollByAccessible = true; // 标记是否无障碍滑动
  scrollByCode: any = null;
  public scrollX = 0;
  timerWaitScrollEnd: any;

  // 轮播：自动轮播
  autoplay = () => {
    this.stopAutoplay();
    const { autoplay } = this.props;
    const children = this.getChildren();
    if (autoplay > 0 && children.length > 1 && !this.autoplayTimer) {
      this.autoplayTimer = setTimeout(() => {
        const { beforePlay } = this.props;
        // 已经最后一个了要回滚到0（留1的偏移误差）
        const nextIndex = this.scrollX >= this.getMaxScrollX() - 1 ? 0 : this.getNextIndex();
        (!beforePlay || beforePlay(nextIndex)) && this.setIndex(nextIndex);
        this.stopAutoplay();
        this.autoplay();
      }, autoplay);
    }
  };

  // 轮播：停止轮播
  stopAutoplay = () => {
    if (this.autoplayTimer) {
      clearTimeout(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  };

  // 滚动，可以获取contentOffset
  onScroll = (e: ScrollEvent) => {
    Platform.OS !== 'ios' && this.clearWaitScrollEnd(); // ios在onScrollEndDrag后又触发了一次onScroll
    const { onScroll } = this.props;
    // 无障碍滚动支持
    if (
      !isWeb() &&
      this.scrollByAccessible &&
      !this.scrollByCode &&
      (!this.autoplayTimer || Math.abs(e.contentOffset.x - this.state.offsetX) >= this.wrapWidth - 1) // 轮播时不是无障碍滑动（若无障碍+轮播，则以无障碍一次性滑比较大距离来判断）
    ) {
      this.scrollEnd(e.contentOffset.x, { byAccessible: true });
    }
    this.scrollX = e.contentOffset.x;
    onScroll?.(e);
  };

  // 滚动结束：通过位置偏移计算滚动位置
  scrollEnd = (scrollEndX: number, options?: { byAccessible?: boolean; animated?: boolean }) => {
    const { byAccessible = false, animated = !byAccessible } = options || {};
    // 判断向左或向右滑动
    const { activeIndex, offsetX } = this.state;
    const { autoScrollWidth } = this.props;
    const absX = Math.abs(scrollEndX - offsetX);
    let nextIndex;
    if (scrollEndX > offsetX && absX > autoScrollWidth) {
      // 下一个
      nextIndex = this.getNextIndex(scrollEndX, byAccessible);
    } else if (scrollEndX < offsetX && absX > autoScrollWidth) {
      // 上一个
      nextIndex = this.getPreIndex(scrollEndX, byAccessible);
    } else {
      nextIndex = activeIndex;
    }

    this.setIndex(nextIndex, { animated });
  };

  // 滚动结束：等一下是否有惯性滚动
  waitScrollEnd = (scrollEndX: number, options?: { byAccessible?: boolean; animated?: boolean }) => {
    this.clearWaitScrollEnd();
    this.timerWaitScrollEnd = setTimeout(() => {
      this.scrollEnd(scrollEndX, options);
      this.autoplay();
    }, 50);
  };

  // 清理滚动结束等待
  clearWaitScrollEnd = () => {
    if (this.timerWaitScrollEnd) {
      clearTimeout(this.timerWaitScrollEnd);
      this.timerWaitScrollEnd = null;
    }
  };

  // 计算：获取上一个滚动序号
  getPreIndex = (scrollX = this.scrollX, byAccessible = false) => {
    const { wrapWidth } = this;
    // 通过当前偏移x计算下一个要定位的位置（不通过activeIndex，因为存在手动滚动到其他位置的情况）
    const {
      spacing: { between, startAndEnd = between },
      cardPosition,
    } = this.props;
    const children = this.getChildren();
    const { offsetX } = this.state;
    const maxIndex = this.getMaxIndex();
    let nextIndex;
    if (byAccessible) {
      // 无障碍
      nextIndex = children.findIndex((c, i) => {
        return this.getScrollX(i) + wrapWidth >= offsetX;
      });
    } else {
      // 正常计算
      let _scrollX = Math.max(0, Math.min(this.getMaxScrollX(), scrollX));
      _scrollX = cardPosition === SwiperCardPosition.left ? _scrollX + startAndEnd : _scrollX + wrapWidth / 2;
      const pagingEnabledList = this.getPagingEnabledList();
      nextIndex =
        pagingEnabledList.find((i, idx) => {
          if (i >= maxIndex || idx >= pagingEnabledList.length - 1) {
            // 最大值
            return true;
          } else if (cardPosition === SwiperCardPosition.left) {
            // 左吸附（取分页列表中的最后一个，即下一个页面开始序号-1）
            return this.getCardLayout(pagingEnabledList[idx + 1] - 1).cardEndX > _scrollX;
          } else {
            // 居中吸附
            const centerX = this.getCardLayout(i).cardCenterX;
            const nextCenterX = this.getCardLayout(pagingEnabledList[idx + 1]).cardCenterX;
            return centerX - 1 < _scrollX && nextCenterX - 1 > _scrollX;
          }
        }) ?? -1;
    }
    nextIndex = Math.min(maxIndex, Math.max(nextIndex, 0));
    return nextIndex;
  };

  // 计算：获取下一个滚动序号
  getNextIndex = (scrollX = this.scrollX, byAccessible = false) => {
    const { wrapWidth } = this;
    // 通过当前偏移x计算下一个要定位的位置（不通过activeIndex，因为存在手动滚动到其他位置的情况）
    const {
      spacing: { between, startAndEnd = between },
      cardPosition,
    } = this.props;
    const children = this.getChildren();
    const { offsetX } = this.state;
    const maxIndex = this.getMaxIndex();
    let nextIndex;
    if (byAccessible) {
      // 无障碍
      nextIndex = children.findIndex((c, i) => {
        return this.getCardLayout(i).cardEndX > offsetX + wrapWidth;
      });
      nextIndex === -1 && (nextIndex = children.length - 1);
    } else {
      // 正常计算
      let _scrollX = Math.max(0, Math.min(this.getMaxScrollX(), scrollX));
      _scrollX = cardPosition === SwiperCardPosition.left ? _scrollX + startAndEnd : _scrollX + wrapWidth / 2;
      const pagingEnabledList = this.getPagingEnabledList();
      nextIndex =
        pagingEnabledList.find((i, idx) => {
          if (i >= maxIndex || idx >= pagingEnabledList.length - 1) {
            // 最大值
            return true;
          } else if (cardPosition === SwiperCardPosition.left) {
            // 左吸附
            return this.getCardLayout(i).cardStartX > _scrollX;
          } else {
            // 居中吸附
            const centerX = this.getCardLayout(i).cardCenterX;
            return centerX - 1 > _scrollX;
          }
        }) ?? -1;
    }
    nextIndex = Math.min(maxIndex, Math.max(nextIndex, 0));
    return nextIndex;
  };

  // 计算：获取整屏滑动的序号列表
  getPagingEnabledList = () => {
    const { pagingEnabled } = this.props;
    const children = this.getChildren();
    if (pagingEnabled) {
      const { wrapWidth } = this;
      const result: number[] = [0];
      let pageStart = 0;
      children.forEach((v, i) => {
        const layout = this.getCardLayout(i);
        if (layout.cardEndX > pageStart + wrapWidth + 1) {
          result.push(i);
          pageStart = this.getScrollX(i);
        }
      });
      return result;
    } else {
      return children.map((v, i) => i);
    }
  };

  // 计算：获取条目渲染信息
  getCardLayout = (index: number) => {
    const {
      spacing: { between, startAndEnd = between },
    } = this.props;
    const cardWidth =
      index === 0
        ? this.spacingLayout[index] - startAndEnd
        : this.spacingLayout[index] - this.spacingLayout[index - 1] - between;
    const cardStartX = index === 0 ? startAndEnd : this.spacingLayout[index - 1] + between;
    const cardEndX = this.spacingLayout[index];
    const cardCenterX = cardStartX + cardWidth / 2;
    return {
      cardWidth,
      cardStartX,
      cardEndX,
      cardCenterX,
    };
  };

  // 计算：获取能滚动的最大序号
  getMaxIndex = () => {
    const { cardPosition } = this.props;
    const children = this.getChildren();
    const masScrollX = this.getMaxScrollX();
    return cardPosition === SwiperCardPosition.center
      ? children.length - 1
      : children.findIndex((c, i) => {
          return this.getCardLayout(i).cardStartX >= masScrollX;
        });
  };

  // 计算：获取最大滚动偏移x
  getMaxScrollX = () => {
    const { wrapWidth } = this;
    const {
      spacing: { between, startAndEnd = between },
    } = this.props;
    const children = this.getChildren();
    const contentWidth = this.spacingLayout[children.length - 1] + startAndEnd;
    return contentWidth - wrapWidth;
  };

  // 计算：获取滚动到index的实际x
  getScrollX = (index: number) => {
    // 计算
    const { wrapWidth } = this;
    const {
      spacing: { between, startAndEnd = between },
      cardPosition,
    } = this.props;
    const nextIndex = Math.max(0, Math.min(index, this.getMaxIndex()));
    let nextOffsetX =
      nextIndex === 0
        ? 0
        : cardPosition === SwiperCardPosition.left
          ? this.getCardLayout(nextIndex).cardStartX - startAndEnd
          : this.getCardLayout(nextIndex).cardCenterX - wrapWidth / 2;
    nextOffsetX = Math.max(0, Math.min(nextOffsetX, this.getMaxScrollX()));
    return nextOffsetX;
  };

  /**
   * 滚动到对应位置
   * @param index 指定移动到的位置
   * @param [options] 参数
   * @returns {}
   */
  public setIndex = (index: number, options?: { animated?: boolean; triggerChang?: boolean }): void => {
    const { animated = true, triggerChang = true } = options || {};
    // 计算
    const { onChange } = this.props;
    const nextIndex = Math.max(0, Math.min(index, this.getMaxIndex()));
    const nextOffsetX = this.getScrollX(index);

    if (this.refWrap) {
      this.timerScrollByCode();
      this.refWrap.scrollTo({
        x: nextOffsetX,
        y: 0,
        animated,
      });
      this.scrollX = nextOffsetX;
    }

    // 触发change事件
    triggerChang && this.state.activeIndex !== nextIndex && onChange?.(nextIndex);
    this.setState({
      ...this.state,
      activeIndex: nextIndex,
      offsetX: nextOffsetX,
    });
  };

  // 无障碍：记录是代码触发的滚动
  timerScrollByCode = (time = 300) => {
    this.scrollByCode && clearTimeout(this.scrollByCode);
    this.scrollByCode = setTimeout(() => {
      this.scrollByCode = null;
    }, time);
  };

  // web：更新layout信息
  resetWebLayout = () => {
    if (!isWeb()) {
      return;
    }
    Object.keys(this.refSpacing).forEach((index) => {
      if ((this.refSpacing[index]?.node as HTMLElement)?.offsetLeft) {
        this.spacingLayout[index] = (this.refSpacing[index].node as HTMLElement).offsetLeft;
      }
    });
  };

  // 渲染：处理children渲染
  renderChildren = (): ReactNode[] => {
    const {
      spacing: { between, startAndEnd = between },
    } = this.props;
    const childList = this.getChildren();
    return childList.map((child: ReactElement, index) => {
      // Hippy需要拦截onClick确保滑动交互不冲突
      const _child = cloneElement(child, {
        onClick(e) {
          return child.props.onClick?.(e);
        },
      } as any);
      // 间距支持
      const _frontNode = index === 0 ? <View style={{ width: startAndEnd }} /> : null;
      const _backNode = (
        <View
          style={{ width: index === childList.length - 1 ? startAndEnd : between }}
          ref={(r) => {
            this.refSpacing[index] = r;
            this.resetWebLayout();
          }}
          onLayout={(e) => {
            this.spacingLayout[index] = e.layout.x;
          }}
        />
      );
      return (
        <>
          {_frontNode}
          {_child}
          {_backNode}
        </>
      );
    });
  };

  // 渲染：指示器
  renderIndicator = () => {
    const { indicatorProps } = this.props;
    const { activeIndex } = this.state;
    return indicatorProps ? (
      <Indicator
        {...Swiper.defaultIndicator}
        length={this.getChildren().length}
        activeIndex={activeIndex}
        {...indicatorProps}
        style={transferStyle([Swiper.defaultIndicator.style, indicatorProps.style])}
        dotStyle={transferStyle([Swiper.defaultIndicator.dotStyle, indicatorProps.dotStyle])}
        activeStyle={transferStyle([Swiper.defaultIndicator.activeStyle, indicatorProps.activeStyle])}
      />
    ) : null;
  };

  // 获取children
  getChildren = () => {
    return React.Children.toArray(this.props.children).filter((v) => isValidElement(v));
  };

  render() {
    const { style, scrollEnabled, autoScrollWidth, onScrollBeginDrag, onScrollEndDrag } = this.props;
    return (
      <>
        <ScrollView
          style={style}
          ref={(c) => {
            this.refWrap = c;
          }}
          onLayout={(e) => {
            this.wrapWidth = e.layout.width;
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={scrollEnabled}
          onScroll={this.onScroll}
          onMomentumScrollBegin={() => {
            if (autoScrollWidth > 0) {
              this.stopAutoplay();
              this.clearWaitScrollEnd();
            }
          }}
          onMomentumScrollEnd={(e?: ScrollEvent) => {
            this.scrollX = e?.contentOffset ? e.contentOffset.x : this.scrollX;
            if (!this.scrollByCode && autoScrollWidth > 0) {
              this.waitScrollEnd(e.contentOffset.x);
              this.autoplay();
            }
          }}
          onScrollBeginDrag={(e?: ScrollEvent) => {
            this.scrollByAccessible = false;
            this.stopAutoplay();
            this.clearWaitScrollEnd();
            onScrollBeginDrag?.(e);
          }}
          onScrollEndDrag={(e?: ScrollEvent) => {
            this.scrollX = e?.contentOffset ? e.contentOffset.x : this.scrollX;
            autoScrollWidth > 0 && this.waitScrollEnd(e.contentOffset.x);
            onScrollEndDrag?.(e);
          }}
        >
          {this.renderChildren()}
        </ScrollView>
        {this.renderIndicator()}
      </>
    );
  }
}

export default Swiper;
