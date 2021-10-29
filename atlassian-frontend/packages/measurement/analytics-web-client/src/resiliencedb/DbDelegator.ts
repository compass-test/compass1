import {
  GuardPolicy,
  StoreType,
} from './constants';
import {
  shouldIgnoreResilienceDbError
} from './errors';
import IndexedDbConnector from './IndexedDbConnector';
import MemoryDb from './MemoryDb';
import {
  AddItemResult,
  AddOptions,
  BulkAddItemResult,
  BulkAddOption,
  GetItemsResult,
  ProcessFnType,
  Resilience,
  ResilienceOptions
} from './types';
import {
  createOptionsWithDefaults
} from './util';

export default class DbDelegator<T> implements Resilience<T> {

  private resilience: Resilience<T>;
  private options: Required<ResilienceOptions>;
  private namespace: string;

  constructor(namespace: string, options: ResilienceOptions = {}) {
    this.namespace = namespace;
    this.options = createOptionsWithDefaults(options);

    if (!namespace || namespace.length === 0 || typeof namespace !== 'string') {
      throw new Error('Invalid namespace provided');
    }

    this.resilience = this.getResilienceMechanism(namespace, options);
  }


  private getResilienceMechanism(namespace: string, options: ResilienceOptions): Resilience<T> {
    if (!options.useMemory) {
      try {
        return new IndexedDbConnector(namespace, options);
      } catch (error) {
        options.logger?.warn('Attempted to create IndexedDbResilience but failed. Using memory instead.');
      }
    }
    return new MemoryDb(this.namespace, options);
  }

  addItem(item: T, options?: AddOptions, policy: GuardPolicy = GuardPolicy.ABANDON): Promise<AddItemResult<T>> {
    return this.runOrFailOver(
      () => this.resilience.addItem(item, options, policy)
    );
  }

  bulkAddItem(itemOptions: BulkAddOption<T>[], policy: GuardPolicy = GuardPolicy.ABANDON): Promise<BulkAddItemResult<T>> {
    return this.runOrFailOver(
      () => this.resilience.bulkAddItem(itemOptions, policy)
    );
  }

  getItems(count?: number): Promise<GetItemsResult<T>> {
    return this.runOrFailOver(
      () => this.resilience.getItems(count)
    );
  }

  deleteItems(itemIds: string[]): Promise<void> {
    return this.runOrFailOver(
      () => this.resilience.deleteItems(itemIds)
    );
  }

  getItemCount(): Promise<number> {
    return this.runOrFailOver(
      () => this.resilience.getItemCount()
    );
  }

  processItems(processFn: ProcessFnType<T>, count?: number): Promise<void> {
    return this.runOrFailOver(
      () => this.resilience.processItems(processFn, count)
    );
  }

  storeType() {
    return this.resilience.storeType();
  }

  private async runOrFailOver<R>(runnable: () => Promise<R>): Promise<R> {
    try {
      return await runnable();
    } catch (error) {
      if (shouldIgnoreResilienceDbError(error)) {
        throw error;
      } else if (this.resilience.storeType() === StoreType.INDEXEDDB) {
        await this.failOver();
      }
      return runnable();
    }
  }

  private async failOver() {
    // Attempt to get any events we can and put them into memory
    const oldResilience = this.resilience;
    const newResilience = new MemoryDb<T>(this.namespace, this.options);
    this.resilience = newResilience;
    try {
      const { items } = await oldResilience.getItems(this.options.maxEventLimit);
      if (items.length > 0) {
        const bulkAddItemsResponse = await newResilience.bulkAddItemWrapperType(items, GuardPolicy.IGNORE);
        const addedItemIds = bulkAddItemsResponse.items.map(item => item.id);
        await oldResilience.deleteItems(addedItemIds);
      }
    } catch (error) {
      this.options.logger.warn('Unexpected error from ResilienceDb, switching to MemoryDb');
      // Dont need to catch. We are just getting events if we can
    }
  }
}
