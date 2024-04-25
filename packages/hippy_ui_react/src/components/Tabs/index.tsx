import React, { Component, ReactNode } from 'react';
import { ScrollView, TextStyle, View, ViewProps, LayoutEvent, ScrollEvent, ViewStyle, Image } from '@hippy/react';
import { ScrollIndexParams, TabsProps, TabsState, TabValue } from './PropsType';
import Consumer from '../../provider/Consumer';
import getRenderInfo from './renderInfo';
import HiText from '../HiText';
import { getObjectType, ObjectType } from '../../utils/Utils';
import { pickTextStyle, transferStyle } from '../../utils/Styles';

/**
 * @visibleName Tabs 标签页
 */
export class Tabs extends Component<TabsProps, TabsState> {
  static defaultProps = {
    autoScroll: { offset: 'center', animated: true },
  };

  constructor(props: TabsProps) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex || props.defaultActiveIndex || 0,
      isEquallyDivide: false,
      imgSizeMap: {},
    };
    ((props.autoScroll && this.state.activeIndex) || props.initAutoScroll) &&
      this.props.initialContentOffset === undefined &&
      (this.needInitScroll = {
        index: this.state.activeIndex,
        ...Tabs.defaultProps.autoScroll,
        ...(props.autoScroll as any),
        ...props.initAutoScroll,
      });
    this.initTabsImage(props);
  }

  componentDidMount() {
    this.hasMount = true;
    this.setState({
      ...this.state,
      imgSizeMap: this.imgSizeMap,
    });
  }

  shouldComponentUpdate(nextProps: Readonly<TabsProps>, nextState: Readonly<TabsState>, nextContext: any): boolean {
    if (nextProps.values !== this.props.values) {
      this.initTabsImage(nextProps);
    }
    return true;
  }

  componentDidUpdate(prevProps: Readonly<TabsProps>, prevState: Readonly<TabsState>, snapshot?: any) {
    if (prevProps.activeIndex !== this.props.activeIndex && this.props.activeIndex !== this.state.activeIndex) {
      this.setIndex(this.props.activeIndex);
    }
  }

  componentWillUnmount() {
    this.hasMount = false;
  }

  public refScrollView?: ScrollView | null;
  public scrollX = 0;
  private layoutItems: Record<number, LayoutEvent> = {};
  private itemStyleMap: Record<number, ViewStyle> = {};
  private needInitScroll?: ScrollIndexParams;
  private layoutWrap?: LayoutEvent;
  private hasAttachedToWindow = false;
  private hasScrollInitialContentOffset = false;
  private loading = 0;
  private imgSizeMap: TabsState['imgSizeMap'] = {};
  private hasMount = false;

  // 工具：加载tabs图片尺寸
  initTabsImage = (props: TabsProps) => {
    props.values.forEach((tab) => {
      const _tab = Tabs.getTabInfo(tab);
      this.setImageSize(_tab.textImg);
      this.setImageSize(_tab.textActiveImg);
    });
  };

  // 工具：设置tab图片尺寸
  setImageSize = (uri?: string) => {
    const sizeInfo = this.imgSizeMap[uri];
    // 最多重试3次
    if (uri && (!sizeInfo || (sizeInfo.loading < 0 && sizeInfo.loading > -3))) {
      this.imgSizeMap[uri] = { loading: Math.abs(sizeInfo?.loading || 0) + 1 };
      Image.getSize(
        uri,
        (width, height) => {
          // 成功
          this.imgSizeMap[uri] = {
            loading: 0,
            size: {
              width,
              height,
            },
          };
          this.hasMount &&
            this.setState({
              ...this.state,
              imgSizeMap: this.imgSizeMap,
            });
        },
        () => {
          // 失败
          this.imgSizeMap[uri] = {
            loading: -this.imgSizeMap[uri].loading,
          };
        },
      );
    }
  };

  /**
   * 获取格式化的tab信息
   * @param tab tab输入
   * */
  static getTabInfo = (tab: string | TabValue) => {
    const _tab: TabValue = typeof tab === 'string' ? { text: tab } : tab;
    return _tab;
  };

  // 初始滚动
  initScroll = () => {
    if (!this.hasAttachedToWindow) {
      return;
    }
    if (this.props.initialContentOffset && !this.hasScrollInitialContentOffset) {
      this.hasScrollInitialContentOffset = true;
      this.scrollTo({ x: this.props.initialContentOffset, y: 0, animated: false });
    } else if (this.needInitScroll) {
      this.scrollToIndex(this.needInitScroll);
    }
  };

  // 初始化：等比例划分Tab+初始滚动
  initEquallyDivide = () => {
    const { equallyDivide, values } = this.props;
    if (!values.length || !this.layoutWrap || !values.every((v, i) => this.layoutItems[i])) {
      return;
    }
    const lastItemLayout = this.layoutItems[values.length - 1];
    const contentWidth = lastItemLayout.layout.x + lastItemLayout.layout.width;
    if (contentWidth < this.layoutWrap.layout.width) {
      // 判断内容宽度不足
      equallyDivide &&
        values.length >= equallyDivide &&
        !this.state.isEquallyDivide &&
        this.setState({
          ...this.state,
          isEquallyDivide: true,
        });
    } else {
      this.initScroll();
    }
  };

  // 事件：滚动
  onScroll = (e: ScrollEvent, propsScroll?: (e: ScrollEvent) => void) => {
    e && (this.scrollX = e.contentOffset.x);
    propsScroll?.(e);
  };

  // 事件：点击Tab
  onClick = (index: number) => {
    const { disabled, onBeforeChange } = this.props;
    if (disabled) {
      return false;
    }
    if (onBeforeChange) {
      const newIndex = index;
      const oldIndex = this.state.activeIndex;
      const canChange = onBeforeChange(newIndex, oldIndex);
      if (getObjectType(canChange) === ObjectType.Promise) {
        const loadingTag = Math.abs(this.loading) + 1;
        this.loading = loadingTag;
        (canChange as Promise<boolean>)
          .then((_canChange) => {
            if (this.loading === loadingTag) {
              _canChange && this.setIndex(newIndex);
              this.loading = -loadingTag;
            }
          })
          .catch(() => {
            if (this.loading === loadingTag) {
              this.loading = -loadingTag;
            }
          });
      } else {
        canChange && this.setIndex(newIndex);
      }
    } else {
      this.setIndex(index);
    }
  };

  /**
   * 选中某个Tab
   * @param index 选中序号
   * */
  public setIndex = (index: number, autoScroll = this.props.autoScroll) => {
    if (index !== this.state.activeIndex) {
      this.setState({
        ...this.state,
        activeIndex: index,
      });
      this.props.onChange?.(index);
      if (autoScroll) {
        this.scrollToIndex({
          index,
          ...Tabs.defaultProps.autoScroll,
          ...(autoScroll as any),
        });
      }
    }
  };

  /**
   * 滚动到某一Tab
   * @param {ScrollIndexParams} params 滚动参数
   * */
  public scrollToIndex = (params: ScrollIndexParams) => {
    const { index, offset = 'center', animated } = params;
    const { values } = this.props;
    // 没有layout数据
    if (!values.length || !this.layoutWrap || !values.every((v, i) => this.layoutItems[i])) {
      this.needInitScroll = params;
      return;
    }
    this.needInitScroll = undefined;
    // 内容宽度不足
    const lastItemLayout = this.layoutItems[values.length - 1];
    const contentWidth = lastItemLayout.layout.x + lastItemLayout.layout.width;
    if (contentWidth <= this.layoutWrap.layout.width) {
      return;
    }
    const _index = Math.max(0, Math.min(index, values.length - 1));
    const itemLayout = this.layoutItems[_index];
    // 自动滚动
    if (offset !== null) {
      let scrollX;
      if (typeof offset === 'number') {
        scrollX = itemLayout.layout.x + (this.itemStyleMap[index]?.paddingLeft || 0) + offset;
      } else {
        // 居中
        scrollX =
          itemLayout.layout.x -
          (this.itemStyleMap[index]?.paddingRight || 0 - this.itemStyleMap[index]?.paddingLeft || 0) / 2 -
          (this.layoutWrap.layout.width - itemLayout.layout.width) / 2;
      }
      const maxX = contentWidth - this.layoutWrap.layout.width;
      // 0序号固定0偏移，不能超过最大滚动距离
      const itemLayoutX = _index === 0 ? 0 : Math.min(Math.max(0, scrollX), maxX);
      this.scrollTo({ x: itemLayoutX, y: 0, animated });
    }
  };

  /**
   * 滚动到指定偏移值
   * @param params 滚动参数
   * */
  public scrollTo = (params: { x: number; y?: number; animated?: boolean }) => {
    if (this.refScrollView) {
      const { x, y = 0, animated = true } = params;
      this.refScrollView.scrollTo({ x, y, animated });
      this.scrollX = params.x;
    }
  };

  // 渲染：条目
  renderItem = (params: {
    tab: string | TabValue;
    index: number;
    tabProps: ViewProps;
    badge?: ReactNode;
    underline?: ReactNode;
  }) => {
    const { index, tabProps: renderTabProps, underline, badge } = params;
    const tab = Tabs.getTabInfo(params.tab);
    const { renderItem, values } = this.props;

    const { isEquallyDivide, activeIndex } = this.state;
    const isActive = index === activeIndex;
    const tabStyle = transferStyle([
      renderTabProps.style,
      isEquallyDivide && this.layoutWrap && { width: this.layoutWrap.layout.width / values.length },
    ]);
    const textStyle = pickTextStyle(tabStyle);
    this.itemStyleMap[index] = tabStyle;
    const tabProps = {
      ...renderTabProps,
      style: tabStyle,
      onLayout: (e) => {
        this.layoutItems[index] = e;
        this.initEquallyDivide();
        renderTabProps.onLayout?.(e);
      },
      onClick: (e?: any) => {
        this.onClick(index);
        renderTabProps.onClick?.(e);
      },
    };
    const customRender = renderItem?.({
      tab,
      index,
      defaultRender: this.renderDefaultItem,
      tabProps,
      isActive,
      badge,
      underline,
      textStyle,
    });
    return customRender === undefined
      ? this.renderDefaultItem({ tab, index, underline, tabProps, badge, textStyle })
      : customRender;
  };

  // 渲染：默认条目渲染方式
  renderDefaultItem = (params: {
    tab: TabValue;
    index: number;
    tabProps: ViewProps;
    badge?: ReactNode;
    underline?: ReactNode;
    textStyle?: TextStyle;
  }) => {
    const { tab, index, tabProps, underline, badge, textStyle } = params;
    const { imgSizeMap, activeIndex } = this.state;
    const isActive = activeIndex === index;

    return (
      <View key={index} {...tabProps}>
        {isActive && tab.textActiveImg && imgSizeMap[tab.textActiveImg]?.size ? (
          <Image
            source={{ uri: tab.textActiveImg }}
            style={{
              height: (tabProps.style as ViewStyle).height,
              width:
                (imgSizeMap[tab.textActiveImg].size.width * (tabProps.style as ViewStyle).height) /
                imgSizeMap[tab.textActiveImg].size.height,
              backgroundColor: '#00000000',
            }}
          />
        ) : !isActive && tab.textImg && imgSizeMap[tab.textImg]?.size ? (
          <Image
            source={{ uri: tab.textImg }}
            style={{
              height: (tabProps.style as ViewStyle).height,
              width:
                (imgSizeMap[tab.textImg].size.width * (tabProps.style as ViewStyle).height) /
                imgSizeMap[tab.textImg].size.height,
              backgroundColor: '#00000000',
            }}
          />
        ) : (
          <HiText style={textStyle}>{tab.text}</HiText>
        )}
        {/* 红点 */}
        {badge}
        {/* 下划线 */}
        {underline}
      </View>
    );
  };

  render() {
    return (
      <Consumer>
        {(consumerValue) => {
          const { state, props } = this;
          const { values, showUnderline } = props;
          const {
            wrapProps,
            itemPropsList,
            badgeList,
            underline: underlineFn,
          } = getRenderInfo({ consumerValue, state, props });
          return (
            <ScrollView
              ref={(r) => {
                this.refScrollView = r;
              }}
              {...wrapProps}
              onAttachedToWindow={() => {
                this.hasAttachedToWindow = true;
                this.initScroll();
                wrapProps.onAttachedToWindow?.();
              }}
              onLayout={(e: LayoutEvent) => {
                this.layoutWrap = e;
                this.initEquallyDivide();
                wrapProps.onLayout?.(e);
              }}
              onScroll={(e) => this.onScroll(e, wrapProps.onScroll?.bind(this))}
              onScrollEndDrag={(e?: any) => this.onScroll(e, wrapProps.onScrollEndDrag?.bind(this))}
              onMomentumScrollEnd={(e?: any) => this.onScroll(e, wrapProps.onMomentumScrollEnd?.bind(this))}
            >
              {values.map((tab, index) => {
                const isActive = index === state.activeIndex;
                return this.renderItem({
                  tab,
                  index,
                  tabProps: itemPropsList[index],
                  badge: badgeList.find((v) => v.index === index)?.view,
                  underline: isActive && showUnderline ? underlineFn(index) : undefined,
                });
              })}
            </ScrollView>
          );
        }}
      </Consumer>
    );
  }
}

export default Tabs;
