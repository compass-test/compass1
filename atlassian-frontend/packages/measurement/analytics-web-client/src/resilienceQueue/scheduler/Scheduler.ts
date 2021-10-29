import { CallbackStatus, CallbackWithTimeout } from './CallbackWithTimeout';
import type { CallbackFn, OnDoneFn, SchedulerOptions } from './types';

const SCHEDULER_OPTIONS_DEFAULT: SchedulerOptions = {
  minRetryDelay: 1000,
  maxRetryDelay: 30000,
  backoffFactor: 2,
  backoffJitterPercentage: 0,
  waitInterval: 500,
  callbackTimeoutPeriod: 5000
};

export enum QueuedScheduleTypes {
  NONE,
  IMMEDIATE ,
  WAIT
}

export default class Scheduler {
  private callback: CallbackFn;

  private failureCount: number;

  private operationInFlight: boolean;

  private options: SchedulerOptions;

  private queuedSchedule: QueuedScheduleTypes;

  private scheduledTimeout: number | null;

  private callbackTimer: CallbackWithTimeout;

  constructor(retryOptions: Partial<SchedulerOptions>, callback: CallbackFn) {
    this.options = {
      minRetryDelay:
        retryOptions.minRetryDelay || SCHEDULER_OPTIONS_DEFAULT.minRetryDelay,
      maxRetryDelay:
        retryOptions.maxRetryDelay || SCHEDULER_OPTIONS_DEFAULT.maxRetryDelay,
      backoffFactor:
        retryOptions.backoffFactor || SCHEDULER_OPTIONS_DEFAULT.backoffFactor,
      backoffJitterPercentage:
        retryOptions.backoffJitterPercentage || SCHEDULER_OPTIONS_DEFAULT.backoffJitterPercentage,
      waitInterval:
        retryOptions.waitInterval !== undefined ? retryOptions.waitInterval : SCHEDULER_OPTIONS_DEFAULT.waitInterval,
      callbackTimeoutPeriod:
        retryOptions.callbackTimeoutPeriod || SCHEDULER_OPTIONS_DEFAULT.callbackTimeoutPeriod,
    };

    this.scheduledTimeout = null;
    this.failureCount = 0;
    this.callback = callback;

    this.operationInFlight = false;
    this.queuedSchedule = QueuedScheduleTypes.NONE;

    this.callbackTimer = new CallbackWithTimeout(this.options.callbackTimeoutPeriod);
  }

  schedule = ({ immediate }: { immediate: boolean } = { immediate: false }) => {
    if (this.operationInFlight) {
      if (immediate) {
        this.queuedSchedule = QueuedScheduleTypes.IMMEDIATE;
      } else if (this.queuedSchedule !== QueuedScheduleTypes.IMMEDIATE) {
        this.queuedSchedule = QueuedScheduleTypes.WAIT;
      }

      // Only run immediately if we have no failures
    } else if ((immediate || this.options.waitInterval <= 0) && this.failureCount === 0) {
      this.clearTimeout();
      this.run();

      // Backoff
    } else if (this.failureCount > 0 && this.scheduledTimeout === null) {
      this.scheduledTimeout = window.setTimeout(
        this.run,
        this.calculateBackoff(),
      );

      // Schedule as normal
    } else if (this.scheduledTimeout === null) {
      this.scheduledTimeout = window.setTimeout(
        this.run,
        this.options.waitInterval,
      );
    }
  };

  stop = () => {
    this.clearTimeout();
    this.queuedSchedule = QueuedScheduleTypes.NONE;
  };

  getFailureCount = () => this.failureCount;

  getCallbackStatus = () => {
    return this.callbackTimer.getCallbackStatus();
  }

  private clearTimeout = () => {
    if (this.scheduledTimeout !== null) {
      window.clearTimeout(this.scheduledTimeout);
      this.scheduledTimeout = null;
    }
  };

  private run = () => {
    this.operationInFlight = true;
    this.clearTimeout();

    try {
      this.callbackTimer.executeCallbackWithTimeout(
        // callback to execute
        this.callback,
        // when callback completes, call this function
        this.done,
        // on timeout, do this instead
        () => this.done(true)
      );
    } catch (err) {
      this.done(err);
    }
  };

  private done: OnDoneFn = (err: unknown) => {
    this.operationInFlight = false;

    if (err || this.callbackTimer.getCallbackStatus() === CallbackStatus.TIMED_OUT) {
      this.failureCount++;
      this.clearTimeout();
    } else {
      this.failureCount = 0;
    }
    this.processQueuedSchedule();
  };

  private processQueuedSchedule = () => {
    if (this.queuedSchedule !== QueuedScheduleTypes.NONE) {
      const immediate = this.queuedSchedule === QueuedScheduleTypes.IMMEDIATE;
      this.queuedSchedule = QueuedScheduleTypes.NONE;
      this.schedule({ immediate });
    } else if (this.failureCount > 0) {
      // This will schedule tasks when this._done was called with a truthy value
      // For example, when this.callback(this._done) was not called within
      // this.callbackTimeoutPeriod
      this.schedule();
    }
  };

  private calculateBackoff = () => {
    const {
      minRetryDelay,
      maxRetryDelay,
      backoffFactor,
      backoffJitterPercentage,
    } = this.options;

    let ms = minRetryDelay * backoffFactor ** this.failureCount;
    if (backoffJitterPercentage) {
      const rand = Math.random();
      const deviation = Math.floor(rand * backoffJitterPercentage * ms);
      if (Math.floor(rand * 10) < 5) {
        ms -= deviation;
      } else {
        ms += deviation;
      }
    }
    return Number(Math.min(ms, maxRetryDelay).toPrecision(1));
  };
}
