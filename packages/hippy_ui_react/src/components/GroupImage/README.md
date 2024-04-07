## 基础用法

- 最多支持4个图片拼接

```js
const AVATAR = "https://qzonestyle.gtimg.cn/aoi/sola/20200323143705_SFlaa8ofC4.png";
<View>
  <GroupImage sources={[AVATAR]} size={50} style={{ marginBottom: 10 }} />
  <GroupImage sources={[AVATAR, AVATAR]} size={50} style={{ marginBottom: 10, borderRadius: 25 }} />
  <GroupImage sources={[AVATAR, AVATAR, AVATAR]} size={50} style={{ marginBottom: 10, borderRadius: 5 }} />
  <GroupImage sources={[AVATAR, AVATAR, AVATAR, AVATAR]} size={50} style={{ marginBottom: 10, borderRadius: 25 }} />
</View>;
```
