import { Platform } from '@hippy/react';

/**
 * 工具：节流
 * */
export class Throttle<T extends any[]> {
  constructor(func: (...args: T) => void, delay: boolean | number = 300, atBegin: boolean = true) {
    this.delay = !delay ? 0 : delay === true ? 300 : (delay as number);
    this.atBegin = atBegin;
    this.func = func;
  }

  private readonly atBegin?: boolean;
  private readonly delay: number;
  private timer: any;
  private func: (...args: T) => void;

  // 刷新执行
  public flush = (...args: T) => {
    if (!this.timer) {
      this.atBegin && this.func.apply(this, args);
      this.timer = setTimeout(() => {
        !this.atBegin && this.func.apply(this, args);
        this.timer = null;
      }, this.delay);
    }
  };

  // 更新函数
  public replaceFn = (func: (...args: T) => void) => {
    this.func = func;
  };

  // 取消执行
  public cancel = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  };
}

/**
 * 工具：防抖
 * */
export class Debounce<T extends any[]> {
  constructor(func: (...args: T) => void, delay: boolean | number = 300, atBegin?: boolean) {
    this.delay = !delay ? 0 : delay === true ? 300 : (delay as number);
    this.atBegin = atBegin;
    this.func = func;
  }

  private readonly atBegin?: boolean;
  private readonly delay: number;
  private timer: any;
  private func: (...args: T) => void;

  // 更新函数
  public replaceFn = (func: (...args: T) => void) => {
    this.func = func;
  };

  // 刷新执行
  public flush = (...args: T) => {
    if (this.timer) {
      this.cancel();
    } else if (this.atBegin) {
      this.func.apply(this, args);
    }
    this.timer = setTimeout(() => {
      !this.atBegin && this.func.apply(this, args);
      this.timer = null;
    }, this.delay);
  };

  // 取消执行
  public cancel = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  };
}

/**
 * 工具：版本比较
 * */
export function versionCompare(target: string, current: string) {
  const targetArr = target.split('.');
  const currentArr = current.split('.');

  for (let i = 0; i < targetArr.length; i++) {
    if (Number(currentArr[i]) > Number(targetArr[i])) {
      return true;
    } else if (Number(currentArr[i]) < Number(targetArr[i])) {
      return false;
    }
  }

  return true; // 等于的时候也返回true
}

/**
 * 工具：获取对象类型
 * */

export function getObjectType(obj: any): ObjectType {
  return Object.prototype.toString.call(obj).slice(8, -1) as ObjectType;
}
export enum ObjectType {
  Object = 'Object',
  Array = 'Array',
  Boolean = 'Boolean',
  Date = 'Date',
  Error = 'Error',
  Function = 'Function',
  Math = 'Math',
  Number = 'Number',
  RegExp = 'RegExp',
  String = 'String',
  Undefined = 'Undefined',
  Null = 'Null',
  Arguments = 'Arguments',
  Map = 'Map',
  Set = 'Set',
  WeakMap = 'WeakMap',
  WeakSet = 'WeakSet',
  Symbol = 'Symbol',
  Promise = 'Promise',
  ArrayBuffer = 'ArrayBuffer',
  AsyncFunction = 'AsyncFunction',
}
export function isClass(obj: any) {
  return (
    getObjectType(obj) === ObjectType.Object &&
    obj.constructor &&
    typeof obj.constructor === 'function' &&
    /^[A-Z]/.test(obj.constructor.name)
  );
}

/**
 * 工具：合并对象（不修改原对象，返回深拷贝的新对象。只识别参数列表中的object，其他全部忽略。）
 * */
export function extendObj(...args): any {
  const result: any = {};
  args.forEach((obj) => {
    const objType = getObjectType(obj);
    if (objType === ObjectType.Object) {
      Object.keys(obj).forEach((key) => {
        const valueType = getObjectType(obj[key]);
        if (valueType === ObjectType.Object) {
          result[key] = extendObj(result[key], obj[key]);
        } else {
          result[key] = deepCopy(obj[key]);
        }
      });
    }
  });
  return result;
}

/**
 * 工具：深拷贝
 * */
export function deepCopy<T>(obj: T): T {
  if (isClass(obj)) {
    return obj;
  }
  const objType = getObjectType(obj);
  if (objType === ObjectType.Object) {
    // 暂不拷贝原型链
    const result = {};
    Object.keys(obj).forEach((key) => {
      result[key] = deepCopy(obj[key]);
    });
    return result as T;
  } else if (objType === ObjectType.Array) {
    return (obj as any).map((v) => deepCopy(v));
  } else if (objType === ObjectType.Map) {
    return new Map([...(obj as any)]) as any;
  } else if (objType === ObjectType.Set) {
    return new Set([...(obj as any)]) as any;
  } else {
    return obj;
  }
}

/**
 * 工具：判断是否web
 * */
export function isWeb() {
  return (Platform.OS as string) === 'web';
}

/**
 * 工具：判断是否pc
 * */
export function isPc() {
  if (!isWeb()) {
    return false;
  }
  // else if(/(Windows|Macintosh|Linux)/.test(navigator.userAgent)){
  //   return true;
  // } else if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  //   return false
  // }
  else {
    return window?.document && !('ontouchstart' in document) && 'onmousemove' in document;
  }
}

/**
 * 工具：小于10数字补充前面的0
 * */
export function replenishNum(num: number) {
  return `${num < 10 ? '0' : ''}${num}`;
}

/**
 * 工具：判断空
 * */
export function isNullOrUndefined(value: any): boolean {
  return value === null || typeof value === 'undefined';
}
