import createChance from '../../../__test__/util/chance';
import createBatchableQueue, {
  ResilienceMechanism,
  RetryQueueOptions,
} from '../index';
import MockPullBatchableQueue from '../PullBatchableQueue';
import MockPushBatchableQueue from '../PushBatchableQueue';


jest.mock('../PullBatchableQueue');
jest.mock('../PushBatchableQueue');

const chance = createChance('resilienceQueue');

describe('resilienceQueue', () => {
  let retryQueuePrefix: string;
  let options: RetryQueueOptions;

  beforeEach(() => {
    retryQueuePrefix = chance.string();
    options = {};
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should create PushBatchableQueue by default', () => {
    createBatchableQueue(retryQueuePrefix, chance.string(), options);

    expect(MockPullBatchableQueue).not.toHaveBeenCalled();
    expect(MockPushBatchableQueue).toHaveBeenCalledTimes(1);
    expect(MockPushBatchableQueue).toHaveBeenCalledWith(retryQueuePrefix, options);
  });

  test('should create PushBatchableQueue when value is invalid', () => {
    // @ts-ignore For testing purposes
    options.resilienceMechanism = chance.string();
    createBatchableQueue(retryQueuePrefix, chance.string(), options);

    expect(MockPullBatchableQueue).not.toHaveBeenCalled();
    expect(MockPushBatchableQueue).toHaveBeenCalledTimes(1);
    expect(MockPushBatchableQueue).toHaveBeenCalledWith(retryQueuePrefix, options);
  });

  test('should create PushBatchableQueue when value is localstorage', () => {
    options.resilienceMechanism = ResilienceMechanism.LOCALSTORAGE;
    createBatchableQueue(retryQueuePrefix, chance.string(), options);

    expect(MockPullBatchableQueue).not.toHaveBeenCalled();
    expect(MockPushBatchableQueue).toHaveBeenCalledTimes(1);
    expect(MockPushBatchableQueue).toHaveBeenCalledWith(retryQueuePrefix, options);
  });

  test('should create PullBatchableQueue when value is indexdb', () => {
    options.resilienceMechanism = ResilienceMechanism.INDEXEDDB;
    const product = chance.string();

    createBatchableQueue(retryQueuePrefix, product, options);

    expect(MockPullBatchableQueue).toHaveBeenCalledTimes(1);
    expect(MockPullBatchableQueue).toHaveBeenCalledWith(retryQueuePrefix, product, options);
    expect(MockPushBatchableQueue).not.toHaveBeenCalled();
  });
});
