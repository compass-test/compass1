import AnalyticsWebClient, { CompressionRule, userType } from '../src';

import { ACTION_EVENT, PRODUCT_INFO } from './util/commonTests';

declare let require: any;

const Analytics = require('@segment/analytics.js-core/lib/analytics');

const mockUser = {
  id: jest.fn(),
  anonymousId: jest.fn(() => '298732f2-62dd-423b-90c0-41b5ba685164'),
};

jest.mock('@segment/analytics.js-core/lib/analytics', () => jest.fn().mockImplementation(() => ({
  init: jest.fn(),
  use: jest.fn(),
  track: jest.fn(),
  page: jest.fn(),
  user: jest.fn(() => mockUser),
})),);

const createHighPriorityEvent = () => ({
  ...ACTION_EVENT,
  highPriority: true,
});

const createLowPriorityEvent = () => ({
  ...ACTION_EVENT,
  highPriority: false,
  tags: ['measurement'],
});

describe('AnalyticsWebClient', () => {
  describe('lowPriorityEventDelay', () => {
    let oldXMLHttpRequest: any;

    beforeEach(() => {
      mockUser.id.mockClear();
      mockUser.anonymousId.mockClear();
      Analytics.mockClear();
      oldXMLHttpRequest = window.XMLHttpRequest;
      jest.useFakeTimers();
    });

    afterEach(() => {
      window.XMLHttpRequest = oldXMLHttpRequest;
      jest.useRealTimers();
    });

    describe('withoutCompression', () => {
      let client: any;
      let mockAnalytics: any;

      beforeEach(() => {
        client = new AnalyticsWebClient(PRODUCT_INFO);
        // eslint-disable-next-line no-underscore-dangle
        mockAnalytics = client._analytics;
      });

      describe('inclusions', () => {
        test('should delay low priority events fired within a delay period', () => {
          const lowPriorityEvent = createLowPriorityEvent();

          client.startLowPriorityEventDelay();
          client.sendTrackEvent(lowPriorityEvent);
          client.sendUIEvent(lowPriorityEvent);
          expect(mockAnalytics.track).not.toBeCalled();
        });

        test('should attach the sentWithDelay tag to any delayed events', () => {
          const lowPriorityEvent = createLowPriorityEvent();

          client.startLowPriorityEventDelay();
          client.sendTrackEvent(lowPriorityEvent);
          client.sendUIEvent(lowPriorityEvent);
          client.sendOperationalEvent(lowPriorityEvent);
          client.stopLowPriorityEventDelay();
          const events = mockAnalytics.track.mock.calls.map(
            (callArgs: any) => callArgs[1],
          );

          expect(events).toHaveLength(3);
          expect(events[0].tags).toContain('sentWithDelay');
          expect(events[1].tags).toContain('sentWithDelay');
          expect(events[2].tags).toContain('sentWithDelay');
        });

        test('should fire callback functions immediately after enqueuing the event instead of when the event is fired', () => {
          const lowPriorityEvent = createLowPriorityEvent();
          const callback = jest.fn();
          client.startLowPriorityEventDelay();
          client.sendTrackEvent(lowPriorityEvent, callback);
          expect(callback).toHaveBeenCalledTimes(1);
          expect(mockAnalytics.track).not.toBeCalled();
        });
      });

      describe('exclusions', () => {
        test('should fire high priority events immediately during a delay period', () => {
          const highPriorityEvent = createHighPriorityEvent();

          client.startLowPriorityEventDelay();
          client.sendTrackEvent(highPriorityEvent);
          client.sendUIEvent(highPriorityEvent);
          client.sendOperationalEvent(highPriorityEvent);

          expect(mockAnalytics.track).toHaveBeenCalledTimes(3);
        });

        test('should fire events that do not have any highPriority property immediately during a delay period', () => {
          const event = { ...ACTION_EVENT };
          delete (event as any).highPriority;

          client.startLowPriorityEventDelay();
          client.sendTrackEvent(event);
          client.sendUIEvent(event);
          client.sendOperationalEvent(event);

          expect(mockAnalytics.track).toHaveBeenCalledTimes(3);
        });

        test('should fire events that have highPriority set to null immediately during a delay period', () => {
          const event = { ...ACTION_EVENT, highPriority: null };

          client.startLowPriorityEventDelay();
          client.sendTrackEvent(event);
          client.sendUIEvent(event);
          client.sendOperationalEvent(event);

          expect(mockAnalytics.track).toHaveBeenCalledTimes(3);
        });

        test("should fire low priority events immediately during a delay period if they don't have the measurement tag", () => {
          const lowPriorityEvent = createLowPriorityEvent();
          // @ts-ignore
          delete lowPriorityEvent.tags;

          client.startLowPriorityEventDelay();
          client.sendTrackEvent(lowPriorityEvent);
          client.sendUIEvent(lowPriorityEvent);
          client.sendOperationalEvent(lowPriorityEvent);

          expect(mockAnalytics.track).toHaveBeenCalledTimes(3);
        });

        test('should fire low priority events immediately if there have never any delay periods started', () => {
          const lowPriorityEvent = createLowPriorityEvent();
          client.sendTrackEvent(lowPriorityEvent);
          client.sendUIEvent(lowPriorityEvent);
          client.sendOperationalEvent(lowPriorityEvent);

          expect(mockAnalytics.track).toHaveBeenCalledTimes(3);
        });

        test('should fire low priority events immediately if the delay period has been stopped', () => {
          const lowPriorityEvent = createLowPriorityEvent();

          client.startLowPriorityEventDelay();
          client.stopLowPriorityEventDelay();

          client.sendTrackEvent(lowPriorityEvent);
          client.sendUIEvent(lowPriorityEvent);
          client.sendOperationalEvent(lowPriorityEvent);

          expect(mockAnalytics.track).toHaveBeenCalledTimes(3);
        });
      });

      describe('flush', () => {
        test('should fire delayed low priority events immediately after the delay is stopped', () => {
          const lowPriorityEvent = createLowPriorityEvent();

          client.startLowPriorityEventDelay();
          client.sendTrackEvent(lowPriorityEvent);
          client.sendUIEvent(lowPriorityEvent);
          client.sendOperationalEvent(lowPriorityEvent);
          client.stopLowPriorityEventDelay();

          expect(mockAnalytics.track).toHaveBeenCalledTimes(3);
        });

        test('should flush the events in batches to avoid a large upfront performance hit', () => {
          const expectedBatchSize = 7;
          const expectedWaitBetweenBatches = 100;
          const lowPriorityEvent = createLowPriorityEvent();

          client.startLowPriorityEventDelay();

          for (let i = 0; i < expectedBatchSize + 3; i++) {
            client.sendTrackEvent(lowPriorityEvent);
          }

          client.stopLowPriorityEventDelay();

          // The first batch of events should be processed immediately
          expect(mockAnalytics.track).toHaveBeenCalledTimes(expectedBatchSize);

          // The remaining events should only be processed once the wait period has passed again
          jest.runTimersToTime(expectedWaitBetweenBatches);
          expect(mockAnalytics.track).toHaveBeenCalledTimes(
            expectedBatchSize + 3,
          );
        });

        test('should cancel the flush if the delay is started against while the flush is still in progress', () => {
          const expectedBatchSize = 7;
          const expectedWaitBetweenBatches = 100;
          const lowPriorityEvent = createLowPriorityEvent();

          client.startLowPriorityEventDelay();

          for (let i = 0; i < expectedBatchSize + 3; i++) {
            client.sendTrackEvent(lowPriorityEvent);
          }

          client.stopLowPriorityEventDelay();

          // The first batch of events should be processed immediately
          expect(mockAnalytics.track).toHaveBeenCalledTimes(expectedBatchSize);

          client.startLowPriorityEventDelay();

          // The remaining events should stay in the delay queue even after the wait period passes
          mockAnalytics.track.mockClear();
          jest.runTimersToTime(expectedWaitBetweenBatches);
          expect(mockAnalytics.track).not.toBeCalled();
        });
      });

      describe('timeout', () => {
        test('should call stopLowPriorityEventDelay after the given timout period expires', () => {
          const spy = jest.spyOn(client, 'stopLowPriorityEventDelay');
          const timeout = 2000;
          client.startLowPriorityEventDelay(timeout);
          jest.runTimersToTime(timeout);
          expect(spy).toBeCalled();
        });

        test('should call stopLowPriorityEventDelay after 10s if no timeout period was provided', () => {
          const spy = jest.spyOn(client, 'stopLowPriorityEventDelay');
          client.startLowPriorityEventDelay();
          jest.runTimersToTime(10000);
          expect(spy).toBeCalled();
        });

        test('should not call stopLowPriorityEventDelay again if it was called explicitly before the timeout period expired', () => {
          const spy = jest.spyOn(client, 'stopLowPriorityEventDelay');
          const timeout = 2000;
          client.startLowPriorityEventDelay(timeout);
          client.stopLowPriorityEventDelay();
          jest.runTimersToTime(timeout);
          expect(spy.mock.calls.length).toBe(1);
        });

        test('should extend the timeout period if startLowPriorityEventDelay is called again while the client is already delaying', () => {
          const spy = jest.spyOn(client, 'stopLowPriorityEventDelay');
          client.startLowPriorityEventDelay(2000);
          jest.runTimersToTime(1000);
          client.startLowPriorityEventDelay(2000);
          jest.runTimersToTime(1000); // initial delay would have ended by now
          expect(spy).not.toBeCalled();
          jest.runTimersToTime(1000); // new delay would have ended up now
          expect(spy).toBeCalled();
        });
      });
    });

    describe('withCompression', () => {
      const maxEventsPerCompression = 5;

      let client: any;
      let mockAnalytics: any;

      beforeEach(() => {
        client = new AnalyticsWebClient(PRODUCT_INFO, {
          delayQueueCompressors: [
            new CompressionRule(
              (event: any) => event.tags && event.tags.includes('shouldCompress'),
              (events: any) => {
                // Split the events into evenly sized groups
                const chunks = [];
                for (
                  let i = 0;
                  i < events.length;
                  i += maxEventsPerCompression
                ) {
                  chunks.push(events.slice(i, i + maxEventsPerCompression));
                }

                // Return a compressed event per group
                return chunks.map((chunk) => ({
                  eventType: 'operational',
                  source: 'test',
                  action: 'compressed',
                  actionSubject: 'measurementEvents',
                  attributes: {
                    events: chunk.map((event: any) => ({
                      eventType: event.eventType,
                      action: event.action,
                      actionSubject: event.actionSubject,
                      actionSubjectId: event.actionSubjectId,
                      attributes: event.attributes,
                      tags: event.tags,
                    })),
                  },
                }));
              },
            ),
          ],
        });

        // eslint-disable-next-line no-underscore-dangle
        mockAnalytics = client._analytics;
      });

      test(
        'should compress all events into a single event if they all match the same compression rule, and the user '
          + 'info and context have remained consistent during the delay period',
        () => {
          const lowPriorityEvent = createLowPriorityEvent();
          lowPriorityEvent.tags.push('shouldCompress');

          client.startLowPriorityEventDelay();
          client.sendTrackEvent(lowPriorityEvent);
          client.sendUIEvent(lowPriorityEvent);
          client.sendOperationalEvent(lowPriorityEvent);
          client.sendTrackEvent(lowPriorityEvent);

          client.stopLowPriorityEventDelay();

          expect(mockAnalytics.track).toHaveBeenCalledTimes(1); // should be one compressed event per user info
          const compressedEvents = mockAnalytics.track.mock.calls.map(
            (callArgs: any) => callArgs[1],
          );

          expect(compressedEvents[0].action).toEqual('compressed');
          expect(compressedEvents[0].actionSubject).toEqual(
            'measurementEvents',
          );
          expect(compressedEvents[0].attributes.events).toHaveLength(4);
          expect(compressedEvents[0].attributes.events[0].eventType).toEqual(
            'track',
          );
          expect(compressedEvents[0].attributes.events[1].eventType).toEqual(
            'ui',
          );
          expect(compressedEvents[0].attributes.events[2].eventType).toEqual(
            'operational',
          );
          expect(compressedEvents[0].attributes.events[3].eventType).toEqual(
            'track',
          );
        },
      );

      test(
        'should create individual events for each user info group if the user info changes while the delay period '
          + 'is active',
        () => {
          const lowPriorityEvent = createLowPriorityEvent();
          lowPriorityEvent.tags.push('shouldCompress');

          client.startLowPriorityEventDelay();

          client.setUserInfo(userType.OPSGENIE, 'firstUser');
          client.sendTrackEvent(lowPriorityEvent);
          client.sendUIEvent(lowPriorityEvent);
          client.sendOperationalEvent(lowPriorityEvent);

          client.setUserInfo(userType.TRELLO, 'secondUser');
          client.sendTrackEvent(lowPriorityEvent);
          client.sendUIEvent(lowPriorityEvent);
          client.sendOperationalEvent(lowPriorityEvent);

          client.setUserInfo(userType.HASHED_EMAIL, 'thirdUser');

          // Change the mock implementation before stopping the delay so that we can track what order  the events occur
          // in when the events are being flushed.
          const callOrder: any = [];
          mockUser.id.mockImplementation((id: any) => {
            // @ts-ignore
            if (id && mockUser.id.currentId !== id) {
              // @ts-ignore
              mockUser.id.currentId = id;
              callOrder.push(`changeUserId(${id})`);
            }
            // @ts-ignore
            return mockUser.id.currentId;
          });

          mockAnalytics.track.mockImplementation(() => {
            callOrder.push('fireEvent');
          });

          client.stopLowPriorityEventDelay();

          // The user should change once per group, with a compressed event fired per group,
          // and reset to the most recent value after each fire.
          expect(mockAnalytics.track).toHaveBeenCalledTimes(2);
          expect(callOrder).toEqual([
            'changeUserId(firstUser)',
            'fireEvent',
            'changeUserId(thirdUser)',
            'changeUserId(secondUser)',
            'fireEvent',
            'changeUserId(thirdUser)',
          ]);

          const fireEventCalls = mockAnalytics.track.mock.calls;
          const [firstIdentifier, firstEvent] = fireEventCalls[0];
          expect(firstIdentifier).toEqual('measurementEvents compressed');
          expect(firstEvent.action).toEqual('compressed');
          expect(firstEvent.actionSubject).toEqual('measurementEvents');
          expect(firstEvent.userIdType).toEqual(userType.OPSGENIE);
          expect(firstEvent.attributes.events).toHaveLength(3);
          expect(firstEvent.attributes.events[0].eventType).toEqual('track');
          expect(firstEvent.attributes.events[1].eventType).toEqual('ui');
          expect(firstEvent.attributes.events[2].eventType).toEqual(
            'operational',
          );

          const [secondIdentifier, secondEvent] = fireEventCalls[1];
          expect(secondIdentifier).toEqual('measurementEvents compressed');
          expect(secondEvent.action).toEqual('compressed');
          expect(secondEvent.actionSubject).toEqual('measurementEvents');
          expect(secondEvent.userIdType).toEqual(userType.TRELLO);
          expect(secondEvent.attributes.events).toHaveLength(3);
          expect(secondEvent.attributes.events[0].eventType).toEqual('track');
          expect(secondEvent.attributes.events[1].eventType).toEqual('ui');
          expect(secondEvent.attributes.events[2].eventType).toEqual(
            'operational',
          );
        },
      );

      test('should flush the compressed events in batches to avoid a large upfront performance hit', () => {
        const expectedBatchSize = 7;
        const expectedWaitBetweenBatches = 100;

        const lowPriorityEvent = createLowPriorityEvent();
        lowPriorityEvent.tags.push('shouldCompress');

        client.startLowPriorityEventDelay();

        // Fire enough events to exceed the flush batch size even with compression.
        // The 3 extra events should be fired after a wait period in their own compression group.
        for (
          let i = 0;
          i < maxEventsPerCompression * expectedBatchSize + 3;
          i++
        ) {
          client.sendTrackEvent(lowPriorityEvent);
        }

        client.stopLowPriorityEventDelay();

        // The first batch of events should be processed immediately
        expect(mockAnalytics.track).toHaveBeenCalledTimes(expectedBatchSize);
        const firstBatchEvents = mockAnalytics.track.mock.calls.map(
          (callArgs: any) => callArgs[1],
        );
        firstBatchEvents.forEach((event: any) => {
          expect(event.action).toEqual('compressed');
          expect(event.actionSubject).toEqual('measurementEvents');
          expect(event.attributes.events).toHaveLength(maxEventsPerCompression);
        });

        // The remaining events should only be processed once the wait period has passed again
        jest.runTimersToTime(expectedWaitBetweenBatches);

        expect(mockAnalytics.track).toHaveBeenCalledTimes(
          expectedBatchSize + 1,
        );
        const secondBatchEvent = mockAnalytics.track.mock.calls[expectedBatchSize][1];
        expect(secondBatchEvent.action).toEqual('compressed');
        expect(secondBatchEvent.actionSubject).toEqual('measurementEvents');
        expect(secondBatchEvent.attributes.events).toHaveLength(3);
      });
    });
  });
});
