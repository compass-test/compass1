import generateChance from '../../../__test__/util/chance';
import {
  GuardPolicy,
} from '../constants';
import MemoryDbEventCountGuard from '../MemoryDbEventCountGuard';
import {
  ItemWrapperType
} from '../types';

const chance = generateChance('MemoryDbEventCountGuard');

type TestItem = {
  id: string;
};

describe('MemoryDbEventCountGuard', () => {
  test('Should throw when event limit is provided below 1', () => {
    expect(() => new MemoryDbEventCountGuard(chance.integer({min: -100, max: -1}), [])).toThrow();
  });

  describe('MEMORY_DB_GUARD_POLICY.EVICT_OLDEST_IF_LIMIT_EXECEEDED policy', () => {
    const policy = GuardPolicy.EVICT;
    test('Can add events to memory store', () => {
      const memoryStore: ItemWrapperType<TestItem>[] = [];
      const guard = new MemoryDbEventCountGuard(10, memoryStore);
      const itemToAdd_1: ItemWrapperType<TestItem> = {
        id: chance.string(),
        namespace: chance.string(),
        retryAttempts: chance.integer({min: 0, max: 10}),
        item: {'id': chance.string()},
        timeToBeProcessedAfter: chance.integer({min: 0, max: 10}),
        timeAdded: chance.integer({min: 0, max: 10}),
      };

      const itemToAdd_2: ItemWrapperType<TestItem> = {
        id: chance.string(),
        namespace: chance.string(),
        retryAttempts: chance.integer({min: 0, max: 10}),
        item: {'id': chance.string()},
        timeToBeProcessedAfter: chance.integer({min: 0, max: 10}),
        timeAdded: chance.integer({min: 0, max: 10}),
      };

      guard.insertItemsToMemoryStore([itemToAdd_1], policy);
      guard.insertItemsToMemoryStore([itemToAdd_2], policy);
      expect(memoryStore.length).toEqual(2);
    });

    test('Can guard limits to memory store', () => {
      const memoryStore: ItemWrapperType<TestItem>[] = [];

      // Setting limit of 1 event in memory store
      const guard = new MemoryDbEventCountGuard(1, memoryStore);

      const itemToAdd_1: ItemWrapperType<TestItem> = {
        id: chance.string(),
        namespace: chance.string(),
        retryAttempts: chance.integer({min: 0, max: 10}),
        item: {'id': chance.string()},
        timeToBeProcessedAfter: chance.integer({min: 0, max: 10}),
        timeAdded: chance.integer({min: 0, max: 10}),
      };

      guard.insertItemsToMemoryStore([itemToAdd_1], policy);
      expect(memoryStore[0]).toEqual(itemToAdd_1);

      const itemToAdd_2: ItemWrapperType<TestItem> = {
        id: chance.string(),
        namespace: chance.string(),
        retryAttempts: chance.integer({min: 0, max: 10}),
        item: {'id': chance.string()},
        timeToBeProcessedAfter: chance.integer({min: 0, max: 10}),
        timeAdded: chance.integer({min: 11, max: 20}),
      };

      guard.insertItemsToMemoryStore([itemToAdd_2], policy);

      // Guard has been enforced. Keeping length to 1.
      expect(memoryStore.length).toEqual(1);
      // Guard also evicted the oldest item. itemToAdd_2 has a higher timeAdded than itemToAdd_1.
      expect(memoryStore[0]).toEqual(itemToAdd_2);
    });

    test('Guard will only evict items added with a later timeAdded', () => {
      const memoryStore: ItemWrapperType<TestItem>[] = [];

      const guard = new MemoryDbEventCountGuard(1, memoryStore);

      const itemToAdd_1: ItemWrapperType<TestItem> = {
        id: chance.string(),
        namespace: chance.string(),
        retryAttempts: chance.integer({min: 0, max: 10}),
        item: {'id': chance.string()},
        timeToBeProcessedAfter: chance.integer({min: 0, max: 10}),
        timeAdded: chance.integer({min: 11, max: 20}),
      };

      guard.insertItemsToMemoryStore([itemToAdd_1], policy);

      const itemToAdd_2: ItemWrapperType<TestItem> = {
        id: chance.string(),
        namespace: chance.string(),
        retryAttempts: chance.integer({min: 0, max: 10}),
        item: {'id': chance.string()},
        timeToBeProcessedAfter: chance.integer({min: 0, max: 10}),
        timeAdded: chance.integer({min: 1, max: 10}),
      };

      guard.insertItemsToMemoryStore([itemToAdd_2], policy);

      // Guard has been enforced. Keeping length to 1.
      expect(memoryStore.length).toEqual(1);
      // itemToAdd_2 has a lower timeAdded than itemToAdd_1 so did not evict.
      expect(memoryStore[0]).toEqual(itemToAdd_1);


      const itemToAdd_3: ItemWrapperType<TestItem> = {
        id: chance.string(),
        namespace: chance.string(),
        retryAttempts: chance.integer({min: 0, max: 10}),
        item: {'id': chance.string()},
        timeToBeProcessedAfter: chance.integer({min: 0, max: 10}),
        timeAdded: chance.integer({min: 21, max: 30}),
      };

      guard.insertItemsToMemoryStore([itemToAdd_3], policy);

      // Guard has been enforced. Keeping length to 1.
      expect(memoryStore.length).toEqual(1);
      // itemToAdd_2 has a lower timeAdded than itemToAdd_1 so did not evict.
      expect(memoryStore[0]).toEqual(itemToAdd_3);
    });
  });


  describe('MEMORY_DB_GUARD_POLICY.ABANDON_IF_LIMIT_WILL_EXECEED policy', () => {
    const policy = GuardPolicy.ABANDON;

    test('Can add events to memory store', () => {
      const memoryStore: ItemWrapperType<TestItem>[] = [];
      const guard = new MemoryDbEventCountGuard(10, memoryStore);
      const itemToAdd_1: ItemWrapperType<TestItem> = {
        id: chance.string(),
        namespace: chance.string(),
        retryAttempts: chance.integer({min: 0, max: 10}),
        item: {'id': chance.string()},
        timeToBeProcessedAfter: chance.integer({min: 0, max: 10}),
        timeAdded: chance.integer({min: 0, max: 10}),
      };

      const itemToAdd_2: ItemWrapperType<TestItem> = {
        id: chance.string(),
        namespace: chance.string(),
        retryAttempts: chance.integer({min: 0, max: 10}),
        item: {'id': chance.string()},
        timeToBeProcessedAfter: chance.integer({min: 0, max: 10}),
        timeAdded: chance.integer({min: 0, max: 10}),
      };

      guard.insertItemsToMemoryStore([itemToAdd_1], policy);
      guard.insertItemsToMemoryStore([itemToAdd_2], policy);
      expect(memoryStore.length).toEqual(2);
    });

    test('Can guard limits to memory store', () => {
      const memoryStore: ItemWrapperType<TestItem>[] = [];

      // Setting limit of 1 event in memory store
      const guard = new MemoryDbEventCountGuard(1, memoryStore);

      const itemToAdd_1: ItemWrapperType<TestItem> = {
        id: chance.string(),
        namespace: chance.string(),
        retryAttempts: chance.integer({min: 0, max: 10}),
        item: {'id': chance.string()},
        timeToBeProcessedAfter: chance.integer({min: 0, max: 10}),
        timeAdded: chance.integer({min: 0, max: 10}),
      };

      guard.insertItemsToMemoryStore([itemToAdd_1], policy);
      expect(memoryStore[0]).toEqual(itemToAdd_1);

      const itemToAdd_2: ItemWrapperType<TestItem> = {
        id: chance.string(),
        namespace: chance.string(),
        retryAttempts: chance.integer({min: 0, max: 10}),
        item: {'id': chance.string()},
        timeToBeProcessedAfter: chance.integer({min: 0, max: 10}),
        timeAdded: chance.integer({min: 11, max: 20}),
      };

      // Should throw AbandonWriteError
      expect(() => guard.insertItemsToMemoryStore([itemToAdd_2], policy)).toThrow('Event Limit reached. Abandoning write to: memory');

      // Guard has been enforced. Keeping length to 1.
      expect(memoryStore.length).toEqual(1);
      // Guard did not add second item, due to policy restriction.
      expect(memoryStore[0]).toEqual(itemToAdd_1);
    });
  });
});

