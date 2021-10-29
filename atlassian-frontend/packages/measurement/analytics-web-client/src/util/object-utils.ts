// Modified from https://github.com/jonschlinkert/is-plain-object/blob/master/index.js

function isObject(val: any) {
  return (
    val !== null && typeof val === 'object' && Array.isArray(val) === false
  );
}

function isObjectObject(o: any) {
  return (
    isObject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]'
  );
}

function isPlainObject(o: any) {
  if (isObjectObject(o) === false) {
    return false;
  }

  // If has modified constructor
  const ctor = o.constructor;
  if (typeof ctor !== 'function') {
    return false;
  }

  // If has modified prototype
  const prot = ctor.prototype;
  if (isObjectObject(prot) === false) {
    return false;
  }

  // If constructor does not have an Object-specific method
  if (!('isPrototypeOf' in prot)) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  isPlainObject,
};
