export class CancelError extends Error {
  public isCancelled: boolean = true;
}

const CANCEL_ERROR = new CancelError('Promise is cancelled');

interface CancellablePromise<T> {
  /**
   * Cancels a promise. This will trigger a promise rejection with the error being an instanceof `CancelError`.
   */
  cancel: () => void;

  /**
   * Retrieves the `CancellablePromise` as a `Promise` so handlers like `then` and `catch` can then be attached.
   */
  promise: () => Promise<T>;
}

class CancellablePromiseImpl<T> implements CancellablePromise<T> {
  private cancellablePromiseInternal: Promise<T>;

  private cancelInternal: () => void = () => {
    // Default throws an error as this should never happen
    throw new Error(
      'Programming error, cancelling promise is not properly rejected',
    );
  };

  constructor(promise: Promise<T>) {
    this.cancellablePromiseInternal = Promise.race<T>([
      promise,
      new Promise<T>((_, reject) => {
        this.cancelInternal = () => reject(CANCEL_ERROR);
      }),
    ]);
  }

  public promise: () => Promise<T> = () => this.cancellablePromiseInternal;

  public cancel: () => void = () => this.cancelInternal();

  public static from<T>(promise: Promise<T>) {
    return new CancellablePromiseImpl(promise);
  }
}

export default CancellablePromiseImpl;
