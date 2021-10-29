import { eventType } from '../../src/analyticsWebTypes';
import {
  PackagedEvent,
  SegmentEvent,
  SegmentEventTypes,
  SegmentIdentifyEventDef,
  SegmentScreenEventDef,
  SegmentTrackEventDef,
} from '../../src/integration/types';

export const createMinimalTrackEvent = (): SegmentTrackEventDef => {
  return {
    messageId: 'random-1',
    timestamp: new Date().toISOString(),
    type: SegmentEventTypes.TRACK,
    event: 'some event',
    properties: {
      action: 'event',
      actionSubject: 'some',
      env: 'test',
      product: 'test',
      eventType: eventType.TRACK,
      origin: 'web',
      platform: 'web',
      source: 'test',
    }
  };
};

export const createMinimalPageEvent = (): SegmentScreenEventDef => {
  return {
    messageId: 'random-1',
    timestamp: new Date().toISOString(),
    type: SegmentEventTypes.PAGE,
    name: 'ui viewed',
    category: null,
    properties: {
      env: 'test',
      product: 'test',
      origin: 'web',
      platform: 'web',
    }
  };
};

export const createMinimalIdentifyEvent = (): SegmentIdentifyEventDef => {
  return {
    messageId: 'random-1',
    timestamp: new Date().toISOString(),
    type: SegmentEventTypes.IDENTIFY,
    traits: {
      userIdType: 'userId',
      entityId: 'test',
      entityType: 'test',
    }
  };
}

export const packageSegmentEvent = (event: SegmentEvent): PackagedEvent => {
  return {
    headers: {},
    url: 'test',
    msg: event,
  };
};
