```jsx noeditor
// noExample
<Table
  style={{marginBottom: 50}}
  header={["方法名", "类型",  "参数", "描述"]}
  headerCellStyleFn={() => ({padding: 12, backgroundColor: "rgba(0,0,0,0.02)"})}
  cellStyleFn={() => ({padding: 12})}
  data={[
    ["show()","public", "-", "显示弹窗"],
    ["hide()","public", "-", "收起弹窗"],
  ]}
/>
```


## 基础用法

- 支持动画弹出。
- 使用`hide`方法动画退出。

```jsx
const refFloat = React.useRef();

const hide = () => {
  refFloat.current && refFloat.current.hide().then(() => {
    console.log("==收起完毕==")
  });
}

<View style={{ display: "flex", height: 700, justifyContent: 'center',backgroundColor: "#ccc" }}>
  <Popup
    ref={r=>{
      refFloat.current = r;
    }}
    style={{
      height: 300,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      justifyContent: 'center',
    }}
    onShow={()=>{
      console.log("==弹出完毕==")
    }}
    onMaskClick={hide}
  >
    <Button
      onPress={hide}
    >
      {"点击收起"}
    </Button>
  </Popup>
  <Button
    onPress={() =>{
      refFloat.current && refFloat.current.show()
    }}
  >
    {"点击弹出"}
  </Button>
</View>
```

## 全局弹窗
- 可以结合`Mask.show()`来做全局弹出

```jsx
// providerGlobalView

<View style={{ display: "flex", height: 700, justifyContent: 'center',backgroundColor: "#ccc" }}>
  <Button
    onPress={() =>{
      Mask.show(
        <Popup
          style={{
            height: 300,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            justifyContent: 'center',
          }}
          onShow={()=>{
            console.log("==弹出完毕==")
          }}
        >
          <Button
            onPress={() => {Mask.hide()}}
          >
            {"点击收起"}
          </Button>
        </Popup>
      )
    }}
  >
    {"点击弹出"}
  </Button>
</View>
```
