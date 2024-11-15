通过 `Provider.renderInfo` 配置：

```jsx
// preview

/**
 * 功能：文字放大1.5倍，宽高放大1.2倍
 * 参数：SetStyleWithScaleOptions {
  ignore?: string[];
  overwrite?: Record<string, (num: number) => number>;
}
 * */
function setStyleWithScale(style, options) {
  if (Object.prototype.toString.call(style).slice(8, -1) === 'Object') {
    const _style = style;
    const { ignore = [], overwrite = {} } = options || {};
    Object.keys(_style).forEach(key => {
      if (typeof _style[key] === "number" && !ignore.includes(key)) {
        if (["fontSize", "lineHeight"].includes(key)) {
          _style[key] = overwrite[key] ? overwrite[key](_style[key]) : (_style[key] * 1.5);
        } else if (
          [
            "height",
            "width",
            "borderRadius",
            "minWidth",
            "maxWidth",
            "minHeight",
            "maxHeight",
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomLeftRadius",
            "borderBottomRightRadius"
          ].includes(key)
        ) {
          _style[key] = overwrite[key] ? overwrite[key](_style[key]) : (_style[key] * 1.2);
        }
      }
    });
  } else if (Array.isArray(style)) {
    style.forEach((item) => {
      setStyleWithScale(item);
    });
  }
  return style;
}
/**
 * 功能：自动转化renderInfo里各种自定义style
 * 参数：params: {
  defaultRenderInfo: T;
  propsKey?: (string | ({ propsKey: string } & SetStyleWithScaleOptions))[]; // 如 renderInfo.cascader 包含 itemTxtProps: {style: Style} | Array<{style: Style}>
  styleKey?: string[]; // 如 renderInfo.cascader 包含 wrapStyle: Style
  fnPropsKey?: string[]; // 如 renderInfo.cascader 包含 scrollViewPropsFn: () => {style: Style}
  fnStyleKey?: string[]; // 如 renderInfo.table 包含 rowStyleFn: () => Style
  elementKey?: string[]; // 如 renderInfo.empty 包含 img: ReactElement | ReactElement[]
}
 * */
function renderInfoPropsStyleWithScale(params) {
  const { defaultRenderInfo, propsKey, styleKey, fnPropsKey, fnStyleKey } = params;
  if (getObjectType(defaultRenderInfo) !== ObjectType.Object) {
    return defaultRenderInfo;
  }
  propsKey && propsKey.forEach(key => {
    const propsOptions = typeof key === "string" ? { propsKey: key } : key;
    const { propsKey, ...options } = propsOptions;
    const propsList = Array.isArray(defaultRenderInfo[propsKey])
      ? defaultRenderInfo[propsKey]
      : [defaultRenderInfo[propsKey]];
    propsList.forEach(props => {
      if (props && props.style) {
        props.style = setStyleWithScale(props.style, options);
      }
    });
  });
  styleKey && styleKey.forEach(key => {
    if (defaultRenderInfo[key]) {
      defaultRenderInfo[key] = setStyleWithScale(defaultRenderInfo[key]);
    }
  });
  fnPropsKey && fnPropsKey.forEach(key => {
    if (typeof defaultRenderInfo[key] === "function") {
      const defaultFn = defaultRenderInfo[key];
      defaultRenderInfo[key] = function() {
        const result = defaultFn.apply(this, arguments);
        if (getObjectType(result) === ObjectType.Object && result && result.style) {
          result.style = setStyleWithScale(result.style);
        }
        return result;
      };
    }
  });
  fnStyleKey && fnStyleKey.forEach(key => {
    if (typeof defaultRenderInfo[key] === "function") {
      const defaultFn = defaultRenderInfo[key];
      defaultRenderInfo[key] = function() {
        const result = defaultFn.apply(this, arguments);
        return setStyleWithScale(result);
      };
    }
  });
  return defaultRenderInfo;
}

<Provider
  style={{flex: 1}}
  renderInfo={{
    badge: ({ defaultRenderInfo }) => {
      return renderInfoPropsStyleWithScale({ defaultRenderInfo, propsKey: ["badgeProps", "wrapProps"] });
    },
    button: ({ defaultRenderInfo }) => {
      return renderInfoPropsStyleWithScale({
        defaultRenderInfo,
        propsKey: ["textProps", "wrapProps", "imageProps", "badgeProps", "pressProps"]
      });
    },
    cascader: ({ defaultRenderInfo }) => {
      return renderInfoPropsStyleWithScale({
        defaultRenderInfo,
        propsKey: ["itemActiveTxtProps", "itemTxtProps"],
        styleKey: ["wrapStyle", "markStyle", "itemStyle", "itemActiveStyle"],
        fnPropsKey: ["scrollViewPropsFn"]
      });
    },
    divider: ({ defaultRenderInfo }) => {
      return renderInfoPropsStyleWithScale({
        defaultRenderInfo,
        propsKey: ["dividerProps"]
      });
    },
    empty: ({ defaultRenderInfo }) => {
      return renderInfoPropsStyleWithScale({
        defaultRenderInfo,
        propsKey: ["wrapProps"],
        elementKey: ["img", "text"]
      });
    },
    hiText: ({ defaultRenderInfo, props }) => {

      return renderInfoPropsStyleWithScale({
        defaultRenderInfo,
        propsKey: ["textProps"]
      });
    },
    indicator: ({ defaultRenderInfo }) => {
      return renderInfoPropsStyleWithScale({
        defaultRenderInfo,
        propsKey: ["wrapProps"],
        elementKey: ["itemList"]
      });
    },
    listItem: ({ defaultRenderInfo }) => {
      return renderInfoPropsStyleWithScale({
        defaultRenderInfo,
        propsKey: ["wrapProps", "leftProps", "leftInfoProps", "buttonProps"],
        elementKey: ["rank", "thumb", "title", "note", "moreNote"]
      });
    },
    loading: ({ defaultRenderInfo }) => {
      return renderInfoPropsStyleWithScale({
        defaultRenderInfo,
        propsKey: ["loadingProps"],
        elementKey: ["txt"]
      });
    },
    mask: ({ defaultRenderInfo }) => {
      return renderInfoPropsStyleWithScale({
        defaultRenderInfo,
        propsKey: ["maskProps"]
      });
    },
    modal: ({ defaultRenderInfo }) => {
      return renderInfoPropsStyleWithScale({
        defaultRenderInfo,
        propsKey: [
          "modalProps",
          "footerDefaultBtnCancelProps",
          "footerDefaultBtnConfirmProps",
          "footerDefaultTxtConfirmProps",
          "footerDefaultTxtCancelProps",
          "footerPrimaryBtnCancelProps",
          "footerPrimaryBtnConfirmProps",
          "footerVerticalBtnCancelProps",
          "footerVerticalBtnConfirmProps",
          "footerVerticalTxtConfirmProps",
          "footerVerticalTxtCancelProps"
        ],
        elementKey: ["title", "content", "closeIcon"],
        styleKey: ["footerDefaultWrapStyle", "footerPrimaryWrapStyle", "footerVerticalWrapStyle"]
      });
    },
    navigator: ({ defaultRenderInfo }) => {
      return renderInfoPropsStyleWithScale({
        defaultRenderInfo,
        elementKey: ["title", "back"],
        styleKey: ["wrapStyle", "statusBarStyle", "navigatorStyle"]
      });
    },
    popup: ({ defaultRenderInfo }) => {
      return renderInfoPropsStyleWithScale({
        defaultRenderInfo,
        propsKey: ["mainProps"]
      });
    },
    radio: ({ defaultRenderInfo }) => {
      return renderInfoPropsStyleWithScale({
        defaultRenderInfo,
        propsKey: ["wrapProps", "imgProps"]
      });
    },
    search: ({ defaultRenderInfo }) => {
      return renderInfoPropsStyleWithScale({
        defaultRenderInfo,
        propsKey: ["wrapProps", "inputProps"],
        elementKey: ["leftIcon", "rightIcon", "clearIcon"]
      });
    },
    slider: ({ defaultRenderInfo }) => {
      return renderInfoPropsStyleWithScale({
        defaultRenderInfo,
        propsKey: ["wrapProps", "lineProps", "activeLineProps", "blockProps", "blockImageProps"]
      });
    },
    switch: ({ defaultRenderInfo }) => {
      const result = renderInfoPropsStyleWithScale({
        defaultRenderInfo,
        propsKey: ["wrapProps", "circleProps", "activeLineProps", "blockProps", "blockImageProps"]
      });
      return result;
    },
    table: ({ defaultRenderInfo }) => {
      return renderInfoPropsStyleWithScale({
        defaultRenderInfo,
        propsKey: ["wrapProps", "lineProps", "activeLineProps", "blockProps", "blockImageProps"],
        fnStyleKey: ["rowStyleFn", "cellStyleFn", "headerCellStyleFn"],
        styleKey: ["headerStyle"]
      });
    },
    tabs: ({ defaultRenderInfo }) => {
      return renderInfoPropsStyleWithScale({
        defaultRenderInfo,
        propsKey: [
          "wrapProps",
          {
            propsKey: "itemPropsList",
            overwrite: {
              fontSize: n => revertFontToLayoutScale(n),
              lineHeight: n => revertFontToLayoutScale(n)
            }
          }
        ],
        elementKey: ["underline"]
      });
    },
    tag: ({ defaultRenderInfo }) => {
      return renderInfoPropsStyleWithScale({
        defaultRenderInfo,
        propsKey: ["tagProps"],
        elementKey: ["txtNode"]
      });
    },
    toast: ({ defaultRenderInfo }) => {
      return renderInfoPropsStyleWithScale({
        defaultRenderInfo,
        propsKey: ["mainProps"]
      });
    },
    uImage: ({ defaultRenderInfo }) => {
      return renderInfoPropsStyleWithScale({
        defaultRenderInfo,
        propsKey: ["imgProps"]
      });
    }
  }}
>
  <Button>放大按钮</Button>
</Provider>
```
