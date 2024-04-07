import React, { Component, Fragment } from 'react';
import { ViewPager } from '@hippy/react';
import { TabPagerProps, TabPagerState } from './PropsType';
import Tabs from '../Tabs';
import { transferStyle } from '../../utils/Styles';

/**
 * @visibleName TabPager 标签滑动页
 */
export class TabPager extends Component<TabPagerProps, TabPagerState> {
  static defaultProps = {
    activeIndex: 0,
  };

  constructor(props: TabPagerProps) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex,
    };
  }

  componentDidUpdate(prevProps: Readonly<TabPagerProps>, prevState: Readonly<TabPagerState>, snapshot?: any) {
    if (this.props.activeIndex !== prevProps.activeIndex && this.props.activeIndex !== this.state.activeIndex) {
      this.setIndex(this.props.activeIndex);
    }
  }

  public refTabs: Tabs | null = null;
  public refPager: ViewPager | null = null;

  /**
   * 选择页面
   * @param index 页码
   * */
  public setIndex = (index: number) => {
    if (index < 0 || index >= this.props.data.length) {
      return;
    }
    if (index !== this.state.activeIndex) {
      this.setState({
        ...this.state,
        activeIndex: index,
      });
      this.refTabs?.setIndex(index);
      this.refPager?.setPage(index);
      this.onChangeFinish(index);
    }
  };

  // Tabs变更
  onTabChange = (index: number) => {
    if (index !== this.state.activeIndex) {
      this.setState({
        ...this.state,
        activeIndex: index,
      });
      this.refPager?.setPage(index);
      this.onChangeFinish(index);
    }
  };

  // Pager变更
  onPagerChange = (e: { position: number }) => {
    if (e.position !== this.state.activeIndex) {
      this.setState({
        ...this.state,
        activeIndex: e.position,
      });
      this.refTabs?.setIndex(e.position);
      this.onChangeFinish(e.position);
    }
  };

  // 触发Change事件
  onChangeFinish = (index: number) => {
    this.props.onChange?.(index);
  };

  render() {
    const { activeIndex } = this.state;
    const { data, pagerProps, tabsProps } = this.props;
    return (
      <Fragment>
        <Tabs
          equallyDivide={1}
          activeIndex={activeIndex}
          {...tabsProps}
          values={data.map((v) => v.name)}
          onChange={this.onTabChange}
          ref={(r) => {
            this.refTabs = r;
          }}
        />
        <ViewPager
          {...pagerProps}
          style={transferStyle([{ flex: 1 }, pagerProps?.style])}
          onPageSelected={this.onPagerChange}
          initialPage={activeIndex}
          ref={(r) => {
            this.refPager = r;
          }}
        >
          {data.map((v) => v.page)}
        </ViewPager>
      </Fragment>
    );
  }
}

export default TabPager;
