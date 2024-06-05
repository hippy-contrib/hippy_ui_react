## 基础用法
- 通过`text`指定文案。
- `gif`修改前置图。
```jsx
<View>
  <Loading/>
  <Loading text={"加载中..."}/>
  <Loading loadingGifProps={{percent: 50}} text={"加载中..."}/>
  <Loading style={{color:"#000"}} gif={null} text={"加载中..."}/>
  <Loading
    gif={
    <Image
      source={{uri: "https://qzonestyle.gtimg.cn/aoi/sola/20200325165502_RfJy8RaWbr.gif"}} 
      style={{ width: 15, height: 15, marginRight: 6, backgroundColor: "transparent"}}
    />}
    text={"加载中..."}
  />
  <Loading gif={null} style={{
    width: 50,
    height: 50,
    backgroundColor: "rgba(0,0,0,.8)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    overflow: "hidden",
  }}>
    <Image
      source={{
        uri: "https://sola.gtimg.cn/aoi/sola/20200521200028_d6hXlqCYGf.gif"
      }}
      style={{
        width: 50,
        height: 50,
        backgroundColor: "transparent"
      }}
    />
  </Loading>
</View>
```
