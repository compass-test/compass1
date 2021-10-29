import getMetricsCollector, { MetricsCollector } from '../Metrics';
import { ResilienceMechanism } from '../types';

describe('Metrics', () => {

  test('should always return the same instance of MetricsCollector from default defaultFunction', () => {
    const metricsCollector1 = getMetricsCollector();
    const metricsCollector2 = getMetricsCollector();
    expect(metricsCollector1).toBe(metricsCollector2);
  });

  describe('MetricsCollector', () => {

    let metricsCollector: MetricsCollector;

    beforeEach(() => {
      metricsCollector = new MetricsCollector();
    });

    test('Should update metrics and return', () => {
      metricsCollector.addToItemsDiscardedByRetryCounter();
      metricsCollector.addToItemsDiscardedByOverflowCounter();
      metricsCollector.addToDuplicateEventCounter();
      metricsCollector.addToLocalstorageDuplicateCount();
      metricsCollector.addToEventCount();
      metricsCollector.setResilienceMechanism(ResilienceMechanism.LOCALSTORAGE);
      metricsCollector.addToPurgedQueuesMetrics(2);
      metricsCollector.addToReclaimMetrics({
        fullReclaims: 3,
        partialReclaims: 4,
        failedReclaims: 5,
      });

      const metricsPayload = metricsCollector.getMetricsPayload();

      expect(metricsPayload).toEqual({
        itemsDiscardedByRetry: 1,
        duplicateEventCount: 1,
        eventCount: 1,
        localstorageDuplicateCount: 1,
        itemsDiscardedByOverflow: 1,
        resilienceMechanism: '@segment/localstorage-retry',

        fullReclaims: 3,
        partialReclaims: 4,
        failedReclaims: 5,
        localstorageQueuesPurged: 2,
      });
    });

    test('Should subtract and report new number correctly', () => {
      metricsCollector.addToItemsDiscardedByRetryCounter();
      metricsCollector.addToItemsDiscardedByRetryCounter();
      metricsCollector.addToItemsDiscardedByRetryCounter();
      metricsCollector.addToItemsDiscardedByRetryCounter();
      metricsCollector.addToItemsDiscardedByOverflowCounter();
      metricsCollector.addToItemsDiscardedByOverflowCounter();
      metricsCollector.addToItemsDiscardedByOverflowCounter();
      metricsCollector.addToDuplicateEventCounter();
      metricsCollector.addToDuplicateEventCounter();
      metricsCollector.addToLocalstorageDuplicateCount();
      metricsCollector.addToEventCount();
      metricsCollector.addToEventCount();
      metricsCollector.setResilienceMechanism(ResilienceMechanism.INDEXEDDB);

      metricsCollector.addToPurgedQueuesMetrics(32);
      metricsCollector.addToReclaimMetrics({
        fullReclaims: 21,
        partialReclaims: 28,
        failedReclaims: 43,
      });

      const metricsPayload = metricsCollector.getMetricsPayload();

      expect(metricsPayload).toEqual({
        itemsDiscardedByRetry: 4,
        itemsDiscardedByOverflow: 3,
        duplicateEventCount: 2,
        eventCount: 2,
        localstorageDuplicateCount: 1,
        resilienceMechanism: ResilienceMechanism.INDEXEDDB,

        fullReclaims: 21,
        partialReclaims: 28,
        failedReclaims: 43,
        localstorageQueuesPurged: 32,
      });

      metricsCollector.subtractFromMetrics({
        itemsDiscardedByRetry: 2,
        itemsDiscardedByOverflow: 1,
        eventCount: 2,
        localstorageDuplicateCount: 1,
        resilienceMechanism: ResilienceMechanism.INDEXEDDB,

        fullReclaims: 10,
        partialReclaims: 11,
        failedReclaims: 12,
        localstorageQueuesPurged: 13,
      });

      const updatedMetricsPayload = metricsCollector.getMetricsPayload();

      expect(updatedMetricsPayload).toEqual({
        itemsDiscardedByRetry: 2,
        itemsDiscardedByOverflow: 2,
        duplicateEventCount: 2,
        eventCount: 0,
        localstorageDuplicateCount: 0,
        resilienceMechanism: ResilienceMechanism.INDEXEDDB,

        fullReclaims: 11,
        partialReclaims: 17,
        failedReclaims: 31,
        localstorageQueuesPurged: 19,
      });
    });

    test('Should never push numbers into negatives', () => {
      metricsCollector.subtractFromMetrics({
        itemsDiscardedByRetry: 2,
        itemsDiscardedByOverflow: 1,
        duplicateEventCount: 0,
        eventCount: 2,
        localstorageDuplicateCount: 1,

        fullReclaims: 8,
        partialReclaims: 3,
        failedReclaims: 2,
        localstorageQueuesPurged: 5,
      });

      const metricsPayload = metricsCollector.getMetricsPayload();

      expect(metricsPayload).toEqual({
        itemsDiscardedByRetry: 0,
        itemsDiscardedByOverflow: 0,
        duplicateEventCount: 0,
        eventCount: 0,
        localstorageDuplicateCount: 0,
        resilienceMechanism: ResilienceMechanism.LOCALSTORAGE,

        fullReclaims: 0,
        partialReclaims: 0,
        failedReclaims: 0,
        localstorageQueuesPurged: 0,
      });
    });
  });
});
