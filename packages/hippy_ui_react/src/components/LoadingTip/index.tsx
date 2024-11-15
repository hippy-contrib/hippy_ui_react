import React, { Component, ReactNode } from 'react';
import { LoadingTipProps, LoadingTipStatus } from './PropsType';
import HiText from '../HiText';
import Empty from '../Empty';
import Loading from '../Loading';
import Consumer from '../../provider/Consumer';
import { ConsumerValue } from '../../provider';
import { loadingTipConfig } from './config';
import { ThemeConfig } from '../../themeConfig';

/**
 * @visibleName LoadingTip 加载提示
 */
export class LoadingTip extends Component<LoadingTipProps, {}> {
  static status = LoadingTipStatus;

  // 渲染：提示语
  renderTip = (params: { consumerValue: ConsumerValue }) => {
    const {
      consumerValue: { themeConfig: _themeConfig },
    } = params;
    const themeConfig: ThemeConfig = { ...loadingTipConfig, ..._themeConfig };
    const {
      status,
      txtLoading = themeConfig.loadingTipTxtLoading,
      txtEmpty = themeConfig.loadingTipTxtEmpty,
      txtError = themeConfig.loadingTipTxtError,
      txtMore = themeConfig.loadingTipTxtMore,
      txtFinish = themeConfig.loadingTipTxtFinish,
      hasData,
      textStyle,
      onPress,
      loadingProps,
    } = this.props;
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
        <HiText style={[{ color: themeConfig.colorTextSecondary }, textStyle]} onClick={onPress}>
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
            consumerValue,
          });
          return this.renderHasData(tip);
        }}
      </Consumer>
    );
  }
}

export default LoadingTip;
