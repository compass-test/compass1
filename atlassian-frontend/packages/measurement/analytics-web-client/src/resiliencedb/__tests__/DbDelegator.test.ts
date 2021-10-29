import 'fake-indexeddb/auto';

// @ts-ignore Types currently do not exist :( https://github.com/dumbmatter/fakeIndexedDB/issues/23
import FDBFactory from 'fake-indexeddb/lib/FDBFactory';

import generateChance from '../../../__test__/util/chance';
import { advanceBy, clear } from '../../../__test__/util/mockDateHelper';
import MockLogger from '../../../__test__/util/mockLogger';
import {
  GuardPolicy
} from '../constants';
import ResilienceDb from '../DbDelegator';
import * as defaults from '../defaults';
import {
  AbandonWriteErrorName,
  CallbackProcessingErrorName,
  InvalidPolicyErrorName,
} from '../errors';
import IndexedDbConnector from '../IndexedDbConnector';
import MemoryDb from '../MemoryDb';
import {
  BulkAddOption,
  Resilience,
  ResilienceOptions,
} from '../types';

type TestItem = {
  id: string;
};

const chance = generateChance('DbDelegator');

const testNameSpace = chance.string();

// There is no real way of sharing tests between files.
// During attempts, I either get errors saying:
//  - test file has no tests,
//  - file has devDependency imports, and
//  - (not an error but) tests ran when importing a test file
//
// Having one file that tests common functions between all resilience systems made the most sense
const runSharedTests = (resilienceGenerator: (productName: string, options?: ResilienceOptions) => Resilience<TestItem>, chance: Chance.Chance) => {

  beforeEach(() => {
    clear();
  });

  describe('getItems', () => {
    test('should store and retrieve item', async () => {
      const resilience = resilienceGenerator(testNameSpace);

      const item = {
        id: chance.string(),
      };

      const { item: actualItem } = await resilience.addItem(item);
      const { items: retrievedItems } = await resilience.getItems();

      expect(retrievedItems.length).toBe(1);
      expect(retrievedItems[0].item).toEqual(item);
      expect(retrievedItems[0].id).toEqual(actualItem.id);
      expect(retrievedItems[0].retryAttempts).toBe(0);
    });

    test('should retrieve many items', async () => {
      const resilience = resilienceGenerator(testNameSpace);
      const items: TestItem[] = [];
      const itemCount = chance.integer({ min: 8, max: 20 })
      for(let i = 0; i < itemCount; i++) {
        items.push({
            id: chance.string(),
          });
      }

      const addedItemsResults = await Promise.all(items.map(item => resilience.addItem(item)));
      const ids = addedItemsResults.map(result => result.item.id);
      const { items: retrievedItems } = await resilience.getItems(itemCount);

      expect(retrievedItems.length).toBe(itemCount);

      expect(retrievedItems.map(r => r.item)).toEqual(expect.arrayContaining(items));
      expect(retrievedItems.map(r => r.id)).toEqual(expect.arrayContaining(ids));
      expect(retrievedItems[0].retryAttempts).toBe(0);
    });

    test('should not be able to retrieve the same event on consecutive calls', async () => {
      const resilience = resilienceGenerator(testNameSpace);

      const item = {
        id: chance.string(),
      };
      await resilience.addItem(item);

      await resilience.getItems();
      const { items: consecutiveRetrievedItems } = await resilience.getItems();

      expect(consecutiveRetrievedItems.length).toBe(0);
    });

    test('should be able to retrieve the same event on subsequent calls after waiting for timeout', async () => {
      const resilience = resilienceGenerator(testNameSpace);

      const item = {
        id: chance.string(),
      };
      await resilience.addItem(item);

      await resilience.getItems();
      advanceBy(defaults.VISIBILITY_TIMEOUT);
      const { items: consecutiveRetrievedItems } = await resilience.getItems();

      expect(consecutiveRetrievedItems.length).toBe(1);
    });

    test('should increment retryAttempts on subsequent calls', async () => {
      const resilience = resilienceGenerator(testNameSpace);

      const item = {
        id: chance.string(),
      };
      await resilience.addItem(item);

      await resilience.getItems();
      advanceBy(defaults.VISIBILITY_TIMEOUT);
      const { items: consecutiveRetrievedItems } = await resilience.getItems();
      expect(consecutiveRetrievedItems[0].retryAttempts).toBe(1);

      advanceBy(defaults.VISIBILITY_TIMEOUT * 2);
      const { items: consecutiveRetrievedItems_2 } = await resilience.getItems();
      expect(consecutiveRetrievedItems_2[0].retryAttempts).toBe(2);
    });

    test('should return the default count when count of 0 or negative number is provided', async () => {
      const resilience = resilienceGenerator(testNameSpace);

      const count = chance.integer({ min: -20, max: 0 });

      const items: TestItem[] = [];

      for(let i = 0; i < 10; i++) {
        items.push({
            id: chance.string(),
          });
      }
      await Promise.all(items.map(item => resilience.addItem(item)));

      const { items: actualItems } = await resilience.getItems(count);
      expect(actualItems.length).toBe(7);
    });

    test('should delete events if they have been attempted more than maxAttempts', async () => {
      const maxAttempts = chance.integer({ min: 1, max: 5 });
      const resilience = resilienceGenerator(testNameSpace, { maxAttempts });

      const count = chance.integer({ min: 5, max: 20 });

      const items: TestItem[] = [];

      for (let i = 0; i < count; i++) {
        items.push({
            id: chance.string(),
          });
      }
      await Promise.all(items.map(item => resilience.addItem(item)));

      for (let i = 0; i < maxAttempts - 1; i++) {
        await resilience.getItems(count);
        advanceBy(defaults.VISIBILITY_TIMEOUT);
      }

      const getItemsResult = await resilience.getItems(count);
      expect(getItemsResult.numberOfDeletedItems).toBe(count);
      advanceBy(defaults.VISIBILITY_TIMEOUT);

      const { items: actualItems } = await resilience.getItems(count);
      expect(actualItems.length).toBe(0);
    });
  });

  describe('getItemCount', () => {
    test('should be able to count how many items are in resilience', async () => {
      const resilience = resilienceGenerator(testNameSpace);
      const items: TestItem[] = [];
      const expectedItemCount = chance.integer({ min: 8, max: 20 });
      for(let i = 0; i < expectedItemCount; i++) {
        items.push({
          id: chance.string(),
        });
      }

      await Promise.all(items.map(item => resilience.addItem(item)));

      const actualItemCount = await resilience.getItemCount();

      expect(actualItemCount).toBe(expectedItemCount);
    });

    test('should only count events that have not been fetched recently', async () => {
      const resilience = resilienceGenerator(testNameSpace);
      const items: TestItem[] = [];
      const totalItemCount = chance.integer({ min: 8, max: 20 });
      const getCount = chance.integer({ min: 1, max: totalItemCount });
      const expectedItemCount = totalItemCount - getCount;
      for(let i = 0; i < totalItemCount; i++) {
        items.push({
          id: chance.string(),
        });
      }

      await Promise.all(items.map(item => resilience.addItem(item)));
      await resilience.getItems(getCount);

      const actualItemCount = await resilience.getItemCount();

      expect(actualItemCount).toBe(expectedItemCount);
    });
  });

  describe('deleteItems', () => {
    test('should not return items that have been deleted', async () => {
      const resilience = resilienceGenerator(testNameSpace);

      const item = {
        id: chance.string(),
      };

      const { item: addedItem } = await resilience.addItem(item);
      await resilience.deleteItems([addedItem.id]);
      const { items: retrievedItems } = await resilience.getItems();

      expect(retrievedItems.length).toBe(0);
    });

    test('should not throw if delete is called on the same string twice', async () => {
      const resilience = resilienceGenerator(testNameSpace);

      const item = {
        id: chance.string(),
      };

      const { item: addedItem } = await resilience.addItem(item);
      expect(async () => {
        await resilience.deleteItems([addedItem.id]);
        await resilience.deleteItems([addedItem.id]);
      }).not.toThrow();
    });

    test('should allow partial deletes of items', async () => {
      const resilience = resilienceGenerator(testNameSpace);
      const items: TestItem[] = [];
      const totalItemCount = chance.integer({ min: 8, max: 20 });
      const deleteCount = chance.integer({ min: 1, max: totalItemCount });
      const expectedItemCount = totalItemCount - deleteCount;
      for(let i = 0; i < totalItemCount; i++) {
        items.push({
          id: chance.string(),
        });
      }

      const addResults = await Promise.all(items.map(item => resilience.addItem(item)));
      const ids = addResults.map(result => result.item.id);

      await resilience.deleteItems(ids.filter((id, index) => index < deleteCount));

      const actualItemCount = await resilience.getItemCount();
      expect(actualItemCount).toBe(expectedItemCount);
    });
  });

  describe('processItems', () => {
    test('should process and delete items', async () => {
      const resilience = resilienceGenerator(testNameSpace);
      const items: TestItem[] = [];
      const totalItemCount = chance.integer({ min: 8, max: 20 });
      const processCount = chance.integer({ min: 1, max: totalItemCount });
      const expectedItemCount = totalItemCount - processCount;
      for(let i = 0; i < totalItemCount; i++) {
        items.push({
          id: chance.string(),
        });
      }

      await Promise.all(items.map(item => resilience.addItem(item)));
      await resilience.processItems(async items => expect(items.length).toBe(processCount), processCount);

      const actualItemCount = await resilience.getItemCount();
      expect(actualItemCount).toBe(expectedItemCount);
    });

    test('should not throw if processFn promise rejects', async () => {
      const resilience = resilienceGenerator(testNameSpace);
      const items: TestItem[] = [];
      const totalItemCount = chance.integer({ min: 8, max: 20 });
      const processCount = chance.integer({ min: 1, max: totalItemCount });
      for(let i = 0; i < totalItemCount; i++) {
        items.push({
          id: chance.string(),
        });
      }

      await Promise.all(items.map(item => resilience.addItem(item)));
      const exceptionMessage = chance.string();
      try {
        await resilience.processItems(() => Promise.reject(exceptionMessage), processCount);
      } catch (error) {
        expect(error.name).toEqual(CallbackProcessingErrorName);
        expect(error.message).toEqual(`Error thrown while processing events in callback: ${exceptionMessage}`);
        return;
      }
      fail('Test needed to throw exception.');
    });

    test('should not delete items if processFn promise rejects', async () => {
      const resilience = resilienceGenerator(testNameSpace);
      const items: TestItem[] = [];
      const totalItemCount = chance.integer({ min: 8, max: 20 });
      const processCount = chance.integer({ min: 1, max: totalItemCount });
      const temporaryItemCount = totalItemCount - processCount;
      for(let i = 0; i < totalItemCount; i++) {
        items.push({
          id: chance.string(),
        });
      }

      await Promise.all(items.map(item => resilience.addItem(item)));

      try {
        await resilience.processItems(() => Promise.reject('Test should not throw'), processCount);
      } catch (error) {
        // Expected error to be thrown, this is checked in the above test
      }

      const actualTemporaryItemCount = await resilience.getItemCount();
      expect(actualTemporaryItemCount).toBe(temporaryItemCount);
      advanceBy(defaults.VISIBILITY_TIMEOUT);

      const actualItemCount = await resilience.getItemCount();
      expect(actualItemCount).toBe(totalItemCount);
    });

    test('should be able to be re-processed even if promise does not resolve', async () => {
      const resilience = resilienceGenerator(testNameSpace);
      const items: TestItem[] = [];
      const totalItemCount = chance.integer({ min: 8, max: 20 });
      const processCount = chance.integer({ min: 1, max: totalItemCount });
      const temporaryItemCount = totalItemCount - processCount;
      for(let i = 0; i < totalItemCount; i++) {
        items.push({
          id: chance.string(),
        });
      }

      await Promise.all(items.map(item => resilience.addItem(item)));
      // Dont await here as the promise will never resolve
      resilience.processItems(() => new Promise(() => {}), processCount);

      const actualTemporaryItemCount = await resilience.getItemCount();
      expect(actualTemporaryItemCount).toBe(temporaryItemCount);
      advanceBy(defaults.VISIBILITY_TIMEOUT);

      const actualItemCount = await resilience.getItemCount();
      expect(actualItemCount).toBe(totalItemCount);
    });
  });


  describe('addItem', () => {
    test('should return event', async () => {
      const itemId = chance.string();
      const item: TestItem = {
        id: chance.string(),
      };

      const resilience = resilienceGenerator(testNameSpace);
      const { item: actualItem } = await resilience.addItem(item, {
        id: itemId,
      });
      expect(actualItem.id).toEqual(itemId);
      expect(actualItem.item).toEqual(item);
    });

    describe('guardPolicy', () => {
      test('should evict events when limit reached and GuardPolicy is evict', async () => {
        const itemCount = chance.integer({ min: 8, max: 20 });
        const mockLimit = chance.integer({ min: 1, max: itemCount - 1 });

        const resilience = resilienceGenerator(testNameSpace, { maxEventLimit: mockLimit });
        const items: TestItem[] = [];

        for(let i = 0; i < itemCount; i++) {
          items.push({
            id: chance.string(),
          });
        }

        const addItemResults = await Promise.all(items.map(item => resilience.addItem(item, {}, GuardPolicy.EVICT)));
        const numberOfEvictedItems = addItemResults.reduce((acc, curr) => acc + curr.numberOfEvictedItems, 0);

        const { items: retrievedItems } = await resilience.getItems(itemCount);

        expect(retrievedItems.length).toBe(mockLimit);
        expect(numberOfEvictedItems).toBe(itemCount - mockLimit);
      });

      test('should throw error when limit reached and GuardPolicy is abandon', async () => {
        const itemCount = chance.integer({ min: 8, max: 20 });
        const mockLimit = chance.integer({ min: 1, max: itemCount - 1 });

        const resilience = resilienceGenerator(testNameSpace, { maxEventLimit: mockLimit });
        const items: TestItem[] = [];

        for(let i = 0; i < itemCount; i++) {
          items.push({
            id: chance.string(),
          });
        }

        try {
          await Promise.all(items.map(item => resilience.addItem(item, {}, GuardPolicy.ABANDON)));
          fail('Expected test to throw exception.');
        } catch (error) {
          expect(error.name).toBe(AbandonWriteErrorName);
        }
        const { items: retrievedItems } = await resilience.getItems(itemCount);
        expect(retrievedItems.length).toBe(mockLimit);
        expect(
          retrievedItems.map(wrapper => wrapper.item)
        ).toEqual(
          expect.arrayContaining(items.slice(0, mockLimit))
        );
      });

      test('should throw error when GuardPolicy is ignore', async () => {
        const resilience = resilienceGenerator(testNameSpace);
        const item: TestItem = {
          id: chance.string(),
        };

        try {
          await resilience.addItem(item, {}, GuardPolicy.IGNORE);
          fail('Expected test to throw exception.');
        } catch (error) {
          expect(error.name).toBe(InvalidPolicyErrorName);
        }
      });
    });
  });

  describe('bulkAddItems', () => {
    test('should be able to add many items at once', async () => {
      const resilience = resilienceGenerator(testNameSpace);

      const count = chance.integer({ min: 0, max: 20 });

      const items: BulkAddOption<any>[] = [];

      for(let i = 0; i < count; i++) {
        items.push({
          item: {
            id: chance.string(),
          }
        });
      }

      await resilience.bulkAddItem(items);

      await expect(resilience.getItemCount()).resolves.toEqual(count);
      const getResult = await resilience.getItems(count);
      const actualItems = getResult.items.map(itemWrapper => ({
        item: itemWrapper.item,
      }));
      expect(actualItems).toEqual(expect.arrayContaining(items));
    });

    test('should return event', async () => {
      const items: BulkAddOption<TestItem>[] = [];
      const count = chance.integer({ min: 0, max: 20 });

      for(let i = 0; i < count; i++) {
        items.push({
          id: chance.string(),
          item: {
            id: chance.string(),
          }
        });
      }

      const resilience = resilienceGenerator(testNameSpace);
      const bulkAddResult = await resilience.bulkAddItem(items);
      expect(
        bulkAddResult.items.map(itemWrapper => itemWrapper.item)
      ).toEqual(
        expect.arrayContaining(items.map(itemWrapper => itemWrapper.item))
      );
      expect(
        bulkAddResult.items.map(itemWrapper => itemWrapper.id)
      ).toEqual(
        expect.arrayContaining(items.map(itemWrapper => itemWrapper.id))
      );
    });

    describe('guardPolicy', () => {
      let itemCount: number;
      let mockLimit: number;
      let resilience: Resilience<TestItem>;
      let initialItems: BulkAddOption<TestItem>[];
      let followUpItems: BulkAddOption<TestItem>[];

      beforeEach(() => {
        itemCount = chance.integer({ min: 8, max: 20 });
        mockLimit = chance.integer({ min: itemCount + 1, max: Math.floor(itemCount * 1.5) });

        resilience = resilienceGenerator(testNameSpace, { maxEventLimit: mockLimit });
        initialItems = [];
        followUpItems = [];

        for(let i = 0; i < itemCount; i++) {
          initialItems.push({
            item: {
              id: chance.string(),
            }
          });
          followUpItems.push({
            item: {
              id: chance.string(),
            }
          });
        }
      });

      test('should evict events when limit reached and GuardPolicy is evict', async () => {
        // Will not exceed item limits
        await resilience.bulkAddItem(initialItems, GuardPolicy.EVICT);

        // Will exceed item limits
        const { items: itemIds, numberOfEvictedItems } = await resilience.bulkAddItem(followUpItems, GuardPolicy.EVICT);

        expect(itemIds.length).toEqual(followUpItems.length);

        const { items: retrievedItems } = await resilience.getItems(mockLimit * 2);
        expect(retrievedItems.length).toBe(mockLimit);
        expect(
          retrievedItems.map(wrapper => wrapper.item)
        ).toEqual(
          expect.arrayContaining(followUpItems.map(wrapper => wrapper.item))
        );
        expect(numberOfEvictedItems).toBe(itemCount * 2 - mockLimit)
      });

      test('should throw error when limit reached and GuardPolicy is abandon', async () => {
        // Will not exceed item limits
        await resilience.bulkAddItem(initialItems, GuardPolicy.ABANDON);

        try {
          // Will exceed item limits
          await resilience.bulkAddItem(followUpItems, GuardPolicy.ABANDON);
          fail('Expected test to throw exception.');
        } catch (error) {
          expect(error.name).toBe(AbandonWriteErrorName);
        }
        const { items: retrievedItems } = await resilience.getItems(itemCount * 2);
        expect(retrievedItems.length).toBe(initialItems.length);
        expect(
          retrievedItems.map(wrapper => wrapper.item)
        ).toEqual(
          expect.arrayContaining(initialItems.map(wrapper => wrapper.item))
        );
      });

      test('should not add items when limit reached and GuardPolicy is ignore', async () => {
        // Will not exceed item limits
        const { items: initialEventIds } = await resilience.bulkAddItem(initialItems, GuardPolicy.IGNORE);
        expect(initialEventIds.length).toEqual(initialItems.length);
        // Will exceed item limits
        const { items: addedEventIds } = await resilience.bulkAddItem(followUpItems, GuardPolicy.IGNORE);

        const expectedFreeSpaceBeforeFollowUpEvents = mockLimit - initialItems.length;

        expect(addedEventIds.length).toEqual(expectedFreeSpaceBeforeFollowUpEvents);

        const { items: retrievedItems } = await resilience.getItems(mockLimit * 2);
        expect(retrievedItems.length).toBe(mockLimit);
        expect(
          retrievedItems.map(wrapper => wrapper.item)
        ).toEqual(
          expect.arrayContaining(initialItems.map(wrapper => wrapper.item))
        );
      });
    });
  });

  test('should enforce event limit specified for multiple products', async () => {
    const product1 = chance.string();
    const product1ItemCount = chance.integer({ min: 8, max: 20 });
    const product1MockLimit = chance.integer({ min: 1, max: product1ItemCount - 1 });

    const resilienceWriter1 = resilienceGenerator(product1, { maxEventLimit: product1MockLimit});

    const product1Items: TestItem[] = [];

    for(let i = 0; i < product1ItemCount; i++) {
      product1Items.push({
        id: chance.string(),
      });
    }

    await Promise.all(product1Items.map(item => resilienceWriter1.addItem(item, {}, GuardPolicy.EVICT)))

    const { items: retrievedItemsForProduct1 } = await resilienceWriter1.getItems(product1ItemCount);
    expect(retrievedItemsForProduct1.length).toBe(product1MockLimit);

    const product2 = chance.string();
    const product2ItemCount = chance.integer({ min: 8, max: 20 });
    const product2MockLimit = chance.integer({ min: 1, max: product2ItemCount - 1 });
    const resilienceWriter2 = resilienceGenerator(product2, { maxEventLimit: product2MockLimit});

    const product2Items: TestItem[] = [];

    for(let i = 0; i < product2ItemCount; i++) {
      product2Items.push({
        id: chance.string(),
      });
    }

    await Promise.all(product2Items.map(item => resilienceWriter2.addItem(item, {}, GuardPolicy.EVICT)))

    const { items: retrievedItemsForProduct2 } = await resilienceWriter2.getItems(product2ItemCount);
    expect(retrievedItemsForProduct2.length).toBe(product2MockLimit);
  });
};

describe('IndexedDBConnector', () => {

  beforeEach(() => {
    // @ts-ignore Resets the database
    window.indexedDB = new FDBFactory();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should throw error when indexeddb times out', async () => {
    // @ts-ignore Return promise that never resolves
    jest.spyOn(window.indexedDB, 'open').mockReturnValue(new Promise(() => {}));
    const resilienceDB = new IndexedDbConnector<TestItem>(chance.string(), { logger: MockLogger });
    const getItemPromise = resilienceDB.getItemCount();
    jest.runOnlyPendingTimers();
    await expect(getItemPromise).rejects.toEqual(new Error('Failed to create Indexeddb connection in time.'));
  });

  test('should create IndexedDBConnector', () => {
    expect(() => new IndexedDbConnector<TestItem>(chance.string(), { logger: MockLogger })).not.toThrow();
  });

  test('should throw when indexeddb is not defined', () => {
    // @ts-ignore Resets the database
    window.indexedDB = undefined;
    expect(() => new IndexedDbConnector<TestItem>(chance.string(), { logger: MockLogger })).toThrow('IndexedDB not supported');
  });

  describe('via DbDelegator', () => {
    runSharedTests(
      (productName: string = chance.string(), options: ResilienceOptions = {}) => new ResilienceDb<TestItem>(productName, {
        ...options,
        logger: MockLogger
      }),
      chance
      );
  });
});

describe('MemoryDb', () => {

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should create MemoryDb', () => {
    expect(() => new MemoryDb<TestItem>(chance.string())).not.toThrow();
  });

  describe('via DbDelegator', () => {
    runSharedTests(
      (productName: string = chance.string(), options: ResilienceOptions = {}) => new ResilienceDb<TestItem>(productName, {
          ...options,
          useMemory: true,
          logger: MockLogger,
      }),
      chance
    );
  });
});
