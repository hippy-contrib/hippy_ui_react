```jsx noeditor
// noExample
<Table
  style={{marginBottom: 50}}
  header={["方法名", "类型",  "参数", "描述"]}
  headerCellStyleFn={() => ({padding: 12, backgroundColor: "rgba(0,0,0,0.02)"})}
  cellStyleFn={() => ({padding: 12})}
  data={[
    ["setIndex()","public", "- index 指定移动到的位置\n- options?: { animated?: boolean; triggerChang?: boolean } 扩展参数", "滚动到对应位置"],
  ]}
/>
```

## 基础用法

- 可以通过`spacing`设置间距（也可以自己设置条目的`margin/padding`样式来实现）。

```jsx
const refSwiper = React.useRef(null);
const itemWidth = 335;

<View>
  <Swiper
    spacing={{between: 10, startAndEnd: 20}}
    ref={e => (refSwiper.current = e)}
    style={{ width: 375 + 2, borderWidth: 1, borderColor: "#ccc", margin: "auto" }}
  >
    <View style={{ width: itemWidth, height: 400, backgroundColor: "rgba(39,158,181,0.25)" }}>1</View>
    <View style={{ width: itemWidth, height: 400, backgroundColor: "rgba(191,34,62,0.25)" }}>2</View>
    <View style={{ width: itemWidth, height: 400, backgroundColor: "rgba(109,85,183,0.5)" }}>3</View>
    <View style={{ width: itemWidth, height: 400, backgroundColor: "rgba(139,18,181,0.25)" }}>4</View>
    <View style={{ width: itemWidth, height: 400, backgroundColor: "rgba(111,34,62,0.25)" }}>5</View>
    <View style={{ width: itemWidth, height: 400, backgroundColor: "rgba(19,85,183,0.5)" }}>6</View>
  </Swiper>
  <Button
    type="primary"
    style={{ marginTop: 10 }}
    onPressIn={() => {
      refSwiper.current && refSwiper.current.setIndex(1);
    }}
  >
    {"滑动到第二个条目"}
  </Button>
</View>
```

## 轮播

- 通过`autoplay`设置轮播（当条目宽度比较小时，可以用`autoScrollWidth`来解决一些交互问题）。
- 通过`indicatorProps`开启指示器（渲染和`ScrollView`同级，需要用`View`包裹跑马灯）
```jsx
const itemWidth = 375;

<View>
  <Swiper
    autoplay={3000}
    indicatorProps={{}}
    style={{ width: 375 + 2, borderWidth: 1, borderColor: "#ccc", margin: "auto" }}
  >
    <View style={{width: itemWidth, height: 400, backgroundColor: "rgba(39,158,181,0.25)" }}>1</View>
    <View style={{width: itemWidth, height: 400, backgroundColor: "rgba(191,34,62,0.25)" }}>2</View>
    <View style={{width: itemWidth, height: 400, backgroundColor: "rgba(109,85,183,0.5)" }}>3</View>
  </Swiper>
</View>
```

## 窄条目
- 通过`cardPosition`设置卡片靠左 / 居中。
- 通过`pagingEnabled`设置整屏滑动。
```jsx
const itemWidth = 168;

<View>
  <Swiper
    autoplay={3000}
    indicatorProps={{}}
    cardPosition={Swiper.cardPosition.left}
    pagingEnabled={true}
    spacing={{between: 7, startAndEnd: 16}}
    style={{ width: 375 + 2, borderWidth: 1, borderColor: "#ccc", margin: "auto" }}
  >
    <View style={{width: itemWidth, height: 106, backgroundColor: "rgba(39,158,181,0.25)" }}>1</View>
    <View style={{width: itemWidth, height: 106, backgroundColor: "rgba(191,34,62,0.25)" }}>2</View>
    <View style={{width: itemWidth, height: 106, backgroundColor: "rgba(109,85,183,0.5)" }}>3</View>
    <View style={{ width: itemWidth, height: 106, backgroundColor: "rgba(139,18,181,0.25)" }}>4</View>
    <View style={{ width: itemWidth, height: 106, backgroundColor: "rgba(111,34,62,0.25)" }}>5</View>
    <View style={{ width: itemWidth, height: 106, backgroundColor: "rgba(19,85,183,0.5)" }}>6</View>
  </Swiper>
</View>
```
