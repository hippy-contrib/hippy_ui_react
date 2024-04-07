```jsx noeditor
// noExample
<Table
  style={{marginBottom: 50}}
  header={["方法名", "类型",  "参数", "描述"]}
  headerCellStyleFn={() => ({padding: 12, backgroundColor: "rgba(0,0,0,0.02)"})}
  cellStyleFn={() => ({padding: 12})}
  data={[
    ["start()","public", "options?: { delay?: number }", "动画：开始"],
    ["stop()","public", "-", "动画：停止"],
  ]}
/>
```


## 左右滚动

```jsx
const refMarquee = React.useRef(null);
const [useLong, setUseLong] = React.useState(true);

<View>
  <Marquee ref={r => {refMarquee.current = r;}}>
    <HiText>{useLong ? "测试长文本测试长文本测试长文本测试长文本测试长文本测试长文本" : "测试短文本"}</HiText>
  </Marquee>
  
  <Button style={{marginTop: 10}} onPress={()=>{refMarquee.current && refMarquee.current.stop();}}>{"暂停"}</Button>
  <Button style={{marginTop: 10}} onPress={()=>{refMarquee.current && refMarquee.current.start();}}>{"启动"}</Button>
  <Button style={{marginTop: 10}} onPress={()=>{setUseLong(!useLong);}}>{"变更文本"}</Button>
</View>
```

## 上下滚动

- 设置容器高度避免漏出

```jsx
const refMarquee = React.useRef(null);
const [useData2, setUseData2] = React.useState(false);

<View>
  <Marquee
    vertical={true} 
    style={{height: 22, borderWidth: 1, borderColor: "#f00"}}
    ref={r => {refMarquee.current = r;}}
  >
    {
      useData2
        ? (
          [
            <HiText key={4}>{"文案4"}</HiText>,
            <HiText key={5}>{"文案5"}</HiText>,
            <HiText key={6}>{"文案6"}</HiText>,
            <HiText key={7}>{"文案7"}</HiText>,
          ]
        ) : (
          [
            <HiText key={1}>{"文案1"}</HiText>,
            <HiText key={2}>{"文案2"}</HiText>,
            <HiText key={3}>{"文案3"}</HiText>,
          ]
        )
    }
  </Marquee>

  <Button style={{marginTop: 10}} onPress={()=>{refMarquee.current && refMarquee.current.stop();}}>{"暂停"}</Button>
  <Button style={{marginTop: 10}} onPress={()=>{refMarquee.current && refMarquee.current.start();}}>{"启动"}</Button>
  <Button style={{marginTop: 10}} onPress={()=>{setUseData2(!useData2);}}>{"变更文本"}</Button>
</View>
```

