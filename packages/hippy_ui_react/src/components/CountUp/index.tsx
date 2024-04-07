import React, { Component } from 'react';
import { HiText } from '../HiText';
import { ComCountUpProps, ComCountUpState } from './PropsType';

/**
 * @visibleName CountUp 滚动数
 */
export class CountUp extends Component<ComCountUpProps, ComCountUpState> {
  static defaultProps = {
    animationDuration: 300,
    animationInterval: 50,
  };

  constructor(props: ComCountUpProps) {
    super(props);
    const { value, startValue = value } = props;
    this.state = {
      value: startValue,
    };
  }

  componentDidUpdate(prevProps: Readonly<ComCountUpProps>, prevState: Readonly<ComCountUpState>, snapshot?: any) {
    if (this.props.value !== prevProps.value) {
      this.stop();
      const { animationInterval, animationDuration } = this.props;
      this.step = (animationInterval * (this.props.value - this.state.value)) / animationDuration;
      this.start();
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  private timer: any;
  private step = 0;

  start = () => {
    this.stop();
    const { value, animationInterval } = this.props;
    if (this.state.value !== value) {
      this.timer = setTimeout(() => {
        if (this.state.value === this.props.value) {
          return;
        }
        let newValue = this.state.value + this.step;
        if (this.step > 0) {
          newValue = Math.min(value, newValue);
        } else {
          newValue = Math.max(value, newValue);
        }
        this.setState(
          {
            value: newValue,
          },
          () => {
            newValue === this.props.value && this.props.onArrival?.();
          },
        );
        this.start();
      }, animationInterval);
    }
  };

  stop = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  };

  // 计算有几位小数
  getFractionDigits = (value: number) => {
    return value.toString().split('.')[1]?.length || 0;
  };

  render() {
    const { value: realValue, format, style, decimalPlaces = this.getFractionDigits(realValue) } = this.props;
    const { value } = this.state;
    return (
      <HiText style={style}>
        {format ? format(Number(value.toFixed(decimalPlaces))) : value.toFixed(decimalPlaces)}
      </HiText>
    );
  }
}

export default CountUp;
