export type ControllablePromiseResult<T> = {
  getPromise: () => Promise<T>;
  invokeResolve: (value?: T) => void;
  invokeReject: (reason?: any) => void;
};

/**
 * Creates a promise that can be passed down to a function or component and that
 * can be easily resolved/reject any time with any result
 */
export function createControllablePromise<T>(): ControllablePromiseResult<T> {
  let resolveFn: (value?: T | PromiseLike<T> | undefined) => void;
  let rejectFn: (reason?: any) => void;

  const promise = new Promise<T>((_resolve, _reject) => {
    resolveFn = _resolve;
    rejectFn = _reject;
  });

  return {
    getPromise: () => promise,
    invokeResolve: (value?: T) => resolveFn(value),
    invokeReject: (reason?: any) => rejectFn(reason),
  };
}
