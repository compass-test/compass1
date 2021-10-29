const asyncWait = (interval: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, interval));

/**
 * Auto retries calls. If the limit of retries is reached it returns the last result
 * @param call
 * @param shouldRetry
 * @param maxRetries
 * @param interval
 */
export const autoRetry = async <T>(
  call: () => Promise<T>,
  shouldRetry: (data: T) => boolean,
  interval: number = 1500,
  maxRetries: number = 3,
): Promise<T> => {
  const tryCall = async (remainingRetries: number): Promise<T> => {
    const result = await call();
    if (remainingRetries === 0 || !shouldRetry(result)) {
      return result;
    }
    await asyncWait(interval);
    return tryCall(remainingRetries - 1);
  };
  return tryCall(maxRetries);
};
