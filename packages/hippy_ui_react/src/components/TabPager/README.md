```jsx noeditor
// noExample
<Table
  style={{marginBottom: 50}}
  header={["方法名", "类型",  "参数", "描述"]}
  headerCellStyleFn={() => ({padding: 12, backgroundColor: "rgba(0,0,0,0.02)"})}
  cellStyleFn={() => ({padding: 12})}
  data={[
    ["setIndex()","public", "- index 页码", "滚动到对应位置"],
  ]}
/>
```


## 基础用法

- 传入data数据

```jsx
const refTabPager = React.useRef();

<View>
  <TabPager
    data={[
      {name: "Tab1", page: <View key={0} style={{backgroundColor: "#F56C6C", flex: 1, height: 300}}/>},
      {name: "Tab2", page: <View key={1} style={{backgroundColor: "#67C23A", flex: 1, height: 300}}/>},
      {name: "Tab3", page: <View key={2} style={{backgroundColor: "#409EFF", flex: 1, height: 300}}/>},
    ]}
    onChange={(index)=>{console.log("选中", index)}}
    ref={r=>{refTabPager.current = r;}}
  />
  <Button style={{marginTop:10}} onPress={()=>{refTabPager.current && refTabPager.current.setIndex(1)}}>{"选择第2个"}</Button>
</View>
```
