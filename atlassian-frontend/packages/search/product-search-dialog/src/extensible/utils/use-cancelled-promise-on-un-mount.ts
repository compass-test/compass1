import { useCallback } from 'react';
import useMountedState from './use-mounted-state';

export default () => {
  const isMounted = useMountedState();

  return useCallback(
    <T>(promise: Promise<T>) =>
      new Promise<T>((resolve, reject) => {
        promise
          .then((result) => {
            if (isMounted()) {
              resolve(result);
            }
          })
          .catch((error) => {
            if (isMounted()) {
              reject(error);
            }
          });
      }),
    [isMounted],
  );
};
