
import {
  GuardPolicy,
  INDEXEDDB_TIMEOUT,
  NAMESPACE_AND_TIME_ADDED_INDEX,
  RESILIENCE_DB_NAME,
  RESILIENCE_STORE_NAME,
  RETRY_INDEX,
  StoreType,
  TIME_ADDED_INDEX,
  TIME_TO_PROCESS_AFTER_INDEX,
} from './constants';
import {
  GET_ITEM_COUNT,
  VISIBILITY_TIMEOUT
} from './defaults';
import {
  CallbackProcessingError,
  InvalidPolicyError,
  shouldIgnoreResilienceDbError,
} from './errors';
import IndexedDbEventCountGuard from './IndexedDbEventCountGuard';
import {
  AddItemResult,
  AddOptions,
  BulkAddItemResult,
  BulkAddOption,
  GetItemsResult,
  ItemWrapperType,
  Logger,
  ObjectCountRequestEvent,
  OpenCursorEvent,
  ProcessFnType,
  Resilience,
  ResilienceOptions,
} from './types';
import {
  commitTransaction,
  convertToItemWrapper,
  createOptionsWithDefaults,
  monitorErrorsOnRequest,
  requestToPromise,
} from './util';

/**
 * We have rolled our own client for IndexedDb as many Indexeddb libraries are
 * not flexible enough for our use case of:
 * 1. Adding specific indexes for time,
 * 2. Getting items on a specific index,
 * 3. Updating a field on an event while getting the event inside of a single ACID compliant transaction.
 */
export default class IndexedDbConnector<T> implements Resilience<T> {
  private db: Promise<IDBDatabase>;
  private logger: Logger;
  private globalEventLimitGuard: IndexedDbEventCountGuard<T>;
  private options: Required<ResilienceOptions>;
  private namespace: string;

  constructor(namespace: string, options: ResilienceOptions = {}) {
    this.options = createOptionsWithDefaults(options);
    this.namespace = namespace;
    this.logger = this.options.logger;
    if (!window.indexedDB) {
      this.logger.warn('Browser doesn\'t support a IndexedDB.');
      throw new Error('IndexedDB not supported');
    }
    this.db = this.startDB();

    /**
     *
     * This class will enforce the number of analytics events we can store in our IndexedDB object store
     * if asked before adding items to the object store.
     */
    this.globalEventLimitGuard = new IndexedDbEventCountGuard(
      this.options.maxEventLimit,
      this.namespace,
      this.logger,
      this.deleteItem,
    );
  }

  private startDB = async (): Promise<IDBDatabase> => {
    return new Promise(async (resolve, reject) => {

      window.setTimeout(
        () => reject(new Error('Failed to create Indexeddb connection in time.')),
        INDEXEDDB_TIMEOUT
      );

      /*
      * The database version number can never change.
      * An upgrade transaction is limited to only one connection to the database.
      * Once this is done, we cannot open any connections with older versions of the schema.
      * https://www.w3.org/TR/IndexedDB/#upgrade-transaction-construct
      *
      * Due to the nature of how AWC is used (multiple tabs that are very long lived),
      * we will not be able to run version upgrades via indexeddb.
      *
      * This does not mean we cant change what is stored in the tables,
      * this limitation just prevents us from:
      *   - Creating new ObjectStores in this database connection, and
      *   - Creating new indexes on our ObjectStores
      *
      * Any upgrades we wish to run in the future will have to create a new database,
      * and migrate all the data from older databases.
      *
      * This also means any migrations we make will have to be supported until we have evidence
      * that no events are coming from old versions of the database.
      * This may take a long time.
      */
      const request = window.indexedDB.open(RESILIENCE_DB_NAME, 1);
      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        if (event.oldVersion !== 0) {
          throw new Error('We cannot upgarde the database. Do not do this.');
        }
        const db: IDBDatabase = request.result;
        const store = db.createObjectStore(RESILIENCE_STORE_NAME, { keyPath: 'id' });
        store.createIndex(TIME_TO_PROCESS_AFTER_INDEX, TIME_TO_PROCESS_AFTER_INDEX, { unique: false });
        store.createIndex(RETRY_INDEX, RETRY_INDEX, { unique: false });
        store.createIndex(TIME_ADDED_INDEX, TIME_ADDED_INDEX, { unique: false });
        // Compound key index of product - timeAdded.
        store.createIndex(NAMESPACE_AND_TIME_ADDED_INDEX, ['namespace', 'timeAdded'], { unique: false });
      };

      try {
        await requestToPromise(request);
        return resolve(request.result);
      } catch (error) {
        this.logger.error('IndexedDB failed to initialise.', error);
        reject(new Error(`IndexedDB failed to initialise: ${error.message}`));
      }
    });
  }

  addItem = async(
    item: T,
    options: AddOptions = {},
    policy: GuardPolicy = GuardPolicy.ABANDON,
  ): Promise<AddItemResult<T>> => {
    const { logger, namespace } = this;
    const value: ItemWrapperType<T> = convertToItemWrapper(item, namespace, options);

    const { objectStore } = await this.getObjectStoreAndTransaction('readwrite');

    if (policy === GuardPolicy.IGNORE) {
      throw new InvalidPolicyError(policy, 'IndexedDbConnector#addItem');
    }

    try {
      if (!value.namespace || value.namespace.length === 0 || typeof value.namespace !== 'string') {
        throw new Error('Namespace not specified');
      }

      // Making space for 1 event, if required.
      const bulkAddResult = await this.globalEventLimitGuard.insertItems(objectStore, [value], policy);
      if (bulkAddResult.items.length === 1) {
        return {
          item: bulkAddResult.items[0],
          numberOfEvictedItems: bulkAddResult.numberOfEvictedItems
        }
      }
      // Should never happen as the Policy and EventCountGuard should cause another pathway
      throw new Error(`Incorrect number of items added. Expected: 1, got: ${bulkAddResult.items.length}`);
    } catch (error) {
      if (shouldIgnoreResilienceDbError(error)) {
        throw error;
      }
      logger.log('Failed to add item to table', error);
      throw new Error('Request to add item to table failed');
    }
  }

  bulkAddItem = async (itemOptions: BulkAddOption<T>[], policy: GuardPolicy = GuardPolicy.ABANDON): Promise<BulkAddItemResult<T>> => {
    const { logger, namespace } = this;
    const items: ItemWrapperType<T>[] = itemOptions.map(
      ({ item, ...options }) => convertToItemWrapper(item, namespace, options)
    );
    const { objectStore } = await this.getObjectStoreAndTransaction('readwrite');
    try {
      return await this.globalEventLimitGuard.insertItems(objectStore, items, policy);
    } catch (error) {
      if (shouldIgnoreResilienceDbError(error)) {
        throw error;
      }
      logger.log('Failed to add item to table', error);
      throw new Error('Request to add item to table failed');
    }
  }

  getItems = async (count: number = GET_ITEM_COUNT): Promise<GetItemsResult<T>> => {
    const fixedCount = count > 0 ? count : GET_ITEM_COUNT;
    const { logger } = this;
    const maxAttempts = this.options.maxAttempts;
    const { transaction, objectStore } = await this.getObjectStoreAndTransaction('readwrite');
    const timeIndex = objectStore.index(TIME_TO_PROCESS_AFTER_INDEX);
    const upperBoundOpenKeyRange = IDBKeyRange.upperBound(Date.now());

    const request = timeIndex.openCursor(upperBoundOpenKeyRange);

    const getResult = await new Promise<GetItemsResult<T>>(async (resolve, reject) => {
      const items: ItemWrapperType<T>[] = [];
      let numberOfDeletedItems = 0;
      request.onerror = (error) => {
        logger.error('Failed to open cursor:', error);
        reject('Failed to open cursor');
      };

      // Requests for Cursors call onsuccess multiple times and cannot be converted to promises
      request.onsuccess = (event) => {
        const cursor = (event as OpenCursorEvent<T>).target.result;
        if (cursor) {
          // Prevent mutation of the value we are returning
          const value: ItemWrapperType<T> ={
              ...cursor.value
          };
          items.push(value);

          // Mutations seem to be required for testing indexeddb library
          const updatedValue = cursor.value;
          updatedValue.retryAttempts += 1;
          updatedValue.timeToBeProcessedAfter = Date.now() + VISIBILITY_TIMEOUT;

          if (updatedValue.retryAttempts >= maxAttempts) {
            ++numberOfDeletedItems;
            const request = cursor.delete();
            monitorErrorsOnRequest(request, logger);
          } else {
            const request = cursor.update(updatedValue);
            monitorErrorsOnRequest(request, logger);
          }

          if (items.length < fixedCount) {
            cursor.continue();
          } else {
            resolve({
              items,
              numberOfDeletedItems,
            });
          }
        }
        else {
          resolve({
            items,
            numberOfDeletedItems,
          });
        }
      };
    });
    await commitTransaction(transaction, this.logger);
    return getResult;
  }

  deleteItems = async (itemIds: string[]): Promise<void> => {
    const { transaction, objectStore } = await this.getObjectStoreAndTransaction('readwrite');
    try {
      const deletePromises = itemIds.map(id => this.deleteItem(objectStore, id));
      await commitTransaction(transaction, this.logger);
      await Promise.all(deletePromises);
    } catch (error) {
      this.logger.warn('Failed to delete items from indexeddb.', error);
      throw error;
    }
  }

  getItemCount = async (): Promise<number> => {
    const { transaction, objectStore } = await this.getObjectStoreAndTransaction('readonly');
    const timeIndex = objectStore.index(TIME_TO_PROCESS_AFTER_INDEX);
    const upperBoundOpenKeyRange = IDBKeyRange.upperBound(Date.now());
    const request = timeIndex.count(upperBoundOpenKeyRange);
    const event = await requestToPromise(request);
    await commitTransaction(transaction, this.logger);
    return (event as ObjectCountRequestEvent).target.result;
  }

  processItems = async (processFn: ProcessFnType<T>, count: number = GET_ITEM_COUNT): Promise<void> => {
    const { items, ...partialResult } = await this.getItems(count);
    try {
      await processFn(items, partialResult);

      const itemIds = items.map(item => item.id);

      // We should not await this delete as a rejected promise would get caught by the catch statement
      return this.deleteItems(itemIds);
    } catch (error) {
      // Eventually we will need a intermediate class to catch all errors but we should ignore this error
      // This allows libraries beneath to distinguish between a success or failure in processing to update schedulers or anything else
      // To provide back off or any other mechanism to allow what ever is cauing the errors to recover
      throw new CallbackProcessingError(error);
    }
  }

  private deleteItem = async (objectStore: IDBObjectStore, id: IDBValidKey | IDBKeyRange): Promise<void> => {
    const { logger } = this;
    try {
      await requestToPromise(objectStore.delete(id));
    } catch(error) {
      logger.error('Failed to delete item:', id, error);
      throw error;
    }
  }

  private getObjectStoreAndTransaction = async (mode: IDBTransactionMode): Promise<{ transaction: IDBTransaction, objectStore: IDBObjectStore }> => {
    const transaction = (await this.db).transaction(RESILIENCE_STORE_NAME, mode);
    const objectStore = transaction.objectStore(RESILIENCE_STORE_NAME);
    return {
      transaction,
      objectStore
    };
  }

  public storeType(): StoreType {
    return StoreType.INDEXEDDB;
  }
}
