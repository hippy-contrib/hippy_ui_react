## 线形进度
- 通过`percent`设置百分比进度。
- 通过`strokeWidth`设置进度条宽度。
- 通过`color`设置进度条颜色。
- 通过`duration`设置进度条动画时长（毫秒）。
- 可嵌套`children`做文案提示。
```jsx
import React, { useState } from "react";
const [p, setP] = useState(10);
<View>
  <Progress percent={60} color={"linear-gradient(to right, #ff0000, #ffff00);"} />

  <Progress strokeWidth={20} percent={p} duration={1000} style={{marginTop: 10}} color={"#67C23A"} underColor={"#F2F6FC"}>
    <HiText style={{color: "#fff", textAlign: "right", marginRight: 6, lineHeight: 20}}>{`${p}%`}</HiText>
  </Progress>

  <Button style={{marginTop: 10}} onPress={() => setP(Math.min(p + 10, 100))}>增加进度 </Button>
  <Button style={{marginTop: 10}} onPress={() => setP(Math.max(p - 10, 0))}>减少进度</Button>
</View>;
```

## 环形进度
- 通过`size`设置直径大小。
```jsx
import React, { useState } from "react";
const [p, setP] = useState(10);
<View>
  <Progress type={Progress.type.circle} size={200} strokeWidth={16} percent={p} color={"#E6A23C"} duration={1000} >
    <HiText>{`动态进度：${p}%`}</HiText>
  </Progress>

  <Button style={{marginTop: 10}} onPress={() => setP(Math.min(p + 10, 100))}>增加进度 </Button>
  <Button style={{marginTop: 10}} onPress={() => setP(Math.max(p - 10, 0))}>减少进度</Button>
</View>;
```
