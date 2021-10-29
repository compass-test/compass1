import {
  LocalStorageKeySuffix,
  StorageKeys,
} from './types';

export const createLocalStorageKeys = (queuePrefix: string, queueId: string): StorageKeys => ({
  [LocalStorageKeySuffix.ACK]: `${queuePrefix}.${queueId}.${LocalStorageKeySuffix.ACK}`,
  [LocalStorageKeySuffix.QUEUE]: `${queuePrefix}.${queueId}.${LocalStorageKeySuffix.QUEUE}`,
  [LocalStorageKeySuffix.IN_PROGRESS]: `${queuePrefix}.${queueId}.${LocalStorageKeySuffix.IN_PROGRESS}`,
  [LocalStorageKeySuffix.RECLAIM_START]: `${queuePrefix}.${queueId}.${LocalStorageKeySuffix.RECLAIM_START}`,
  [LocalStorageKeySuffix.RECLAIM_END]: `${queuePrefix}.${queueId}.${LocalStorageKeySuffix.RECLAIM_END}`,
});
