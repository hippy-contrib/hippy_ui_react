### 基础用法
- 指定`type`类型（各个业务通过`<Provider themeConfigFunc={() => ({tagTypeStyle:()=>{}})}/>`配置支持的类型）。
- 以下是默认示例：
```jsx
<View>
  <View style={{flexDirection: "row", paddingLeft: 5, marginBottom: 10}}>
    <Tag style={{ marginRight: 5 }} >{"默认：black"}</Tag>
    <Tag type={"red"} style={{ marginRight: 5 }} >{"red"}</Tag>
    <Tag type={"purple"} style={{ marginRight: 5 }} >{"purple"}</Tag>
    <Tag type={"pink"} style={{ marginRight: 5 }} >{"pink"}</Tag>
    <Tag type={"yellow"} style={{ marginRight: 5 }} >{"yellow"}</Tag>
    <Tag type={"blue"} style={{ marginRight: 5 }} >{"blue"}</Tag>
    <Tag type={"green"} style={{ marginRight: 5 }} >{"green"}</Tag>
  </View>
  <View style={{flexDirection: "row", paddingLeft: 5}}>
    <Tag type={"blackBold"} style={{ marginRight: 5 }} >{"blackBold"}</Tag>
    <Tag type={"redBold"} style={{ marginRight: 5 }} >{"redBold"}</Tag>
    <Tag type={"purpleBold"} style={{ marginRight: 5 }} >{"purpleBold"}</Tag>
    <Tag type={"pinkBold"} style={{ marginRight: 5 }} >{"pinkBold"}</Tag>
    <Tag type={"yellowBold"} style={{ marginRight: 5 }} >{"yellowBold"}</Tag>
    <Tag type={"blueBold"} style={{ marginRight: 5 }} >{"blueBold"}</Tag>
    <Tag type={"greenBold"} style={{ marginRight: 5 }} >{"greenBold"}</Tag>
  </View>
</View>
```

## 自定义
```jsx
<View>
  <View style={{flexDirection: "row", paddingLeft: 5, marginBottom: 10}}>
    <Tag style={{ marginRight: 5 }} >{<HiText size={10}>{"自定义元素"}</HiText>}</Tag>
    <Tag prefix={<Image source={{uri: "https://sola.gtimg.cn/aoi/sola/20200509171146_IaxkObm78O.png"}} style={{width: 10, height: 10, marginRight: 3}}/>} style={{ marginRight: 5 }} >{"前置图片"}</Tag>
  </View>
</View>
```
