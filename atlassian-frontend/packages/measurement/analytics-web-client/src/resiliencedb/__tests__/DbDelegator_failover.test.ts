import generateChance from '../../../__test__/util/chance';
import MockLogger from '../../../__test__/util/mockLogger';
import { GuardPolicy, StoreType } from '../constants';
import DbDelegator from '../DbDelegator';
import { EVENT_COUNT_LIMIT } from '../defaults';
import MockIndexedDbConnector from '../IndexedDbConnector';
import MockMemoryDb from '../MemoryDb';
import { ItemWrapperType, Resilience } from '../types';

jest.mock('../IndexedDbConnector');
jest.mock('../MemoryDb');

const chance = generateChance('DbDelegator');

const ASYNC_REJECTOR = async () => {
  return Promise.reject(new Error('mock rejected'));
};

describe('DbDelegator with failovers', () => {

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  describe('constructor', () => {
    test('should use indexedDbConnector by default', () => {
      new DbDelegator(chance.string(), { logger: MockLogger });
      expect(MockIndexedDbConnector).toHaveBeenCalledTimes(1);
      expect(MockMemoryDb).not.toHaveBeenCalled();
    });

    test('should use memory when options specify', () => {
      new DbDelegator(chance.string(), { useMemory: true, logger: MockLogger });
      expect(MockMemoryDb).toHaveBeenCalledTimes(1);
      expect(MockIndexedDbConnector).not.toHaveBeenCalled();
    });

    test('should use memory when IndexedDb fails', () => {
      (MockIndexedDbConnector as jest.Mock).mockImplementation(() => {
        throw new Error('error should not surface');
      });
      new DbDelegator(chance.string(), { logger: MockLogger });
      expect(MockIndexedDbConnector).toHaveBeenCalledTimes(1);
      expect(MockMemoryDb).toHaveBeenCalledTimes(1);
    });
  });

  describe('runOrFailover', () => {

    let mockIndexeddbConnectorInstance: Resilience<any>;
    let dbDelegator: DbDelegator<any>;

    beforeEach(() => {
      dbDelegator = new DbDelegator(chance.string(), { logger: MockLogger });
      mockIndexeddbConnectorInstance = (MockIndexedDbConnector as jest.Mock).mock.instances[0];
      mockIndexeddbConnectorInstance.addItem = jest.fn().mockResolvedValue(chance.string());
      mockIndexeddbConnectorInstance.getItems = jest.fn().mockResolvedValue([]);
      mockIndexeddbConnectorInstance.deleteItems = jest.fn().mockResolvedValue(void 0);
      mockIndexeddbConnectorInstance.processItems = jest.fn().mockResolvedValue(void 0);
      mockIndexeddbConnectorInstance.getItemCount = jest.fn().mockResolvedValue(chance.integer({ min: 0 }));
      mockIndexeddbConnectorInstance.storeType = jest.fn().mockReturnValue(StoreType.INDEXEDDB);
    });

    test('should call underlying resilience when nothing fails', async () => {
      await dbDelegator.addItem({});
      await dbDelegator.getItems();
      await dbDelegator.deleteItems([]);
      await dbDelegator.processItems(() => Promise.resolve());
      await dbDelegator.getItemCount();
      expect(mockIndexeddbConnectorInstance.addItem).toHaveBeenCalledTimes(1);
      expect(mockIndexeddbConnectorInstance.getItems).toHaveBeenCalledTimes(1);
      expect(mockIndexeddbConnectorInstance.deleteItems).toHaveBeenCalledTimes(1);
      expect(mockIndexeddbConnectorInstance.processItems).toHaveBeenCalledTimes(1);
      expect(mockIndexeddbConnectorInstance.getItemCount).toHaveBeenCalledTimes(1);
    });

    test('failover should not throw', async () => {
      (mockIndexeddbConnectorInstance.addItem as jest.Mock).mockImplementation(ASYNC_REJECTOR);
      await expect(dbDelegator.addItem({})).resolves.toBeUndefined();
    });

    test('failover should replace resilience mechanism', async () => {
      (mockIndexeddbConnectorInstance.getItems as jest.Mock).mockImplementation(ASYNC_REJECTOR);
      await dbDelegator.getItems();

      expect(MockMemoryDb).toHaveBeenCalledTimes(1);
      const mockMemoryDbInstance = (MockMemoryDb as jest.Mock).mock.instances[0];
      expect(mockMemoryDbInstance.getItems).toHaveBeenCalledTimes(1);
    });

    test('failover should attempt to recover events from old resilience mechanism', async () => {
      const mockItem: ItemWrapperType<any> = {
        id: chance.string(),
        item: {},
        namespace: chance.string(),
        timeAdded: chance.timestamp(),
        timeToBeProcessedAfter: chance.timestamp(),
        retryAttempts: chance.integer(),
      };
      (mockIndexeddbConnectorInstance.deleteItems as jest.Mock).mockImplementation(ASYNC_REJECTOR);
      (mockIndexeddbConnectorInstance.getItems as jest.Mock).mockResolvedValue({
        items: [mockItem],
        numberOfEvictedItems: 0,
      });
      const mockBulkAddItemWrapperType = jest.fn((items: ItemWrapperType<any>[]) => ({
        items,
        numberOfEvictedItems: 0,
      }));
      (MockMemoryDb as jest.Mock).mockReturnValue({
        bulkAddItemWrapperType: mockBulkAddItemWrapperType,
        deleteItems: jest.fn(),
      });
      await dbDelegator.deleteItems([]);

      expect(MockMemoryDb).toHaveBeenCalledTimes(1);
      expect(mockIndexeddbConnectorInstance.getItems).toHaveBeenCalledTimes(1);
      expect(mockIndexeddbConnectorInstance.getItems).toHaveBeenCalledWith(EVENT_COUNT_LIMIT);

      expect(mockBulkAddItemWrapperType).toHaveBeenCalledTimes(1);
      expect(mockBulkAddItemWrapperType).toHaveBeenCalledWith([mockItem], GuardPolicy.IGNORE);

      expect(mockIndexeddbConnectorInstance.deleteItems).toHaveBeenCalledTimes(2);
    });

    test('failover should resolve if we cant recover events', async () => {
      (mockIndexeddbConnectorInstance.getItems as jest.Mock).mockImplementation(ASYNC_REJECTOR);
      await dbDelegator.getItems();

      expect(MockMemoryDb).toHaveBeenCalledTimes(1);
      expect(mockIndexeddbConnectorInstance.getItems).toHaveBeenCalledTimes(2);
    });

    test('slow failover should not result in multiple memory resilience being created', async () => {
      (mockIndexeddbConnectorInstance.getItems as jest.Mock)
        .mockImplementation(() => new Promise((resolve, reject) => setTimeout(reject, 5000)));
      (mockIndexeddbConnectorInstance.addItem as jest.Mock)
        .mockImplementation(ASYNC_REJECTOR);

      // First fail is quick, but the failover is slow
      const failOverPromise = dbDelegator.addItem({});
      // Should use memory immediately and not failover
      await dbDelegator.addItem({});
      jest.runOnlyPendingTimers();
      await failOverPromise;

      expect(MockMemoryDb).toHaveBeenCalledTimes(1);
      const mockMemoryDbInstance = (MockMemoryDb as jest.Mock).mock.instances[0];
      expect(mockMemoryDbInstance.addItem).toHaveBeenCalledTimes(2);
    });
  });
});
