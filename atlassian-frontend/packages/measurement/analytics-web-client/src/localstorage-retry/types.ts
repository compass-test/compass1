

export type LocalStorageItem<T> = {
  id: string,
  item: T,
  attemptNumber: number,
  // Time to be processed after
  time: number,
};

export type InProgressLocalStorageItem<T> = {
  item: T,
  attemptNumber: number,
  // Time to be processed after
  time: number,
};

export type ReclaimCallback<T> = (items: LocalStorageItem<T>[]) => Promise<ReclaimStatus>;

export type ReclaimStatus = ReclaimStatusSuccessful | ReclaimStatusPartial;

export type ReclaimStatusSuccessful = {
  status: 'successful',
}

export type ReclaimStatusPartial = {
  status: 'partial',
  acceptedItemIds: string[],
}

export enum LocalStorageKeySuffix {
  IN_PROGRESS = 'inProgress',
  QUEUE = 'queue',
  RECLAIM_START = 'reclaimStart',
  RECLAIM_END = 'reclaimEnd',
  ACK = 'ack',
}

export enum Timers {
  RECLAIM_TIMEOUT = 10000,
  RECLAIM_WAIT = 500,
  RECLAIM_WAIT_THRESHOLD = 2000,
}

export type StorageKeys = {
  [key in LocalStorageKeySuffix]: string
};

export type ReclaimInternalOptions = {
  queuePrefix: string,
  reclaimProcessId: string,
  storageKeys: StorageKeys,
};

export type ReclaimReturnState = {
  failedReclaims: number,
  partialReclaims: number,
  fullReclaims: number,
};
