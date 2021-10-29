/* eslint-disable no-return-assign, no-sequences */

type KeyValue = {
  [key: string]: any;
};

// https://www.30secondsofcode.org/js/s/map-keys
const mapKeys = (
  obj: KeyValue,
  fn: (i: KeyValue, j: string, k: KeyValue) => string,
) => Object.keys(obj).reduce((acc: KeyValue, k: string) => {
  const key: string = fn(obj[k], k, obj);
  acc[key] = obj[k];
  return acc;
}, {});

// https://www.30secondsofcode.org/js/s/pick
const pick = (obj: any, arr: any) => arr.reduce(
  (acc: any, curr: any) => (curr in obj && (acc[curr] = obj[curr]), acc),
  {},
);

// https://www.30secondsofcode.org/js/s/omit-by
const omitBy = (obj: KeyValue, fn: (x: any, y: any) => any) => Object.keys(obj)
  .filter((k) => !fn(obj[k], k))
  .reduce((acc: KeyValue, key: string) => ((acc[key] = obj[key]), acc), {});

// https://www.30secondsofcode.org/js/s/pick-by
const pickBy = (obj: KeyValue, fn: (x: any, y: any) => any) => Object.keys(obj)
  .filter((k) => fn(obj[k], k))
  .reduce((acc: KeyValue, key) => ((acc[key] = obj[key]), acc), {});

// https://www.30secondsofcode.org/js/s/omit
const omit = (obj: KeyValue, arr: any[]) => Object.keys(obj)
  .filter((k) => arr.indexOf(k) < 0)
  .reduce((acc: KeyValue, key: string) => ((acc[key] = obj[key]), acc), {});

// https://www.30secondsofcode.org/js/s/equals
const equals = (a: any, b: any): boolean => {
  if (a === b) {return true;}
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) {
    return a === b;
  }
  if (a.prototype !== b.prototype) {return false;}
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) {return false;}
  return keys.every((k) => equals(a[k], b[k]));
};

// https://www.30secondsofcode.org/js/s/partition
const partition = (arr: any, fn: any) => arr.reduce(
  // eslint-disable-next-line no-shadow
  (acc: any, val: any, i: any, arr: any) => {
    acc[fn(val, i, arr) ? 0 : 1].push(val);
    return acc;
  },
  [[], []],
);

export {
  mapKeys, pick, pickBy, omitBy, omit, equals, partition,
};
