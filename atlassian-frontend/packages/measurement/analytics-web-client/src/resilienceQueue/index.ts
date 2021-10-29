import PullBatchableQueue from './PullBatchableQueue';
import PushBatchableQueue from './PushBatchableQueue';
import {
  BatchableQueue,
  BatchFlushCallback,
  Callback,
  ResilienceMechanism,
  RetryQueueOptions,
} from './types'

export type {
  BatchableQueue,
  BatchFlushCallback,
  Callback,
  RetryQueueOptions,
};

// Enum isnt just a type, its also an object that needs to be
// exported as an object.
export { ResilienceMechanism };

export default <T extends object>(
  retryQueuePrefix: string,
  product: string,
  options?: RetryQueueOptions
): BatchableQueue<T> => {
  switch (options?.resilienceMechanism) {
    case ResilienceMechanism.INDEXEDDB:
    case ResilienceMechanism.MEMORY:
      return new PullBatchableQueue(retryQueuePrefix, product, options);
    case ResilienceMechanism.LOCALSTORAGE:
    default:
      return new PushBatchableQueue(retryQueuePrefix, options);
  }
}
