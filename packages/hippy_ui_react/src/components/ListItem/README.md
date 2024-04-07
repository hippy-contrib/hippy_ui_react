## 基础用法

- `rank`设置排名
- `thumb`设置预览图
- `thumbCircle`设置预览图为圆形
- `title`设置标题
- `note`设置副标题
- `moreNote`设置辅助文案
- `buttonProps`设置右侧按钮

```jsx
let AVATAR = "https://qzonestyle.gtimg.cn/aoi/sola/20200323143705_SFlaa8ofC4.png";

<View style={{ display: "flex" }}>
  <ListItem thumb={AVATAR} title={"主文案"} />
  <ListItem thumb={AVATAR} title={"꧁꫞꯭翱翔꫞꧂"} note={"辅助文案"} />
  <ListItem rank={1} thumb={AVATAR} title={"꧁꫞꯭翱翔꫞꧂"} titleNoHeight={true} note={"辅助文案"} moreNote={"更多辅助文案"} />
  <ListItem
    rank={4}
    thumb={AVATAR} 
    thumbCircle={true} 
    title={"主文案"}
    note={"辅助文案"}
    moreNote={"更多辅助文案"} 
    buttonProps={{
      children:"K歌",
      onPress:()=>{
        console.log("点击按钮")
      }
    }}
    onPress={()=>{
      console.log("点击条目")
    }}
  />
</View>
```

## 自定义内容

- 传入`ReactElement`来自定义节点。
- `rank`会被自动注入`style: {width}`。
- `thumb`会被自动注入`style: {marginRight}`。
- `title/note/moreNote`会被自动注入`style: {height,flex,flexShrink,fontSize,color}`。

```jsx
let AVATAR = "https://qzonestyle.gtimg.cn/aoi/sola/20200323143705_SFlaa8ofC4.png";

<View style={{display: "flex"}}>
  <ListItem
    rank={(
      <View style={{alignItems: "center", justifyContent: "center"}}>
        <HiText style={{textAlign: 'center', color: "rgb(254, 79, 79)", fontWeight: "600"}}>{"01"}</HiText>
        <Image source={{uri: "https://y.qq.com/music/common/upload/t_cm3_photo_publish/4343041.png"}}
               style={{width: 16, height: 16}}/>
      </View>
    )}
    thumb={(
      <View style={{
        alignItems: "center",
        justifyContent: "center",
        width: 64,
        height: 64,
        marginRight: 15,
        borderRadius: 8,
        overflow: "hidden",
      }}>
        <UImage src={AVATAR} style={{width: 64, height: 64}}/>
        <UImage src={AVATAR} style={{position: "absolute", right: 0, bottom: 0, width: 24, height: 24, borderWidth: 1, borderColor: "#fff"}}/>
      </View>
    )}
    titleNoHeight={true}
    title={(
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <HiText size={16} numberOfLines={1} style={{flexShrink: 1}}>{"꧁꫞꯭翱翔꫞꧂"}</HiText>
        <Tag style={{marginLeft: 3}}>{"标签"}</Tag>
      </View>
    )}
    note={(
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <HiText size={14} color={HiText.color.textSecondary} numberOfLines={1}>{"辅助文案"}</HiText>
        <Tag style={{marginLeft: 3}}>{"标签"}</Tag>
      </View>
    )}
    moreNote={(
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <HiText size={14} color={HiText.color.textSecondary} style={{flexShrink: 1}} numberOfLines={1}>
          {"更多辅助文案，文案很长文案很长文案很长"}
        </HiText>
        <Tag style={{marginLeft: 3}}>{"标签"}</Tag>
      </View>
    )}
    extraOperate={<Switch style={{marginLeft: 4}}/>}
    buttonProps={{
      children:"K歌",
      onPress:()=>{
        console.log("点击按钮")
      }
    }}
  />
</View>
```
