import { GuardPolicy, StoreType } from './constants';
import { AbandonWriteError } from './errors';
import {
  BulkAddItemResult,
  ItemWrapperType,
} from './types';

export default class MemoryDbEventCountGuard<T> {
  private eventLimit: number;
  private memoryStore: ItemWrapperType<T>[];

  constructor(eventLimit: number, memoryStore: ItemWrapperType<T>[]) {
    if (eventLimit > 0) {
      this.eventLimit = eventLimit;
    } else {
      throw Error('Event Limit has to be set higher than 1');
    }

    this.memoryStore = memoryStore;
  }

  /**
   * Unlike IndexedDb, we cannot take advantage of any index. So we are,
   * treating the memory store as a sorted set when adding items.
   */
  insertItemsToMemoryStore = (itemsToAdd: ItemWrapperType<T>[], policy: GuardPolicy): BulkAddItemResult<T> => {
    switch(policy) {
      case GuardPolicy.ABANDON:
        return this.handleAbandonIfLimitWillExceedPolicy(itemsToAdd);
      case GuardPolicy.EVICT:
        return this.handleEvictOldestIfLimitExceededPolicy(itemsToAdd);
      case GuardPolicy.IGNORE:
        return this.handleAddAsManyAsPossible(itemsToAdd);
    }
  }

  private handleAbandonIfLimitWillExceedPolicy(itemsToAdd: ItemWrapperType<T>[]): BulkAddItemResult<T> {
    if (this.memoryStore.length + itemsToAdd.length > this.eventLimit) {
      throw new AbandonWriteError(StoreType.MEMORY);
    }
    this.addItems(itemsToAdd);
    return {
      items: itemsToAdd,
      numberOfEvictedItems: 0,
    };
  }

  private handleEvictOldestIfLimitExceededPolicy(itemsToAdd: ItemWrapperType<T>[]): BulkAddItemResult<T> {
    this.addItems(itemsToAdd);
    const numberOfEvictedItems = this.evictEventsIfNeeded();
    return {
      items: itemsToAdd,
      numberOfEvictedItems,
    };
  }

  private handleAddAsManyAsPossible(itemsToAdd: ItemWrapperType<T>[]): BulkAddItemResult<T> {
    const freeSpace = this.eventLimit - this.memoryStore.length;
    const partialEventsToAdd = freeSpace > itemsToAdd.length ?
      itemsToAdd :
      itemsToAdd.slice(0, freeSpace);
    this.addItems(partialEventsToAdd);
    return {
      items: partialEventsToAdd,
      numberOfEvictedItems: 0,
    };
  }

  /**
   * This function is adding items to the tail of the memoryStore and as it adds new items it keeps the
   * memory store sorted by timeAdded property. This makes evictions easier and adding elements to
   * memoryStore much faster.
   *
   * @param itemsToAdd
   */
  private addItems(itemsToAdd: ItemWrapperType<T>[]) {
    this.memoryStore.push(...itemsToAdd);

    // Sorting everytime, intentionally.
    this.memoryStore.sort(function(a, b) {
      return a.timeAdded -  b.timeAdded
    })
  }

  /**
   * This function checks the number of events currently in AWC MemoryDb and if necessary,
   * will evict the oldest events in favour of the events we want to add.
   *
   * @param countOfEventsToAdd - The number of events we are proposing to add.
   */
  private evictEventsIfNeeded(): number {
    const numberOfEventsInDb = this.memoryStore.length;
    // The number of analytics events currently in MemoryDb and
    // the Z events we are proposing to add will exceed our event count limit.
    if (numberOfEventsInDb > this.eventLimit) {
      const m = numberOfEventsInDb - this.eventLimit;

      // Removing oldest M events
      this.memoryStore.splice(0, m)
      return m;
    }
    return 0;
  }
}
