支持通过 Provider 进行全局配置：
1. 主题配置：
    - 内置两份主题色：浅色模式/深色模式，默认为浅色模式
    - 各组件跟随主题色切换
    - 可自行配置组件样式
    - 可自定义组件渲染
2. 未来其他全局配置，如：放大模式等


## 如何使用


### 1. 业务自定义主题配置

```tsx static
// noExample
import React, { Component, ReactNode } from "react";
import { callNativeWithPromise, BackAndroid, Platform } from "@hippy/react";
import { Provider, ProviderProps, HRUEvent } from "hippy_ui_react";

interface KgHRUProviderProps {
  HRUProvider?: ProviderProps;
  children?: ReactNode;
  onBack?: () => void;
}

const KG_HRU_EVENT_ACTIVE_CHANGE = "KG_HRU_EVENT_ACTIVE_CHANGE";

/**
 * hippy_ui_react 的 Provider 配置
 * */
export default class KgHRUProvider extends Component<KgHRUProviderProps> {
  componentDidMount() {
    if (__hippy__) {
      event.on("router.enter", this.onPageEnter);
      event.on("router.exit", this.onPageLeave);
      event.on("AppEnterForeground", this.onPageEnter);
      event.on("AppEnterBackground", this.onPageLeave);
    }
  }

  // 页面进入：添加监听
  onPageEnter = () => {
    HRUEvent.emit(KG_HRU_EVENT_ACTIVE_CHANGE, true);
  };
  // 页面离开：添加监听
  onPageLeave = () => {
    HRUEvent.emit(KG_HRU_EVENT_ACTIVE_CHANGE, false);
  };
  // 页面离开：添加监听
  commonListenActiveAdd = (callBack: (active: boolean) => void) => {
    HRUEvent.on(KG_HRU_EVENT_ACTIVE_CHANGE, callBack);
  };
  commonListenActiveRemove = (callBack: (active: boolean) => void) => {
    HRUEvent.off(KG_HRU_EVENT_ACTIVE_CHANGE, callBack);
  };

  // 后退拦截：添加监听
  commonListenBackAdd = (callBack: () => boolean) => {
    if (!__hippy__) {
      return;
    }
    if (Platform.OS === 'android') {
      BackAndroid.addListener(this.onNativeBack.bind(this, callBack));
    } else {
      // IOS后退拦截
      callNativeWithPromise("KGModuleXxx", "KGBridgeXxx", {
        action: "back",
        data: {
          forbid: 1
        },
        instanceId: __instanceId__
      });
      event.on("KGBackPress", this.onNativeBack.bind(this, callBack));
    }
  };

  // 后退拦截：移除监听
  commonListenBackRemove = (callBack: () => boolean) => {
    if (!__hippy__) {
      return;
    }
    if (Platform.OS === 'android') {
      BackAndroid.removeListener(this.onNativeBack.bind(this, callBack));
    } {
      // IOS后退拦截
      callNativeWithPromise("KGModuleXxx", "KGBridgeXxx", {
        action: "back",
        data: {
          forbid: 0
        },
        instanceId: __instanceId__
      });
      event.off("KGBackPress", this.onNativeBack.bind(this, callBack));
    }
  };

  // 后退拦截：响应hippy_ui_react + router
  onNativeBack = (HRUCallBack: () => boolean) => {
    if (HRUCallBack()) {
      return true;
    } else if (this.props.onBack) {
      this.props.onBack();
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { children, HRUProvider } = this.props;
    return (
      <Provider
        {...HRUProvider}
        themeConfigFunc={({ defaultConfig }) => {
          return {
            ...defaultConfig,
            commonListenActiveAdd: this.commonListenActiveAdd,
            commonListenActiveRemove: this.commonListenActiveRemove,
            commonListenBackAdd: this.commonListenBackAdd,
            commonListenBackRemove: this.commonListenBackRemove
          };
        }}
      >
        {children}
      </Provider>
    );
  }
}

```

**核心3个配置：**
- theme: 浅色模式/深色模式
- themeConfigFunc：自定义配置主题样式
  - commonListenActiveAdd：页面是否活跃，避免`LoadingGif、Marquee`无限轮询
  - commonListenBackAdd：拦截系统后退事件，关闭全局弹窗（默认配置了安卓）
- renderInfo：更自由的自定义渲染

**如：**
```jsx
// preview

const [useDark, setUseDark] = React.useState(false);

<Provider
  style={{flex: 1}}
  // 主题模式
  theme={useDark ? ThemeMode.dark : ThemeMode.light}
  // 样式配置
  themeConfigFunc={({theme, defaultConfig}) => {
    const myConfig = theme === ThemeMode.light
      ? {buttonMediumTextProps: {size: 14}}
      : {buttonMediumTextProps: {size: 20}};
    return {...defaultConfig, ...myConfig, colorTheme: "#409EFF"};
  }}
  // 自定义渲染
  renderInfo={{
    hiText({consumerValue, props, defaultRenderInfo}){
      let result = defaultRenderInfo;
      if(props.color === "secondary"){
        result = extendObj(
          defaultRenderInfo,
          {textProps: {style: {color: consumerValue.themeConfig.colorTextSecondary}}}
        )
      }
      return result;
    }
  }}
>
  
  <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 50, padding: 10}}>
    <HiText>{"切换深色模式试试："}</HiText>
    <Switch checked={useDark} onChange={() => {setUseDark(!useDark)}}/>
  </View>

  <Button type={Button.type.primary}>
    {"按钮在黑暗模式下文字变大"}
  </Button>

  <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center",marginTop: 20, padding: 10}}>
    <HiText color={HiText.color.theme}>{"修改主题色   "}</HiText>
    <HiText color={"secondary"}>{"修改文字 secondary 色值"}</HiText>
  </View>
</Provider>
```

**注意事项：**
- 过度渲染优化：`Provider`默认带有一个`View`包裹，可使用`noWrap`来移除。但在Hippy根节点不可移除，否则里面的节点更新会找不到父节点。
- 多处引用：`Toast/Modal/Mask`等自带的静态显示方法会往`Provider`注入节点，如果你在多处引入`Provider`（不建议），请在根节点外的地方设置`noGlobalView`。


### 2. 将 Provider 置于根节点上
```tsx static
// noExample
import KgHRUProvider from "./KgHRUProvider";

<KgHRUProvider>
    <Button>{"测试"}</Button>
</KgHRUProvider>
```
