## 基础用法
- `header`设置标题，`data`设置数据。
```jsx
<View>
  <Table
    header={["序号", "名字", "成绩"]}
    data={[
      [1, "张三", 89],
      [2, "李四", 94],
    ]}
  />
</View>
```

## 设置边框
- `borderStyle`设置边框。
```jsx
<View>
  <Table
    borderStyle={{borderWidth: 1, borderColor: "#f00"}}
    header={["序号", "名字", "成绩"]}
    data={[
      [1, "张三", 89],
      [2, "李四", 94],
    ]}
  />
</View>
```

## 自定义样式
- `headerStyle`设置标题样式。
- `headerCellStyle`设置标题单元格样式。
- `rowStyle`设置行样式。
- `cellStyle`设置单元格样式。
- `data`可以自定义节点。
```jsx
<View>
  <Table
    header={["序号", "名字", "成绩"]}
    headerStyle={{backgroundColor: "#f5f7fa"}}
    headerCellStyleFn={p => {if(p.columnIndex === 1){return {fontWeight: "bold"}}}}
    rowStyleFn={p => {if(p.rowIndex%2===1){return {backgroundColor: "#fafafa"}}}}
    cellStyleFn={p => {if(p.rowIndex===3 && p.columnIndex===2){return {color: "#F56C6C"}}}}
    data={[
      [1, "张三", 89],
      [2, "李四", 94],
      [3, "王五", 90],
      [4, <HiText color={"#F56C6C"}>{"赵六"}</HiText>, 59],
    ]}
  />
</View>
```
