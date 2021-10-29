import { GuardPolicy, StoreType } from './constants';

export type ProcessFnType<T> = (items: ItemWrapperType<T>[], otherMetadata: ProcessItemsMetadata) => Promise<void>;
export type ItemWrapperType<T> = {
  id: string,
  retryAttempts: number,
  item: T,
  timeToBeProcessedAfter: number,
  timeAdded: number,
  namespace: string,
};

export interface AddOptions {
  timeToProcessOffset?: number,
  id?: string,
  retryAttempts?: number,
}

export interface BulkAddOption<T> extends AddOptions {
  item: T,
}

export interface TransactionsWithCommit extends IDBTransaction {
  commit?: () => void;
}

export interface ResilienceOptions {
  useMemory?: boolean,
  maxAttempts?: number,
  logger?: Logger,
  maxEventLimit?: number,
}

export interface AddItemResult<T> extends PartialAddItemResult{
  item: ItemWrapperType<T>,
}

export interface BulkAddItemResult<T> extends PartialAddItemResult{
  items: ItemWrapperType<T>[],
}

interface PartialAddItemResult {
  numberOfEvictedItems: number,
}

/**
 * `numberOfDeletedItems` is the number of items that have been fetched in this request
 * that will not have another attempt to be retried.
 */
export interface GetItemsResult<T> extends ProcessItemsMetadata {
  items: ItemWrapperType<T>[],
}

export interface ProcessItemsMetadata {
  numberOfDeletedItems: number,
}

export interface Resilience<T> {

  /**
   * Adds an item to the resilience mechanism.
   *
   * Default policy: Abandon
   *
   * @param item Item to be stored
   * @returns Id of the item stored.
   */
  addItem(item: T, options?: AddOptions, policy?: GuardPolicy): Promise<AddItemResult<T>>;

  /**
   * Adds many items to the resilience mechanism.
   *
   * Default policy: Abandon
   *
   * @param item with any options
   * @returns Promise.
   */
  bulkAddItem(itemOptions: BulkAddOption<T>[], policy?: GuardPolicy): Promise<BulkAddItemResult<T>>;

  /**
   * Get items from the resilience mechanism.
   *
   * Note: This will increment the attempt number after resolving the promise.
   *
   * @param count [Default: 7] How many items to retrieve.
   */
  getItems(count?: number): Promise<GetItemsResult<T>>;

  /**
   * Deletes items from resilience storage
   * @param itemIds Array of itemIds to delete from resilience storage.
   */
  deleteItems(itemIds: string[]): Promise<void>;

  /**
   * How many items are immediately processable.
   *
   *  Future: Add options to get number of items for different conditions
   *      - Retry attempt number,
   *      - How old the item is,
   *      - If it is currently processable or not.
   *
   * @returns Count of items.
   */
  getItemCount(): Promise<number>;

  /**
   * Gets items from underlying resilience mechanism and processes them with processFn.
   * If processFn returns a resolved Promise, then the items will automatically be deleted.
   * @param processFn Function that takes array of wrapped items and returns a promise.
   * @param count [Default: 7] How many items to process at a time.
   */
  processItems(processFn: ProcessFnType<T>, count?: number): Promise<void>;


  /**
   * This is a utility method to detect which data store we are using, since we cannot check for types during runtime.
   */
  storeType(): StoreType;
}

export interface Logger {
  debug: (message?: any, ...optionalParams: any[]) => void;
  log: (message?: any, ...optionalParams: any[]) => void;
  warn: (message?: any, ...optionalParams: any[]) => void;
  error: (message?: any, ...optionalParams: any[]) => void;
}

export type OpenCursorEvent<T> = Event & {
  target: {
    result?: ExtendedCursor<T>;
  };
};

export type ObjectCountRequestEvent = Event & {
  target: {
    result: number;
  }
}

export type GetAllKeysRequestEvent = Event & {
  target: {
    result: IDBValidKey[];
  }
}

export type ExtendedCursor<T> = IDBCursor & {
  value: ItemWrapperType<T>
}
