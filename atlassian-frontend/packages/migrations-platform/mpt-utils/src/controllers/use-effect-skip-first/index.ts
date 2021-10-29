import { useEffect, useRef } from 'react';

/**
 * @deprecated
 * if you want to execute something only when some value changes then you should cache the value
 * instead of preventing the first load which does not play well with React
 *
 * This is `useEffect` that skips the first invocation
 * This is useful for detecting change event
 * i.e. if you want to execute something only when some value changes, use this one
 */
const useEffectSkipFirst = (fn: () => void, deps?: any[]) => {
  const isFirstRef = useRef(true);
  const callbackRef = useRef(fn);

  // Update fn reference
  useEffect(() => {
    callbackRef.current = fn;
  }, [fn]);

  // Execute fn except the first load
  useEffect(() => {
    // First load
    if (isFirstRef.current) {
      isFirstRef.current = false;
      return;
    }

    // The second load and onward;
    callbackRef.current();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useEffectSkipFirst;
