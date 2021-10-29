import debounce from 'lodash/debounce';

interface BatchMap<T, U> {
  [id: string]: {
    resolve: (response: U | PromiseLike<U>) => void;
    reject: () => void;
    arg: T;
  };
}

/**
 * A utility to batch invocations to a function.
 * All the batched requests with their arguments & returned promises are stored in the BatchMap.
 * The batched method needs a distinct `id` argument followed by the request object.
 *
 * @param {function} argumentResolver - Iterates on the BatchMap and generates the final request object which needs to be passed to the API.
 * @param {function} finalFn - The API which needs to be invoked.
 * @param {function} successfulResponseMapper - For the given id and batched successful response it extracts the response for the individual call.
 * @param {number | optional} debounceTime - The time till which the debouncing should happen.
 *
 * @typeParam {T} - It is the argument taken by the batched function.
 * @typeParam {R} - The response returned by the final function.
 * @typeParam {U} - The response type for individual method invocation.
 */
export const batchMethod = <T, R, U>(
  argumentResolver: (args: T[]) => T,
  finalFn: (arg: T) => Promise<R>,
  successfulResponseMapper: (response: R, id: string) => U,
  debounceTime: number = 100,
): ((id: string, arg: T) => Promise<U>) => {
  const batchMap: BatchMap<T, U> = {};
  const timedFn = debounce(() => {
    const inFlightRequestsMap = { ...batchMap };
    const keys = Object.keys(inFlightRequestsMap);
    const args = keys.map((key) => inFlightRequestsMap[key].arg);

    finalFn(argumentResolver(args))
      .then((response: R) => {
        keys.forEach((key) => {
          inFlightRequestsMap[key].resolve(
            successfulResponseMapper(response, key),
          );
        });
      })
      .catch(() => {
        keys.forEach((product) => {
          inFlightRequestsMap[product].reject();
        });
      })
      .finally(() => keys.forEach((key) => delete batchMap[key]));
  }, debounceTime);

  return (id: string, arg: T) => {
    const promise = new Promise<U>((resolve, reject) => {
      batchMap[id] = {
        resolve,
        reject,
        arg,
      };
    });

    timedFn();

    return promise;
  };
};
