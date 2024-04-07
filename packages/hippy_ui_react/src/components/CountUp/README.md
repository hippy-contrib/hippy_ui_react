## 基础用法
- 传入`value`值即可。
```jsx
const [value, setValue] = React.useState(100);

<View>
  <CountUp value={value}/>
  <Button onPress={() => {setValue(value+10)}} style={{marginTop: 10}}>{"加10"}</Button>
  <Button onPress={() => {setValue(value-10)}} style={{marginTop: 10}}>{"减10"}</Button>
</View>
```
