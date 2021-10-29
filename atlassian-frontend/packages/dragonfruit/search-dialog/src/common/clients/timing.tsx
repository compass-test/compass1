export const timed = async <T,>(
  promise: Promise<T>,
): Promise<{
  result: T;
  durationMs: number;
}> => {
  const startTime = Date.now();
  const result = await promise;
  const duration = Date.now() - startTime;
  return {
    result,
    durationMs: duration,
  };
};
