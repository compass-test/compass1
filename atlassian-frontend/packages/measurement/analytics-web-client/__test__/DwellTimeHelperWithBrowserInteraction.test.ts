import { DwellTimeHelperWithBrowserInteraction as DwellTimeHelper } from '../src';
import * as eventValidation from '../src/eventValidation';

jest.mock('browser-interaction-time', () => jest.fn().mockImplementation(() => ({
  startTimer: jest.fn(),
  stopTimer: jest.fn(),
  reset: jest.fn(),
  addTimeIntervalEllapsedCallback: jest.fn(),
  destroy: jest.fn(),
  getTimeInMilliseconds: jest.fn(),
  isRunning: jest.fn(() => false),
})),);

describe('dwellTimeHelper', () => {
  let trackCallback: any;

  const SEARCH_ID_A = '6ebc99a4-3235-47d5-a9a4-4e4abb003557';
  const SEARCH_ID_B = 'd15077df-143e-4ab5-8473-9d7e272e5682';

  const EVENT_A = {
    source: 'event_a_source',
    containerType: 'event_a_container_type',
    containerId: 'event_a_container_id',
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

  beforeEach(() => {
    trackCallback = jest.fn();
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

    test('should not throw with all parameters', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new DwellTimeHelper(trackCallback, EVENT_A);
      }).not.toThrow();
    });

    test('should be able to have multiple instances in parallel', () => {
      const dwellTimeHelperA = new DwellTimeHelper(trackCallback, EVENT_A);
      const dwellTimeHelperB = new DwellTimeHelper(trackCallback, EVENT_A);
      expect(dwellTimeHelperA).not.toBe(dwellTimeHelperB);
    });
  });

  describe('.start()', () => {
    let dwellTimeHelperA: any;
    let dwellTimeHelperB: any;
    let dwellTimeHelperC: any;
    let addEventListenerSpy: any;

    beforeEach(() => {
      jest.clearAllMocks();

      dwellTimeHelperA = new DwellTimeHelper(trackCallback, EVENT_A);
      dwellTimeHelperB = new DwellTimeHelper(trackCallback, EVENT_A);
      dwellTimeHelperC = new DwellTimeHelper(trackCallback, EVENT_A);

      addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    });

    test('should add callback object to browserInteractionTime', () => {
      expect(addEventListenerSpy).not.toBeCalled();
      dwellTimeHelperA.start();
      expect(
        dwellTimeHelperA.browserInteractionTime.addTimeIntervalEllapsedCallback,
      ).toHaveBeenCalledTimes(1);
      expect(addEventListenerSpy).toHaveBeenCalledTimes(1);

      addEventListenerSpy.mockRestore();
    });

    test('when called on different instances, should add callbacks to different instances', () => {
      dwellTimeHelperA.start();
      dwellTimeHelperB.start();
      dwellTimeHelperC.start();

      expect(
        dwellTimeHelperA.browserInteractionTime.addTimeIntervalEllapsedCallback,
      ).toBeCalled();
      expect(
        dwellTimeHelperB.browserInteractionTime.addTimeIntervalEllapsedCallback,
      ).toBeCalled();
      expect(
        dwellTimeHelperC.browserInteractionTime.addTimeIntervalEllapsedCallback,
      ).toBeCalled();
      expect(addEventListenerSpy).toHaveBeenCalledTimes(3);
      addEventListenerSpy.mockRestore();
    });
  });

  describe('.stop()', () => {
    let dwellTimeHelper: any;
    let sendDwellEventSpy: any;

    beforeEach(() => {
      dwellTimeHelper = new DwellTimeHelper(trackCallback, EVENT_A);
      dwellTimeHelper.start();
      sendDwellEventSpy = jest.spyOn(dwellTimeHelper, '_sendDwellEvent');
    });

    test('should add callback object to browserInteractionTime', () => {
      dwellTimeHelper.stop();
      expect(dwellTimeHelper.browserInteractionTime.stopTimer).toBeCalled();
      expect(sendDwellEventSpy).not.toBeCalled();
    });

    test('should add callback object to browserInteractionTime', () => {
      dwellTimeHelper.browserInteractionTime.isRunning.mockImplementation(
        () => true,
      );
      dwellTimeHelper.stop();
      expect(dwellTimeHelper.browserInteractionTime.stopTimer).toBeCalled();
      expect(sendDwellEventSpy).toBeCalled();
    });
  });

  describe('.newPage()', () => {
    let dwellTimeHelper: any;
    let stopSpy: any;
    let startSpy: any;
    let setEventDataSpy: any;
    let setSearchSessionIdSpy: any;

    beforeEach(() => {
      // @ts-ignore
      eventValidation.validateDwellBaseEvent = jest.fn();
      dwellTimeHelper = new DwellTimeHelper(
        trackCallback,
        EVENT_A,
        SEARCH_ID_A,
      );
      dwellTimeHelper.browserInteractionTime.reset = jest.fn();
      stopSpy = jest.spyOn(dwellTimeHelper, 'stop');
      startSpy = jest.spyOn(dwellTimeHelper, 'start');
      setEventDataSpy = jest.spyOn(dwellTimeHelper, 'setEventData');
      setSearchSessionIdSpy = jest.spyOn(dwellTimeHelper, 'setSearchSessionId');
    });

    test('should add callback object to browserInteractionTime', () => {
      dwellTimeHelper.newPage(EVENT_B, SEARCH_ID_B);
      expect(eventValidation.validateDwellBaseEvent).toBeCalled();
      expect(dwellTimeHelper.browserInteractionTime.reset).toBeCalled();
      expect(stopSpy).toBeCalled();
      expect(startSpy).toBeCalled();
      expect(setEventDataSpy).toBeCalled();
      expect(setSearchSessionIdSpy).toBeCalled();

      expect(dwellTimeHelper.getSearchSessionId()).toEqual(SEARCH_ID_B);
      expect(dwellTimeHelper.getEventData()).toBe(EVENT_B);
    });
  });

  describe('.destroy()', () => {
    let dwellTimeHelper: any;
    let removeEventListenerSpy: any;

    beforeEach(() => {
      removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
      dwellTimeHelper = new DwellTimeHelper(trackCallback, EVENT_A);
      dwellTimeHelper.browserInteractionTime.destroy = jest.fn();
    });

    afterEach(() => {
      removeEventListenerSpy.mockRestore();
      dwellTimeHelper.browserInteractionTime.destroy.mockRestore();
    });

    test('should remove all event listener', () => {
      dwellTimeHelper.destroy();

      expect(removeEventListenerSpy).toBeCalled();
      expect(dwellTimeHelper.browserInteractionTime.destroy).toBeCalled();
    });
  });
});
