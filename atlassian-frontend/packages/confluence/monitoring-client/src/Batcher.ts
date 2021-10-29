/* eslint-disable no-useless-constructor */
export type OnFlushCallback<T> = (batch: T[]) => void;

/**
 * A simple mechanism for batching items. Items are batched using `add` method up until `batchMaxSize` is reached.
 * Once `batchMaxSize` is reached, the whole batch is returned from `add`.
 * If `batchMaxSize` hasn't been reached within `flushIntervalMs` milliseconds, the batch will be flushed forcefully.
 * When that happens, callbacks added via `onFlush` method will be invoked with the current batch.
 * `onFlush` will not be invoked for empty batches.
 */
export class Batcher<T = any> {
  private flushIntervalId: number | undefined;
  private onFlushCallbacks = new Set<OnFlushCallback<T>>();
  private currentBatch: T[] = [];

  constructor(private flushIntervalMs: number, private batchMaxSize: number) {}

  public add(item: T): void {
    this.scheduleFlush();

    this.currentBatch.push(item);
    if (this.currentBatch.length >= this.batchMaxSize) {
      this.flush();
    }
  }

  public onFlush(callback: OnFlushCallback<T>): { unsubscribe(): void } {
    if (!(callback instanceof Function)) {
      throw new Error(
        `"onFlush" callback is supposed to be a function; saw ${typeof callback} instead`,
      );
    }
    this.onFlushCallbacks.add(callback);

    return {
      unsubscribe: () => {
        this.onFlushCallbacks.delete(callback);
      },
    };
  }

  /**
   * Forcefully flushes the batcher. Noop if current batch is empty.
   */
  public forceFlush(): void {
    // Currently force-flush is synchronous. Make sure the call sites are updated if
    // this is changed to a promise-based approach
    this.flush();
  }

  private flush = (): void => {
    const batch = this.renewBatch();
    this.unscheduleFlush();

    if (batch.length === 0) {
      return;
    }

    this.onFlushCallbacks.forEach((cb) => {
      try {
        cb(batch);
      } catch (e) {
        // rethrow error asynchronously to allow other callbacks to execute
        setTimeout(() => {
          /* eslint-disable-next-line no-console */
          console.error(
            `"onFlush" callback threw the below error. Please make sure your callbacks have proper error handling`,
          );
          throw e;
        }, 0);
      }
    });
  };

  private renewBatch(): T[] {
    const oldBatch = this.currentBatch;
    this.currentBatch = [];

    return oldBatch;
  }

  private scheduleFlush() {
    if (!this.flushIntervalId) {
      this.flushIntervalId = window.setInterval(
        this.flush,
        this.flushIntervalMs,
      );
    }
  }

  private unscheduleFlush() {
    if (this.flushIntervalId) {
      window.clearInterval(this.flushIntervalId);
      this.flushIntervalId = undefined;
    }
  }
}
