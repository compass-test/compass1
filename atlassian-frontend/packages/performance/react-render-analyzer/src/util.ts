/* eslint-disable compat/compat */
const objectHasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwnProperty(target: object, property: string): boolean {
  return objectHasOwnProperty.apply(target, [property]);
}

export function getOwnEnumerablePropertyNames(target: object): string[] {
  const descriptors = Object.getOwnPropertyDescriptors(target);
  return Object.keys(descriptors).filter((key) => descriptors[key].enumerable);
}

let idleHandle: any = 0;
const idleListeners: Function[] = [];

export function requestIdleCallback(listener: Function) {
  idleListeners.push(listener);

  if (!idleHandle) {
    // @ts-ignore
    if (typeof window.requestIdleCallback === 'function') {
      // @ts-ignore
      idleHandle = window.requestIdleCallback(flushIdleCallbacks);
    } else {
      idleHandle = setTimeout(flushIdleCallbacks, 60);
    }
  }
}

function flushIdleCallbacks() {
  while (idleListeners.length) {
    const callback = idleListeners.shift();
    if (callback) {
      callback();
    }
  }
  idleHandle = 0;
}
