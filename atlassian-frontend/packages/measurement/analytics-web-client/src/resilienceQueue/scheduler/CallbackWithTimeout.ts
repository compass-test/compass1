import type { CallbackFn, OnDoneFn, OnTimeoutFn } from './types';

export enum CallbackStatus {
  IDLE = "idle",
  RUNNING = "running",
  COMPLETED = "completed",
  TIMED_OUT = "timedOut"
}

export enum CallbackEvent {
  EXECUTE = "execute",
  COMPLETE = "complete",
  TIMEOUT = "timeout"
}

export class CallbackWithTimeout {
  // Milliseconds to wait
  private timeoutPeriod: number;

  // Tracks the settimeout; so that we can clear the timeout
  private timeoutHandle: number | undefined = undefined;

  private callbackStatus: CallbackStatus = CallbackStatus.IDLE;

  constructor(timeoutPeriod: number) {
    if (timeoutPeriod > 0) {
      this.timeoutPeriod = timeoutPeriod;
      return;
    }

    throw new Error('CallbackWithTimeout requires timeout period higher than 0');
  }

  // This is a state machine to control the flow of execution.
  // IDLE -> RUNNING -> COMPLETED
  // IDLE -> RUNNING -> TIMEDOUT
  transitionCallbackStatus(currentStatus: CallbackStatus, event: CallbackEvent) {
    switch (currentStatus) {
      case CallbackStatus.IDLE:
      case CallbackStatus.TIMED_OUT:
      case CallbackStatus.COMPLETED:
        if (event === CallbackEvent.EXECUTE) {
          this.callbackStatus = CallbackStatus.RUNNING;
        }
        break;
      case CallbackStatus.RUNNING:
        switch(event) {
          case CallbackEvent.COMPLETE:
            this.callbackStatus = CallbackStatus.COMPLETED;
            break;
          case CallbackEvent.TIMEOUT:
            this.callbackStatus = CallbackStatus.TIMED_OUT;
            break;
        }
        break;
      default:
        this.callbackStatus = currentStatus;
    }
  }

  // Start a timeout. If this.callback(this._done) does not finish
  // by this.options.callbackTimeoutPeriod time period,
  // we will call done with a true value.
  executeCallbackWithTimeout(
    callback: CallbackFn,
    onDone: OnDoneFn,
    onTimeout: OnTimeoutFn
  ) {
    this.transitionCallbackStatus(this.callbackStatus, CallbackEvent.EXECUTE);

    // Setting timeout
    this.timeoutHandle = window.setTimeout(() => {
      this.transitionCallbackStatus(this.callbackStatus, CallbackEvent.TIMEOUT);
      onTimeout();
    }, this.timeoutPeriod);


    // Executing callback
    callback((err) => {
      this.cancelTimeout();

      if (this.getCallbackStatus() !== CallbackStatus.TIMED_OUT) {
        this.transitionCallbackStatus(this.callbackStatus, CallbackEvent.COMPLETE);
        onDone(err);
      }

    })
  }

  getCallbackStatus() {
    return this.callbackStatus;
  }

  // This allows us to cancel the timeout function, for example, if the callback finishes before the timeout period
  // or, if the user wants to manually cancel the timeout
  cancelTimeout() {
    if (this.timeoutPeriod > 0 && this.timeoutHandle) {
      window.clearTimeout(this.timeoutHandle);
      this.timeoutHandle = undefined;
    }
  }
}
