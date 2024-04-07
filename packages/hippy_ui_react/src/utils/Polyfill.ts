import { Style, UIManagerModule, colorParse } from '@hippy/react';
import { isWeb } from './Utils';

export interface HippyElement {
  setNativeProps: (params: { style: Style }) => void;
}

export function getWebElementFromFiberRef(ref: any): null | HTMLElement {
  if (!ref) {
    return null;
  }
  if (ref instanceof HTMLElement) {
    return ref;
  }
  const internalFiber = ref._reactInternalFiber || ref._reactInternals;
  if (internalFiber?.child) {
    let targetNode = internalFiber.child;
    while (targetNode && !(targetNode.stateNode instanceof HTMLElement)) {
      targetNode = targetNode.child;
    }
    if (!targetNode?.stateNode) {
      return null;
    }
    return targetNode.stateNode;
  }
  return null;
}

// Hippy-UIManagerModule：getElementFromFiberRef
export function getElementFromFiberRef(ref: any): null | HippyElement {
  if (!ref || isWeb()) {
    return null;
  }
  if (UIManagerModule?.getElementFromFiberRef) {
    return UIManagerModule.getElementFromFiberRef(ref);
  }
  if (isElement(ref)) {
    return ref;
  }
  const internalFiber = ref._reactInternalFiber || ref._reactInternals;
  if (internalFiber?.child) {
    let targetNode = internalFiber.child;
    while (targetNode && !isElement(targetNode.stateNode)) {
      targetNode = targetNode.child;
    }
    if (!targetNode?.stateNode) {
      return null;
    }
    return targetNode.stateNode;
  }
  return null;
}
// Hippy-utils：tryConvertNumber
const numberRegEx = /^(?=.+)[+-]?\d*\.?\d*([Ee][+-]?\d+)?$/;
function tryConvertNumber(input: any) {
  if (typeof input === 'number') {
    return input;
  }
  if (typeof input === 'string' && numberRegEx.test(input)) {
    try {
      return parseFloat(input);
    } catch (err) {
      return input;
    }
  }
  return input;
}

// Hippy-Element：修改style，不触发 updateChild 和 endBatch
function setStyle(element: any, property: string, value: string | number | any) {
  if (value === null) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete (element.style as any)[property];
    return;
  }
  let v = value;
  if (typeof v === 'string') {
    v = (value as string).trim();
    if (property.toLowerCase().includes('colors')) {
      if (!Array.isArray(v)) {
        v = [0];
      }
      v = v.map((color: any) => colorParse(color));
    } else if (property.toLowerCase().includes('color')) {
      v = colorParse(v);
    } else {
      v = tryConvertNumber(v);
    }
  }
  if (v === undefined || v === null || (element.style as any)[property] === v) {
    return;
  }
  (element.style as any)[property] = v;
}
// Hippy-Element：判断是Element并注入setNativeProps
function isElement(element: any) {
  if (element?.setStyle && element.tagName && element.nodeId) {
    element.setNativeProps = function (nativeProps?: { style?: Record<string, any> }) {
      if (nativeProps) {
        const { style } = nativeProps;
        if (style) {
          const styleProps = Object.keys(style);
          styleProps.forEach((key, index) => {
            if (index === styleProps.length - 1) {
              // 这个方法会调用endBatch，因此只在最后一次调用，其他模拟实现
              element.setStyle(key, style[key]);
            } else {
              setStyle(element, key, style[key]);
            }
          });
        }
      }
    };
    return true;
  } else {
    return false;
  }
}
