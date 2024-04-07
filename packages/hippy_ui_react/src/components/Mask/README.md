```jsx noeditor
// noExample
<Table
  style={{marginBottom: 50}}
  header={["方法名", "类型",  "参数", "描述"]}
  headerCellStyleFn={() => ({padding: 12, backgroundColor: "rgba(0,0,0,0.02)"})}
  cellStyleFn={() => ({padding: 12})}
  data={[
    ["show()","static", "- view: ReactElement 插入的视图\n- options?: { key?: string; backToClose?: boolean } 扩展参数", "全局显示一个视图"],
    ["hide()","static", "- options?: { key: string } 扩展参数", "收起全局视图"],
  ]}
/>
```


## 基础用法

- 带有默认样式的`View`组件。

```js
<Mask 
  onClick={() => {
    console.log("===onClose===");
  }}
>
  <HiText style={{marginTop: 100, textAlign: "center"}}>{"蒙层"}</HiText>
</Mask>
```

## 全局调用
- 需引入`Provider`。
- 使用`Mask.show()`显示蒙层（可通过指定`key`来新增不同蒙层，默认用同一个）。
- 使用`Mask.hide()`收起蒙层（可通过指定`key`来收起指定蒙层，传空字符串收起全部）。

```jsx
// providerGlobalView

<View>
  <Button 
    onPress={ ()=>{
      Mask.show((
        <Mask onClick={() => Mask.hide()} style={{justifyContent: "center"}}>
          <Button
            onPress={ (e)=>{
              e && e.stopPropagation && e.stopPropagation();
              Mask.show((
                <Mask style={{justifyContent: "center", backgroundColor: "#f00"}} onClick={() => Mask.hide({key:"mask2"})}>
                  <Button onPress={()=>Mask.hide({key:""})}>
                    {"当前蒙层2，点击空白处收起蒙层2，点此收起全部"}
                  </Button>
                </Mask>
              ), {key:"mask2"});
            }}
          >
            {"当前蒙层1，点击再加蒙层2"}
          </Button>
        </Mask>
      ));
    }}
  >
    {"显示蒙层1"}
  </Button>
</View>
```
