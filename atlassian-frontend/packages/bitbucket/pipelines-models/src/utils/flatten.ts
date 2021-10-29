export function flatten(ob: any, prefix: any = false, result: any = null) {
  result = result || {};

  // Preserve empty objects and arrays, they are lost otherwise
  if (
    prefix &&
    typeof ob === 'object' &&
    ob !== null &&
    Object.keys(ob).length === 0
  ) {
    result[prefix] = Array.isArray(ob) ? [] : {};
    return result;
  }

  prefix = prefix ? prefix + '.' : '';

  for (const i in ob) {
    if (Object.prototype.hasOwnProperty.call(ob, i)) {
      if (typeof ob[i] === 'object' && ob[i] !== null) {
        // Recursion on deeper objects
        flatten(ob[i], prefix + i, result);
      } else {
        result[prefix + i] = ob[i];
      }
    }
  }
  return result;
}

export function unflatten(ob: any) {
  const result = {};
  for (const i in ob) {
    if (Object.prototype.hasOwnProperty.call(ob, i)) {
      // Just a complicated regex to only match a single dot in the middle of the string
      const keys =
        i.match(/^\.+[^.]*|[^.]*\.+$|(?:\.{2,}|[^.])+(?:\.+$)?/g) || [];
      keys.reduce((r: any, e, j) => {
        return (
          r[e] ||
          (r[e] = isNaN(Number(keys[j + 1]))
            ? keys.length - 1 === j
              ? ob[i]
              : {}
            : [])
        );
      }, result);
    }
  }
  return result;
}
