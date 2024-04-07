import React, { Component } from 'react';
import { View, Animation } from '@hippy/react';
import { SwitchProps, SwitchState } from './PropsType';
import Consumer from '../../provider/Consumer';
import { isWeb, Debounce, getObjectType, ObjectType } from '../../utils/Utils';
import getRenderInfo from './renderInfo';

/**
 * @visibleName Switch 开关
 */
export class Switch extends Component<SwitchProps, SwitchState> {
  static defaultProps: Partial<SwitchProps> = {
    accessible: true,
    debounce: true,
  };

  constructor(props: SwitchProps) {
    super(props);
    this.state = {
      checked: !!this.props.checked,
    };
    if (!isWeb()) {
      this.translateXAnimation = new Animation({
        mode: 'timing',
        startValue: 0,
        toValue: 0,
        duration: 200,
        timingFunction: 'linear',
      });
    }
  }

  shouldComponentUpdate(nextProps: Readonly<SwitchProps>, nextState: Readonly<SwitchState>, nextContext: any): boolean {
    if (nextProps.checked !== undefined && nextProps.checked !== this.props.checked) {
      this.setState({
        checked: nextProps.checked,
      });
    }
    return true;
  }

  componentWillUnmount() {
    if (this.translateXAnimation) {
      this.translateXAnimation.destroy();
      this.translateXAnimation = undefined;
    }
  }

  private loading = 0;
  private translateXAnimation: Animation | undefined;
  private lastTranslateX: number = 0;
  private clickDebounce: Debounce<any> | null = null;

  // 事件：点击
  onClick = () => {
    const { debounce } = this.props;
    if (debounce) {
      !this.clickDebounce && (this.clickDebounce = new Debounce(this.onCheckedChange, debounce, true));
      this.clickDebounce.flush();
    } else {
      this.onCheckedChange();
    }
  };

  // 事件：切换前确认
  onCheckedChange = () => {
    const { onBeforeChange } = this.props;
    const isChecked = !this.state.checked;
    if (onBeforeChange) {
      const canChange = onBeforeChange(isChecked);
      if (getObjectType(canChange) === ObjectType.Promise) {
        const loadingTag = Math.abs(this.loading) + 1;
        this.loading = loadingTag;
        (canChange as Promise<boolean>)
          .then((_canChange) => {
            if (this.loading === loadingTag) {
              _canChange && this.changeCheck(isChecked);
              this.loading = -loadingTag;
            }
          })
          .catch(() => {
            if (this.loading === loadingTag) {
              this.loading = -loadingTag;
            }
          });
      } else {
        canChange && this.changeCheck(isChecked);
      }
    } else {
      this.changeCheck(isChecked);
    }
  };

  // 事件：切换选中态
  changeCheck = (nextChecked: boolean) => {
    const { checked } = this.state;
    if (checked !== nextChecked) {
      this.setState({ checked: nextChecked });
      this.props.onChange?.(nextChecked);
    }
  };

  // 动画：切换
  updateAnimation = (translateX: number) => {
    if (translateX === this.lastTranslateX) {
      return;
    }
    const lastTranslateX = this.lastTranslateX;
    this.lastTranslateX = translateX;
    if (!this.translateXAnimation) {
      return;
    }
    this.translateXAnimation.updateAnimation({
      startValue: lastTranslateX,
      toValue: translateX,
    });
    this.translateXAnimation.start();
  };

  render() {
    const { props, state, translateXAnimation } = this;
    return (
      <Consumer>
        {(consumerValue) => {
          const { wrapProps, circleProps, translateX } = getRenderInfo({
            consumerValue,
            props,
            state,
            translateXAnimation,
          });
          this.updateAnimation(translateX);
          return (
            <View {...wrapProps} onClick={this.onClick}>
              <View {...circleProps} />
            </View>
          );
        }}
      </Consumer>
    );
  }
}

export default Switch;
