import { GuardPolicy, StoreType } from './constants';
import {
  GET_ITEM_COUNT,
  VISIBILITY_TIMEOUT,
} from './defaults';
import {
  CallbackProcessingError,
  InvalidPolicyError,
} from './errors';
import MemoryDbEventCountGuard from './MemoryDbEventCountGuard';
import {
  AddItemResult,
  AddOptions,
  BulkAddItemResult,
  BulkAddOption,
  GetItemsResult,
  ItemWrapperType,
  ProcessFnType,
  Resilience,
  ResilienceOptions,
} from './types';
import {
  convertToItemWrapper,
  createOptionsWithDefaults,
} from './util';

export default class MemoryDb<T> implements Resilience<T> {

  private memoryStore: ItemWrapperType<T>[];
  private options: Required<ResilienceOptions>;
  private globalEventLimitGuard: MemoryDbEventCountGuard<T>;
  private namespace: string;

  constructor(namespace: string,options: ResilienceOptions = {}) {
    this.namespace = namespace;
    this.memoryStore = [];
    this.options = createOptionsWithDefaults(options);
    /**
     * This class will enforce the number of analytics events we can store in our MemoryDb
     */
    this.globalEventLimitGuard = new MemoryDbEventCountGuard(
      this.options.maxEventLimit,
      this.memoryStore
    );
  }

  /**
   * This method is used mainly to write new events to MemoryDB and uses the MEMORY_DB_GUARD_POLICY.EVICT_OLDEST_IF_LIMIT_EXECEEDED policy
   * to removes oldest events when limit is reached.
   */
  addItem(
    item: T,
    options: AddOptions = {},
    policy: GuardPolicy = GuardPolicy.ABANDON
  ): Promise<AddItemResult<T>> {
    if (policy === GuardPolicy.IGNORE) {
      throw new InvalidPolicyError(policy, 'IndexedDbConnector#addItem');
    }
    const storedValue: ItemWrapperType<T> = convertToItemWrapper(item, this.namespace, options);
    // Delegated responsiblity to event limit guard to insert to memory stored
    const bulkAddItemsResult = this.globalEventLimitGuard.insertItemsToMemoryStore([storedValue], policy);
    return Promise.resolve({
      item: bulkAddItemsResult.items[0],
      numberOfEvictedItems: bulkAddItemsResult.numberOfEvictedItems,
    });
  }

  bulkAddItem(itemOptions: BulkAddOption<T>[], policy: GuardPolicy = GuardPolicy.ABANDON): Promise<BulkAddItemResult<T>> {
    const items: ItemWrapperType<T>[] = itemOptions.map(
      ({ item, ...addOptions }) => convertToItemWrapper(item, this.namespace, addOptions)
    );
    return this.bulkAddItemWrapperType(items, policy);
  }

  /**
   * This method is used mainly to write events to MemoryDB when unknown errors are thrown from IndexedDB.
   */
  bulkAddItemWrapperType(items: ItemWrapperType<T>[], policy: GuardPolicy = GuardPolicy.ABANDON): Promise<BulkAddItemResult<T>> {
    return Promise.resolve(this.globalEventLimitGuard.insertItemsToMemoryStore(items, policy));
  }

  getItems(count: number = GET_ITEM_COUNT): Promise<GetItemsResult<T>> {
    return Promise.resolve(this.synchronousGetItems(count));
  }

  private synchronousGetItems(count: number = GET_ITEM_COUNT): GetItemsResult<T> {
    const fixedCount = count > 0 ? count : GET_ITEM_COUNT;
    const now = Date.now();
    const wrappedItems: ItemWrapperType<T>[] = [];
    const itemsToRemove: ItemWrapperType<T>[] = [];

    for (let wrappedItem of this.memoryStore) {
      if (wrappedItem.timeToBeProcessedAfter <= now) {
        wrappedItems.push({
          ...wrappedItem
        });
        // Mutates the item in the memoryStore array, but not whats inside of wrappedItems
        wrappedItem.timeToBeProcessedAfter += VISIBILITY_TIMEOUT;
        wrappedItem.retryAttempts += 1;

        if (wrappedItem.retryAttempts >= this.options.maxAttempts) {
          itemsToRemove.push(wrappedItem);
        }
      }

      if (wrappedItems.length >= fixedCount) {
        break;
      }
    }

    itemsToRemove.forEach(item => {
      const index = this.memoryStore.indexOf(item);
      this.memoryStore.splice(index, 1);
    });

    return {
      items: wrappedItems,
      numberOfDeletedItems: itemsToRemove.length,
    };
  }

  deleteItems(itemIds: string[]): Promise<void> {
    this.memoryStore = this.memoryStore.filter(
      item => !itemIds.includes(item.id)
    );
    return Promise.resolve(void 0);
  }

  getItemCount(): Promise<number> {
    const now = Date.now();
    const count = this.memoryStore.filter(item => item.timeToBeProcessedAfter <= now).length;
    return Promise.resolve(count);
  }

  async processItems(processFn: ProcessFnType<T>, count?: number): Promise<void> {
    const { items, ...partialGetResult } = this.synchronousGetItems(count);
    const itemIds = items.map(i => i.id);
    try {
      await processFn(items, partialGetResult);
      return this.deleteItems(itemIds);
    } catch (error) {
      throw new CallbackProcessingError(error);
    }
  }

  public storeType(): StoreType {
    return StoreType.MEMORY;
  }
}
