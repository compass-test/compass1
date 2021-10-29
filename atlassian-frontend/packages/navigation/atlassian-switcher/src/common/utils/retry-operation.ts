export interface RetryConfig {
  intervalsMS: number[];
  onRetry?: (previousException: any, retryCount: number) => void;
  shouldRetryOnException?: (e: any) => boolean;
}

export const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const retryOnException = async <T>(
  invokeOperation: () => Promise<T>,
  config: RetryConfig,
): Promise<T> => {
  let nextMSInterval: number | undefined = 0;
  let error = new Error('No calls made');
  const retries = config.intervalsMS.length;
  while (nextMSInterval !== undefined) {
    try {
      if (nextMSInterval > 0) {
        await wait(nextMSInterval);

        if (config.onRetry) {
          config.onRetry(error, retries - config.intervalsMS.length);
        }
      }
      return await invokeOperation();
    } catch (e) {
      error = e;

      if (
        config.shouldRetryOnException &&
        !config.shouldRetryOnException(error)
      ) {
        throw error;
      }

      nextMSInterval = config.intervalsMS.shift();
    }
  }
  throw error;
};
