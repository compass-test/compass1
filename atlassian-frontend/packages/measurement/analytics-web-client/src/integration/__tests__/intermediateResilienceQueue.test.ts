import {
  createMinimalTrackEvent,
  packageSegmentEvent,
} from '../../../__test__/util/baseSegmentEvents';
import generateChance from '../../../__test__/util/chance';
import { eventType } from '../../analyticsWebTypes';
import createResilienceQueue, {
  RetryQueueOptions
} from '../../resilienceQueue';
import PullBatchableQueue from '../../resilienceQueue/PullBatchableQueue';
import EventProcessor from '../eventProcessor';
import getResilienceQueue, {
  IntermediateBatchableQueue
} from '../intermediateResilienceQueue';
import {
  EventMismatch,
  PackagedEvent,
} from '../types';
import {
  compareEvents,
  getTransformUUIDFromEvent,
} from '../util';

jest.mock('../../resilienceQueue');
jest.mock('../../resilienceQueue/PullBatchableQueue');
jest.mock('../eventProcessor');
jest.mock('../util');

const chance = generateChance('integration/intermediateResilienceQueue');

describe('integration/intermediateResilienceQueue', () => {

  beforeEach(() => {
    jest.useFakeTimers();
    (createResilienceQueue as jest.Mock).mockImplementation(
      (
        prefix: string,
        product: string,
        options: RetryQueueOptions
      ) => new PullBatchableQueue(prefix, product, options)
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('default export should always return the same queue', () => {
    const queue = getResilienceQueue(
      chance.string(),
      chance.string(),
    );
    const queue2 = getResilienceQueue(
      chance.string(),
      chance.string(),
    );
    expect(queue).toBe(queue2);
  });

  describe('methods', () => {
    let intermediateResilienceQueue: IntermediateBatchableQueue;
    let mockPullBatchableQueue: PullBatchableQueue<PackagedEvent>;

    beforeEach(() => {
      intermediateResilienceQueue = new IntermediateBatchableQueue(
        chance.string(),
        chance.string()
      );
      mockPullBatchableQueue = (PullBatchableQueue as jest.Mock).mock.instances[0];
    });

    test('start calls start on PullbatchableQueue', () => {
      const mockFn = jest.fn();
      intermediateResilienceQueue.start(mockFn);
      expect(mockPullBatchableQueue.start).toHaveBeenCalledTimes(1);
      expect(mockPullBatchableQueue.start).toHaveBeenCalledWith(mockFn);
    });

    test('stop calls start on PullbatchableQueue', () => {
      intermediateResilienceQueue.stop();
      expect(mockPullBatchableQueue.stop).toHaveBeenCalledTimes(1);
    });

    test('getGlobalRetryCount calls start on PullbatchableQueue', () => {
      intermediateResilienceQueue.getGlobalRetryCount();
      expect(mockPullBatchableQueue.getGlobalRetryCount).toHaveBeenCalledTimes(1);
    });

    describe('addItem', () => {

      describe('with no transformUUID, should not compare events', () => {
        test('when addedFromNewTransformer is undefined', () => {
          const event = packageSegmentEvent(createMinimalTrackEvent());
          intermediateResilienceQueue.addItem(event);
          expect(mockPullBatchableQueue.addItem).toHaveBeenCalledTimes(1);
          expect(mockPullBatchableQueue.addItem).toHaveBeenCalledWith(event);
          jest.runOnlyPendingTimers();
          expect(compareEvents).not.toHaveBeenCalled();
        });

        test('when addedFromNewTransformer is true', () => {
          const event = packageSegmentEvent(createMinimalTrackEvent());
          intermediateResilienceQueue.addItem(event, true);
          expect(mockPullBatchableQueue.addItem).not.toHaveBeenCalled();
          jest.runOnlyPendingTimers();
          expect(compareEvents).not.toHaveBeenCalled();
        });
      });

      describe('with transformUUID, should compare events', () => {
        let eventProcessor: EventProcessor;

        beforeEach(() => {
          (compareEvents as jest.Mock).mockReturnValue({
            eventId: '',
            mismatches: [],
          });
          eventProcessor = new EventProcessor({
            apiHost: chance.string(),
            retryQueuePrefix: chance.string(),
            product: chance.string(),
          });
          intermediateResilienceQueue.setEventProcessor(eventProcessor);
        });

        test('should only compare after 5 seconds recieving an event', () => {
          const trackEvent = createMinimalTrackEvent();
          trackEvent.properties.transformUUID = chance.string();
          const event = packageSegmentEvent(trackEvent);
          (getTransformUUIDFromEvent as jest.Mock).mockReturnValue(trackEvent.properties.transformUUID);

          intermediateResilienceQueue.addItem(event);

          expect(getTransformUUIDFromEvent).toHaveBeenCalledTimes(1);
          expect(eventProcessor.track).not.toHaveBeenCalled();
          jest.runTimersToTime(5000);
          expect(compareEvents).not.toHaveBeenCalled();
          expect(eventProcessor.track).toHaveBeenCalledTimes(1);
        });

        test('should reset the comparison on new events', () => {
          const trackEvent = createMinimalTrackEvent();
          trackEvent.properties.transformUUID = chance.string();
          const event = packageSegmentEvent(trackEvent);
          (getTransformUUIDFromEvent as jest.Mock).mockReturnValue(trackEvent.properties.transformUUID);

          intermediateResilienceQueue.addItem(event);

          expect(getTransformUUIDFromEvent).toHaveBeenCalledTimes(1);
          jest.runTimersToTime(1000);
          expect(eventProcessor.track).not.toHaveBeenCalled();
          intermediateResilienceQueue.addItem(event, true);
          jest.runTimersToTime(5000);

          expect(compareEvents).toHaveBeenCalledTimes(1);
          expect(eventProcessor.track).not.toHaveBeenCalled();
        });

        test('should send event mismatch when compareEvents reports a mismatch', () => {
          const trackEvent = createMinimalTrackEvent();
          trackEvent.properties.transformUUID = chance.string();
          const event = packageSegmentEvent(trackEvent);
          (getTransformUUIDFromEvent as jest.Mock).mockReturnValue(trackEvent.properties.transformUUID);
          const mismatch: EventMismatch = {
            eventId: trackEvent.messageId,
            type: eventType.TRACK,
            mismatches: [{
              path: 'msg',
              type: 'missing',
            }]
          };
          (compareEvents as jest.Mock).mockReturnValue(mismatch);

          intermediateResilienceQueue.addItem(event);
          intermediateResilienceQueue.addItem(event, true);
          jest.runTimersToTime(5000);

          expect(compareEvents).toHaveBeenCalledTimes(1);
          expect(eventProcessor.track).toHaveBeenCalledTimes(1);
          expect(eventProcessor.track).toHaveBeenCalledWith(
            'event mismatched',
            {
              action: 'mismatched',
              actionSubject: 'event',
              attributes: {
                mismatches: [mismatch],
              },
              env: 'stg',
              eventType: 'operational',
              origin: 'web',
              platform: 'web',
              product: 'measurement',
              source: '@atlassiansox/analytics-web-client/integrations/eventProcessor',
            },
            expect.anything(),
          );
        });
      });
    });
  });
});
