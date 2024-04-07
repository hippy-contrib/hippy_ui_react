```jsx noeditor
// noExample
<Table
  style={{marginBottom: 50}}
  header={["方法名", "类型",  "参数", "描述"]}
  headerCellStyleFn={() => ({padding: 12, backgroundColor: "rgba(0,0,0,0.02)"})}
  cellStyleFn={() => ({padding: 12})}
  data={[
    ["clear()","public", "- noNextSubmit 不触发下一个submit（web下为`true`）", "清空输入框的内容。"],
    ["blur()","public", "- noNextSubmit 不触发下一个submit（web下为`true`）", "失去焦点"],
    ["focus()","public", "-", "获取焦点"],
    ["getValue()","public", "-", "获得文本框中的内容。注意，由于是异步回调，收到回调时值可能已经改变。"],
    ["setValue()","public", "- value 文本值", "设置文本框内容。"],
    ["isFocused()","public", "-", "获得文本框的焦点状态。注意，由于是异步回调，收到回调时值可能已经改变。最低支持版本 2.14.1。hippy-react-web 不支持。"],
  ]}
/>
```


## 基础用法

- `hippy-react-web`通过`blur`事件触发输入框的提交事件，要注意兼容。
- （可以用按下事件`onPressIn/onMouseDown`来早于`blur`标记下次是否触发`submit`。）
- 公共函数`blur/clear`支持参数`noNextSubmit`。

```jsx

const refSearch = React.useRef();
const isWeb = true;

<View>
  <Search 
    ref={r=>{refSearch.current = r;}}
    wrapProps={{style: {margin: 16}}}
    inputProps={{
      onChangeText(txt){
        console.log("输入", txt)
      },
      onEndEditing(e){
        console.log("搜索", e)
      }
    }}
    rightIcon={(
      <Image
        source={{uri:   "data:image/png;base64,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"}}
        style={{
          marginLeft: 6,
          backgroundColor: "transparent",
          width: 20,
          height: 20,
        }}
        accessible={true}
        accessibilityLabel={"语音搜索 按钮"}
      />
    )}
  />
  <Button onPress={()=>{refSearch.current && refSearch.current.clear(isWeb)}}>{"清空数据"}</Button>
</View>
```
