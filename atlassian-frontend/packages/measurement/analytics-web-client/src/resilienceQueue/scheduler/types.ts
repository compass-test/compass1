// Clients can optionally provide the callbackTimeoutPeriod parameter
export type SchedulerOptions = {
  minRetryDelay: number,
  maxRetryDelay: number,
  backoffFactor: number,
  backoffJitterPercentage: number,
  waitInterval: number,
  callbackTimeoutPeriod: number
};

export type OnDoneFn = {
  (error?: unknown) : void
}

export type OnTimeoutFn = {
  () : void
}

export type CallbackFn = {
  (done: OnDoneFn) : void
}
