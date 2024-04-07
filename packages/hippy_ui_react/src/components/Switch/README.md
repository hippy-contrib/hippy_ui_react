## 基础用法
```js padded
<View>
  <Switch
    checked={true}
    onChange={isChecked => {
      console.log(isChecked);
    }}
    color="#FC1717"
  />
  <Switch
    style={{marginTop:20}}
    onChange={isChecked => {
      console.log(isChecked);
    }}
  />
</View>
```
