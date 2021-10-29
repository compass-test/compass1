import generateChance from '../../../__test__/util/chance';
import {
  LocalStorageItem,
  purgeOrphanedQueues,
  reclaimEvents,
} from '../../localstorage-retry';
import MockResilienceQueue, { CallbackProcessingErrorName, GuardPolicy } from '../../resiliencedb';
import {
  BulkAddOption,
  ItemWrapperType,
  ProcessFnType,
  Resilience,
} from '../../resiliencedb/types';
import MockGetMetricsCollector from '../Metrics';
import MockNetworkStatus from '../NetworkStatus';
import PullBatchableQueue, { DEFAULT_POLLING_OPTIONS } from '../PullBatchableQueue';
import MockScheduler from '../scheduler';
import {
  BatchFlushCallback,
  NetworkStatusChangeCallback,
  NetworkStatusEnum,
  RetryQueueOptions,
} from '../types';

const chance = generateChance('PullBatchableQueue');

jest.mock('../scheduler');
jest.mock('../Metrics');
jest.mock('../../localstorage-retry');
jest.mock('../NetworkStatus');
jest.mock('../../resiliencedb', () => ({
  // @ts-ignore it is an object
  ...jest.requireActual('../../resiliencedb'),
  __esModule: true,
  default: jest.fn(),
  CallbackProcessingErrorName: 'CallbackProcessingErrorName',
}));

const createMockScheduler = () => ({
  schedule: jest.fn(),
  start: jest.fn(),
  stop: jest.fn(),
  getFailureCount: jest.fn(),
});

const createMockMetricsCollector = () => ({
  addToItemsDiscardedByRetryCounter: jest.fn(),
  addToDuplicateEventCounter: jest.fn(),
  addToEventCount: jest.fn(),
  addToLocalstorageDuplicateCount: jest.fn(),
  addToItemsDiscardedByOverflowCounter: jest.fn(),
  addToPurgedQueuesMetrics: jest.fn(),
  addToReclaimMetrics: jest.fn(),

  setResilienceMechanism: jest.fn(),
  subtractFromMetrics: jest.fn(),
  getMetricsPayload: jest.fn(),
});

describe('PullBatchableQueue', () => {

  let returnError: string | null;
  let returnSuccess: string | null;

  let mockResilienceDB: Resilience<any>;

  let mockScheduler: ReturnType<typeof createMockScheduler>;
  let mockLongPollingScheduler: ReturnType<typeof createMockScheduler>;
  let mockMetricsCollector: ReturnType<typeof createMockMetricsCollector>;

  let batchFn: BatchFlushCallback<any> & jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers();

    mockResilienceDB = {
      getItems: jest.fn(),
      addItem: jest.fn().mockImplementation(item => ({
        numberOfEvictedItems: 0,
        item,
      })),
      bulkAddItem: jest.fn(),
      deleteItems: jest.fn(),
      processItems: jest.fn(),
      getItemCount: jest.fn(),
      storeType: jest.fn(),
    };

    (reclaimEvents as jest.Mock).mockResolvedValue({
      attemptedReclaims: 0,
      partialReclaims: 0,
      fullReclaims: 0,
    });

    mockScheduler = createMockScheduler();
    mockLongPollingScheduler = createMockScheduler();

    mockMetricsCollector = createMockMetricsCollector();
    (MockGetMetricsCollector as jest.Mock).mockReturnValue(mockMetricsCollector);

    batchFn = jest.fn((items: any, callback: any) => {
      callback(returnError, returnSuccess);
    });

    (MockResilienceQueue as jest.Mock).mockImplementation(() => mockResilienceDB);

    (MockScheduler as jest.Mock).mockImplementationOnce(() => mockScheduler)
      .mockImplementationOnce(() => mockLongPollingScheduler);
  });

  describe('constructor', () => {

    test('should pass waitInterval 0 if flushBeforeUnload is true', () => {
      const queuePrefix = chance.string();
      new PullBatchableQueue(
        queuePrefix,
        chance.string(),
        {
          flushBeforeUnload: true,
        }
      );
      expect(MockScheduler).toHaveBeenCalledTimes(2);
      expect(MockScheduler).toHaveBeenCalledWith({
        ...DEFAULT_POLLING_OPTIONS,
        flushBeforeUnload: true,
        waitInterval: 0,
      }, expect.anything());
    });
  });

  describe('instance', () => {

    let mockNetworkStatus: MockNetworkStatus;

    let pullBatchQueue: PullBatchableQueue<any>;
    let queuePrefix: string;

    let options: RetryQueueOptions & { batchFlushSize: number };

    let schedulerCallback: Function;
    let longPollingSchedulerCallback: Function;

    beforeEach(() => {
      options = {
        batchFlushSize: chance.integer({ min: 10, max: 20 }),
      };

      queuePrefix = chance.string();
      pullBatchQueue = new PullBatchableQueue(queuePrefix, chance.string(), options);
      pullBatchQueue.start(batchFn);

      schedulerCallback = (MockScheduler as jest.Mock).mock.calls[0][1];
      longPollingSchedulerCallback = (MockScheduler as jest.Mock).mock.calls[1][1];

      mockNetworkStatus = (MockNetworkStatus as jest.Mock).mock.instances[0];
      (mockNetworkStatus.getNetworkStatus as jest.Mock).mockReturnValue(NetworkStatusEnum.ONLINE);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    test('when start is called, then call longPollingScheduler#schedule', () => {
      expect(mockLongPollingScheduler.schedule).toHaveBeenCalledTimes(1);
    });

    test('when stop is called, then call stop on both schedulers', () => {
      expect(mockScheduler.stop).not.toHaveBeenCalled();
      expect(mockLongPollingScheduler.stop).not.toHaveBeenCalled();
      pullBatchQueue.stop();
      expect(mockScheduler.stop).toHaveBeenCalledTimes(1);
      expect(mockLongPollingScheduler.stop).toHaveBeenCalledTimes(1);
    });

    test('purgeOrphanedQueues is called', async () => {
      (purgeOrphanedQueues as jest.Mock).mockReturnValue(5);
      const done = jest.fn();
      await longPollingSchedulerCallback(done);
      expect(purgeOrphanedQueues).toHaveBeenCalledTimes(1);
      expect(purgeOrphanedQueues).toHaveBeenCalledWith(queuePrefix);
      expect(mockMetricsCollector.addToPurgedQueuesMetrics).toHaveBeenCalledTimes(1);
      expect(mockMetricsCollector.addToPurgedQueuesMetrics).toHaveBeenCalledWith(5);
    });

    test('when addItem is called, then add to resilience mechansim and schedule', async () => {
      const item = {
        hello: 'world',
      };
      await pullBatchQueue.addItem(item);
      expect(mockResilienceDB.addItem).toHaveBeenCalledTimes(1);
      expect(mockResilienceDB.addItem).toHaveBeenCalledWith(item, {}, GuardPolicy.EVICT);
      expect(mockScheduler.schedule).toBeCalledTimes(1);
      expect(mockMetricsCollector.addToEventCount).toHaveBeenCalledTimes(1);
    });

    test('when addItem is called, and an item is evicted, record as metrics', async () => {
      (mockResilienceDB.addItem as jest.Mock).mockImplementation(item => ({
        item,
        numberOfEvictedItems: 8,
      }));
      const item = {
        hello: 'world',
      };
      await pullBatchQueue.addItem(item);
      expect(mockMetricsCollector.addToItemsDiscardedByOverflowCounter).toHaveBeenCalledTimes(1);
      expect(mockMetricsCollector.addToItemsDiscardedByOverflowCounter).toHaveBeenCalledWith(8);
    });

    test('when getGlobalRetryCount is called, then return value from Scheduler', () => {
      const failureCount = 8;
      mockScheduler.getFailureCount.mockReturnValue(failureCount);

      expect(pullBatchQueue.getGlobalRetryCount()).toEqual(failureCount);
      expect(mockScheduler.getFailureCount).toHaveBeenCalledTimes(1);
    });

    describe('when longPollingSchedulerCallback is called', () => {
      test('and events are not in the queue, then reschedule', async () => {
        (mockResilienceDB.getItemCount as jest.Mock).mockResolvedValue(0);
        const done = jest.fn();
        await longPollingSchedulerCallback(done);
        expect(done).toHaveBeenCalledTimes(1);
        expect(mockScheduler.schedule).not.toHaveBeenCalled();
        // Once for start, twice for callback
        expect(mockLongPollingScheduler.schedule).toHaveBeenCalledTimes(2);
      });

      test('and a few events are in the queue, then reschedule', async () => {
        const itemCount = chance.integer({ min: 1, max: options.batchFlushSize - 1});
        (mockResilienceDB.getItemCount as jest.Mock).mockResolvedValue(itemCount);
        const done = jest.fn();
        await longPollingSchedulerCallback(done);
        expect(done).toHaveBeenCalledTimes(1);
        expect(mockScheduler.schedule).toHaveBeenCalledTimes(1);
        expect(mockScheduler.schedule).toHaveBeenCalledWith({ immediate: false });
        // Once for start, twice for callback
        expect(mockLongPollingScheduler.schedule).toHaveBeenCalledTimes(2);
      });

      test('and a many events are in the queue, then reschedule immediately', async () => {
        const itemCount = chance.integer({ min: options.batchFlushSize, max: options.batchFlushSize * 5 });
        (mockResilienceDB.getItemCount as jest.Mock).mockResolvedValue(itemCount);
        const done = jest.fn();
        await longPollingSchedulerCallback(done);
        expect(done).toHaveBeenCalledTimes(1);
        expect(mockScheduler.schedule).toHaveBeenCalledTimes(1);
        expect(mockScheduler.schedule).toHaveBeenCalledWith({ immediate: true });
        // Once for start, twice for callback
        expect(mockLongPollingScheduler.schedule).toHaveBeenCalledTimes(2);
      });

      test('purgeOrphanedQueues is called', async () => {
        const done = jest.fn();
        await longPollingSchedulerCallback(done);
        expect(purgeOrphanedQueues).toHaveBeenCalledTimes(1);
        expect(purgeOrphanedQueues).toHaveBeenCalledWith(queuePrefix);
      });

      describe('reclaimEvents', () => {

        let items: LocalStorageItem<any>[];
        let resilienceDbItems: BulkAddOption<any>[];

        beforeEach(() => {
          const itemCount = chance.integer({ min: 2, max: 20 });
          items = [];
          resilienceDbItems = [];
          for (let i = 0; i < itemCount; i++) {
            const id = chance.string();
            const attemptNumber = chance.integer({ min: 0, max: 6 });
            const time = chance.timestamp();
            items.push({
              id,
              time,
              attemptNumber,
              item: {},
            });
            resilienceDbItems.push({
              id,
              retryAttempts: attemptNumber,
              item: {},
            });
          }
        });

        test('when fully clearing a queue', async () => {
          (mockResilienceDB.bulkAddItem as jest.Mock).mockResolvedValue({
            items,
            numberOfEvictedItems: 0,
          });
          const done = jest.fn();
          // Since reclaim is mocked and instantly returning, this is fine.
          // Otherwise we would have to remove await.
          await longPollingSchedulerCallback(done);

          expect(reclaimEvents).toHaveBeenCalledTimes(1);
          expect(reclaimEvents).toHaveBeenCalledWith(queuePrefix, expect.anything());
          const reclaimCallback = (reclaimEvents as jest.Mock).mock.calls[0][1];

          const result = await reclaimCallback(items);

          expect(mockResilienceDB.bulkAddItem).toHaveBeenCalledTimes(1);
          expect(mockResilienceDB.bulkAddItem).toHaveBeenCalledWith(resilienceDbItems, GuardPolicy.IGNORE);

          expect(result).toEqual({
            status: 'successful',
          });
        });

        test('when partially clearing a queue', async () => {
          const processedItems = items.filter((_value, index) =>
            // Always keep the first element to atleast have 1 item processed
            index === 0 ||
            // Always throw the second element to atleast force a partial
            (index !== 1 && chance.bool())
          );

          (mockResilienceDB.bulkAddItem as jest.Mock).mockResolvedValue({
            items: processedItems,
            numberOfEvictedItems: 0,
          });
          const done = jest.fn();
          // Since reclaim is mocked and instantly returning, this is fine.
          // Otherwise we would have to remove await.
          await longPollingSchedulerCallback(done);

          expect(reclaimEvents).toHaveBeenCalledTimes(1);
          expect(reclaimEvents).toHaveBeenCalledWith(queuePrefix, expect.anything());
          const reclaimCallback = (reclaimEvents as jest.Mock).mock.calls[0][1];

          const result = await reclaimCallback(items);

          expect(mockResilienceDB.bulkAddItem).toHaveBeenCalledTimes(1);
          expect(mockResilienceDB.bulkAddItem).toHaveBeenCalledWith(resilienceDbItems, GuardPolicy.IGNORE);

          expect(result).toEqual({
            status: 'partial',
            acceptedItemIds: processedItems.map(item => item.id),
          });
        });
      });

      test('should record metrics', async () => {
        const reclaimMetrics = {
          fullReclaims: 10,
          partialReclaims: 12,
          failedReclaims: 14,
        };
        (reclaimEvents as jest.Mock).mockResolvedValue(reclaimMetrics);
        await longPollingSchedulerCallback(jest.fn());

        expect(mockMetricsCollector.addToReclaimMetrics).toHaveBeenCalledTimes(1);
        expect(mockMetricsCollector.addToReclaimMetrics).toHaveBeenCalledWith(reclaimMetrics);
      });
    });

    describe('when scheduledCallback is called', () => {

      beforeEach(() => {
        (mockResilienceDB.processItems as jest.Mock).mockResolvedValue(void 0);
      });

      test('then calls processItems and doneCallback', async () => {
        (mockResilienceDB.getItemCount as jest.Mock).mockResolvedValue(0);
        const done = jest.fn();
        await schedulerCallback(done);
        expect(done).toHaveBeenCalledTimes(1);
        expect(mockResilienceDB.processItems).toHaveBeenCalledTimes(1);
        expect((mockResilienceDB.processItems as jest.Mock).mock.calls[0][1]).toEqual(options.batchFlushSize);
        expect(mockResilienceDB.getItemCount).toHaveBeenCalledTimes(1);
        expect(mockScheduler.schedule).not.toHaveBeenCalled();
      });

      test('then calls processItems, doneCallback and reschedules', async () => {
        const items = chance.integer({ min: 1, max: options.batchFlushSize - 1});
        (mockResilienceDB.getItemCount as jest.Mock).mockResolvedValue(items);
        const done = jest.fn();
        await schedulerCallback(done);
        expect(done).toHaveBeenCalledTimes(1);
        expect(mockScheduler.schedule).toHaveBeenCalledTimes(1);
        expect(mockScheduler.schedule).toHaveBeenCalledWith({ immediate: false });
      });

      test('then calls processItems, doneCallback and reschedules immediately', async () => {
        const items = chance.integer({ min: options.batchFlushSize, max: options.batchFlushSize * 4});
        (mockResilienceDB.getItemCount as jest.Mock).mockResolvedValue(items);
        const done = jest.fn();
        await schedulerCallback(done);
        expect(done).toHaveBeenCalledTimes(1);
        expect(mockScheduler.schedule).toHaveBeenCalledTimes(1);
        expect(mockScheduler.schedule).toHaveBeenCalledWith({ immediate: true });
      });

      test('and processItems rejects then does not throw', async () => {
        const rejectedValue = {
          name: CallbackProcessingErrorName,
          message: chance.string(),
        };
        (mockResilienceDB.processItems as jest.Mock).mockRejectedValue(rejectedValue);
        const items = chance.integer({ min: 1, max: options.batchFlushSize - 1});
        (mockResilienceDB.getItemCount as jest.Mock).mockResolvedValue(items);
        const done = jest.fn();
        await schedulerCallback(done);
        expect(done).toHaveBeenCalledTimes(1);
        expect(done).toHaveBeenCalledWith(rejectedValue);
        expect(mockScheduler.schedule).toHaveBeenCalledTimes(1);
        expect(mockScheduler.schedule).toHaveBeenCalledWith({ immediate: false });
      });
    });

    describe('when flush is called', () => {
      let flushCallback: ProcessFnType<any>;

      beforeEach(async () => {
        const done = jest.fn();
        (mockResilienceDB.processItems as jest.Mock).mockResolvedValue(void 0);
        await schedulerCallback(done);
        flushCallback = (mockResilienceDB.processItems as jest.Mock).mock.calls[0][0];
      });

      test('and no events are provided, then resolves', async () => {
        await expect(flushCallback([], { numberOfDeletedItems: 0, })).resolves.toBeUndefined();
        expect(batchFn).not.toHaveBeenCalled();
      });

      test('and events are provided, then calls batchFn and resolves on done', async () => {
        const item = {
          test: chance.string(),
        };
        const wrappedItem: ItemWrapperType<any> = {
          id: chance.string(),
          namespace: chance.string(),
          retryAttempts: chance.integer({ min: 0, max: 10 }),
          timeToBeProcessedAfter: Date.now(),
          item,
          timeAdded: Date.now(),
        };
        batchFn.mockImplementation((_, done) => done());
        await expect(flushCallback([wrappedItem], { numberOfDeletedItems: 0 })).resolves.toBeUndefined();
        expect(batchFn).toHaveBeenCalledTimes(1);
        expect(batchFn.mock.calls[0][0]).toEqual([item]);
      });

      test('and events are provided, then calls batchFn and rejects on done with arg', async () => {
        const item = {
          test: chance.string(),
        };
        const wrappedItem: ItemWrapperType<any> = {
          id: chance.string(),
          namespace: chance.string(),
          retryAttempts: chance.integer({ min: 0, max: 10 }),
          timeToBeProcessedAfter: Date.now(),
          item,
          timeAdded: Date.now(),
        };
        const rejectedValue = chance.string();
        batchFn.mockImplementation((_, done) => done(rejectedValue));
        await expect(flushCallback([wrappedItem], { numberOfDeletedItems: 0 })).rejects.toEqual(rejectedValue);
      });

      test('should set resilienceMechanism', async () => {
        const resilienceMechanism = 'indexeddb';
        (mockResilienceDB.storeType as jest.Mock).mockReturnValue(resilienceMechanism);
        await flushCallback([], { numberOfDeletedItems: 0 });
        expect(mockMetricsCollector.setResilienceMechanism).toHaveBeenCalledTimes(1);
        expect(mockMetricsCollector.setResilienceMechanism).toHaveBeenCalledWith(resilienceMechanism);
      });

      test('should update number of deleted items after failed attempt', async () => {
        const rejectedValue = chance.string();
        const wrappedItem: ItemWrapperType<any> = {
          id: chance.string(),
          namespace: chance.string(),
          retryAttempts: chance.integer({ min: 0, max: 10 }),
          timeToBeProcessedAfter: Date.now(),
          item: {},
          timeAdded: Date.now(),
        };
        batchFn.mockImplementation((_, done) => done(rejectedValue));
        try {
          await flushCallback([wrappedItem], { numberOfDeletedItems: 42 });
          fail('Expected flushCallback to throw');
        } catch (error) { }
        expect(mockMetricsCollector.addToItemsDiscardedByRetryCounter).toHaveBeenCalledTimes(1);
        expect(mockMetricsCollector.addToItemsDiscardedByRetryCounter).toHaveBeenCalledWith(42);
      });
    });

    describe('when networkStatus changes', () => {
      let networkChangeCallback: NetworkStatusChangeCallback;

      beforeEach(() => {
        networkChangeCallback = (MockNetworkStatus as jest.Mock).mock.calls[0][0];
      });

      test('callback should stop the scheduler when going offline', () => {
        networkChangeCallback(NetworkStatusEnum.OFFLINE);
        expect(mockScheduler.stop).toHaveBeenCalledTimes(1);
      });

      test('callback should restart the scheduler when going online', async () => {
        (mockResilienceDB.getItemCount as jest.Mock).mockResolvedValue(80);
        networkChangeCallback(NetworkStatusEnum.ONLINE);
        // Wait for promise for getItemCount
        await new Promise(resolve => setImmediate(resolve));
        expect(mockScheduler.schedule).toHaveBeenCalledTimes(1);
      });

      test('should check network status and prevent process if network is offline', async () => {
        (mockNetworkStatus.getNetworkStatus as jest.Mock).mockReturnValue(NetworkStatusEnum.OFFLINE);
        const done = jest.fn();
        await schedulerCallback(done);
        expect(done).toHaveBeenCalledTimes(1);
        expect(mockResilienceDB.processItems).not.toHaveBeenCalled();
      });
    });
  });
});
