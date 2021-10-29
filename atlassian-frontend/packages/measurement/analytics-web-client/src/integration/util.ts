// @ts-ignore
import traverseISODate from '@segment/isodate-traverse';

import { eventType } from '../index';
import { Context } from '../types';

import {
  EventMismatch,
  Mismatch,
  PackagedEvent,
  SegmentContextDef,
  SegmentEvent,
  SegmentEventTypes,
  SegmentIdentifyEventDef,
  SegmentScreenEventDef,
  SegmentTrackEventDef,
} from './types';

export const buildContext = (context: Context): SegmentContextDef => {
  return {
    ...context.context,
    page: undefined, // To stay consistent with SegmentIo
    userAgent: navigator.userAgent,
  };
};

export const prepareEventProperties = <T extends object>(properties: T): T => {
  const propertiesWithoutUndefined = nestedRemoveUndefinedValues(properties);
  return traverseISODate(propertiesWithoutUndefined);
};

// This function will essentially deepClone as well
export const nestedRemoveUndefinedValues = <T extends object>(obj: T): T => {
  const clone: any = {};
  Object.keys(obj).forEach(key => {
    const value = getValueOfObject(obj, key);
    if (value !== undefined) {
      if (typeof value === 'object' && value !== null) {
        clone[key] = nestedRemoveUndefinedValues(value);
      } else {
        clone[key] = value;
      }
    }
  });
  return clone;
};

// Using ts-ignore everywhere urked me
const getValueOfObject = (obj: object, key: string): unknown => {
  // @ts-ignore This is an object
  return obj[key];
};

// Utils for event comparison

export const getTransformUUIDFromEvent = (event: PackagedEvent): string | undefined  => {
  const { type } = event.msg;
  switch(type) {
    case SegmentEventTypes.IDENTIFY:
      return getTransformUUIDFromIdentifyEvent(event.msg as SegmentIdentifyEventDef);
    case SegmentEventTypes.PAGE:
      return getTransformUUIDFromPageEvent(event.msg as SegmentScreenEventDef);
    case SegmentEventTypes.TRACK:
      return getTransformUUIDFromTrackEvent(event.msg as SegmentTrackEventDef);
  }
};

const getTransformUUIDFromIdentifyEvent = (event: SegmentIdentifyEventDef): string | undefined  => {
  return event.traits?.transformUUID;
};

const getTransformUUIDFromPageEvent = (event: SegmentScreenEventDef): string | undefined => {
  return event.properties?.transformUUID;
};

const getTransformUUIDFromTrackEvent = (event: SegmentTrackEventDef): string | undefined => {
  return event.properties?.transformUUID;
};

export const getEventType = (event: PackagedEvent): eventType  => {
  const { type } = event.msg;
  switch(type) {
    case SegmentEventTypes.IDENTIFY:
      return getEventTypeFromIdentifyEvent(event.msg as SegmentIdentifyEventDef);
    case SegmentEventTypes.PAGE:
      return getEventTypeFromPageEvent(event.msg as SegmentScreenEventDef);
    case SegmentEventTypes.TRACK:
      return getEventTypeFromTrackEvent(event.msg as SegmentTrackEventDef);
  }
};

const getEventTypeFromIdentifyEvent = (event: SegmentIdentifyEventDef): eventType  => {
  return eventType.IDENTIFY;
};

const getEventTypeFromPageEvent = (event: SegmentScreenEventDef): eventType => {
  return eventType.SCREEN;
};

const getEventTypeFromTrackEvent = (event: SegmentTrackEventDef): eventType => {
  return event.properties.eventType;
};

export const compareEvents = (segmentEvent: PackagedEvent, ourEvent: PackagedEvent): EventMismatch => {
  const { messageId } = segmentEvent.msg;
  const packageMismatches = packageMismatch(segmentEvent, ourEvent);
  const eventMismatches = compareEvent(segmentEvent.msg, ourEvent.msg);
  const mismatches = packageMismatches.concat(eventMismatches);
  const mismatch: EventMismatch = {
    eventId: messageId,
    type: getEventType(segmentEvent),
    mismatches,
  };
  return mismatch;
};

const compareEvent = (segmentEvent: SegmentEvent, ourEvent: SegmentEvent): Mismatch[] => {
  if (segmentEvent && ourEvent) {
    return getMismatches(
      'msg',
      segmentEvent,
      ourEvent,
      [
        // All of these can change safely between the two events
        'msg.messageId',
        'msg.sentAt',
        'msg.timestamp',
        // This field can be set to random things depending on query params and is not processed in the backend
        'msg.context.campaign'
      ]
    );
  } else if (segmentEvent) {
    return [{
      path: 'msg',
      type: 'missing',
    }];
  } else {
    return [{
      path: 'msg',
      type: 'added',
      value: ourEvent
    }];
  }
}

const packageMismatch = (segmentEvent: PackagedEvent, ourEvent: PackagedEvent): Mismatch[] => {
  return getMismatches('', segmentEvent, ourEvent, ['msg']);
}

const getMismatches = <T extends object>(pathToObject: string, segmentObject: T, ourObject: T, ignoredKeys: string[] = []): Mismatch[] => {

  const segmentKeys = Object.keys(segmentObject).filter(key => !ignoredKeys.includes(createRelativeKey(pathToObject, key)));
  const ourKeys = Object.keys(ourObject).filter(key => !ignoredKeys.includes(createRelativeKey(pathToObject, key)));

  const mismatches: Mismatch[] = ourKeys.filter(key => !segmentKeys.includes(key))
    .map(key => ({
        path: createRelativeKey(pathToObject, key),
        type: 'added',
        value: valueOrLiteralUndefined(
          getValueOfObject(ourObject, key)
        ),
    }));

  segmentKeys.forEach(key => {
    const segmentValue = getValueOfObject(segmentObject, key);
    const ourValue = getValueOfObject(ourObject, key);
    if (!(key in ourObject)) {
      mismatches.push({
        path: createRelativeKey(pathToObject, key),
        type: 'missing',
      });
    } else if (typeof segmentValue === 'object' && segmentValue !== null) {
      if (typeof ourValue !== 'object' || ourValue === null) {
        mismatches.push({
          path: createRelativeKey(pathToObject, key),
          type: 'different',
          value: valueOrLiteralUndefined(ourValue),
        });
      } else {
        const nestedMismatches = getMismatches<object>(
          createRelativeKey(pathToObject, key),
          segmentValue as object,
          ourValue as object,
          ignoredKeys
        );
        nestedMismatches.forEach(mismatch => mismatches.push(mismatch));
      }
    } else {
      if (segmentValue !== ourValue) {
        // NaN !== NaN so we have to do a specific check to see if both values are NaN
        if (!(
          typeof segmentValue === 'number'
          && isNaN(segmentValue)
          && typeof ourValue === 'number'
          && isNaN(ourValue)
        )) {
          mismatches.push({
            path: createRelativeKey(pathToObject, key),
            type: 'different',
            value: valueOrLiteralUndefined(ourValue),
          });
        }
      }
    }
  });
  return mismatches;
};

const createRelativeKey = (pathToObject: string, currentKey: string): string => {
  return pathToObject ? `${pathToObject}.${currentKey}` : currentKey;
}

const valueOrLiteralUndefined = (item: unknown): unknown => {
  if (item === undefined) {
    return 'literal `undefined`';
  } else if (item === null) {
    return 'literal `null`';
  } else if (typeof item === 'number' && isNaN(item)) {
    return 'literal `NaN`';
  }
  return item;
};
