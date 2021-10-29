export const NAMESPACE_AND_TIME_ADDED_INDEX = 'namespace-timeAdded';
export const RESILIENCE_DB_NAME = 'analytics-web-client';
export const RESILIENCE_STORE_NAME = 'analytics-resilience';
export const TIME_TO_PROCESS_AFTER_INDEX = 'timeToBeProcessedAfter';
export const TIME_ADDED_INDEX = 'timeAdded';
export const RETRY_INDEX = 'retryAttempts';

export const INDEXEDDB_TIMEOUT = 15000;

export enum StoreType {
  INDEXEDDB = 'indexeddb',
  MEMORY = 'memory',
}

// Used to describe how the ResilienceDb should react when there is insufficient storage space.
export enum GuardPolicy {
  // Adds as many items as possible and IGONRES the rest.
  // Only to be used with BulkAdd
  IGNORE = 'ignore',

  // ABANDON the request if not all items can be added.
  ABANDON = 'abandon',

  // EVICT old items to make room for new items if space is tight.
  EVICT = 'evict',
}
