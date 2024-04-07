import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from '@hippy/react';
import { Navigator, Provider, Switch, ThemeMode, HiText } from '../../packages/hippy_ui_react/lib';

import HippyReactUiComponents from './hippy_ui_react/index';
import { GroupMenu, HippyReactUiExampleState } from './types';

const MENU: GroupMenu[] = [HippyReactUiComponents];

// Hippy（客户端）示例：主页
export default class HippyReactUiExample extends Component<any, HippyReactUiExampleState> {
  constructor(props) {
    super(props);
    this.state = {
      subPage: null,
      theme: ThemeMode.light,
    };
  }

  // 渲染：子页面导航栏
  renderNavigator = () => {
    const { theme, subPage } = this.state;
    return subPage ? (
      <Navigator
        onBack={() => {
          this.setState({
            ...this.state,
            subPage: null,
          });
        }}
        title={subPage.name}
        titleCenter={false}
        statusBarStyle={{ height: 0 }}
        rightNodes={
          <View style={styles.navigatorRight}>
            <HiText>{'黑暗模式：'}</HiText>
            <Switch
              checked={theme === ThemeMode.dark}
              onChange={() => {
                this.setState({
                  ...this.state,
                  theme: theme === ThemeMode.dark ? ThemeMode.light : ThemeMode.dark,
                });
              }}
            />
          </View>
        }
      />
    ) : null;
  };

  // 渲染：菜单
  renderMenu = () => {
    return MENU.map((group) => {
      return (
        <View key={group.groupName}>
          {/* 分组名 */}
          <HiText size={17} weight={HiText.weight.bold} color={HiText.color.theme} style={styles.groupName}>
            {group.groupName}
          </HiText>
          {/* 组件列表 */}
          {group.subMenu.map((subMenu) => {
            return (
              <HiText
                key={subMenu.name}
                style={styles.subMenu}
                onClick={() => {
                  this.setState({
                    ...this.state,
                    subPage: subMenu,
                  });
                }}
              >
                {subMenu.name}
              </HiText>
            );
          })}
        </View>
      );
    });
  };

  render() {
    const { theme, subPage } = this.state;
    return (
      <Provider theme={theme}>
        {this.renderNavigator()}
        <ScrollView>{subPage?.page || this.renderMenu()}</ScrollView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  groupName: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  navigatorRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subMenu: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 50,
    borderWidth: 1,
    borderColor: '#DCDFE6',
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 10,
    textAlign: 'center',
  },
});

// hippy-react-demo里的路由
export const HippyReactUiPage = {
  path: '/HippyReactUi',
  name: 'HippyReactUi 组件库',
  component: HippyReactUiExample,
  meta: {
    style: 1,
  },
};
