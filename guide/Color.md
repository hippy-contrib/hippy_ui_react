为统一界面风格，使用约定的色彩。

## 主色

默认配置里的一些色彩。

```jsx noeditor
<View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "#FE4F4F", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>品牌色</Text>
      <Text style={{color: "#ababab"}}>#FE4F4F</Text>
      <Text style={{color: "#ababab"}}>rgb(254,79,79)</Text>
    </View>
  </View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "#974BF7", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>紫色</Text>
      <Text style={{color: "#ababab"}}>#974BF7</Text>
      <Text style={{color: "#ababab"}}>rgb(169,102,255)</Text>
    </View>
  </View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "#F74670", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>粉色</Text>
      <Text style={{color: "#ababab"}}>#F74670</Text>
      <Text style={{color: "#ababab"}}>rgb(247,70,113)</Text>
    </View>
  </View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "#F6B134", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>黄色</Text>
      <Text style={{color: "#ababab"}}>#F6B134</Text>
      <Text style={{color: "#ababab"}}>rgb(246,177,52)</Text>
    </View>
  </View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "#5D90F8", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>蓝色</Text>
      <Text style={{color: "#ababab"}}>#5D90F8</Text>
      <Text style={{color: "#ababab"}}>rgb(93,144,248)</Text>
    </View>
  </View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "#1ED272", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>绿色</Text>
      <Text style={{color: "#ababab"}}>#1ED272</Text>
      <Text style={{color: "#ababab"}}>rgb(30,210,114)</Text>
    </View>
  </View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "#222222", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>黑色背景</Text>
      <Text style={{color: "#ababab"}}>#222222</Text>
      <Text style={{color: "#ababab"}}>rgb(34,34,34)</Text>
    </View>
  </View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "#111111", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>黑色</Text>
      <Text style={{color: "#ababab"}}>#111111</Text>
      <Text style={{color: "#ababab"}}>rgb(17,17,17)</Text>
    </View>
  </View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "rgb(17,17,17,0.7)", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>黑色（70%透明度）</Text>
      <Text style={{color: "#ababab"}}>#111111B3</Text>
      <Text style={{color: "#ababab"}}>rgb(17,17,17,0.7)</Text>
    </View>
  </View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "#888888", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>黑色（50%透明度）</Text>
      <Text style={{color: "#ababab"}}>#11111180</Text>
      <Text style={{color: "#ababab"}}>#888888</Text>
    </View>
  </View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "rgb(17,17,17,0.3)", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>黑色（30%透明度）</Text>
      <Text style={{color: "#ababab"}}>#1111114D</Text>
      <Text style={{color: "#ababab"}}>rgb(17,17,17,0.3)</Text>
    </View>
  </View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "#FFFFFF", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>白色</Text>
      <Text style={{color: "#ababab"}}>#FFFFFF</Text>
      <Text style={{color: "#ababab"}}>rgb(255,255,255)</Text>
    </View>
  </View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "rgba(255,255,255,0.9)", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>白色（90%透明度）</Text>
      <Text style={{color: "#ababab"}}>#FFFFFFE6</Text>
      <Text style={{color: "#ababab"}}>rgba(255,255,255,0.9)</Text>
    </View>
  </View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "rgba(255,255,255,0.7)", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>白色（70%透明度）</Text>
      <Text style={{color: "#ababab"}}>#FFFFFFB3</Text>
      <Text style={{color: "#ababab"}}>rgba(255,255,255,0.7)</Text>
    </View>
  </View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "rgba(255,255,255,0.5)", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>白色（50%透明度）</Text>
      <Text style={{color: "#ababab"}}>#FFFFFF80</Text>
      <Text style={{color: "#ababab"}}>rgba(255,255,255,0.5)</Text>
    </View>
  </View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>白色（10%透明度）</Text>
      <Text style={{color: "#ababab"}}>#FFFFFF1A</Text>
      <Text style={{color: "#ababab"}}>rgba(255,255,255,0.1)</Text>
    </View>
  </View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "#F2F2F6", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>灰色</Text>
      <Text style={{color: "#ababab"}}>#F2F2F6</Text>
      <Text style={{color: "#ababab"}}>rgb(242,242,246)</Text>
    </View>
  </View>
</View>
```

## 淡色

浅色彩示例。

```jsx noeditor
<View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "#FFEEEE", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>浅红</Text>
      <Text style={{color: "#ababab"}}>#FFEEEE</Text>
      <Text style={{color: "#ababab"}}>rgb(255,238,238)</Text>
    </View>
  </View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "#F4EBFF", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>浅紫</Text>
      <Text style={{color: "#ababab"}}>#F4EBFF</Text>
      <Text style={{color: "#ababab"}}>rgb(244,235,255)</Text>
    </View>
  </View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "#FFEDF1", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>浅粉</Text>
      <Text style={{color: "#ababab"}}>#FFEDF1</Text>
      <Text style={{color: "#ababab"}}>rgb(255,237,241)</Text>
    </View>
  </View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "#FFF4E0", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>浅黄</Text>
      <Text style={{color: "#ababab"}}>#FFF4E0</Text>
      <Text style={{color: "#ababab"}}>rgb(255,244,224)</Text>
    </View>
  </View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "#EFF4FE", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>浅蓝</Text>
      <Text style={{color: "#ababab"}}>#EFF4FE</Text>
      <Text style={{color: "#ababab"}}>rgb(239,244,254)</Text>
    </View>
  </View>
  <View style={{display: "flex", flexDirection: "row", padding: 5}}>
    <View style={{backgroundColor: "#E9FBF1", borderRadius: 6, height: 60, width: 60, borderWidth: 2, borderColor: "#FE4F4F"}}/>
    <View style={{paddingLeft: 10}}>
      <Text style={{color: "#2a2a2a"}}>浅绿</Text>
      <Text style={{color: "#ababab"}}>#E9FBF1</Text>
      <Text style={{color: "#ababab"}}>rgb(233,251,241)</Text>
    </View>
  </View>
</View>
```
