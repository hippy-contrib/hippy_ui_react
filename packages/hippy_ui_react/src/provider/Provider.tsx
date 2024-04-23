import React, { Component, isValidElement, cloneElement } from 'react';
import { View } from '@hippy/react';
import {
  getProviderValue,
  GlobalViewData,
  HippyReactUIContext,
  ProviderProps,
  ProviderState,
  UpdateGlobalViewData,
} from './PropsType';
import { transferStyle } from '../utils/Styles';
import { getThemeConfig } from '../themeConfig';
import HRUEvent, { HRU_EVENT_GLOBAL_VIEW } from '../utils/HRUEvent';
import { ConfigCommon, setConfigCommon } from './ConfigCommon';

/**
 * @visibleName Provider 全局模式
 */
export default class Provider extends Component<ProviderProps, ProviderState> {
  state: ProviderState = {
    globalViews: {},
  };

  componentDidMount() {
    if (!this.props.noGlobalView) {
      HRUEvent.on(HRU_EVENT_GLOBAL_VIEW, this.listenGlobalView);
      ConfigCommon.commonListenBackAdd?.(this.backToCloseGlobalView);
    }
  }

  componentWillUnmount() {
    if (!this.props.noGlobalView) {
      HRUEvent.off(HRU_EVENT_GLOBAL_VIEW, this.listenGlobalView);
      ConfigCommon.commonListenBackRemove?.(this.backToCloseGlobalView);
    }
  }

  /**
   * 更新全局节点
   * */
  static updateGlobalView(params: UpdateGlobalViewData) {
    HRUEvent.emit(HRU_EVENT_GLOBAL_VIEW, params);
  }

  // state更新不及时，这里用变量来记录最新值
  private realTimeGlobalViews: UpdateGlobalViewData = {};

  // 监听插入全局节点
  listenGlobalView = (params: UpdateGlobalViewData) => {
    this.realTimeGlobalViews = {
      ...this.realTimeGlobalViews,
      ...params,
    };
    this.setState({
      globalViews: this.realTimeGlobalViews,
    });
  };

  // 监听系统后退事件，关闭全局View
  backToCloseGlobalView = () => {
    const globalViewKeys = this.getGlobalView();
    let closeView;
    for (let i = globalViewKeys.length - 1; i >= 0; i--) {
      if (globalViewKeys[i].onBackToClose) {
        closeView = globalViewKeys[i];
        break;
      }
    }
    if (closeView) {
      return closeView.onBackToClose();
    }
    return false;
  };

  // 工具：获取全局View
  getGlobalView = () => {
    const { globalViews } = this.state;
    return Object.keys(globalViews)
      .sort((a, b) => (globalViews[a].order || 0) - (globalViews[b].order || 0))
      .reduce<Array<{ globalKey: string } & GlobalViewData>>((list, globalKey) => {
        globalViews[globalKey].data?.forEach((item) => {
          isValidElement(item.view) && list.push({ globalKey, ...item });
        });
        return list;
      }, []);
  };

  render() {
    const { theme, themeConfigFunc, renderInfo, style, children, noWrap, noGlobalView, ...viewProps } = this.props;
    const providerValue = getProviderValue(this.props);
    const themeConfig = getThemeConfig({
      theme,
      themeConfigFunc,
    });
    setConfigCommon(themeConfig);
    const _child = (
      <HippyReactUIContext.Provider value={providerValue}>
        {children}
        {this.getGlobalView().map((item, idx) => cloneElement(item.view, { key: idx }))}
      </HippyReactUIContext.Provider>
    );

    return noWrap ? (
      _child
    ) : (
      <View {...viewProps} style={transferStyle([{ backgroundColor: themeConfig.colorBg, flex: 1 }, style])}>
        {_child}
      </View>
    );
  }
}
