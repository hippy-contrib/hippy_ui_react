import React, { Component, ReactNode } from 'react';
import { TextStyle } from '@hippy/react';
import { LoadingTipProps, LoadingTipStatus } from './PropsType';
import HiText from '../HiText';
import Empty from '../Empty';
import Loading from '../Loading';
import Consumer from '../../provider/Consumer';

/**
 * @visibleName LoadingTip 加载提示
 */
export class LoadingTip extends Component<LoadingTipProps, {}> {
  static defaultProps = {
    txtFinish: '加载完成',
    txtMore: '加载更多',
    txtEmpty: '数据为空',
    txtError: '加载异常',
    txtLoading: '加载中',
  };

  static status = LoadingTipStatus;

  // 渲染：提示语
  renderTip = (params: { tipStyle?: TextStyle }) => {
    const { tipStyle } = params;
    const { status, txtLoading, txtEmpty, txtError, txtMore, txtFinish, hasData, textStyle, onPress, loadingProps } =
      this.props;
    const text =
      status === LoadingTipStatus.loading
        ? txtLoading
        : status === LoadingTipStatus.error
          ? txtError
          : status !== LoadingTipStatus.finish
            ? txtMore
            : hasData
              ? txtFinish
              : txtEmpty;
    let loading;
    if (typeof text === 'string' || typeof text === 'number') {
      const desc = (
        <HiText style={[tipStyle, textStyle]} onClick={onPress}>
          {text}
        </HiText>
      );
      loading = <Loading gif={status !== LoadingTipStatus.loading ? null : undefined} text={desc} {...loadingProps} />;
    } else {
      loading = text;
    }
    return loading;
  };

  // 渲染：根据是否有数据渲染空状态
  renderHasData = (node: ReactNode) => {
    const { onPress, hasData, emptyProps } = this.props;
    return hasData ? node : <Empty onPress={onPress} desc={node} {...emptyProps}></Empty>;
  };

  render() {
    return (
      <Consumer>
        {(consumerValue) => {
          const tip = this.renderTip({
            tipStyle: {
              color: consumerValue.themeConfig.colorTextSecondary,
            },
          });
          return this.renderHasData(tip);
        }}
      </Consumer>
    );
  }
}

export default LoadingTip;
