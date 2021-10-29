import { DependencyList, useCallback, useEffect, useRef } from 'react';

/**
 * Returns a function that will call the given function only once, no matter how
 * many times it's called.
 *
 * The `deps` array should contain all the dependencies of the passed function,
 * just like `useEffect`. However, even if the dependencies change after the
 * function is called, the given function won't be called again.
 */
export const useOnceFn = (fn: () => void, deps: DependencyList = []) => {
  const called = useRef(false);

  return useCallback(() => {
    if (!called.current) {
      called.current = true;
      fn();
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};

/**
 * Like `useOnceFn` but automatically calls the given function once `condition`
 * is true.
 */
export const useOnceWhen = (
  condition: boolean,
  fn: () => void,
  deps?: DependencyList,
) => {
  const fire = useOnceFn(fn, deps);

  useEffect(() => {
    if (condition) {
      fire();
    }
  }, [condition, fire]);
};
