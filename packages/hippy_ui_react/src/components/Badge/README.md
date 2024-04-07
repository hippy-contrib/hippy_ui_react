## 基础用法
- 没有包裹元素时独立展示
- isDot标记为纯红点
- 超出`maxValue`显示`${maxValue}+`
- 可自定义内容
```jsx
<View style={{flexDirection: "row"}}>
  <Badge/>
  <Badge isDot={true}/>
  <Badge value={0}/>
  <Badge value={999}/>
  <Badge value={<HiText size={10} color={"#fff"}>{"hot"}</HiText>}/>
</View>
```

## 嵌套使用
```jsx
const [hasRead, setHasRead] = React.useState(false);

<View>
  <Badge  value={hasRead ? null : 99}>
    <HiText>{"消息"}</HiText>
  </Badge>
  <Badge isDot={!hasRead}>
    <Button onPress={()=>{setHasRead(!hasRead)}} round={false}>{"查看"}</Button>
  </Badge>
</View>
```
