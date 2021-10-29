export interface SchedulerInit {
  maxConcurrency: number;
  maxBacklogLength: number;
}

/**
 * Execute added (@see Scheduler['add']) tasks with a concurreny of
 * maxConcurrency, maintaining an append-only backlog up to maxBacklogLength
 *
 * @example
 * ```ts
 * const scheduler = new Scheduler({
 *   maxConcurrency: 1,
 *   maxBacklogLength: 1
 * });
 *
 * const a = () => wait(10);
 * const b = () => wait(10);
 * const c = () => wait(10);
 *
 * scheduler
 *  .add(a)  // executions: [a], backlog: []
 *  .add(b)  // executions: [a], backlog: [b]
 *  .add(c); // executions: [a], backlog: [c] (c replaces b)
 *
 * await wait(11); // executions: [c], backlog: []
 * await wait(11);  // executions: [], backlog: []
 * ```
 */
export class Scheduler<T = unknown> {
  private readonly maxConcurrency: number;
  private readonly maxBacklogLength: number;

  private onEmptyCallbacks: (() => void)[] = [];
  private executions: Promise<T>[] = [];
  private backlog: (() => Promise<T>)[] = [];

  constructor(init: SchedulerInit) {
    this.maxConcurrency = init.maxConcurrency;
    this.maxBacklogLength = init.maxBacklogLength;
  }

  /**
   * Kick off task scheduling, picking up new tasks
   * out of the backlog as concurrency permits
   */
  private schedule(task: () => Promise<T>) {
    const execution = task();

    this.executions.push(execution);

    execution.finally(() => {
      this.executions = this.executions.filter(item => execution !== item);

      if (this.executions.length < this.maxConcurrency) {
        const next = this.backlog.shift();

        if (next) {
          this.schedule(next);
        } else {
          this.onEmptyCallbacks.forEach(onEmptyCallback => onEmptyCallback());
          this.onEmptyCallbacks = [];
        }
      }
    });

    return this;
  }

  /**
   * Register a callback to be executed when all exections
   * have resolved and the backlog is empty
   *
   * @example
   * ```ts
   * const a = () => {
   *   wait(10);
   *   console.log('a');
   * };
   *
   * scheduler
   *   .onEmpty(() => console.log('empty'))
   *   .add(a);
   *
   * await wait(11);
   * // log: 'a'
   * // log: 'empty'
   * ```
   */
  public onEmpty(callback: () => void): this {
    if (this.executions.length === 0) {
      callback();
    } else {
      this.onEmptyCallbacks.push(callback);
    }

    return this;
  }

  /**
   * Add a () => Promise<T> to be executed at max `maxConcurrency`.
   * If all concurrent execution spots are taken, place into a
   * backlog with a max length of `maxBacklogLength`.
   * If the backlog is full, overwrite the last item.
   *
   * @example
   * ```ts
   * const a = () => wait(10);
   * const b = () => wait(10);
   *
   * scheduler
   *   .onEmpty(() => console.log('empty'))
   *   .add(a) // executes immediately
   *   .add(b); // executes after a
   * ```
   */
  public add(task: () => Promise<T>): this {
    if (this.executions.length < this.maxConcurrency) {
      return this.schedule(task);
    }

    if (this.maxBacklogLength === 0) {
      return this;
    }

    const index =
      this.backlog.length < this.maxBacklogLength
        ? this.backlog.length + 1
        : this.maxBacklogLength - 1;

    this.backlog[index] = task;

    return this;
  }
}
