import React, { Component, ReactNode } from 'react';
import { View, ScrollEvent } from '@hippy/react';
import { CascaderData, CascaderProps, CascaderState } from './PropsType';
import { isWeb } from '../../utils/Utils';
import HiText from '../HiText';
import Consumer from '../../provider/Consumer';
import getRenderInfo from './renderInfo';
import { CascaderRenderInfo } from '../../themeConfig/types/cascader';
import ScrollView from '../../elements/ScrollView';

/**
 * @visibleName Cascader 联级选择
 */
export class Cascader<T> extends Component<CascaderProps<T>, CascaderState<T>> {
  static defaultProps = {
    scrollViewHeight: 180,
    itemHeight: 36,
  };

  constructor(props: CascaderProps<T>) {
    super(props);
    this.state = {
      value: this.initValue(props, props.active),
    };
  }

  componentDidMount() {
    isWeb() && this.resetScroll();
  }

  shouldComponentUpdate(
    nextProps: Readonly<CascaderProps<T>>,
    nextState: Readonly<CascaderState<T>>,
    nextContext: any,
  ): boolean {
    const { active = [] } = nextProps;
    const { active: oldActive = [] } = this.props;
    // 选中值发生了变更
    if (active.join('@') !== oldActive.join('@') && active.join('@') !== nextState.value.map((v) => v.id).join('@')) {
      this.setState({
        ...this.state,
        value: this.initValue(nextProps, active),
      });
    }
    return true;
  }

  componentDidUpdate(prevProps: Readonly<CascaderProps<T>>, prevState: Readonly<CascaderState<T>>, snapshot?: any) {
    if (JSON.stringify(this.state.value.map((v) => v.id)) !== JSON.stringify(prevState.value.map((v) => v.id))) {
      this.props.onChange?.(this.state.value);
    }
    this.resetScroll();
  }

  componentWillUnmount() {
    this.clearTimerDragEnd();
  }

  private refScrollView: Record<number, ScrollView | null> = {};
  private timerDragEnd: any;
  private dataMap: Record<number, Array<CascaderData<T>>> = {};
  private isScrolling = false;
  private scrollYMap: Record<number, number> = {};

  // 初始化：根据数据找value
  initValue = (props: CascaderProps<T>, active: string[] = []) => {
    const result: Array<CascaderData<T>> = [];
    let dataList = props.data;
    // 找存在的value
    active.some((id) => {
      const data = dataList.find((data) => data.id === id);
      if (data) {
        result.push(data);
        dataList = data.children || [];
        return false;
      } else if (dataList.length) {
        result.push(dataList[0]);
        dataList = dataList[0].children || [];
        return false;
      } else {
        return true;
      }
    });
    // 后续还有children，补位
    while (dataList.length) {
      result.push(dataList[0]);
      dataList = dataList[0].children || [];
    }
    return result;
  };

  // 渲染：滚动容器
  renderScrollView = (renderInfo: CascaderRenderInfo) => {
    const { scrollViewPropsFn, itemStyle, itemActiveStyle, itemActiveTxtProps, itemTxtProps } = renderInfo;
    const { data, scrollViewHeight, itemHeight } = this.props;
    const { value } = this.state;
    const result: ReactNode[] = [];
    let dataList = data;
    while (dataList.length) {
      const idx = result.length;
      this.dataMap[idx] = dataList;
      result.push(
        <ScrollView
          {...scrollViewPropsFn(idx)}
          showScrollIndicator={false}
          key={idx}
          ref={(ref) => {
            this.refScrollView[idx] = ref;
          }}
          onScrollBeginDrag={(e?: any) => {
            this.onScrollBeginDrag(e, idx);
          }}
          onScrollEndDrag={(e?: any) => {
            this.onScrollEndDrag(e, idx);
          }}
          onScroll={(e) => {
            if (e?.contentOffset) {
              this.scrollYMap[idx] = e.contentOffset.y;
            } else {
              !this.isScrolling && this.onScrollEndDrag(e, idx);
            }
          }}
          onMomentumScrollBegin={(e?: ScrollEvent) => {
            this.onMomentumScrollBegin(e, idx);
          }}
          onMomentumScrollEnd={(e?: ScrollEvent) => {
            if (e?.contentOffset) {
              this.onMomentumScrollEnd(e, idx);
            }
          }}
          onAttachedToWindow={this.resetScroll}
        >
          <View style={{ height: (scrollViewHeight - itemHeight) / 2 }} />
          {dataList.map((item, _idx) => {
            const active = item.id === value[idx].id;
            return (
              <View key={_idx} style={{ ...itemStyle, ...(active ? itemActiveStyle : undefined) }}>
                <HiText {...itemTxtProps} {...(active ? itemActiveTxtProps : undefined)}>
                  {item.name}
                </HiText>
              </View>
            );
          })}
          <View style={{ height: (scrollViewHeight - itemHeight) / 2 }} />
        </ScrollView>,
      );
      const data = dataList.find((v) => v.id === value[idx].id);
      dataList = data?.children || [];
    }
    return result;
  };

  // 滚动事件：拖曳开始
  onScrollBeginDrag = (e: ScrollEvent, idx: number) => {
    this.isScrolling = true;
    this.clearTimerDragEnd();
  };

  // 滚动事件：拖曳结束
  onScrollEndDrag = (e: ScrollEvent, idx: number) => {
    this.isScrolling = false;
    this.clearTimerDragEnd();
    this.timerDragEnd = setTimeout(() => {
      this.onSelect(e, idx);
      this.clearTimerDragEnd();
    }, 50);
  };

  // 滚动事件：惯性滚动开始
  onMomentumScrollBegin = (e: ScrollEvent, idx: number) => {
    this.isScrolling = true;
    this.clearTimerDragEnd();
  };

  // 滚动事件：惯性滚动结束
  onMomentumScrollEnd = (e: ScrollEvent, idx: number) => {
    this.isScrolling = false;
    this.timerDragEnd = setTimeout(() => {
      this.onSelect(e, idx);
      this.clearTimerDragEnd();
    }, 50);
  };

  // 清除计时器
  clearTimerDragEnd = () => {
    this.timerDragEnd && clearTimeout(this.timerDragEnd);
    this.timerDragEnd = null;
  };

  // 事件：选中
  onSelect = (e: ScrollEvent, idx: number) => {
    if (!e) {
      return;
    }
    const { itemHeight } = this.props;
    const { value } = this.state;
    let selectIndex = Math.round(e.contentOffset.y / itemHeight);
    if (selectIndex < 0) {
      selectIndex = 0;
    } else if (this.dataMap[idx] && selectIndex > this.dataMap[idx].length - 1) {
      selectIndex = this.dataMap[idx].length - 1;
    }
    const _value = ([] as Array<CascaderData<T>>).concat([], value);
    this.dataMap[idx] && (_value[idx] = this.dataMap[idx][selectIndex]);
    const newValue = this.initValue(
      this.props,
      _value.map((v) => v.id),
    );
    this.setState({
      ...this.state,
      value: newValue,
    });
  };

  // 重置滚动位置
  resetScroll = () => {
    this.state.value.forEach((val, idx) => {
      let selectIndex = this.dataMap[idx]?.findIndex((v) => v.id === val.id);
      if (selectIndex === undefined) {
        selectIndex = 0;
      }
      const y = selectIndex * this.props.itemHeight;
      if (y !== this.scrollYMap[idx]) {
        this.scrollYMap[idx] = y;
        this.refScrollView[idx]?.scrollTo({ x: 0, y, animated: true });
      }
    });
  };

  render() {
    return (
      <Consumer>
        {(consumerValue) => {
          const renderInfo = getRenderInfo({ consumerValue, props: this.props });
          const { wrapStyle, markStyle } = renderInfo;
          return (
            <View style={wrapStyle}>
              <View style={markStyle} />
              {this.renderScrollView(renderInfo)}
            </View>
          );
        }}
      </Consumer>
    );
  }
}

export default Cascader;
