import React, { Component } from 'react';
import { View, TextInput } from '@hippy/react';
import { SearchProps, SearchState } from './PropsType';
import Consumer from '../../provider/Consumer';
import getRenderInfo from './renderInfo';
import { isWeb } from '../../utils/Utils';

/**
 * @visibleName Search 搜索框
 */
export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      value: props.inputProps?.value || props.inputProps?.defaultValue || '',
    };
  }

  private isSubmitByClear = false;
  public refInput: TextInput | null = null;

  onClearClick = () => {
    this.clear();
  };

  /**
   * 清空输入框的内容。
   * @param noNextSubmit 不触发下一个submit（web下为`true`）
   * */
  public clear = (noNextSubmit = isWeb()) => {
    const { onClear, inputProps } = this.props;
    if (noNextSubmit) {
      this.isSubmitByClear = true;
    }
    if (this.state.value) {
      this.setState({
        value: '',
      });
      this.refInput?.clear();
      inputProps?.onChangeText?.('');
    }
    onClear?.();
  };

  /**
   * 让指定的 input 或 View 组件失去光标焦点，与 focus() 的作用相反。
   * @param noNextSubmit 不触发下一个submit（web下为`true`）
   * */
  public blur = (noNextSubmit = isWeb()) => {
    if (noNextSubmit) {
      this.isSubmitByClear = true;
    }
    this.refInput?.blur();
  };

  /**
   * 指派 TextInput 获得焦点。
   * */
  public focus = () => {
    this.refInput?.focus();
  };

  /**
   * 获得文本框中的内容。注意，由于是异步回调，收到回调时值可能已经改变。
   * */
  public getValue = () => {
    return this.refInput?.getValue();
  };

  /**
   * 设置文本框内容。
   * @param value 文本值
   * */
  public setValue = (value: string) => {
    this.refInput?.setValue(value);
    this.setState({
      value,
    });
  };

  /**
   * 获得文本框的焦点状态。注意，由于是异步回调，收到回调时值可能已经改变。
   * 最低支持版本 2.14.1。hippy-react-web 不支持。
   * */
  public isFocused = () => {
    return this.refInput?.isFocused?.();
  };

  render() {
    return (
      <Consumer>
        {(consumerValue) => {
          const { children } = this.props;
          const { wrapProps, leftIcon, rightIcon, inputProps } = getRenderInfo({
            consumerValue,
            props: this.props,
            state: this.state,
            onClear: this.onClearClick,
          });
          return (
            <View {...wrapProps}>
              {leftIcon}
              <TextInput
                ref={(r) => {
                  this.refInput = r;
                }}
                {...inputProps}
                onChangeText={(txt) => {
                  this.setState({
                    value: txt,
                  });
                  inputProps.onChangeText?.(txt);
                }}
                onKeyUp={(e) => {
                  if (e.keyCode === 13) {
                    (inputProps as any).onEndEditing?.(this.state.value);
                  }
                }}
                onEndEditing={(event?: any) => {
                  // event: { text: string }
                  if (this.isSubmitByClear) {
                    this.isSubmitByClear = false;
                  } else {
                    (inputProps as any).onEndEditing?.(event);
                  }
                }}
              />
              {rightIcon}
              {children}
            </View>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
