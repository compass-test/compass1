import { v4 as uuid } from 'uuid';

import {
  EVENT_COUNT_LIMIT,
  MAX_ATTEMPTS,
} from './defaults';
import {
  AddOptions,
  ItemWrapperType,
  Logger,
  ResilienceOptions,
  TransactionsWithCommit,
} from './types';

export const convertToItemWrapper = <T>(
  item: T,
  namespace: string,
  {
    id,
    retryAttempts,
    timeToProcessOffset,
  }: AddOptions
): ItemWrapperType<T> => ({
  item,
  id: id || uuid(),
  retryAttempts: retryAttempts || 0,
  timeToBeProcessedAfter: Date.now() + (timeToProcessOffset || 0),
  namespace,
  timeAdded: Date.now(),
});

export const createOptionsWithDefaults = (options: ResilienceOptions): Required<ResilienceOptions> => ({
  logger: options.logger || console,
  useMemory: options.useMemory || false,
  maxAttempts: options.maxAttempts || MAX_ATTEMPTS,
  // This is so that we can customise `maxEventLimit`, primarily for testing.
  maxEventLimit: options.maxEventLimit || EVENT_COUNT_LIMIT,
});

// Not to be used on cursors or other requests that may call onsuccess multiple times.
export const requestToPromise = (request: IDBRequest): Promise<Event> => {
  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
      resolve(event);
    };

    request.onerror = (event) => {
      reject(event);
    };
  })
}

export const transactionToPromise = (transaction: IDBTransaction): Promise<void> => {
  return new Promise((resolve, reject) => {

    // We will have to see how much cost there is to waiting for the transaction to complete in the real world.
    // In theory in some cases we could return as soon as the request is complete and
    // just monitor errors on transactions with the logger.

    // This maybe more of an issue in Safari and other older browsers where commit isnt available
    // and we would have to wait for the transaction to complete itself.
    transaction.oncomplete = () => {
      resolve();
    };

    transaction.onerror = (event) => {
      reject(event);
    };

    transaction.onabort = (event) => {
      reject(event);
    };
  })
}

// Not available on older browsers https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction/commit
export const commitTransaction = (transaction: TransactionsWithCommit, logger: Logger): Promise<void> => {
  try {
    if (typeof transaction.commit === 'function') {
      transaction.commit();
    }
  } catch (error) {
    logger.error('Failed to force commit transaction:', error);
    throw error;
  }
  return transactionToPromise(transaction);
}

  // For requests that are not mission critical
export const monitorErrorsOnRequest = (request: IDBRequest, logger: Logger): void => {
  request.onerror = (event) => {
    logger.warn('Error thrown from request:', event);
  };
}
