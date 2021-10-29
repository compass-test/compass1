import { DwellTimeHelper } from '../src';

declare let require: any;

const TimeMe = require('timeme.js');

describe('DwellTimeHelper', () => {
  const SEARCH_ID_A = '6ebc99a4-3235-47d5-a9a4-4e4abb003557';
  const SEARCH_ID_B = 'd15077df-143e-4ab5-8473-9d7e272e5682';
  const DWELL_TIME = 10;
  const DEFAULT_TIMEOUT = 30;

  const EVENT_A = {
    source: 'event_a_source',
    containerType: 'event_a_container_type',
    containerId: 'event_a_container_id',
    containers: {
      event_a_container_key_1: {
        id: '1234',
        type: 'project',
      },
      event_a_container_key_2: {
        id: '0987',
      },
    },
    objectType: 'event_a_object_type',
    objectId: 'event_a_object_id',

    actionSubject: 'event_a_action_subject',
    action: 'event_a_action',

    actionSubjectId: 'event_a_action_subject_id',
    attributes: {
      attributeA1: 'attA1',
      attributeA2: 'attA2',
    },
    tags: ['tagA1', 'tagA2'],
  };

  const EVENT_B = {
    source: 'event_b_source',
    containerType: 'event_b_container_type',
    containerId: 'event_b_container_id',
    containers: {
      event_b_container_key_1: {
        id: '1234',
        type: 'project',
      },
      event_b_container_key_2: {
        id: '0987',
      },
    },
    objectType: 'event_b_object_type',
    objectId: 'event_b_object_id',

    actionSubject: 'event_b_action_subject',
    action: 'event_b_action',

    actionSubjectId: 'event_b_action_subject_id',
    attributes: {
      attributeB1: 'attB1',
      attributeB2: 'attB2',
    },
    tags: ['tagB1', 'tagB2'],
  };

  let trackCallback: any;

  function buildHelper(eventData: any) {
    return new DwellTimeHelper(trackCallback, eventData, SEARCH_ID_A);
  }

  function startHelper(helper: any) {
    helper.start();
    TimeMe.active = true;
  }

  function assertCorrectDwellEventFired(
    eventData: any,
    searchId: any,
    finalDwellEvent = true,
  ) {
    expect(trackCallback).lastCalledWith(
      expect.objectContaining({
        actionSubject: eventData.actionSubject,
        attributes: expect.objectContaining({
          searchReferrer: searchId,
          finalDwellEvent,
        }),
      }),
    );
  }

  beforeEach(() => {
    trackCallback = jest.fn();
    TimeMe.initialize = jest.fn();

    const timerMock = jest.fn();
    timerMock.mockReturnValue(DWELL_TIME);
    TimeMe.getTimeOnCurrentPageInMilliseconds = timerMock;

    TimeMe.active = false;
  });

  test('should pass correct event attributes', () => {
    // Arrange
    const helper = buildHelper(EVENT_A);

    // Act
    startHelper(helper);
    window.dispatchEvent(new Event('beforeunload'));

    // Assert
    const eventArg = trackCallback.mock.calls[0][0];
    expect(eventArg.action).toBe('dwelled');
    expect(eventArg.actionSubject).toBe(EVENT_A.actionSubject);
    expect(eventArg.actionSubjectId).toBe(EVENT_A.actionSubjectId);
    expect(eventArg.source).toBe(EVENT_A.source);
    expect(eventArg.containerType).toBe(EVENT_A.containerType);
    expect(eventArg.containerId).toBe(EVENT_A.containerId);
    expect(eventArg.containers.event_a_container_key_1).toBe(
      EVENT_A.containers.event_a_container_key_1,
    );
    expect(eventArg.containers.event_a_container_key_2).toBe(
      EVENT_A.containers.event_a_container_key_2,
    );
    expect(eventArg.objectType).toBe(EVENT_A.objectType);
    expect(eventArg.objectId).toBe(EVENT_A.objectId);
    expect(eventArg.tags).toBe(EVENT_A.tags);
    expect(eventArg.attributes.attributeA1).toBe(
      EVENT_A.attributes.attributeA1,
    );
    expect(eventArg.attributes.attributeA2).toBe(
      EVENT_A.attributes.attributeA2,
    );
    expect(eventArg.attributes.dwellTime).toBe(DWELL_TIME);
    expect(eventArg.attributes.finalDwellEvent).toBe(true);
    expect(eventArg.attributes.searchReferrer).toBe(SEARCH_ID_A);
  });

  describe('constructor', () => {
    test('should throw if trackCallback is missing', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new DwellTimeHelper();
      }).toThrow('trackCallback is required for DwellTimeHelper');
    });

    test('should throw if eventData is missing', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new DwellTimeHelper(trackCallback);
      }).toThrow('Missing event');
    });
  });

  describe('start', () => {
    test('should trigger analytics on beforeunload', () => {
      // Arrange
      const helper = buildHelper(EVENT_A);

      // Act
      startHelper(helper);
      window.dispatchEvent(new Event('beforeunload'));

      // Assert
      assertCorrectDwellEventFired(EVENT_A, SEARCH_ID_A);
    });

    test('should initialise polling', () => {
      // Arrange
      TimeMe.callAfterTimeElapsedInSeconds = jest.fn();
      const helper = buildHelper(EVENT_A);

      // Act
      startHelper(helper);

      // Assert
      expect(TimeMe.callAfterTimeElapsedInSeconds).toBeCalled();
      TimeMe.callAfterTimeElapsedInSeconds.mock.calls[0][1](); // Trigger poll
      assertCorrectDwellEventFired(EVENT_A, SEARCH_ID_A, false);
    });

    test('should throw an error if start is called more than once', () => {
      // Arrange
      const helper = buildHelper(EVENT_A);
      startHelper(helper);

      // Act / Assert
      expect(() => {
        startHelper(helper);
      }).toThrow(
        'DwellTimeHelper should only be initialised once per page load.',
      );
    });
  });

  describe('stop', () => {
    let stopAllTimersSpy: any;
    let resetAllRecordedPageTimesSpy: any;
    beforeEach(() => {
      stopAllTimersSpy = jest.spyOn(TimeMe, 'stopAllTimers');
      resetAllRecordedPageTimesSpy = jest.spyOn(
        TimeMe,
        'resetAllRecordedPageTimes',
      );
    });

    afterEach(() => {
      stopAllTimersSpy.mockRestore();
      resetAllRecordedPageTimesSpy.mockRestore();
    });

    test('should send final dwell event when timer is active', () => {
      // Arrange
      const helper = buildHelper(EVENT_A);
      startHelper(helper);
      TimeMe.active = true;

      // Act
      helper.stop();

      // Assert
      assertCorrectDwellEventFired(EVENT_A, SEARCH_ID_A);
    });

    test('should not send final dwell event when timer is inactive', () => {
      // Arrange
      TimeMe.active = false;
      const helper = buildHelper(EVENT_A);

      // Act
      helper.stop();

      // Assert
      expect(trackCallback).not.toBeCalled();
    });

    test('should reset timer', () => {
      // Arrange
      const helper = buildHelper(EVENT_A);
      startHelper(helper);

      // Act
      helper.stop();

      // Assert
      expect(stopAllTimersSpy).toBeCalled();
      expect(resetAllRecordedPageTimesSpy).toBeCalled();
      expect(TimeMe.timeElapsedCallbacks).toEqual([]);
    });

    test('should not fire more than final dwell', () => {
      const orignial = TimeMe.stopAllTimers;
      TimeMe.stopAllTimers = jest.fn(() => {
        TimeMe.active = false;
      });
      const helper = buildHelper(EVENT_A);
      startHelper(helper);

      helper.stop();
      window.dispatchEvent(new Event('beforeunload'));

      expect(trackCallback).toBeCalled();
      expect(trackCallback.mock.calls).toHaveLength(1);
      expect(trackCallback.mock.calls[0][0].attributes.finalDwellEvent).toBe(
        true,
      );

      TimeMe.stopAllTimers = orignial;
      trackCallback.mockRestore();
    });
  });

  describe('newPage', () => {
    test('should send final dwell event when timer is active', () => {
      // Arrange
      const helper = buildHelper(EVENT_A);
      startHelper(helper);
      TimeMe.active = true;

      // Act
      helper.newPage(EVENT_B);

      // Assert
      assertCorrectDwellEventFired(EVENT_A, SEARCH_ID_A);
    });

    test('should not send final dwell event when timer is inactive', () => {
      // Arrange
      TimeMe.active = false;
      const helper = buildHelper(EVENT_A);

      // Act
      helper.newPage(EVENT_B);

      // Assert
      expect(trackCallback).not.toBeCalled();
    });

    test('should update eventData', () => {
      // Arrange
      const helper = buildHelper(EVENT_A);
      startHelper(helper);

      // Act
      helper.newPage(EVENT_B);

      // Assert
      window.dispatchEvent(new Event('beforeunload'));
      expect(trackCallback.mock.calls.length).toBe(2);
      assertCorrectDwellEventFired(EVENT_B, undefined, true);
    });

    test('should update searchSessionId', () => {
      // Arrange
      const helper = buildHelper(EVENT_A);
      startHelper(helper);

      // Act
      helper.newPage(EVENT_B, SEARCH_ID_B);

      // Assert
      window.dispatchEvent(new Event('beforeunload'));
      assertCorrectDwellEventFired(EVENT_B, SEARCH_ID_B, true);
    });

    test('should reset timer', () => {
      // Arrange
      TimeMe.stopAllTimers = jest.fn();
      TimeMe.resetAllRecordedPageTimes = jest.fn();

      const helper = buildHelper(EVENT_A);
      startHelper(helper);

      // Act
      helper.newPage(EVENT_B);

      // Assert
      expect(TimeMe.stopAllTimers).toBeCalled();
      expect(TimeMe.resetAllRecordedPageTimes).toBeCalled();
      expect(TimeMe.timeElapsedCallbacks).toEqual([]);
    });

    test('should reinitialise timer', () => {
      // Arrange
      const helper = buildHelper(EVENT_A);
      startHelper(helper);

      // Act
      helper.newPage(EVENT_B);

      // Assert
      expect(TimeMe.initialize).toBeCalledWith({
        idleTimeoutInSeconds: DEFAULT_TIMEOUT,
      });
    });

    test('should not result in more than one beforeunload listener', () => {
      // Arrange
      const helper = buildHelper(EVENT_A);
      startHelper(helper);

      // Act
      helper.newPage(EVENT_B);

      // Assert
      window.dispatchEvent(new Event('beforeunload'));
      expect(trackCallback.mock.calls.length).toBe(2);
    });
  });
});
