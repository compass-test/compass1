import type { XIDItem } from '@atlassian/atl-cross-domain-tracking/dist/esm';

import { eventType } from '../src';
import { attachXidToMultipleEvents, attachXidToSingleEvent } from '../src/AttachXID';
import { PackagedEvent, SegmentEventTypes } from '../src/integration/types';
import { unknownXidCallback } from '../src/XIDPromise';

const exampleTrackEvent: PackagedEvent = {
  headers: { subHeader: 'foo' },
  msg: {
    messageId: '123',
    timestamp: '456',
    event: 'some event',
    properties: {
      env: 'test',
      product: 'awc',
      origin: 'awc',
      platform: 'desktop',
      eventType: eventType.TRACK,
      source: 'some-source',
      action: 'action',
      actionSubject: 'actionSubject',
    },
    type: SegmentEventTypes.TRACK,
  }, url: 'someurl.com'
};

const expectedOutputForTrackEvent = () => {
  const expectedOutput = { ...exampleTrackEvent };
  if (expectedOutput.msg.type === SegmentEventTypes.TRACK) {
    Object.assign(expectedOutput.msg.properties, { xid: unknownXidCallback() });
  }

  return expectedOutput;
}

const examplePageEvent: PackagedEvent = {
  headers: { subHeader: 'foo' },
  msg: {
    messageId: '123',
    timestamp: '456',
    properties: {
      env: 'test',
      product: 'awc',
      origin: 'awc',
      platform: 'desktop',
    },
    type: SegmentEventTypes.PAGE,
    category: null,
  }, url: 'someurl.com',
};

const expectedOutputForPageEvent = () => {
  const expectedOutput = { ...examplePageEvent }
  if (expectedOutput.msg.type === SegmentEventTypes.PAGE) {
    Object.assign(expectedOutput.msg.properties, { xid: unknownXidCallback() });
  }

  return expectedOutput;
}

const exampleIdentifyEvent: PackagedEvent = {
  headers: { subHeader: 'foo' },
  msg: {
    messageId: '123',
    timestamp: '456',
    type: SegmentEventTypes.IDENTIFY,
    traits: {
      userIdType: 'userIdType',
      entityId: 'entityId',
      entityType: 'entityType',
    }
  }, url: 'someurl.com',
};

const expectedOutputForIdentifyEvent = () => {
  const expectedOutput = { ...exampleIdentifyEvent }
  if (expectedOutput.msg.type === SegmentEventTypes.IDENTIFY) {
    Object.assign(expectedOutput.msg.traits, { xid: unknownXidCallback() });
  }

  return expectedOutput;
}

const promiseOfXidCallback: Promise<() => XIDItem[]> = Promise.resolve(unknownXidCallback);

describe('AttachXID', () => {
  describe('attachXidToSingleEvent', () => {
    test('If xidCallback is a function attaches the XID to the input item of Track event type ', () => {
      expect(attachXidToSingleEvent(exampleTrackEvent, unknownXidCallback)).toEqual(expectedOutputForTrackEvent());
    })

    test('If xidCallback is a function attaches the XID to the input item of Page event type ', () => {
      expect(attachXidToSingleEvent(examplePageEvent, unknownXidCallback)).toEqual(expectedOutputForPageEvent());
    })

    test('If xidCallback is a function attaches the XID to the input item of type identify', () => {
      expect(attachXidToSingleEvent(exampleIdentifyEvent, unknownXidCallback)).toEqual(expectedOutputForIdentifyEvent());
    })
  })

  describe('attachXidToMultipleEvents', () => {
    test('attaches XID to single Track event', async () => {
      expect(await attachXidToMultipleEvents([exampleTrackEvent], promiseOfXidCallback)).toEqual([expectedOutputForTrackEvent()]);
    })

    test('attaches XID to single Page event', async () => {
      expect(await attachXidToMultipleEvents([examplePageEvent], promiseOfXidCallback)).toEqual([expectedOutputForPageEvent()]);
    })

    test('attaches XID to single Identify event', async () => {
      expect(await attachXidToMultipleEvents([exampleIdentifyEvent], promiseOfXidCallback)).toEqual([expectedOutputForIdentifyEvent()]);
    })

    test('attaches XID to multiple events', async () => {
      const events = [exampleTrackEvent, examplePageEvent, exampleIdentifyEvent];
      const expectedOutput = [expectedOutputForTrackEvent(), expectedOutputForPageEvent(), expectedOutputForIdentifyEvent()];
      expect(await attachXidToMultipleEvents(events, promiseOfXidCallback)).toEqual(expectedOutput);
    })
  })
})
