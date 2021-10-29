import PushBatchableQueue from '../PushBatchableQueue';
import MockScheduler from '../scheduler';

const MockQueue = require('@segment/localstorage-retry');

jest.mock('@segment/localstorage-retry');
jest.mock('../scheduler');

const emptyFunction = () => {
  // do nothing
};

const createMockItem = (messageIdSuffix: any) => ({
  msg: {
    messageId: `item-${messageIdSuffix}`,
  },
});

const createMockItems = (num: any) => {
  const items = [];
  for (let i = 0; i < num; i++) {
    items.push(createMockItem(i));
  }
  return items;
};

describe('PushBatchableQueue', () => {
  const queueStart = jest.fn();
  const queueAddItem = jest.fn();
  const queueOnMock = jest.fn();

  const scheduleFn = jest.fn();

  let batchQueue: PushBatchableQueue;

  let batchFn: any;
  let returnError: any;
  let returnSuccess: any;
  const queuePrefix = 'prefix';

  const options = {
    minRetryDelay: 5000,
    maxRetryDelay: 70000,
    backoffFactor: 2,
    backoffJitterPercentage: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    returnError = 'test-error';
    returnSuccess = 'test-success';

    batchFn = jest.fn((items: any, callback: any) => {
      callback(returnError, returnSuccess);
    });

    jest.useFakeTimers();

    MockQueue.mockImplementation(() => ({
      start: queueStart,
      addItem: queueAddItem,
      on: queueOnMock,
    }));

    (MockScheduler as any).mockImplementation(() => ({
      schedule: scheduleFn,
    }));

    batchQueue = new PushBatchableQueue(queuePrefix, options);
    batchQueue.start(batchFn)
  });

  test('start calls localstorage start', () => {
    expect(queueStart).toHaveBeenCalledTimes(1);
  });

  test('item added goes to localstorage queue', () => {
    const item = { name: 'test' };
    batchQueue.addItem(item);
    expect(queueAddItem).toHaveBeenCalledTimes(1);
    expect(queueAddItem).toHaveBeenCalledWith(item);
  });

  test('Queue to be constructed with no wait time', () => {
    const queueOptionOverrides = {
      minRetryDelay: 1,
      maxRetryDelay: 1,
      backoffFactor: 1,
      // Since we merge both overrides and defaults, we get both versions of backoffJitter
      backoffJitter: 0,
      backoffJitterPercentage: 0,
    };
    expect(MockQueue.mock.calls[0][0]).toEqual(queuePrefix);
    expect(MockQueue.mock.calls[0][1]).toEqual(queueOptionOverrides);
  });

  test('processingSingleItem calls scheduler', () => {
    const processItem = MockQueue.mock.calls[0][2];
    const doneFn = jest.fn();
    processItem(createMockItem(0), doneFn);

    expect(scheduleFn).toHaveBeenCalledTimes(1);
    expect(scheduleFn).toHaveBeenCalledWith({ immediate: false });
  });

  test('processing the max limit should call scheduler with immediate set to true', () => {
    const processItem = MockQueue.mock.calls[0][2];
    const doneFn = jest.fn();

    const items = createMockItems(6);
    items.forEach((i) => processItem(i, doneFn));

    expect(scheduleFn).toHaveBeenCalledTimes(6);
    expect(scheduleFn).lastCalledWith({ immediate: false });

    processItem(createMockItem('last'), doneFn);

    expect(scheduleFn).toHaveBeenCalledTimes(7);
    expect(scheduleFn).lastCalledWith({ immediate: true });
  });

  test('flush result should call done on item and schedule', () => {
    const processItem = MockQueue.mock.calls[0][2];
    const triggerOperationFn = (MockScheduler as any).mock.calls[0][1];
    const itemDoneFn = jest.fn();
    const scheduleDoneFn = jest.fn();

    processItem(createMockItem(0), itemDoneFn);
    processItem(createMockItem(1), itemDoneFn);
    processItem(createMockItem(2), itemDoneFn);

    triggerOperationFn(scheduleDoneFn);

    expect(batchFn).toHaveBeenCalledTimes(1);

    expect(itemDoneFn).toHaveBeenCalledTimes(3);
    expect(itemDoneFn).toHaveBeenCalledWith(returnError, returnSuccess);

    expect(scheduleDoneFn).toHaveBeenCalledTimes(1);
    expect(scheduleDoneFn).toHaveBeenCalledWith(returnError);
  });

  test('flush only process max items', () => {
    const processItem = MockQueue.mock.calls[0][2];
    const triggerOperationFn = (MockScheduler as any).mock.calls[0][1];
    const itemDoneFn = jest.fn();
    const items = createMockItems(10);
    items.forEach((i) => processItem(i, itemDoneFn));

    expect(scheduleFn).lastCalledWith({ immediate: true });
    triggerOperationFn(emptyFunction);

    expect(itemDoneFn).toHaveBeenCalledTimes(7);
    expect(itemDoneFn).toHaveBeenCalledWith(returnError, returnSuccess);
  });

  test('if items are left in the queue after flush, call schedule again', () => {
    const processItem = MockQueue.mock.calls[0][2];
    const triggerOperationFn = (MockScheduler as any).mock.calls[0][1];
    const items = createMockItems(10);
    items.forEach((i) => processItem(i, emptyFunction));

    expect(scheduleFn).lastCalledWith({ immediate: true });
    triggerOperationFn(emptyFunction);
    expect(scheduleFn).lastCalledWith({ immediate: false });
  });
});
