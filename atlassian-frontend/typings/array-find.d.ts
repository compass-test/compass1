declare module 'array-find' {
  export default function <T>(
    array: T[],
    predicate?: (element: T) => boolean,
    context?: any,
  ): boolean;
}
