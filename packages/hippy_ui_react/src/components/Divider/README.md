## 基础用法

```jsx
<View>
  <View>
    <HiText>{"横线"}</HiText>
    <Divider style={{margin: 10}}/>
  </View>
  <View style={{flexDirection: "row"}}>
    <HiText>{"竖线左边"}</HiText>
    <Divider vertical={true} style={{marginLeft: 5,marginRight: 5}}/>
    <HiText>{"竖线右边"}</HiText>
  </View>
</View>
```
