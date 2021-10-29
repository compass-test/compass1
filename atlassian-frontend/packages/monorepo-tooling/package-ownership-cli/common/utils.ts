export const filterUndefinedValues = <V>(
  arr: Array<[any, undefined | V]>,
): Array<[any, V]> =>
  arr.filter(([_, value]) => value !== undefined) as Array<[any, V]>;
