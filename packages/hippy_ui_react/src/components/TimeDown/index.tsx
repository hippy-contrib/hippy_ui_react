import React, { Component } from 'react';
import HiText from '../HiText';
import { TimeDownComponentProps, TimeDownComponentState, LeftTimeInfo } from './PropsType';
import { replenishNum } from '../../utils/Utils';

/**
 * @visibleName TimeDown 倒计时
 */
export class TimeDown extends Component<TimeDownComponentProps, TimeDownComponentState> {
  static defaultProps = {
    stepTime: 1000,
  };

  constructor(props: TimeDownComponentProps) {
    super(props);
    this.state = {
      render: this.getRender(props),
    };
  }

  componentDidMount() {
    this.start();
  }

  componentWillUnmount() {
    this.props.onUnmount?.(this.getLeftTime());
    this.stop();
  }

  private timer: any;

  /**
   * 开始倒计时
   * */
  public start = () => {
    this.stop();
    this.setState({
      render: this.getRender(),
    });
    if (this.getLeftTime().leftTime <= 0) {
      this.props.onArrival?.();
    } else {
      this.timer = setTimeout(this.start, this.props.stepTime);
    }
  };

  /**
   * 停止倒计时
   * */
  public stop = () => {
    this.timer && clearTimeout(this.timer);
    this.timer = null;
  };

  // 获取渲染结果
  getRender = (props?: TimeDownComponentProps) => {
    const _props = props || this.props;
    const { format, style } = _props;
    const leftTime = this.getLeftTime(props);
    let text;
    if (format) {
      text = format(leftTime);
    } else {
      text = TimeDown.formatLeftTime(leftTime);
    }
    if (typeof text === 'string') {
      return <HiText style={style}>{text}</HiText>;
    } else {
      return text;
    }
  };

  /**
   * 格式化时间
   * @param leftTimeInfo 时间信息
   * */
  static formatLeftTime = (leftTimeInfo: LeftTimeInfo) => {
    const timeList = [
      {
        value: leftTimeInfo.day,
        unit: '天',
      },
      {
        value: leftTimeInfo.hour,
        unit: '时',
      },
      {
        value: leftTimeInfo.minute,
        unit: '分',
      },
      {
        value: leftTimeInfo.second,
        unit: '秒',
      },
    ];
    let push = false;
    const result = timeList.reduce((txt, item) => {
      if (push || item.value) {
        push = true;
        txt += `${replenishNum(item.value)}${item.unit}`;
      }
      return txt;
    }, '');
    return result;
  };

  // 获取剩余时间（最小值为0）
  getLeftTime = (props?: TimeDownComponentProps) => {
    const _props = props || this.props;
    const { time } = _props;
    const leftTime = Math.max(0, time.getTime() - new Date().getTime());
    const leftTimeInfo: LeftTimeInfo = {
      leftTime,
      day: Math.floor(leftTime / (24 * 60 * 60 * 1000)),
      hour: Math.floor(leftTime / (60 * 60 * 1000)) % 24,
      minute: Math.floor(leftTime / (60 * 1000)) % 60,
      second: Math.floor(leftTime / 1000) % 60,
      millisecond: leftTime % 1000,
    };
    return leftTimeInfo;
  };

  render() {
    return this.state.render;
  }
}

export default TimeDown;
