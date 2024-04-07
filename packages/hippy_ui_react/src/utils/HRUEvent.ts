const _global = (globalThis || global || window) as any;
_global._HRUEvents = _global._HRUEvents || {};

export function on(type: string, callback: Function) {
  (_global as any)._HRUEvents[type] || ((_global as any)._HRUEvents[type] = []);
  (_global as any)._HRUEvents[type].push(callback);
}

export function off(type: string, callback?: any) {
  const callbacks = (_global as any)._HRUEvents[type];
  let index;
  if (callbacks && callback) {
    index = callbacks.indexOf(callback);
    ~index && callbacks.splice(index, 1);
  } else {
    (_global as any)._HRUEvents[type] = [];
  }
}

export function emit(type: string, ...args): any[] {
  if (!(_global as any)._HRUEvents[type]) {
    return;
  }
  const callbacks = ((_global as any)._HRUEvents[type] || []).slice(0); // 多个one,splice时会删除,要拷贝一份

  return callbacks.map((cb) => {
    return cb?.apply(this, args);
  });
}

export function one(type, callback) {
  let proxy;
  on(
    type,
    (proxy = function (...args) {
      callback.apply(this, args);
      off(type, proxy);
    }),
  );
}

/**
 * 事件监听Key：更新全局节点
 * */
export const HRU_EVENT_GLOBAL_VIEW = 'HRU_EVENT_GLOBAL_VIEW';

const HRUEvent = {
  on,
  off,
  emit,
  one,
};

export default HRUEvent;
