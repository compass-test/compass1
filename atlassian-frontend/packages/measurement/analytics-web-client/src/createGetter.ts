export type GetterFunction<T = string> = () => T | undefined;
/**
 * Wraps {possibleFn} into a error-safe function and handles cases where {possibleFn}
 * is a function or object
 *
 * @param possibleFn - function that returns and object or the object itself
 * @param errorMessage - error message to log if {possibleFn} is a function and
 *                        throws an error when called
 * @returns {Function}
*/
const isFunction = (possibleFn: any): possibleFn is Function => typeof possibleFn === 'function';

export default <T = string>(possibleFn: GetterFunction<T> | T, errorMessage: string): GetterFunction<T> => {
  return () => {
    if (isFunction(possibleFn)) {
      try {
        return possibleFn();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`${errorMessage} - ${e.message}`);
        return undefined;
      }
    }
    return possibleFn;
  };
};
