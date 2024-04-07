import * as components from "hippy_ui_react";
import * as componentsBusiness from "hippy_ui_react_business";

Object.keys(components).forEach(_componentName => {
  global[_componentName] = components[_componentName];
});

Object.keys(componentsBusiness).forEach(componentName => {
  global[componentName] = componentsBusiness[componentName];
});
