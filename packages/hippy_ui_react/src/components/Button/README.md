## 按钮类型

通过指定 `type` 来设置按钮类型。

```jsx
<View>
  <Button>{"类型：Button.type.default（默认）"}</Button>
  <Button type={Button.type.normal} style={{marginTop: 10}}>{"类型：Button.type.normal"}</Button>
  <Button type={Button.type.primary} style={{marginTop: 10}}>{"类型：Button.type.primary"}</Button>
  <Button type={Button.type.text} style={{marginTop: 10}}>{"类型：Button.type.text"}</Button>
</View>
```

## 按钮尺寸

通过指定 `size` 来设置按钮尺寸。

```jsx
<View>
  <Button size={Button.size.small}>{"尺寸-S-24：Button.size.small"}</Button>
  <Button size={Button.size.medium} style={{marginTop: 10}}>{"尺寸-M-32：Button.size.medium"}</Button>
  <Button size={Button.size.big} style={{marginTop: 10}}>{"尺寸-B-36：Button.size.big"}</Button>
  <Button size={Button.size.huge} style={{marginTop: 10}}>{"尺寸-H-40：Button.size.huge"}</Button>
  <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 10 }}>
    <Button size={Button.size.small}>{"S"}</Button>
    <Button size={Button.size.medium}>{"M"}</Button>
    <Button size={Button.size.big}>{"B"}</Button>
    <Button size={Button.size.huge}>{"H"}</Button>
  </View>
</View>
```

## 禁用和加载状态

通过指定 `disabled`、`loading` 来设置按钮不可点击。 可以用`onDisablePress`事件进行一些提示。

```jsx
<View>
  <Button
    disabled={true}
    onDisablePress={() => {
      alert("不可点击");
    }}
  >
    {"禁止点击：Button.type.default"}
  </Button>
  <Button disabled={true} type={Button.type.normal} style={{marginTop: 10}}>
    {"禁止点击：Button.type.normal"}
  </Button>
  <Button loading={true} type={Button.type.primary} style={{marginTop: 10}}>
    {"加载中：Button.type.primary"}
  </Button>
  <Button loading={true} type={Button.type.text} style={{marginTop: 10}}>
    {"加载中：Button.type.text"}
  </Button>
</View>
```

## 前置图标

通过 `image` 设置前置图像（传`ReactNode`时，会自动注入默认样式）。

```jsx
<View>
  <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
    <Button image="search" size={Button.size.small}>
      {"内置搜索-small"}
    </Button>
    <Button image="search" size={Button.size.medium}>
      {"内置搜索-medium"}
    </Button>
  </View>
  <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
    <Button image="search" size={Button.size.big}>
      {"内置搜索-big"}
    </Button>
    <Button image="search" size={Button.size.huge}>
      {"内置搜索-huge"}
    </Button>
  </View>
  <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
    <Button image="https://kg.qq.com/gtimg/music/common/upload/image/R40BQUSMXPX5NEBA1QY1TU.png">{"传链接"}</Button>
    <Button
      image={<Image source={{uri: "https://qzonestyle.gtimg.cn/aoi/sola/20200325140943_1LOFHPZ0nD.png"}} style={{ marginRight: 2 }} />}
    >
      {"传元素"}
    </Button>
  </View>
</View>
```

## 标记

通过 `badge` 设置右上角标记图片（传`ReactNode`时，会自动注入默认样式）。

```jsx
<View>
  <View style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingTop: "10px", flexWrap: "wrap" }}>
    <Button badge="vip">{"内置Vip"}</Button>
    <Button badge="vip" type={Button.type.normal}>
      {"内置Vip"}
    </Button>
    <Button badge="vip" type={Button.type.primary}>
      {"内置Vip"}
    </Button>
    <Button badge="vip" type={Button.type.text}>
      {"内置Vip"}
    </Button>
  </View>
  <View style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingTop: "10px", flexWrap: "wrap" }}>
    <Button badge="https://qzonestyle.gtimg.cn/aoi/sola/20200221171112_gkb3pgZr8Z.png">{"传链接"}</Button>
    <Button badge={<Image source={{uri: "https://qzonestyle.gtimg.cn/aoi/sola/20200221171112_gkb3pgZr8Z.png"}} />} type={Button.type.normal}>
      {"传元素"}
    </Button>
  </View>
</View>
```

## 按钮形状

通过 `round` 设置圆角， `circle` 设置圆形。

```jsx
<View style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingTop: "10px" }}>
  <Button circle>{"+"}</Button>
  <Button round={false}>{"按钮"}</Button>
  <Button>{"K歌"}</Button>
  <Button round={false} style={{ borderRadius: 10 }}>
    {"自定义"}
  </Button>
</View>
```

## 防抖节流

通过 `throttle` 设置节流（每隔一段时间执行一次点击事件），
通过 `debounce` 设置防抖（连续触发只执行第一次点击事件）。

```jsx
<View style={{ paddingTop: "10px" }}>
  <Button
    onPress={() => {
      console.log("===normal===");
    }}
  >
    {"普通点击"}
  </Button>
  <View style={{ height: "10px" }} />

  <Button
    throttle={true}
    onPress={() => {
      console.log("===throttle1===");
    }}
  >
    {"开启节流"}
  </Button>
  <View style={{ height: "10px" }} />

  <Button
    throttle={3000}
    onPress={() => {
      console.log("===throttle2===");
    }}
  >
    {"自定义节流时间"}
  </Button>
  <View style={{ height: "10px" }} />

  <Button
    debounce={true}
    onPress={() => {
      console.log("===debounce1===");
    }}
  >
    {"开启防抖"}
  </Button>
  <View style={{ height: "10px" }} />

  <Button
    debounce={3000}
    onPress={() => {
      console.log("===debounce2===");
    }}
  >
    {"自定义防抖时间"}
  </Button>
</View>
```

## 自定义样式

通过 `style` 设置按钮样式：

1. `style` 中的 `color`, `fontSize`, `fontWeight`, `lineHeight` 会被透传给里面的 Text，因此可以直接设置文字样式。这里也可以内嵌一个自定义的 `<Text/>`。
2. 自定义按钮宽度时，要注意组件有默认的 `miniWidth`和 `paddingLeft/paddingRight`（优先级大于`padding`），需要覆盖掉。

```jsx
<View style={{ display: "flex", paddingTop: "10px" }}>
  <Button style={{ backgroundColor: "#FF3399", color: "#00ff00" }}>{"自定义文字style"}</Button>
  <Button style={{marginTop: 10}}>
    <Text style={{ color: "#FF3399" }}>{"内嵌 <Text/>"}</Text>
  </Button>
  <View style={{ flexDirection: "row", marginTop: 10 }}>
    <Button style={{ minWidth: 45, paddingLeft: 5,paddingRight: 5 }}>{"宽度"}</Button>
  </View>
</View>
```
