import { ReadyReason, ReadyResponse } from '../api/types';

export const DEFAULT_PROMISE_TIMEOUT = 3 * 1000;

export const CLIENT_TIMEOUT: ReadyResponse = {
  reason: ReadyReason.CLIENT_ERROR,
  message: 'Client timed out.',
};
export const REQUEST_TIMEOUT: ReadyResponse = {
  reason: ReadyReason.CLIENT_ERROR,
  message: 'Request took too long to finish, client aborted the request.',
};

export const READY_CACHE: ReadyResponse = {
  reason: ReadyReason.CACHE,
};

export const READY_FETCH: ReadyResponse = {
  reason: ReadyReason.FETCH,
};

export type ReadyConfiguration = {
  readyTimeoutInMilliseconds?: number;
};

export default class Ready {
  private readyPromise!: Promise<ReadyResponse>;

  private resolveReadyPromise?: (response: ReadyResponse) => void;

  private defaultReadyPromise!: Promise<ReadyResponse>;

  private readyTimeoutInMilliseconds: number;

  constructor({ readyTimeoutInMilliseconds }: ReadyConfiguration = {}) {
    this.readyTimeoutInMilliseconds =
      readyTimeoutInMilliseconds || DEFAULT_PROMISE_TIMEOUT;
    this.initialisePromise();
    this.initialiseDefaultPromise(this.readyTimeoutInMilliseconds);
  }

  private initialiseDefaultPromise(timeout: number): void {
    this.defaultReadyPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          reason: ReadyReason.CLIENT_ERROR,
          message: 'Client timed out.',
        });
      }, timeout);
    });
  }

  private initialisePromise(): void {
    /*
      A promise can only be resolved by calling the `resolve` function in the constructor callback.
      Since we need resolve the promise by external input, we must save the reference to this resolve function.
      This is safe as the callback function is called synchronously as defined by the ES spec.
    */
    this.readyPromise = new Promise((resolve) => {
      this.resolveReadyPromise = resolve;
    });
  }

  getPromise(): Promise<ReadyResponse> {
    return Promise.race([this.readyPromise, this.defaultReadyPromise]);
  }

  triggerReady(response: ReadyResponse): void {
    if (this.resolveReadyPromise !== undefined) {
      this.resolveReadyPromise(response);
      this.resolveReadyPromise = undefined;
    }
  }

  reset(): void {
    if (this.resolveReadyPromise === undefined) {
      this.initialisePromise();
    }
    this.initialiseDefaultPromise(this.readyTimeoutInMilliseconds);
  }
}
