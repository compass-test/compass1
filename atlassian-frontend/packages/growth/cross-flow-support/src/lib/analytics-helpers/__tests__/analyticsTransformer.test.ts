import { transformEvent } from '../analyticsTransformers';
import {
  UI_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  OPERATIONAL_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
} from '@atlaskit/analytics-gas-types';

const getRawEvent = (type: string) => ({
  context: [
    {
      packageName: '@some/package',
      packageVersion: '0.0.1',
      source: 'outerSpace',
      key: 'value',
    },
    {
      source: 'xflow',
    },
  ],
  payload: {
    eventType: type,
    action: 'clicked',
    actionSubject: 'button',
    actionSubjectId: 'continueButton',
    attributes: {
      other: 'val',
    },
    someOtherValue: 'value',
    name: 'specificScreen',
  },
});

describe('processEvent', () => {
  const nonScreenEventTypes = [
    UI_EVENT_TYPE,
    TRACK_EVENT_TYPE,
    OPERATIONAL_EVENT_TYPE,
  ];
  it('should assemble UI, Operational, and Track events in the same way', () => {
    const expectedResult = {
      source: 'xflow',
      action: 'clicked',
      actionSubject: 'button',
      actionSubjectId: 'continueButton',
      attributes: {
        packageName: '@some/package',
        packageVersion: '0.0.1',
        key: 'value',
        source: 'xflow',
        other: 'val',
      },
      tags: ['growth'],
    };
    for (let i = 0; i < nonScreenEventTypes.length; i++) {
      const newEvent = {
        eventType: nonScreenEventTypes[i],
        ...expectedResult,
      };
      expect(transformEvent(getRawEvent(nonScreenEventTypes[i]))).toEqual(
        newEvent,
      );
    }
  });
  it("should assemble Screen events in with it's own structure", () => {
    const expectedResult = {
      eventType: SCREEN_EVENT_TYPE,
      source: 'xflow',
      name: 'specificScreen',
      attributes: {
        packageName: '@some/package',
        packageVersion: '0.0.1',
        key: 'value',
        source: 'xflow',
        other: 'val',
      },
      tags: ['growth'],
    };
    expect(transformEvent(getRawEvent(SCREEN_EVENT_TYPE))).toEqual(
      expectedResult,
    );
  });
});
