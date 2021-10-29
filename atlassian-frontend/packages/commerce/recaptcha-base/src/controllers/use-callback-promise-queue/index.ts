import { useCallback, useEffect, useRef } from 'react';
type ResolveFn<T> = (value: T) => void;
type QueuedItem<I, O> = { input: I; resolve: ResolveFn<O> };
export type ResolverOutput<T> = { resolveWith: T } | undefined;

// TODO: Use Variadic parameters
export type Resolver<I extends any[], O> = (...input: I) => ResolverOutput<O>;

export type QueuedCallback<I extends any[], O> = (...input: I) => O;

/**
 * Useful for deferring the return value of submission callbacks until you have the data to perform
 * the submission.
 * @param resolver Will run every time the queue wants to check if it can resolve its queued up promises.
 * Return { resolveWith: O } to trigger the queue to start resolving its promises.
 * @param dependencyList whenever one of the items in this list changes, the {@param resolver} will be run
 */
export const useCallbackPromiseQueue = <I extends any[], O extends any>(
  resolver: Resolver<I, O>,
): QueuedCallback<I, O> => {
  const resolveQueueRef = useRef<QueuedItem<I, O>[]>([]);

  useEffect(() => {
    // Try resolve with the new resolver
    resolveQueueRef.current = resolveQueueRef.current.filter(
      ({ input, resolve }) => {
        const output = resolver(...input);
        if (output === undefined) {
          return true;
        }

        resolve(output.resolveWith);
        return false;
      },
    );
  }, [resolver]);

  /**
   * This will return a promise that will resolve the next time the
   * {@link resolver} returns an object with "resolveWith" in it.
   */
  const enqueue = useCallback(
    async (...input: I): Promise<O> => {
      const initialResolverOutput = resolver(...input);
      if (initialResolverOutput !== undefined) {
        // Try resolve this immediately
        return initialResolverOutput.resolveWith;
      }

      const queuedPromise = new Promise((resolve: ResolveFn<O>) =>
        resolveQueueRef.current.push({ input, resolve }),
      );

      return queuedPromise;
    },
    [resolver],
    // TODO: We only have to do this because resolving a promise creates Promise<Promise<...>>
  ) as QueuedCallback<I, O>;

  return enqueue;
};
