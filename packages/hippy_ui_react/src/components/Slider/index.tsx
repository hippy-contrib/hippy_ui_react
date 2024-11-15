import React, { Component } from 'react';
import { View, Image, LayoutEvent, TouchableEvent, UIManagerModule } from '@hippy/react';
import { SliderProps, SliderState } from './PropsType';
import Consumer from '../../provider/Consumer';
import getRenderInfo from './renderInfo';
import { getObjectType, isWeb } from '../../utils/Utils';
import { getElementFromFiberRef } from '../../utils/Polyfill';

interface Position {
  left: number;
  right: number;
}

enum EventOriginType {
  start = 'start',
  end = 'end',
}

/**
 * @visibleName Slider 滑动选择器
 */
export class Slider extends Component<SliderProps, SliderState> {
  static defaultProps: Partial<SliderProps> = {
    limitValues: [0, 100],
    initValues: [10, 50],
    minMove: 1,
    blockSize: 18,
    contentOnEvent: false,
  };

  constructor(props: SliderProps) {
    super(props);
    this.state = {
      sliderWidth: 0,
      startValue: 0,
      endValue: 0,
    };
  }

  shouldComponentUpdate(nextProps: Readonly<SliderProps>, nextState: Readonly<SliderState>, nextContext: any): boolean {
    if (
      this.props.limitValues !== nextProps.limitValues ||
      nextProps.initValues !== this.props.initValues ||
      this.state.sliderWidth !== nextState.sliderWidth
    ) {
      // 只有当前非滑动状态下，才更新外部更新的值（实时更新移动值会影响滑动效果）
      if (!this.touchDownX) {
        this.setPositionValue(nextProps);
      }
    }
    return true;
  }

  private sliderRef: View = null;
  private lineRef: View = null;
  private blockLeftRef: View = null;
  private blockRightRef: View = null;
  private moveRef: View = null;
  private touchDownX = 0;
  private touchMoveRange = { start: 0, end: 0 };
  private moveToNum: number = null;
  private startValues = { startValue: 0, endValue: 0 };
  private blockType?: EventOriginType = undefined;
  private blockLeftX: number = 0;
  private blockRightX: number = 0;

  // 设置位置相关的值
  setPositionValue = (props: SliderProps) => {
    const { limitValues, initValues, doubleBlock } = this.getLineValues(props);

    // 判断startValue是否比起始值小
    // 单滑块，start值是0
    const startValue = doubleBlock ? (initValues[0] < limitValues[0] ? limitValues[0] : initValues[0]) : 0;
    // 判断是否超出了结束值
    // 判断设置了最小间隔后的结束值
    const end = doubleBlock ? initValues[1] : initValues;
    const endValue = end > limitValues[1] ? limitValues[1] : end;

    this.setState({
      startValue,
      endValue,
    });
  };

  // 获取滑动的区间值
  getLineValues = (props: SliderProps) => {
    const { limitValues, initValues } = props;
    const doubleBlock = getObjectType(initValues) === 'Array' && initValues[1];
    const defaultLimitValues = [0, 100];

    return {
      limitValues: limitValues ? defaultLimitValues.map((v, i) => limitValues[i] || v) : defaultLimitValues,
      initValues: doubleBlock ? initValues : getObjectType(initValues) === 'Array' ? initValues[0] : initValues,
      doubleBlock,
    };
  };

  getPosition = (): Position => {
    const { startValue, endValue } = this.state;
    const { minMove } = this.props;
    const { limitValues } = this.getLineValues(this.props);

    const { width: lineWidth, left: lineLeft, right: lineRight } = this.getLineWidth();
    const allNumLen = limitValues[1] - limitValues[0];
    const startNumLen = startValue < limitValues[0] ? 0 : startValue - limitValues[0];
    const endNumLen = endValue <= startValue ? startValue + minMove : endValue - limitValues[0];

    return {
      left: lineLeft + (startNumLen / allNumLen) * lineWidth,
      right: lineRight + (1 - endNumLen / allNumLen) * lineWidth,
    };
  };

  getLineWidth = () => {
    // 实际可以移动的宽度，和左右间隙
    // 实际可以移动范围需要去掉按钮的宽度
    return {
      width: this.state.sliderWidth - this.props.blockSize,
      left: this.props.blockSize / 2,
      right: this.props.blockSize / 2,
    };
  };

  getToNum = (moveX: number, old: number) => {
    const { limitValues } = this.getLineValues(this.props);
    const { width: lineWidth } = this.getLineWidth();
    const allNumLen = limitValues[1] - limitValues[0];

    const moveNum = Math.floor((Math.abs(moveX) / lineWidth) * allNumLen);
    // 判断左右滑
    let toNum = old + (moveX < 0 ? -1 * moveNum : moveNum);
    // 处理边界
    toNum = toNum < limitValues[0] ? limitValues[0] : toNum > limitValues[1] ? limitValues[1] : toNum;
    return toNum;
  };

  getEvents = () => {
    const events = {
      onTouchDown: (event: TouchableEvent) => {
        void this.onTouchDown(event);
      },
      onTouchMove: (event: TouchableEvent) => {
        this.onTouchMove(event);
      },
      onTouchEnd: (event: TouchableEvent) => {
        this.onTouchEnd(event);
      },
      onTouchCancel: (event: TouchableEvent) => {
        this.onTouchEnd(event);
      },
      onMouseDown: (event: MouseEvent) => {
        void this.onTouchDown({ pageX: event.clientX });
      },
      onMouseMove: (event: MouseEvent) => {
        this.onTouchMove({ pageX: event.clientX });
      },
      onMouseUp: (event: MouseEvent) => {
        this.onTouchEnd({ pageX: event.clientX });
      },
      onMouseOut: (event: MouseEvent) => {
        this.onTouchEnd({ pageX: event.clientX });
      },
    };
    return this.props.disabled ? {} : events;
  };

  /**
   *
   * @param x 注意当前的x是page坐标，需要转换为容器坐标
   * @returns
   */
  getBlockMoveType = async (x: number): Promise<EventOriginType | null> => {
    const { initValues, blockSize, contentOnEvent } = this.props;
    const { sliderWidth } = this.state;
    const isDoubleBlock = getObjectType(initValues) === 'Array' && initValues[1];

    // 注意需要获取容器的page坐标，用来判断用户触摸开始离那个滑块最近
    let sliderX = 0;
    try {
      // 获取容器的page坐标
      const slideRec: any = isWeb()
        ? this.sliderRef.node?.getBoundingClientRect?.()
        : await UIManagerModule.measureInAppWindow(this.sliderRef as any);
      // hippy是x， web是left
      sliderX = slideRec.x || slideRec.left;
    } catch (error) {
      console.error(error);
      return null;
    }
    // 如果在web下，滑块的onLayout只会首次执行，所以需要实时更新
    if (isWeb()) {
      this.blockLeftX = this.blockLeftRef.node.offsetLeft;
      this.blockRightX = this.blockRightRef.node.offsetLeft;
    }

    // 把点击坐标转换为容器坐标
    const _x = x - sliderX;
    // 中心点
    const blockLeftX = this.blockLeftX + blockSize / 2;
    const blockRightX = this.blockRightX + blockSize / 2;
    // 只有一个滑块，则是end
    if (isDoubleBlock && sliderWidth) {
      // 如果是整个容器响应事件，则判断离那个滑块近
      if (contentOnEvent) {
        // 离左侧的滑块更近
        if (Math.abs(blockLeftX - _x) < Math.abs(blockRightX - _x)) {
          return EventOriginType.start;
        } else {
          return EventOriginType.end;
        }
      } else {
        // 判断点击的是哪个滑块
        // 判断点击的位置是否在滑块blockSize之内
        if (Math.abs(blockRightX - _x) <= blockSize / 2) {
          return EventOriginType.end;
        } else if (Math.abs(blockLeftX - _x) <= blockSize / 2) {
          return EventOriginType.start;
        }
        // 未选中滑块
        return null;
      }
    } else {
      // 单滑动
      if (contentOnEvent) {
        return EventOriginType.end;
      } else {
        if (Math.abs(blockRightX - _x) <= blockSize / 2) {
          return EventOriginType.end;
        }
        // 未选中滑块
        return null;
      }
    }
  };

  onTouchDown = async (event: Partial<TouchableEvent>) => {
    if (!this.sliderRef) return;
    const { limitValues, doubleBlock } = this.getLineValues(this.props);
    this.touchDownX = event.page_x || event.pageX;
    const { startValue, endValue } = this.state;
    this.blockType = await this.getBlockMoveType(this.touchDownX);
    console.info('[slider]blockMoveType', this.blockType);
    if (!this.blockType) return;

    // 记录移动前的旧值
    this.startValues = { startValue, endValue };
    // 获取当前元素可以移动的范围，主要是处理两个滑块的情况
    if (this.blockType === 'start') {
      this.moveRef = this.blockLeftRef;
      this.touchMoveRange = {
        start: limitValues[0],
        // 右侧滑块-最小间隙
        end: this.state.endValue - (doubleBlock ? this.props.minMove : 0),
      };
    } else {
      this.moveRef = this.blockRightRef;
      this.touchMoveRange = {
        start: this.state.startValue + (doubleBlock ? this.props.minMove : 0),
        end: limitValues[1],
      };
    }
  };

  onTouchMove = (event: Partial<TouchableEvent>) => {
    if (!this.touchDownX || !this.blockType) return;

    // const { startValue, endValue } = this.state;
    const { onChange, blockSize } = this.props;
    const { limitValues } = this.getLineValues(this.props);
    // 实际可以移动范围需要去掉按钮的宽度
    const { width: lineWidth, left: lineLeft, right: lineRight } = this.getLineWidth();
    const allNumLen = limitValues[1] - limitValues[0];
    const btnEle: any = isWeb() ? this.moveRef.node : this.moveRef ? getElementFromFiberRef(this.moveRef) : null;
    const lineEle: any = isWeb() ? this.lineRef.node : this.lineRef ? getElementFromFiberRef(this.lineRef) : null;

    const moveX = (event.page_x || event.pageX) - this.touchDownX;
    const toNum = this.getToNum(
      moveX,
      this.blockType === EventOriginType.start ? this.startValues.startValue : this.startValues.endValue,
    );
    if (toNum >= this.touchMoveRange.start && toNum <= this.touchMoveRange.end && btnEle && lineEle) {
      // 以滑块中心点为原点，需要处理滑块本身的size
      // hippy对超出容器节点会裁切，滑块以外层容器做定位，所以需要处理边界值
      const style: { left?: number; right?: number } =
        this.blockType === EventOriginType.start
          ? {
              // 需要减去滑块自身的seiz/2
              left: lineLeft + ((toNum - limitValues[0]) / allNumLen) * lineWidth - blockSize / 2,
            }
          : {
              right: lineRight + ((limitValues[1] - toNum) / allNumLen) * lineWidth - blockSize / 2,
            };

      if (isWeb()) {
        if (this.blockType === EventOriginType.start) {
          btnEle.style.left = `${style.left}px`;
          lineEle.style.left = `${style.left}px`;
        } else {
          btnEle.style.right = `${style.right}px`;
          lineEle.style.right = `${style.right}px`;
        }
      } else {
        // btnEle.setNativeProps({ style });
        // lineEle.setNativeProps({ style });
        // setNativeProps失效，先使用setState
        if (this.blockType === EventOriginType.start) {
          this.setState({ ...this.state, startValue: toNum });
        } else {
          this.setState({ ...this.state, endValue: toNum });
        }
      }

      this.moveToNum = toNum;
      onChange?.({
        start: this.blockType === EventOriginType.start ? toNum : this.startValues.startValue,
        end: this.blockType === EventOriginType.end ? toNum : this.startValues.endValue,
      });
    }
  };

  onTouchEnd = (event: Partial<TouchableEvent>) => {
    if (this.moveToNum !== null) {
      this.props.onChangeEnd?.({
        start: this.blockType === EventOriginType.start ? this.moveToNum : this.startValues.startValue,
        end: this.blockType === EventOriginType.end ? this.moveToNum : this.startValues.endValue,
      });
      if (this.blockType === EventOriginType.start) {
        this.setState({ ...this.state, startValue: this.moveToNum });
      } else {
        this.setState({ ...this.state, endValue: this.moveToNum });
      }
    }

    // reset values
    this.moveToNum = null;
    this.moveRef = null;
    this.touchDownX = 0;
    this.startValues = { startValue: 0, endValue: 0 };
    this.blockType = undefined;
  };

  render() {
    return (
      <Consumer>
        {(consumerValue) => {
          const {
            props: { limitValues, initValues, blockImage, blockSize, disabled },
            state: { sliderWidth, startValue, endValue },
          } = this;
          const { wrapProps, lineProps, activeLineProps, blockProps, blockImageProps } = getRenderInfo({
            consumerValue,
            props: this.props,
            state: this.state,
          });

          const isDoubleBlock = getObjectType(initValues) === 'Array' && initValues[1];
          const position = this.getPosition();

          return (
            <View
              ref={(r) => {
                this.sliderRef = r;
              }}
              {...wrapProps}
              onLayout={(e: LayoutEvent) => {
                // 实际的移动宽度，
                this.setState({ ...this.state, sliderWidth: e.layout.width });
              }}
              accessible={!disabled}
              accessibilityLabel={`${limitValues[0]}~${limitValues[1]}`}
              {...this.getEvents()}
            >
              <View {...lineProps} />
              {sliderWidth ? (
                <View
                  {...activeLineProps}
                  ref={(r) => {
                    this.lineRef = r;
                  }}
                  style={{ ...activeLineProps.style, left: position.left, right: position.right }}
                ></View>
              ) : null}

              {/* 左侧开始滑块，当有2个滑块的显示 */}
              {isDoubleBlock && sliderWidth ? (
                <View
                  ref={(r) => {
                    this.blockLeftRef = r;
                  }}
                  {...blockProps}
                  style={{ ...blockProps.style, left: position.left - blockSize / 2 }}
                  onLayout={(e: LayoutEvent) => {
                    this.blockLeftX = e.layout.x;
                  }}
                  accessible={!disabled}
                  accessibilityLabel={`${startValue}`}
                >
                  {blockImage ? (
                    <Image
                      {...blockImageProps}
                      source={{ uri: typeof blockImage === 'string' ? blockImage : blockImage[0] }}
                    />
                  ) : null}
                </View>
              ) : null}
              {/* 右侧结束块 */}
              {sliderWidth ? (
                <View
                  ref={(r) => {
                    this.blockRightRef = r;
                  }}
                  {...blockProps}
                  style={{ ...blockProps.style, right: position.right - blockSize / 2 }}
                  onLayout={(e: LayoutEvent) => {
                    this.blockRightX = e.layout.x;
                  }}
                  accessible={!disabled}
                  accessibilityLabel={`${endValue}`}
                >
                  {blockImage ? (
                    <Image
                      {...blockImageProps}
                      source={{ uri: typeof blockImage === 'string' ? blockImage : blockImage[1] || blockImage[0] }}
                    />
                  ) : null}
                </View>
              ) : null}
            </View>
          );
        }}
      </Consumer>
    );
  }
}

export default Slider;
