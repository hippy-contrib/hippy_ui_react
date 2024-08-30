🚀 一个基于 `hippy-react` 的 UI 组件库。

## 📚 文档

- 线上文档：https://hippy-contrib.github.io/hippy_ui_react/
- 项目源码：https://github.com/hippy-contrib/hippy_ui_react.git


## 📦 安装

```bash
yarn add  hippy_ui_react
# or
npm install hippy_ui_react
```


## ✨ 特性

- 开发使用顺滑，体验一把梭。
- 开箱即用的高质量 `hippy-react` 组件。
- 支持定制化主题色。
- 丰富的文档和案例说明。
- 多平台支持。

## 💻 平台

- 兼容 H5、Hippy。

H5请设置`@hippy/react`别名为`@hippy/react-web`：
```js static
// hippyReactWeb.js
export * from '@hippy/react-web';
export const UIManagerModule = {};
export const BackAndroid = {};
export const colorParse = () => '';
```

```js static
module.exports = {
  alias: {
    "@hippy/react": path.resolve(__dirname, "./lib/hippyReactWeb.js")
  }
}
```

## 💡贡献
- 本项目由「全民K歌」团队提供
