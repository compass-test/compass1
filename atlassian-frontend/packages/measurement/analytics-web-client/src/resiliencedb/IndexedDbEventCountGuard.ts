import {
  GuardPolicy,
  NAMESPACE_AND_TIME_ADDED_INDEX,
} from './constants';
import { AbandonWriteError } from './errors';
import {
  BulkAddItemResult,
  GetAllKeysRequestEvent,
  ItemWrapperType,
  Logger,
  ObjectCountRequestEvent,
} from './types';
import {
  commitTransaction,
  requestToPromise,
} from './util';


/**
 * A class to enforce a limit on the amount of Analytics Events stored in AWC IndexedDb.
 */
export default class IndexedDbEventCountGuard<T> {
  private eventLimit: number;
  private namespace: string;
  private logger: Logger;
  private deleteItemHandler: (objectStore: IDBObjectStore, id: IDBValidKey | IDBKeyRange) => Promise<void>;

  constructor(
    eventLimit: number,
    namespace: string,
    logger: Logger,
    deleteItemHandler: (objectStore: IDBObjectStore, id: IDBValidKey | IDBKeyRange) => Promise<void>
  ) {
    if (eventLimit > 0) {
      this.eventLimit = eventLimit;
    } else {
      throw Error('Event Limit has to be set higher than 1');
    }
    this.namespace = namespace;
    this.logger = logger;
    this.deleteItemHandler = deleteItemHandler;
  }

  /**
   * This function checks the number of events currently in AWC IndexedDB object store and if necessary,
   * will evict the oldest events in favour of the events we want to add.
   *
   * The indexed is treated as effectively: partitioned by product and sorted by timeAdded.
   *
   * This function can be re-used when the bulk add functionality is added in IndexedDbConnector.
   *
   * @param countOfEventsToAdd - The number of events we are proposing to add.
   */
  public async insertItems(
    objectStore: IDBObjectStore,
    items: ItemWrapperType<T>[],
    policy: GuardPolicy = GuardPolicy.ABANDON
  ): Promise<BulkAddItemResult<T>> {
    const itemsToAdd: ItemWrapperType<T>[] = [
      ...items
    ];

    let numberOfEvictedItems = 0;

    switch (policy) {
      case GuardPolicy.ABANDON:
        await this.throwIfNotEnoughSpace(objectStore, items.length);
        break;
      case GuardPolicy.EVICT:
        numberOfEvictedItems = await this.evictIfNotEnoughSpace(objectStore, items.length);
        break;
      case GuardPolicy.IGNORE:
        // Removed items from `itemsToAdd` if there is insufficient space
        await this.calculateHowManyEventsWeCanAdd(objectStore, itemsToAdd);
        break;
    }

    const promises = itemsToAdd.map(item =>
      requestToPromise(objectStore.add(item))
    );
    await Promise.all(promises);
    await commitTransaction(objectStore.transaction, this.logger);
    return {
      items: itemsToAdd,
      numberOfEvictedItems,
    }
  }

  private async throwIfNotEnoughSpace(objectStore: IDBObjectStore, requiredSpace: number) {
    const freeSpace = await this.calculateFreeSpace(objectStore);
    if (freeSpace < requiredSpace) {
      throw new AbandonWriteError(`Not enough space in IndexedDb. Needed ${requiredSpace} but only had ${freeSpace}`);
    }
  }

  private async evictIfNotEnoughSpace(objectStore: IDBObjectStore, requiredSpace: number): Promise<number> {
    const freeSpace = await this.calculateFreeSpace(objectStore);
    if (freeSpace < requiredSpace) {
      const extraSpace = requiredSpace - freeSpace;
      await this.deleteOldestNEvents(objectStore, extraSpace);
      return extraSpace;
    }
    return 0;
  }

  private async calculateHowManyEventsWeCanAdd(objectStore: IDBObjectStore, items: ItemWrapperType<T>[]) {
    const freeSpace = await this.calculateFreeSpace(objectStore);
    if (freeSpace < items.length) {
      const numberOfItemsToRemove = items.length - freeSpace;
      const start = items.length - numberOfItemsToRemove;
      items.splice(start, numberOfItemsToRemove);
    }
  }

  private async calculateFreeSpace(objectStore: IDBObjectStore): Promise<number> {
    const numberOfEventsInDb = await this.getCountofEventsInObjectStore(objectStore);
    return this.eventLimit - numberOfEventsInDb;
  }

  /**
   * This query returns the count of items held in AWC IndexedDB object store per product.
   */
  private async getCountofEventsInObjectStore(objectStore: IDBObjectStore): Promise<number> {
    const productTimeAddedIndex = objectStore.index(NAMESPACE_AND_TIME_ADDED_INDEX);
    const keyRangeValues = IDBKeyRange.bound([this.namespace, 0], [this.namespace, Date.now()])
    const request = productTimeAddedIndex.count(keyRangeValues);
    const event = await requestToPromise(request);
    return (event as ObjectCountRequestEvent).target.result;
  }


   /**
   * This query fetches the oldest events currently stored in AWC IndexedDb object store
   * and deletes them sequentially
   */
  public deleteOldestNEvents = async (objectStore:IDBObjectStore, count: number): Promise<void> => {
    const productTimeAddedIndex = objectStore.index(NAMESPACE_AND_TIME_ADDED_INDEX);
    const keyRangeValues = IDBKeyRange.bound([this.namespace, 0], [this.namespace, Date.now()])
    const getAllRequest: IDBRequest<IDBValidKey[]> = productTimeAddedIndex.getAllKeys(keyRangeValues, count);

    const event = await requestToPromise(getAllRequest);
    const result = (event as GetAllKeysRequestEvent)?.target?.result;

    // Adding extra safety
    if (result && Array.isArray(result) && result.length > 0) {
      try {
        const deletePromises = result.map((item: IDBValidKey)  => this.deleteItemHandler(objectStore, item));
        await Promise.all(deletePromises);
      } catch (error) {
        this.logger.warn('Failed to delete items from indexeddb.', error);
        throw error;
      }
    }
  }
}
