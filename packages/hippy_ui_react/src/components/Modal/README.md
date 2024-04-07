```jsx noeditor
// noExample
<Table
  style={{marginBottom: 50}}
  header={["方法名", "类型",  "参数", "描述"]}
  headerCellStyleFn={() => ({padding: 12, backgroundColor: "rgba(0,0,0,0.02)"})}
  cellStyleFn={() => ({padding: 12})}
  data={[
    ["show()","static", "- modalProps: ModalProps 对话框参数\n-options?: { backToClose?: boolean } 额外参数", "全局调用-显示对话框"],
    ["hide()","static", "-", "全局调用-收起对话框"],
  ]}
/>
```


## 基础用法
- `title`：弹窗主标题（建议十二字内）
- `content`：文案描述，长度小于14时居中

```jsx
<View>
  <View style={{ height: 200 }}>
    <Modal
      title="标题"
      content="文案描述"
      confirmText="确认"
      cancelText="取消"
    />
  </View>

  <View style={{ height: 250 }}>
    <Modal
      title="标题"
      content="文案描述, 按钮类型为：vertical"
      btnType={Modal.btnType.vertical}
      confirmText="确认"
      cancelText="取消"
    />
  </View>

  <View style={{ height: 280 }}>
    <Modal
      title="弹窗主标题（十二字内）"
      content={"文案描述，这段文字超过一行。按钮类型为：primary"}
      confirmText="确认"
      cancelText="取消"
      closeType={Modal.closeType.themeMode}
      btnType={Modal.btnType.primary}
      onClose={() => {
        console.log("onClose");
      }}
      onConfirm={() => {
        console.log("onConfirm");
      }}
      onCancel={() => {
        console.log("onCancel");
      }}
      onPress={() => {
        console.log("onPress");
      }}
    >

    </Modal>
  </View>
</View>
```

## 自定义内容
- `title/content/confirmText/cancelText/children`可以传入自定义元素
- 默认间距：上下间距30；左右间距22；`header`下面留24；`title`下面留15；内容与操作按钮区间距30。
```jsx
<View>
  <View style={{ height: 300 }}>
    <Modal
      title={<HiText size={17} color={HiText.color.theme} style={{marginTop: 30, textAlign: "center"}}>{"自定义标题"}</HiText>}
      content={<HiText size={17} color={HiText.color.theme} style={{marginTop: 15, textAlign: "center"}}>{"自定义描述"}</HiText>}
      confirmText={<HiText>{"自定义确认"}</HiText>}
      cancelText={<HiText>{"自定义取消"}</HiText>}
    />
  </View>

  <View style={{ height: 300 }}>
    <Modal
      header={<Image source={{ uri: "https://y.gtimg.cn/music/common/upload/t_k_guild_comeptition_join_list/1799661.png" }} style={{left: 0, right: 0, height: 100}} resizeMode="cover" />}
      title={<HiText size={17} color={HiText.color.theme} style={{marginTop: 24, textAlign: "center"}}>{"自定义标题"}</HiText>}
      confirmText={"确认"}
      cancelText={"取消"}
      closeType={Modal.closeType.white}
    >
      <View style={{marginTop: 15, marginHorizontal: 22, backgroundColor: "#f1f1f1", padding: 10, borderRadius: 6}}>
        <HiText>{"自定义元素"}</HiText>
      </View>
    </Modal>
  </View>
</View>
```

## 全局使用
- 使用`Modal.show()`和`Modal.hide()`做全局展示（需有`Provider`）。
- `Modal.show`自动设置非`onConfirm`事件为关闭，可自行覆盖。
```jsx
// providerGlobalView

<View>
  <Button
    onPress={() => {
      Modal.show({
        title: "确认删除吗",
        confirmText: "确认",
        cancelText: "取消",
        onConfirm: (e) => {
          e && e.stopPropagation && e.stopPropagation();
          Modal.hide();
          Toast.show("删除成功");
        }
      })
    }}
  >
    {"点击确认删除"}
  </Button>
</View>
```
