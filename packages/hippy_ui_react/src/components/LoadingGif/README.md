```jsx noeditor
// noExample
<Table
  style={{marginBottom: 50}}
  header={["方法名", "类型",  "参数", "描述"]}
  headerCellStyleFn={() => ({padding: 12, backgroundColor: "rgba(0,0,0,0.02)"})}
  cellStyleFn={() => ({padding: 12})}
  data={[
    ["startAnimation()","public", "-", "动画：开始"],
    ["stopAnimation()","public", "-", "动画：停止"],
  ]}
/>
```


## 基础用法

1. 直接使用当做动图
2. 设置`defaultColor/activeColor`自定义颜色
3. 设置`percent`进度

```jsx
const [percent, setPercent] = React.useState(50);

<View>
  <LoadingGif/>
  <LoadingGif defaultColor={"#FFC391"} activeColor={"#E39356"}/>
  <View style={{flexDirection: "row"}}>
    <LoadingGif percent={percent}/>
    <HiText>{`动态进度：${percent}`}</HiText>
  </View>
  <Button style={{marginTop: 10}} onPress={() => setPercent(Math.min(100, percent + 10))}>{"加进度"}</Button>
  <Button style={{marginTop: 10}} onPress={() => setPercent(Math.max(0, percent - 10))}>{"减进度"}</Button>
</View>
```
