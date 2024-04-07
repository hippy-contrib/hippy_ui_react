## 环境
1. node16
2. yarn
3. fork[代码](https://github.com/hippy-contrib/hippy_ui_react.git)

## 开发

### 开发：启动
安装依赖
```bash
yarn
```
开始开发
```bash
yarn dev
```

### 开发：示例
1.可以在docs上查看Web效果(移动端直接访问局域网ip:port)。

2.可以在官方`hippy-react-demo`查看example效果：
```bash
# 修改`hippy-react-demo`：examples/hippy-react-demo/src/routes.js
import { HippyReactUiPage } from '/$project_path/hippy_ui_react/example/lib/index.js'

export default [
  // !!! 插入这行 !!!
  HippyReactUiPage,
  // 以下是官方导出
  {
    path: '/View',
    name: 'View 组件',
    component: PAGE_LIST.View,
    meta: {
      style: 1,
    },
  },
]
```

3.可以将产物Link到你的项目查看本地效果：
```bash
# link组件库
cd packages/hippy_ui_react
yarn link

# 进入你的开发项目，修改组件库引用
cd <workspace>
yarn link hippy_ui_react
```

### 开发：规范
- **设计**：组件在新增props时，应考虑简洁性、灵活性、扩展性。如添加背景色设置，可以直接支持自定义整个`style`。
- **安装依赖**：项目采用`yarn workspaces`管理。项目无关安装在根目录`yarn add xxx -W -D`，项目有关就指定workspace。
- **新增组件**：
  1. 要考虑对外暴露相关主题配置、自定义渲染。
  2. 新增`packages/hippy_ui_react/src/components/Xxx/{index.tsx, PropsType.tsx, README.md, renderInfo.tsx}`。
  3. 在`packages/hippy_ui_react/src/provider/themeConfig`下新增对应类型与配置。
  4. 在`packages/hippy_ui_react/src/index.tsx`中按需导出。
  5. 添加测试用例。
  6. `style`尽量用`transferStyle`解析成对象而不是数组，为后续SSR兼容留下余地。
