import React, { Component, isValidElement } from 'react';
import { View, Image } from '@hippy/react';
import { RadioProps, RadioState } from './PropsType';
import Consumer from '../../provider/Consumer';
import HiText from '../HiText';
import getRenderInfo from './renderInfo';
import { getObjectType, ObjectType } from '../../utils/Utils';

/**
 * @visibleName Radio 选择框
 */
export class Radio extends Component<RadioProps, RadioState> {
  constructor(props: RadioProps) {
    super(props);
    this.state = {
      checked: props.checked,
    };
  }

  shouldComponentUpdate(nextProps: Readonly<RadioProps>, nextState: Readonly<RadioState>, nextContext: any): boolean {
    if (this.props.checked !== nextProps.checked && nextProps.checked !== nextState.checked) {
      this.setState({
        checked: nextProps.checked,
      });
    }
    return true;
  }

  private loading = 0;

  // 事件：点击
  onClick = () => {
    const { checked } = this.state;
    const { onBeforeChange, disabled } = this.props;
    if (this.loading || disabled) {
      return;
    }
    if (onBeforeChange) {
      const canChange = onBeforeChange(!checked);
      if (getObjectType(canChange) === ObjectType.Promise) {
        const loadingTag = Math.abs(this.loading) + 1;
        this.loading = loadingTag;
        (canChange as Promise<boolean>)
          .then((_canChange) => {
            if (this.loading === loadingTag) {
              _canChange && this.changeCheck(!checked);
              this.loading = -loadingTag;
            }
          })
          .catch(() => {
            if (this.loading === loadingTag) {
              this.loading = -loadingTag;
            }
          });
      } else {
        canChange && this.changeCheck(!checked);
      }
    } else {
      this.changeCheck(!checked);
    }
  };

  // 改变状态
  changeCheck = (nextChecked: boolean) => {
    if (nextChecked !== this.state.checked) {
      this.setState({
        checked: nextChecked,
      });
      this.props.onChange(nextChecked);
    }
  };

  render() {
    return (
      <Consumer>
        {(consumerValue) => {
          const { props, state } = this;
          const { children, label, disabled } = props;
          const { wrapProps, imgProps, textProps } = getRenderInfo({ consumerValue, props, state });
          return (
            <View {...wrapProps} onClick={!disabled ? this.onClick : undefined}>
              <Image {...imgProps} />
              {!label ? null : isValidElement(label) ? label : <HiText {...textProps}>{label}</HiText>}
              {children}
            </View>
          );
        }}
      </Consumer>
    );
  }
}

export default Radio;
