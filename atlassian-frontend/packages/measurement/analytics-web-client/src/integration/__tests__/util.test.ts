import {
  createMinimalIdentifyEvent,
  createMinimalPageEvent,
  createMinimalTrackEvent,
  packageSegmentEvent,
} from '../../../__test__/util/baseSegmentEvents';
import generateChance from '../../../__test__/util/chance';
import { Context } from '../../types';
import {
  PackagedEvent,
  SegmentIdentifyEventDef,
  SegmentScreenEventDef,
  SegmentTrackEventDef,
} from '../types';
import {
  buildContext,
  compareEvents,
  getTransformUUIDFromEvent,
  prepareEventProperties,
} from '../util';

const chance = generateChance('integration/util')

describe('integration/util', () => {
  describe('buildContext', () => {

    let mockContext: Context;

    beforeEach(() => {
      mockContext = {
        context: {
          screen: {
            width: chance.integer(),
            height: chance.integer(),
            density: chance.integer(),
          },
          library: {
            name: 'analytics.js',
            version: chance.string(),
          }
        },
      };
    });

    test('should extract context and add useragent', () => {
      const context = buildContext(mockContext);
      expect(context).toEqual({
        ...mockContext.context,
        userAgent: navigator.userAgent,
      });
    });
  });

  describe('prepareEventProperties', () => {
    const leftPad = (value: number, numCharacters = 2): string => {
      return value.toString().padStart(numCharacters, '0');
    };

    test('should convert nested value that looks like date string to date object', () => {
      const dateStart = chance.date();
      const dateEnd = chance.date();
      dateEnd.setUTCHours(0);
      dateEnd.setUTCMinutes(0);
      dateEnd.setUTCSeconds(0);
      dateEnd.setUTCMilliseconds(0);

      // From https://www.npmjs.com/package/@segment/isodate-traverse
      // Strings are required to have at least YYYY-MM-DD
      const result = prepareEventProperties({
        attributes: {
          state: {
            start: `${
              leftPad(dateStart.getUTCFullYear(), 4)
            }-${
              // Month gets reported as number between 0-11...
              leftPad(dateStart.getUTCMonth() + 1)
            }-${
              leftPad(dateStart.getUTCDate())
            } ${
              leftPad(dateStart.getUTCHours())
            }:${
              leftPad(dateStart.getUTCMinutes())
            }:${
              leftPad(dateStart.getUTCSeconds())
            }.${
              leftPad(dateStart.getUTCMilliseconds(), 3)
            }`,
            end: `${
              leftPad(dateEnd.getUTCFullYear(), 4)
            }-${
              leftPad(dateEnd.getUTCMonth() + 1)
            }-${
              leftPad(dateEnd.getUTCDate())
            }`
          }
        }
      });

      expect(result.attributes.state.start).toEqual(dateStart);
      expect(result.attributes.state.end).toEqual(dateEnd);
    });
  });

  describe('getTransformUUIDFromEvent', () => {
    let minimalTrackEvent: SegmentTrackEventDef;
    let minimalPageEvent: SegmentScreenEventDef;
    let minimalIdentifyEvent: SegmentIdentifyEventDef;

    beforeEach(() => {
      minimalIdentifyEvent = createMinimalIdentifyEvent();
      minimalTrackEvent = createMinimalTrackEvent();
      minimalPageEvent = createMinimalPageEvent();
    });

    test('should return undefined for minimal events', () => {
      expect(getTransformUUIDFromEvent(packageSegmentEvent(minimalTrackEvent))).toBeUndefined();
      expect(getTransformUUIDFromEvent(packageSegmentEvent(minimalPageEvent))).toBeUndefined();
      expect(getTransformUUIDFromEvent(packageSegmentEvent(minimalIdentifyEvent))).toBeUndefined();
    });

    test('should return transformUUID if available', () => {
      const transformUUID = chance.string();
      minimalIdentifyEvent.traits.transformUUID = transformUUID;
      minimalPageEvent.properties.transformUUID = transformUUID;
      minimalTrackEvent.properties.transformUUID = transformUUID;

      expect(getTransformUUIDFromEvent(packageSegmentEvent(minimalTrackEvent))).toEqual(transformUUID);
      expect(getTransformUUIDFromEvent(packageSegmentEvent(minimalPageEvent))).toEqual(transformUUID);
      expect(getTransformUUIDFromEvent(packageSegmentEvent(minimalIdentifyEvent))).toEqual(transformUUID);
    });
  });

  describe('compareEvents', () => {

    test('should return empty mismatch if both events are exactly the same', () => {
      const trackEvent = packageSegmentEvent(createMinimalTrackEvent());
      const result = compareEvents(trackEvent, trackEvent);
      expect(result.eventId).toBe(trackEvent.msg.messageId);
      expect(result.mismatches.length).toBe(0);
    });

    test('should return empty mismatch when events have different messageIds', () => {
      const trackEvent = packageSegmentEvent(createMinimalTrackEvent());
      const otherTrackEvent: PackagedEvent = {
        ...trackEvent,
        msg: {
          ...trackEvent.msg
        },
      };

      otherTrackEvent.msg.messageId = chance.string();

      const result = compareEvents(trackEvent, otherTrackEvent);
      // Event Id should be the first event (Segment event)
      expect(result.eventId).toBe(trackEvent.msg.messageId);
      expect(result.mismatches.length).toBe(0);
    });

    test('should return empty mismatch when events have different sentat and timestamps', () => {
      const trackEvent = packageSegmentEvent(createMinimalTrackEvent());
      const otherTrackEvent: PackagedEvent = {
        ...trackEvent,
        msg: {
          ...trackEvent.msg
        },
      };

      otherTrackEvent.msg.sentAt = chance.timestamp().toString();
      otherTrackEvent.msg.timestamp = chance.timestamp().toString();

      const result = compareEvents(trackEvent, otherTrackEvent);
      expect(result.mismatches.length).toBe(0);
    });

    test('should return empty mismatch when one event has campaign', () => {
      const trackEvent = packageSegmentEvent(createMinimalTrackEvent());
      trackEvent.msg.context = {};
      const otherTrackEvent: PackagedEvent = {
        ...trackEvent,
        msg: {
          ...trackEvent.msg,
          context: {
            ...trackEvent.msg.context,
          },
        },
      };

      // @ts-ignore Havent actually added campagin to types because its unused by backend
      // But it is used by SegmentIO integration
      otherTrackEvent.msg.context.campaign = {};

      const result = compareEvents(trackEvent, otherTrackEvent);
      expect(result.mismatches.length).toBe(0);
    });

    test('should return mismatch when events have missing object', () => {
      const trackEvent = packageSegmentEvent(createMinimalTrackEvent());
      const otherTrackEvent: PackagedEvent = {
        ...trackEvent,
        msg: {
          ...trackEvent.msg
        },
      };

      trackEvent.msg.context = {};

      const result = compareEvents(trackEvent, otherTrackEvent);
      expect(result.mismatches.length).toBe(1);
      expect(result.mismatches[0]).toEqual({
        type: 'missing',
        path: 'msg.context',
      });
    });

    test('should return mismatch when events have different string', () => {
      const trackEvent = createMinimalTrackEvent();
      const otherTrackEvent = {
        ...trackEvent,
        properties: {
          ...trackEvent.properties
        },
      };

      trackEvent.properties.action = chance.string();

      const result = compareEvents(
        packageSegmentEvent(trackEvent),
        packageSegmentEvent(otherTrackEvent)
      );

      expect(result.mismatches.length).toBe(1);
      expect(result.mismatches[0]).toEqual({
        type: 'different',
        path: 'msg.properties.action',
        value: otherTrackEvent.properties.action,
      });
    });

    test('should return mismatch when events have added key', () => {
      const trackEvent = createMinimalTrackEvent();
      const otherTrackEvent = {
        ...trackEvent,
        properties: {
          ...trackEvent.properties
        },
      };

      otherTrackEvent.properties.containerId = chance.string();

      const result = compareEvents(
        packageSegmentEvent(trackEvent),
        packageSegmentEvent(otherTrackEvent)
      );

      expect(result.mismatches.length).toBe(1);
      expect(result.mismatches[0]).toEqual({
        type: 'added',
        path: 'msg.properties.containerId',
        value: otherTrackEvent.properties.containerId,
      });
    });

    test('should return mismatch when events have object instead of null', () => {
      const trackEvent = createMinimalTrackEvent();
      const otherTrackEvent = {
        ...trackEvent,
        properties: {
          ...trackEvent.properties
        },
      };

      trackEvent.properties.attributes = {
        value: {},
      };

      otherTrackEvent.properties.attributes = {
        value: null,
      };

      const result = compareEvents(
        packageSegmentEvent(trackEvent),
        packageSegmentEvent(otherTrackEvent)
      );

      expect(result.mismatches.length).toBe(1);
      expect(result.mismatches[0]).toEqual({
        type: 'different',
        path: 'msg.properties.attributes.value',
        value: 'literal `null`',
      });
    });

    test('should not return mismatch when events have NaN', () => {
      const trackEvent = createMinimalTrackEvent();

      trackEvent.properties.attributes = {
        value: NaN
      };

      const result = compareEvents(
        packageSegmentEvent(trackEvent),
        packageSegmentEvent(trackEvent)
      );

      expect(result.mismatches.length).toBe(0);
    });

    test('should return mismatch for different objects in array', () => {
      const trackEvent = createMinimalTrackEvent();
      const commonAttibutes = {
        common: [{
          test: ['hello', 'world'],
        }],
        differentAttributes: [{
          key: ['hello']
        }]
      };
      trackEvent.properties.attributes = commonAttibutes;
      const otherTrackEvent: SegmentTrackEventDef = {
        ...trackEvent,
        properties: {
          ...trackEvent.properties,
          attributes: {
            ...commonAttibutes,
            differentAttributes: [{
              key: ['world']
            }]
          }
        },
      };

      const result = compareEvents(
        packageSegmentEvent(trackEvent),
        packageSegmentEvent(otherTrackEvent)
      );

      expect(result.mismatches.length).toBe(1);
      expect(result.mismatches[0]).toEqual({
        type: 'different',
        path: 'msg.properties.attributes.differentAttributes.0.key.0',
        value: 'world',
      });
    });
  });
});
