import AnalyticsWebClient, { tenantType, userType } from '../src';
import getResilienceQueue, {
  IntermediateBatchableQueue,
} from '../src/integration/intermediateResilienceQueue';

import { PRODUCT_INFO, TENANT_ID, USER_ID } from './util/commonTests';
import { createDefaultMockXHR } from './util/mockXHR';

jest.mock('../src/integration/intermediateResilienceQueue', () => ({
  __esModule: true,
  ...jest.requireActual<any>('../src/integration/intermediateResilienceQueue'),
  default: jest.fn(),
}));

const throttle = 1000 * 60 * 60; // 1 hour

const globalAny: any = global;
const originalLocalStorage = globalAny.localStorage;

describe('Multiple AnalyticsWebClient UI viewed', () => {
  const originalHasFocus = document.hasFocus;
  const originalXHR = window.XMLHttpRequest;

  let mockXHR: any = null;
  let client: AnalyticsWebClient | null;
  let client2: AnalyticsWebClient;
  let intermediateResilienceQueue: IntermediateBatchableQueue | undefined;

  beforeEach(() => {
    // Provides a way to get a new queue every test
    (getResilienceQueue as jest.Mock).mockImplementation((
      retryQueuePrefix: string,
      product: string,
      queueOptions: any
    ) => {
      if (!intermediateResilienceQueue) {
        intermediateResilienceQueue = new IntermediateBatchableQueue(retryQueuePrefix, product, queueOptions);
      }
      return intermediateResilienceQueue;
    });
    mockXHR = createDefaultMockXHR();
    // @ts-ignore
    window.XMLHttpRequest = jest.fn(() => mockXHR);
    jest.useFakeTimers();
  });

  afterEach(() => {
    client?.stopUIViewedEvent();
    client = null;
    intermediateResilienceQueue = undefined;
    jest.useRealTimers();
    document.hasFocus = originalHasFocus;
    window.XMLHttpRequest = originalXHR;
    jest.resetModules();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should send only once after throttle time', () => {
    document.hasFocus = () => true;

    const firstLoopTime = Date.now();

    jest
      .spyOn(global.Date, 'now')
      .mockReturnValueOnce(firstLoopTime)
      .mockReturnValueOnce(firstLoopTime + throttle + 1);

    client = new AnalyticsWebClient(PRODUCT_INFO);
    client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
    client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
    client.startUIViewedEvent();

    client2 = new AnalyticsWebClient(PRODUCT_INFO);
    client2.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
    client2.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
    client2.startUIViewedEvent();

    jest.runOnlyPendingTimers();
    mockXHR.send.mockClear();

    jest
      .spyOn(global.Date, 'now')
      .mockReturnValue(firstLoopTime + throttle + 1);

    jest.runOnlyPendingTimers();

    expect(mockXHR.send).toHaveBeenCalledTimes(1);
  });

  describe('no localStorage', () => {
    beforeEach(() => {
      // @ts-ignore
      global.localStorage = null;
      mockXHR = createDefaultMockXHR();
      // @ts-ignore
      window.XMLHttpRequest = jest.fn(() => mockXHR);
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.resetModules();
      jest.clearAllMocks();
      globalAny.localStorage = originalLocalStorage;
      jest.clearAllTimers();
    });
    test('should send only once after throttle time, when localStorage is not available', () => {
      document.hasFocus = () => true;

      const firstLoopTime = Date.now();

      jest
        .spyOn(global.Date, 'now')
        .mockReturnValueOnce(firstLoopTime)
        .mockReturnValueOnce(firstLoopTime + throttle + 1)
        .mockReturnValueOnce(firstLoopTime + throttle * 2 + 2);

      client = new AnalyticsWebClient(PRODUCT_INFO);
      client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
      client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
      client.startUIViewedEvent();

      client2 = new AnalyticsWebClient(PRODUCT_INFO);
      client2.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
      client2.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
      client2.startUIViewedEvent();

      jest.runOnlyPendingTimers();
      mockXHR.send.mockClear();
      jest
        .spyOn(global.Date, 'now')
        .mockReturnValue(firstLoopTime + throttle + 1);

      jest.runOnlyPendingTimers();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      mockXHR.send.mockClear();

      jest.runOnlyPendingTimers();

      expect(mockXHR.send).toHaveBeenCalledTimes(1);
    });
  });
});
