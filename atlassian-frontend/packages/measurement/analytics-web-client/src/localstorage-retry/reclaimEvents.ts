import { v4 as uuid } from 'uuid';

import {
  InProgressLocalStorageItem,
  LocalStorageItem,
  LocalStorageKeySuffix,
  ReclaimCallback,
  ReclaimInternalOptions,
  ReclaimReturnState,
  StorageKeys,
  Timers,
} from './types';
import {
  createLocalStorageKeys
} from './utils';

// Code we need to mimic:
// https://github.com/segmentio/localstorage-retry/blob/master/lib/index.js#L262-L357
// Note we do not want to run this library due to the performance, duplication and memory leak issues.

type SingleReclaimResult = {
  fullReclaim: boolean,
};

const promisedSetTimeout = (msToWait: number) =>
  new Promise(resolve => {
    setTimeout(resolve, msToWait);
  });

const findOtherQueues = (queuePrefix: string): string[] =>
  Object.keys(localStorage)
    .filter(key => key.startsWith(queuePrefix))
    .map(key => key.split('.'))
    .filter(split => {
      if (
        split.length === 3 &&
        split[0] === queuePrefix &&
        split[2] === LocalStorageKeySuffix.ACK
      ) {
        try {
          const ackTimestamp = localStorage.getItem(split.join('.'));
          if (ackTimestamp) {
            const ackTimestampNumber = parseInt(ackTimestamp);
            return Timers.RECLAIM_TIMEOUT + ackTimestampNumber < Date.now();
          }
        } catch (error) {
          // ignore and drop value
        }
      }
      return false;
    })
    .map(split => split[1]);

const tryReclaim = async <T>(
  options: ReclaimInternalOptions,
  callback: ReclaimCallback<T>
): Promise<SingleReclaimResult> => {
  const { ack, reclaimStart, reclaimEnd } = options.storageKeys;

  const start = Date.now();
  localStorage.setItem(reclaimStart, options.reclaimProcessId);
  localStorage.setItem(ack, start.toString());

  await promisedSetTimeout(Timers.RECLAIM_WAIT);

  if (
    // Prevent duplicates when extracting events from localstorage due to CPU / Memory pressure on client
    Date.now() > (start + Timers.RECLAIM_WAIT_THRESHOLD) ||
    // Either the parent has caught up and removed our claim, or someone else started a claim instead
    localStorage.getItem(reclaimStart) !== options.reclaimProcessId
  ) {
    throw new Error('Took to long to callback, reclaim abandonded. After reclaimStart.');
  }
  localStorage.setItem(reclaimEnd, options.reclaimProcessId);

  await promisedSetTimeout(Timers.RECLAIM_WAIT);

  if (
    // Prevent duplicates when extracting events from localstorage due to CPU / Memory pressure on client
    Date.now() > start + Timers.RECLAIM_WAIT_THRESHOLD ||
    // Either the parent has caught up and removed our claim, or someone else started a claim instead
    localStorage.getItem(reclaimStart) !== options.reclaimProcessId ||
    localStorage.getItem(reclaimEnd) !== options.reclaimProcessId
  ) {
    throw new Error('Took to long to callback, reclaim abandonded. After reclaimEnd.');
  }
  return reclaim(options, callback);
};

const reclaim = async <T>(
  options: ReclaimInternalOptions,
  callback: ReclaimCallback<T>
): Promise<SingleReclaimResult> => {
  const {
    queue,
    inProgress,
  } = options.storageKeys;

  // Queue is an array of events while inProgress is an object with a uuid for key
  // Either of these queues may legitimately be missing.
  const eventsInQueue: LocalStorageItem<T>[] = JSON.parse(localStorage.getItem(queue) || '[]');
  const eventsInProgress: { [uuid: string]: InProgressLocalStorageItem<T> } = JSON.parse(localStorage.getItem(inProgress) || '{}');

  const arrayOfEventsInProgress = Object.entries(eventsInProgress).map(([ key, item ]) => {
    const itemWithId: LocalStorageItem<T> = {
      ...item,
      // LocalStorage-retry would add the attemptCounter after failure, rather than
      // as it was being processed
      attemptNumber: item.attemptNumber + 1,
      id: key,
    };
    return itemWithId;
  });
  const eventsToProcess = [...eventsInQueue, ...arrayOfEventsInProgress];
  if (eventsToProcess.length > 0) {
    const result = await callback(eventsToProcess);

    if (result.status === 'successful') {
      clearLocalStorageKeys(options.storageKeys);
    } else if (result.status === 'partial') {
      // Dont delete all events if we are only able to take some of them.
      const leftover = eventsToProcess.filter(event => !result.acceptedItemIds.includes(event.id));

      // This way around, we can almost ensure that we wont hit memory quota exceeded errors.
      // However, there is a very small chance that we may lose events if the process exits between these two commands.
      localStorage.removeItem(inProgress);
      localStorage.setItem(queue, JSON.stringify(leftover));
      return {
        fullReclaim: false,
      };
    }
  } else {
    clearLocalStorageKeys(options.storageKeys);
  }
  return {
    fullReclaim: true,
  };
};

// Exterminate
const clearLocalStorageKeys = (keys: StorageKeys) => {
  // Always good to do queue and inprogress first to reduce duplications
  // and to free up more space in localstorage
  localStorage.removeItem(keys.queue);
  localStorage.removeItem(keys.inProgress);
  localStorage.removeItem(keys.reclaimEnd);
  localStorage.removeItem(keys.reclaimStart);
  // This has to be last or we risk leaving things in localStorage that have to be purged
  localStorage.removeItem(keys.ack);
};

export default async <T>(queuePrefix: string, callback: ReclaimCallback<T>): Promise<ReclaimReturnState> => {
  if (typeof queuePrefix !== 'string' || queuePrefix.length === 0) {
    // We do not want to start deleting everything in localstorage
    return {
      fullReclaims: 0,
      partialReclaims: 0,
      failedReclaims: 0,
    };
  }
  const reclaimProcessId = uuid();
  const queuesToReclaim = findOtherQueues(queuePrefix);
  const claims = queuesToReclaim.map((id) =>
    tryReclaim({
      queuePrefix,
      reclaimProcessId,
      storageKeys: createLocalStorageKeys(queuePrefix, id),
    }, callback)
  );
  const settledClaims = await Promise.allSettled(claims);

  const failedReclaims = settledClaims.filter(
    (claim): claim is PromiseRejectedResult => claim.status === 'rejected'
  );
    // eslint-disable-next-line
  failedReclaims.forEach(claim => console.warn('Failed to purge queue due to ', claim.reason));

  const successfulClaims = settledClaims.filter(
    (settledValue): settledValue is PromiseFulfilledResult<SingleReclaimResult> => settledValue.status === 'fulfilled'
  ).map(result => result.value);
  const fullReclaims = successfulClaims.filter(claim => claim.fullReclaim);
  const partialReclaims = successfulClaims.filter(claim => !claim.fullReclaim);

  return {
    failedReclaims: failedReclaims.length,
    partialReclaims: partialReclaims.length,
    fullReclaims: fullReclaims.length,
  };
};
