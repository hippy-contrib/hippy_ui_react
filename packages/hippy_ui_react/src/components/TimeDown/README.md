```jsx noeditor
// noExample
<Table
  style={{marginBottom: 50}}
  header={["方法名", "类型",  "参数", "描述"]}
  headerCellStyleFn={() => ({padding: 12, backgroundColor: "rgba(0,0,0,0.02)"})}
  cellStyleFn={() => ({padding: 12})}
  data={[
    ["start()","public", "-", "开始倒计时"],
    ["stop()","public", "-", "停止倒计时"],
    ["formatLeftTime()","static", "- leftTimeInfo: LeftTimeInfo 时间信息", "内置的格式化时间方法"],
  ]}
/>
```

## 基础用法

- 传入目标时间

```js
<View>
  <TimeDown time={new Date(new Date().getTime() + 60*60*1000)}/>
</View>
```
