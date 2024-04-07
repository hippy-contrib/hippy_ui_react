## 基础用法

- 自动根据`hasData`决定显示`Empty`组件还是`Loading`组件。
- 自动根据`status`显示对应文案。

```jsx

<View>
  <LoadingTip status={LoadingTip.status.ready} hasData={true}/>
  <LoadingTip status={LoadingTip.status.loading} hasData={true}/>
  <LoadingTip status={LoadingTip.status.error} hasData={true}/>
  <LoadingTip status={LoadingTip.status.finish} hasData={true}/>
</View>
```
```jsx

<View>
  <LoadingTip status={LoadingTip.status.finish} hasData={false}/>
</View>
```
