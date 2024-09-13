import React, { Component, isValidElement } from 'react';
import { View } from '@hippy/react';
import Provider from '../../provider/Provider';
import Consumer from '../../provider/Consumer';
import HiText from '../HiText';
import { GLOBAL_VIEW_KEY_TOAST, ToastProps, ToastState } from './PropsType';
import getRenderInfo from './renderInfo';

/**
 * @visibleName Toast 提示
 * */
class Toast extends Component<ToastProps, ToastState> {
  static defaultProps: ToastProps = {
    isShow: true,
    duration: 2000,
    pointerEvents: 'none',
    text: null,
  };

  constructor(props: ToastProps) {
    super(props);

    this.state = {
      isShow: this.props.isShow,
    };
  }

  componentDidMount() {
    this.autoHide();
  }

  shouldComponentUpdate(nextProps: Readonly<ToastProps>, nextState: Readonly<ToastState>, nextContext: any): boolean {
    if (nextProps.isShow !== this.state.isShow) {
      this.setState({
        isShow: nextProps.isShow,
      });
    }
    return true;
  }

  componentDidUpdate(prevProps: Readonly<ToastProps>, prevState: Readonly<ToastState>, snapshot?: any) {
    this.autoHide();
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  /**
   * 显示Toast
   * @param text 文本
   * @param props toast属性
   * */
  static show(text: ToastProps['text'] | ToastProps, props?: Partial<ToastProps>) {
    const _props =
      typeof text === 'string' || isValidElement(text)
        ? { text, ...(props || {}) }
        : { ...(text as ToastProps), ...(props || {}) };
    Provider.updateGlobalView({
      [GLOBAL_VIEW_KEY_TOAST]: {
        data: [
          {
            view: (
              <Toast
                {..._props}
                onHide={() => {
                  Toast.hide();
                  _props.onHide?.();
                }}
              />
            ),
            onBackToClose: undefined,
          },
        ],
      },
    });
  }

  /**
   * 收起Toast
   * */
  static hide() {
    Provider.updateGlobalView({
      [GLOBAL_VIEW_KEY_TOAST]: {
        data: [],
      },
    });
  }

  private timer?: any;

  // 自动收起
  autoHide = () => {
    this.timer && clearTimeout(this.timer);
    this.timer = null;
    if (this.state.isShow && this.props.duration > 0) {
      this.timer = setTimeout(() => {
        this.setState({
          isShow: false,
        });
        this.props.onHide?.();
      }, this.props.duration);
    }
  };

  render() {
    const { props, state } = this;
    const { text, children } = props;
    const { isShow } = state;

    return (
      <Consumer>
        {(consumerValue) => {
          const { mainProps, maskProps, textProps } = getRenderInfo({ consumerValue, props, state });

          return isShow ? (
            <View {...maskProps}>
              <View {...mainProps}>
                {isValidElement(text) ? text : typeof text === 'string' ? <HiText {...textProps}>{text}</HiText> : null}
                {children}
              </View>
            </View>
          ) : null;
        }}
      </Consumer>
    );
  }
}

export default Toast;
