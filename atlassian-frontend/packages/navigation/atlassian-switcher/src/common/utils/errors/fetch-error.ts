export const FETCH_ERROR_NAME = 'FetchError';
export class FetchError extends Error {
  public status: number | undefined;
  name = FETCH_ERROR_NAME;

  constructor(message: string, status: number | undefined) {
    super(message);

    this.status = status;
  }

  static isFetchError(value: unknown): value is FetchError {
    if (process.env.NODE_ENV === 'testing') {
      // jest messes up globals badly, see https://github.com/facebook/jest/issues/2549
      // once that issue is fixed, the usages of this function can be inlined to `error instanceof BadStatusError`
      return (value as any)?.name === FETCH_ERROR_NAME;
    }

    return value instanceof FetchError;
  }
}
