/* eslint-disable no-underscore-dangle */
import AnalyticsWebClient from '../src';
import { apdexType } from '../src/analyticsWebTypes';
import ApdexEvent from '../src/apdexEvent';
import PageVisibility from '../src/pageVisibility';
import Performance from '../src/performance';

import { PRODUCT_INFO } from './util/commonTests';

const emptyFunction = () => {
  // do nothing
};

const windowPerformanceMock: any = {
  clearMarks: jest.fn(),
  mark: jest.fn(),
  now: jest.fn(),
  getEntriesByName: jest.fn(),
  timeOrigin: 1000,
  timing: {},
};

function mockWindowPerformance() {
  Object.defineProperty(window, 'performance', {
    writable: true,
    value: { ...windowPerformanceMock },
  });
}

describe('AnalyticsWebClient', () => {
  describe('ApdexEvent', () => {
    beforeEach(() => {
      mockWindowPerformance();

      Object.defineProperty(document, 'hidden', {
        value: false,
        configurable: true,
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe(`${apdexType.INITIAL_LOAD} type (init, start & stop)`, () => {
      test('should send Apdex', () => {
        windowPerformanceMock.now = jest.fn().mockReturnValue(888);
        Object.defineProperty(window, 'performance', {
          writable: true,
          value: { ...windowPerformanceMock },
        });
        const client = new AnalyticsWebClient(PRODUCT_INFO);
        const apdexEvent = client._apdexEvent;
        apdexEvent._onEvent = jest.fn();

        client.stopApdexEvent({
          task: 'someTask',
          type: apdexType.INITIAL_LOAD,
          additionalAttributes: {
            hasFeatureFlag: true,
          },
        });

        expect(apdexEvent).toBeInstanceOf(ApdexEvent);
        expect(apdexEvent._startedEvents.get('someTask')).toBeUndefined();
        expect(window.performance.now).toHaveBeenCalledTimes(1);
        expect(apdexEvent._onEvent).toHaveBeenCalledTimes(1);
        expect(apdexEvent._onEvent).toHaveBeenCalledWith(
          {
            action: 'readyForUser',
            actionSubject: 'ui',
            attributes: {
              apdex: 1,
              duration: 888,
              startTime: 1000,
              stopTime: 1888,
              task: 'someTask',
              taskId: undefined,
              threshold: 1000,
              type: apdexType.INITIAL_LOAD,
              isActiveTab: true,
              hasFeatureFlag: true,
            },
            source: 'ui',
          },
          undefined,
        );
      });

      test('should send Apdex with inactivity', () => {
        windowPerformanceMock.now.mockReturnValue(888);
        Object.defineProperty(window, 'performance', {
          writable: true,
          value: { ...windowPerformanceMock },
        });
        const client = new AnalyticsWebClient(PRODUCT_INFO);
        const apdexEvent = client._apdexEvent;
        apdexEvent._onEvent = jest.fn();

        apdexEvent.onVisibilityChange(false);

        expect(apdexEvent._wasPreviouslyHidden).toEqual(true);

        client.stopApdexEvent({
          task: 'someTask',
          type: apdexType.INITIAL_LOAD,
          additionalAttributes: {
            hasFeatureFlag: true,
          },
        });

        expect(apdexEvent._onEvent).toHaveBeenCalledWith(
          {
            action: 'readyForUser',
            actionSubject: 'ui',
            attributes: {
              apdex: 1,
              duration: 888,
              startTime: 1000,
              stopTime: 1888,
              task: 'someTask',
              taskId: undefined,
              threshold: 1000,
              type: apdexType.INITIAL_LOAD,
              isActiveTab: false,
              hasFeatureFlag: true,
            },
            source: 'ui',
          },
          undefined,
        );
      });
    });

    describe(`${apdexType.TRANSITION} type (init, start, stop & get)`, () => {
      test('should send Apdex', () => {
        windowPerformanceMock.getEntriesByName = jest.fn().mockReturnValueOnce([
          {
            entryType: 'mark',
            name: 'someTask-start',
            startTime: 50,
          },
        ]);
        windowPerformanceMock.now.mockReturnValue(100);
        Object.defineProperty(window, 'performance', {
          writable: true,
          value: { ...windowPerformanceMock },
        });
        const client = new AnalyticsWebClient(PRODUCT_INFO);
        const apdexEvent = client._apdexEvent;
        apdexEvent._onEvent = jest.fn();

        client.startApdexEvent({ task: 'someTask' });

        expect(apdexEvent).toBeInstanceOf(ApdexEvent);
        expect(apdexEvent._startedEvents.get('someTask')).toBeTruthy();
        expect(windowPerformanceMock.clearMarks).toHaveBeenCalledTimes(1);
        expect(windowPerformanceMock.clearMarks).toHaveBeenCalledWith(
          'someTask-start',
        );
        expect(windowPerformanceMock.mark).toHaveBeenCalledWith(
          'someTask-start',
        );

        client.stopApdexEvent({
          task: 'someTask',
          type: apdexType.TRANSITION,
          additionalAttributes: {
            hasFeatureFlag: true,
          },
        });

        expect(apdexEvent._startedEvents.get('someTask')).toBeUndefined();
        expect(windowPerformanceMock.getEntriesByName).toHaveBeenCalledWith(
          'someTask-start',
        );
        expect(windowPerformanceMock.now).toHaveBeenCalledTimes(1);
        expect(windowPerformanceMock.clearMarks).toHaveBeenCalledTimes(3);
        expect(windowPerformanceMock.clearMarks).toHaveBeenCalledWith(
          'someTask-start',
        );
        expect(windowPerformanceMock.clearMarks).toHaveBeenCalledWith(
          'someTask-stop',
        );
        expect(apdexEvent._onEvent).toHaveBeenCalledTimes(1);
        expect(apdexEvent._onEvent).toHaveBeenCalledWith(
          {
            action: 'readyForUser',
            actionSubject: 'ui',
            attributes: {
              apdex: 1,
              duration: 50,
              startTime: 1050,
              stopTime: 1100,
              task: 'someTask',
              taskId: undefined,
              threshold: 1000,
              type: apdexType.TRANSITION,
              isActiveTab: true,
              hasFeatureFlag: true,
            },
            source: 'ui',
          },
          undefined,
        );
      });

      test('should send Apdex with inactivity', () => {
        windowPerformanceMock.getEntriesByName.mockReturnValueOnce([
          {
            entryType: 'mark',
            name: 'someTask-start',
            startTime: 50,
          },
        ]);

        windowPerformanceMock.now.mockReturnValue(100);
        Object.defineProperty(window, 'performance', {
          writable: true,
          value: { ...windowPerformanceMock },
        });
        const client = new AnalyticsWebClient(PRODUCT_INFO);
        const apdexEvent = client._apdexEvent;
        apdexEvent._onEvent = jest.fn();

        client.startApdexEvent({ task: 'someTask' });

        expect(apdexEvent).toBeInstanceOf(ApdexEvent);

        expect(apdexEvent._isActiveEvents.get('someTask')).toEqual(true);
        apdexEvent.onVisibilityChange(false);

        expect(apdexEvent._isActiveEvents.get('someTask')).toEqual(false);
        apdexEvent.onVisibilityChange(true);
        expect(apdexEvent._isActiveEvents.get('someTask')).toEqual(false);

        client.stopApdexEvent({
          task: 'someTask',
          type: apdexType.TRANSITION,
          additionalAttributes: {
            hasFeatureFlag: true,
          },
        });

        expect(apdexEvent._onEvent).toHaveBeenCalledWith(
          {
            action: 'readyForUser',
            actionSubject: 'ui',
            attributes: {
              apdex: 1,
              duration: 50,
              startTime: 1050,
              stopTime: 1100,
              task: 'someTask',
              taskId: undefined,
              threshold: 1000,
              type: apdexType.TRANSITION,
              isActiveTab: false,
              hasFeatureFlag: true,
            },
            source: 'ui',
          },
          undefined,
        );
      });

      test('should return started Apdex event', () => {
        windowPerformanceMock.getEntriesByName = jest.fn().mockReturnValue([
          {
            duration: 888,
            entryType: 'measure',
            name: 'someTask-start',
            startTime: 0,
          },
        ]);

        Object.defineProperty(window, 'performance', {
          writable: true,
          value: { ...windowPerformanceMock },
        });
        const client = new AnalyticsWebClient(PRODUCT_INFO);
        const apdexStart = client.getApdexStart({
          task: 'someTask',
        });

        expect(apdexStart).toEqual({
          duration: 888,
          entryType: 'measure',
          name: 'someTask-start',
          startTime: 0,
        });
        expect(windowPerformanceMock.getEntriesByName).toHaveBeenCalledWith(
          'someTask-start',
        );
      });

      test('should return null if no started Apdex', () => {
        windowPerformanceMock.getEntriesByName.mockReturnValue([]);
        Object.defineProperty(window, 'performance', {
          writable: true,
          value: { ...windowPerformanceMock },
        });
        const client = new AnalyticsWebClient(PRODUCT_INFO);
        const apdexStart = client.getApdexStart({
          task: 'someTask',
        });

        expect(apdexStart).toBeUndefined();
        expect(windowPerformanceMock.getEntriesByName).toHaveBeenCalledWith(
          'someTask-start',
        );
      });
    });

    describe('stopApdexEvent', () => {
      test('additional attributes should not override standard apdex attributes', () => {
        windowPerformanceMock.now.mockReturnValue(888);
        Object.defineProperty(window, 'performance', {
          writable: true,
          value: { ...windowPerformanceMock },
        });
        const client = new AnalyticsWebClient(PRODUCT_INFO);
        const apdexEvent = client._apdexEvent;
        apdexEvent._onEvent = jest.fn();

        client.stopApdexEvent({
          task: 'someTask',
          type: apdexType.INITIAL_LOAD,
          additionalAttributes: {
            hasFeatureFlag: true,
            apdex: 0.5,
            duration: 221,
            startTime: 1,
            stopTime: 222,
            task: 'someOverrideTask',
            taskId: '1',
            threshold: 2000,
            type: 'randomType',
            isActiveTab: false,
          },
        });

        expect(apdexEvent._onEvent).toHaveBeenCalledWith(
          {
            action: 'readyForUser',
            actionSubject: 'ui',
            attributes: {
              apdex: 1,
              duration: 888,
              startTime: 1000,
              stopTime: 1888,
              task: 'someTask',
              taskId: undefined,
              threshold: 1000,
              type: apdexType.INITIAL_LOAD,
              isActiveTab: true,
              hasFeatureFlag: true,
            },
            source: 'ui',
          },
          undefined,
        );
      });

      test('should allow custom startTime for initialLoad', () => {
        windowPerformanceMock.now.mockReturnValue(999);

        Object.defineProperty(window, 'performance', {
          writable: true,
          value: { ...windowPerformanceMock },
        });
        const client = new AnalyticsWebClient(PRODUCT_INFO);
        const apdexEvent = client._apdexEvent;
        apdexEvent._onEvent = jest.fn();

        client.stopApdexEvent({
          task: 'someTask',
          type: apdexType.INITIAL_LOAD,
          startTime: 100,
        });

        expect(windowPerformanceMock.now).toHaveBeenCalledTimes(1);

        expect(apdexEvent._onEvent).toHaveBeenCalledWith(
          {
            action: 'readyForUser',
            actionSubject: 'ui',
            attributes: {
              apdex: 0.5,
              duration: 1899,
              startTime: 100,
              stopTime: 1999,
              task: 'someTask',
              taskId: undefined,
              threshold: 1000,
              type: apdexType.INITIAL_LOAD,
              isActiveTab: true,
            },
            source: 'ui',
          },
          undefined,
        );
      });

      test('should allow custom startTime for transition', () => {
        windowPerformanceMock.now.mockReturnValue(999);
        Object.defineProperty(window, 'performance', {
          writable: true,
          value: { ...windowPerformanceMock },
        });
        const client = new AnalyticsWebClient(PRODUCT_INFO);
        const apdexEvent = client._apdexEvent;
        apdexEvent._onEvent = jest.fn();

        client.stopApdexEvent({
          task: 'someTask',
          type: apdexType.TRANSITION,
          startTime: 100,
        });

        expect(windowPerformanceMock.now).toHaveBeenCalledTimes(1);

        expect(apdexEvent._onEvent).toHaveBeenCalledWith(
          {
            action: 'readyForUser',
            actionSubject: 'ui',
            attributes: {
              apdex: 0.5,
              duration: 1899,
              startTime: 100,
              stopTime: 1999,
              task: 'someTask',
              taskId: undefined,
              threshold: 1000,
              type: apdexType.TRANSITION,
              isActiveTab: true,
            },
            source: 'ui',
          },
          undefined,
        );
      });

      test('should allow custom startTime & stopTime', () => {
        Object.defineProperty(window, 'performance', {
          writable: true,
          value: { ...windowPerformanceMock },
        });

        const client = new AnalyticsWebClient(PRODUCT_INFO);
        const apdexEvent = client._apdexEvent;
        apdexEvent._onEvent = jest.fn();

        client.stopApdexEvent({
          task: 'someTask',
          type: apdexType.INITIAL_LOAD,
          startTime: 100,
          stopTime: 500,
        });

        expect(apdexEvent._onEvent).toHaveBeenCalledWith(
          {
            action: 'readyForUser',
            actionSubject: 'ui',
            attributes: {
              apdex: 1,
              duration: 400,
              startTime: 100,
              stopTime: 500,
              task: 'someTask',
              taskId: undefined,
              threshold: 1000,
              type: apdexType.INITIAL_LOAD,
              isActiveTab: true,
            },
            source: 'ui',
          },
          undefined,
        );
      });

      test('should propagate the callback all the way to "onEvent"', () => {
        const client = new AnalyticsWebClient(PRODUCT_INFO);
        const apdexEvent = client._apdexEvent;
        apdexEvent._onEvent = jest.fn();
        const mockCallback = emptyFunction;

        client.stopApdexEvent(
          {
            task: 'someTask',
            type: apdexType.INITIAL_LOAD,
            startTime: 100,
            stopTime: 500,
          },
          mockCallback,
        );

        expect(apdexEvent._onEvent).toHaveBeenCalledWith(
          {
            action: 'readyForUser',
            actionSubject: 'ui',
            attributes: {
              apdex: 1,
              duration: 400,
              startTime: 100,
              stopTime: 500,
              task: 'someTask',
              taskId: undefined,
              threshold: 1000,
              type: apdexType.INITIAL_LOAD,
              isActiveTab: true,
            },
            source: 'ui',
          },
          mockCallback,
        );
      });
    });
  });
});

describe('ApdexEvent', () => {
  Object.defineProperty(document, 'hidden', {
    value: false,
    configurable: true,
  });

  const onEvent = jest.fn();
  const pageVisibility = new PageVisibility();

  describe('constructor', () => {
    test('should default performance and startedEvents', () => {
      const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
      expect(apdexEvent._startedEvents).toEqual(new Map());
      expect(apdexEvent._performance).toEqual(new Performance());
      expect(apdexEvent._onEvent).toEqual(onEvent);
      expect(apdexEvent._threshold).toEqual(1000);
      expect(apdexEvent._wasPreviouslyHidden).toEqual(false);
      expect(apdexEvent._isActiveEvents).toEqual(new Map());
    });

    test('should throw if `onEvent` is missing', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new ApdexEvent();
      }).toThrow('Missing onEvent callback');
    });

    test('should throw if `onEvent` is not a function', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new ApdexEvent('notAFunction', pageVisibility);
      }).toThrow('Invalid onEvent, must be function');
    });

    test('should throw if `pageVisibility` is invalid', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new ApdexEvent(onEvent, 'notPageVisibilityClass');
      }).toThrow('Invalid pageVisibility, must be PageVisibility class');
    });
  });

  describe('onVisibilityChange', () => {
    test('should update fields', () => {
      const apdexEvent = new ApdexEvent(onEvent, pageVisibility);

      expect(apdexEvent._wasPreviouslyHidden).toEqual(false);

      apdexEvent.onVisibilityChange(false);

      expect(apdexEvent._wasPreviouslyHidden).toEqual(true);
    });
  });

  describe('_getEventKey', () => {
    const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
    expect(apdexEvent._getEventKey({ task: 'someTask' })).toEqual('someTask');
    expect(
      apdexEvent._getEventKey({
        task: 'someTask',
        taskId: '1',
      }),
    ).toEqual('someTask.1');
  });

  describe('_calculateApdex', () => {
    const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
    expect(apdexEvent._calculateApdex({ duration: 900 })).toEqual(1);
    expect(apdexEvent._calculateApdex({ duration: 3000 })).toEqual(0.5);
    expect(apdexEvent._calculateApdex({ duration: 5000 })).toEqual(0);
  });

  describe('_validateStartEvent', () => {
    describe('should throw', () => {
      test('if `event` is missing', () => {
        expect(() => {
          const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
          apdexEvent._validateStartEvent();
        }).toThrow('Missing "event" in Apdex start event');
      });

      test('if `event.task` is missing', () => {
        expect(() => {
          const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
          apdexEvent._validateStartEvent({});
        }).toThrow('Missing "task" in Apdex start event');
      });

      test('if `event.task` is not a string', () => {
        expect(() => {
          const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
          apdexEvent._validateStartEvent({ task: 123 });
        }).toThrow('Invalid "task" in Apdex start event');
      });

      test('if `event.taskId` is not a string', () => {
        expect(() => {
          const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
          apdexEvent._validateStartEvent({
            task: 'someTask',
            taskId: 123,
          });
        }).toThrow('Invalid "taskId" in Apdex start event');
      });
    });
  });

  describe('_validateStopEvent', () => {
    describe('should throw', () => {
      test('if `event` is missing', () => {
        expect(() => {
          const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
          apdexEvent._validateStopEvent();
        }).toThrow('Missing "event" in Apdex stop event');
      });

      test('if `event.task` is missing', () => {
        expect(() => {
          const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
          apdexEvent._validateStopEvent({});
        }).toThrow('Missing "task" in Apdex stop event');
      });

      test('if `event.task` is not a string', () => {
        expect(() => {
          const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
          apdexEvent._validateStopEvent({ task: 123 });
        }).toThrow('Invalid "task" in Apdex stop event');
      });

      test('if `event.taskId` is not a string', () => {
        expect(() => {
          const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
          apdexEvent._validateStopEvent({
            task: 'someTask',
            taskId: 123,
          });
        }).toThrow('Invalid "taskId" in Apdex stop event');
      });

      test('if `event.type` is missing', () => {
        expect(() => {
          const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
          apdexEvent._validateStopEvent({
            task: 'someTask',
          });
        }).toThrow('Missing "type" in Apdex stop event');
      });

      test('if `event.type` is not a valid ApdexType', () => {
        expect(() => {
          const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
          apdexEvent._validateStopEvent({
            task: 'someTask',
            type: 'randomType',
          });
        }).toThrow('Invalid "type" in Apdex stop event');
      });

      test('if `event.threshold` is not a number', () => {
        expect(() => {
          const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
          apdexEvent._validateStopEvent({
            task: 'someTask',
            type: apdexType.INITIAL_LOAD,
            threshold: 'notANumber',
          });
        }).toThrow('Invalid "threshold" in Apdex stop event');
      });

      test('if event of type TRANSITION was stopped before started', () => {
        expect(() => {
          const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
          apdexEvent._validateStopEvent({
            task: 'someTask',
            type: apdexType.TRANSITION,
          });
        }).toThrow('Apdex event transition "someTask" was not started');
      });

      test('if `event.startTime` is not valid number', () => {
        expect(() => {
          const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
          apdexEvent._validateStopEvent({
            task: 'someTask',
            type: apdexType.INITIAL_LOAD,
            startTime: 'notANumber',
          });
        }).toThrow('Invalid "startTime" in Apdex stop event');
      });

      test('if `event.startTime` is less than 0', () => {
        expect(() => {
          const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
          apdexEvent._validateStopEvent({
            task: 'someTask',
            type: apdexType.INITIAL_LOAD,
            startTime: -1,
          });
        }).toThrow('Invalid "startTime" in Apdex stop event');
      });

      test('if `event.stopTime` is not valid number', () => {
        expect(() => {
          const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
          apdexEvent._validateStopEvent({
            task: 'someTask',
            type: apdexType.INITIAL_LOAD,
            startTime: 0,
            stopTime: 'notANumber',
          });
        }).toThrow('Invalid "stopTime" in Apdex stop event');
      });

      test('if `event.stopTime` is less than or equal to `event.startTime`', () => {
        expect(() => {
          const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
          apdexEvent._validateStopEvent({
            task: 'someTask',
            type: apdexType.INITIAL_LOAD,
            startTime: 0,
            stopTime: 0,
          });
        }).toThrow(
          '"stopTime" should be greater than "startTime" in Apdex stop event',
        );
      });
    });
  });

  describe('_shouldSendEvent', () => {
    const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
    expect(apdexEvent._shouldSendEvent(undefined)).toEqual(false);
    expect(apdexEvent._shouldSendEvent({})).toEqual(false);
  });

  describe('User Timings API not supported', () => {
    beforeEach(() => {
      // @ts-ignore
      window.performance = undefined;
    });

    test('start should exit early', () => {
      const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
      apdexEvent.start({
        task: 'someTask',
      });
      expect(apdexEvent._startedEvents.size).toBe(0);
      expect(apdexEvent._isActiveEvents.size).toBe(0);
    });

    test('stop should exit early', () => {
      const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
      apdexEvent.stop({
        task: 'someTask',
        type: apdexType.INITIAL_LOAD,
      });
      expect(onEvent).not.toBeCalled();
    });

    test('getStart should exit early', () => {
      Object.defineProperty(window, 'performance', {
        writable: true,
        value: {
          getEntriesByName: jest.fn(),
        },
      });

      const apdexEvent = new ApdexEvent(onEvent, pageVisibility);
      const apdexStart = apdexEvent.getStart({
        task: 'someTask',
      });
      expect(apdexStart).toBeUndefined();
      expect(window.performance.getEntriesByName).not.toBeCalled();
    });
  });
});
