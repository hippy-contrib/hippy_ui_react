## 基础用法

```js
const [checked, setChecked] = React.useState(true);

<View>
  <Radio
    checked={checked}
    label={"点击选择"}
    onChange={nextChecked => {
      setChecked(nextChecked)
    }}
  />
</View>
```
