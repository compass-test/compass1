export enum ResilienceMechanism {
  LOCALSTORAGE = '@segment/localstorage-retry',
  INDEXEDDB = 'indexeddb',
  MEMORY = 'memory',
}

export interface BatchableQueue<T> {
  addItem(item: T): void;
  start(flushCallback: BatchFlushCallback<T>): void;
  stop(): void;

  getGlobalRetryCount(): number;
}

export type StrictRetryQueueOptions = {
  backoffFactor: number,
  backoffJitterPercentage: number,
  batchFlushSize: number,

  // To be deprecated for `flushWaitMs`
  flushBeforeUnload: boolean,

  flushWaitMs: number,
  maxAttempts: number,
  maxItems: number,
  maxRetryDelay: number,
  minRetryDelay: number,
  resilienceMechanism: ResilienceMechanism,
};

export type RetryQueueOptions = Partial<StrictRetryQueueOptions>;

export type Callback = (error: any, response: any) => void;

export type BatchFlushCallback<T> = (items: T[], callback: Callback) => void;

export enum NetworkStatusEnum {
  ONLINE,
  OFFLINE,
}

export type NetworkStatusChangeCallback = (state: NetworkStatusEnum) => void;
