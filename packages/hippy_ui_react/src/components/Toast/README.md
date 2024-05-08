```jsx noeditor
// noExample
<Table
  style={{marginBottom: 50}}
  header={["方法名", "类型",  "参数", "描述"]}
  headerCellStyleFn={() => ({padding: 12, backgroundColor: "rgba(0,0,0,0.02)"})}
  cellStyleFn={() => ({padding: 12})}
  data={[
    ["show()","static", "- text 文本\n- props toast属性", "显示Toast"],
    ["hide()","static", "-", "收起Toast"],
  ]}
/>
```

## 全局使用

- 可直接调用`Toast.show()`提示（需要有`Provider`）。

```jsx
// providerGlobalView

<Button onPress={() => Toast.show("文案提示")}>{"点击提示"}</Button>
```

## 基本用法

- 可配置文本，若超过 12 个汉字长度，建议使用弹窗并进行二次确认

```js
<Toast duration={0} text="警告：删除此条目会导致无法恢复，请谨慎操作" />
```

## 自定义内容

```js
<Toast duration={0} style={{marginTop: 200}}>
  <HiText theme={ThemeMode.dark}>{"位置偏下，自定义Node"}</HiText>
</Toast>
```
