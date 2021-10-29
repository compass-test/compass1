import { LocalStorageKeySuffix } from './types';
import {
  createLocalStorageKeys
} from './utils';
// For more details on this funciton, see https://hello.atlassian.net/wiki/spaces/MEASURE/pages/585086028/Investigation+Local+storage+full
// TL;DR
// If a queue looses its `ack` key in localstorage, it will never get claimed.
// There is a small chance that this can happen.
// This function is to run through queues and clean any that have been orphaned.

// Keys stolen from https://github.com/segmentio/localstorage-retry/blob/master/lib/index.js#L55

const validSuffixs: string[] = Object.values(LocalStorageKeySuffix);

type QueueStates = {
  [queueId: string]: {
    [queueSuffix: string]: boolean,
  },
}

export default (prefix: string): number => {
  if (typeof prefix !== 'string' || prefix.length === 0) {
    // We do not want to start deleting everything in localstorage
    return 0;
  }

  try {
    const queueStates: QueueStates = Object.keys(localStorage)
      .filter((key): key is string => key && key.startsWith(`${prefix}.`) || false)
      .map(key => key.split('.'))
      .filter(
        splitKeys => splitKeys.length === 3 && validSuffixs.includes(splitKeys[2]),
      )
      .reduce((accumulator, currentKeys) => {
        const [, id, suffix] = currentKeys;
        if (accumulator[id] === undefined) {
          accumulator[id] = {};
        }
        accumulator[id][suffix] = true;
        return accumulator;
      }, {} as QueueStates);
    const queuesToPurge = Object.keys(queueStates)
    .filter((id) => queueStates[id][LocalStorageKeySuffix.ACK] !== true);
    queuesToPurge.forEach((id) => {
      const {
        queue,
        inProgress,
        reclaimStart,
        reclaimEnd,
      } = createLocalStorageKeys(prefix, id);
      localStorage.removeItem(inProgress);
      localStorage.removeItem(queue);
      localStorage.removeItem(reclaimStart);
      localStorage.removeItem(reclaimEnd);
    });
    return queuesToPurge.length;
  } catch (_error) {
    // Ignore errors from localStorage.
  }
  return 0;
};
