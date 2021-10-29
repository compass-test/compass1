export function notUndefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

export function isKeyof<T extends object>(
  obj: T,
  possibleKey: keyof any,
): possibleKey is keyof T {
  return possibleKey in obj;
}
