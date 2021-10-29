import { useCallback, useRef } from 'react';
import CancellablePromise from '../../utils/cancellable-promise';

/**
 * This function prevents resolution of a promise if there is a call in progress.
 * Assumption here is that the call which has gone afterwards will return later than the previous one.
 */

export const useMaxOneInflightRequest = () => {
  const previousPromise = useRef<CancellablePromise<unknown> | null>(null);

  return useCallback(<T>(promise: Promise<T>) => {
    if (previousPromise.current) {
      previousPromise.current.cancel();
    }
    const cancellablePromise = CancellablePromise.from(promise);

    previousPromise.current = cancellablePromise;
    return cancellablePromise.promise();
  }, []);
};

export default useMaxOneInflightRequest;
