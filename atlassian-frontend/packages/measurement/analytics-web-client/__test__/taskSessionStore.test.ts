import AnalyticsWebClient from '../src/analyticsWebClient';
import TaskSessionStore from '../src/taskSessionStore';
import * as uuidv4 from '../src/uuid';

import { ACTION_EVENT, PRODUCT_INFO, SCREEN_EVENT } from './util/commonTests';
import { waitForEventsToSend } from './util/commonUtil';
import { createDefaultMockXHR, getEventsFromMockXHR } from './util/mockXHR';
import UUID_V4_REGEX from './util/uuidTestUtil';

const STORAGE_KEY = 'awc.taskSessions';
jest.mock('../src/uuid');

describe('TaskTrackingStore', () => {
  let taskTrackingStore: any;
  const realDateNow = Date.now;

  beforeEach(() => {
    sessionStorage.clear();
    Date.now = realDateNow;
  });
  describe('persisted between multiple clients', () => {
    test('persisted between multiple clients initialised within time window', () => {
      Date.now = jest.fn(() => 1);
      const analyticsClientOne = new AnalyticsWebClient(PRODUCT_INFO);
      analyticsClientOne.task.createTaskSessionWithProvidedId('ts1', '1234');
      Date.now = jest.fn(() => 2000);
      const analyticsClientTwo = new AnalyticsWebClient(PRODUCT_INFO);
      analyticsClientTwo.task.createTaskSessionWithProvidedId('ts2', 'ABCD');
      Date.now = jest.fn(() => 6000);
      analyticsClientOne.task.createTaskSessionWithProvidedId('ts3', 'test');
      expect(analyticsClientOne.task.getAllTaskSessions()).toEqual({
        ts1: '1234',
        ts2: 'ABCD',
        ts3: 'test',
      });
      expect(analyticsClientTwo.task.getAllTaskSessions()).toEqual({
        ts1: '1234',
        ts2: 'ABCD',
        ts3: 'test',
      });
    });
    test('persisted between multiple clients outside time window', () => {
      Date.now = jest.fn(() => 1);
      const analyticsClientOne = new AnalyticsWebClient(PRODUCT_INFO);
      analyticsClientOne.task.createTaskSessionWithProvidedId('ts1', '1234');
      Date.now = jest.fn(() => 3005);
      const analyticsClientTwo = new AnalyticsWebClient(PRODUCT_INFO);
      analyticsClientTwo.task.createTaskSessionWithProvidedId('ts2', 'ABCD');
      expect(analyticsClientOne.task.getAllTaskSessions()).toEqual({
        ts2: 'ABCD',
      });
      expect(analyticsClientTwo.task.getAllTaskSessions()).toEqual({
        ts2: 'ABCD',
      });
    });
  });

  describe('basic operations', () => {
    const spy: any = jest.spyOn(uuidv4, 'default');
    beforeEach(() => {
      spy.mockImplementation(() => '6976aea2-9631-4c64-925a-f5df888870fa');
      taskTrackingStore = new TaskSessionStore();
    });
    test('should generate new tasks', () => {
      const id = taskTrackingStore.createTaskSession('test');
      expect(id).toMatch(UUID_V4_REGEX);
    });

    test('should persist tasks in memory', () => {
      const id = taskTrackingStore.createTaskSession('test');
      const tasks = taskTrackingStore.getAllTaskSessions();
      expect(tasks).toEqual({
        test: id,
      });
    });

    test('should delete keys', () => {
      const id = taskTrackingStore.createTaskSession('test');
      expect(id).toMatch(UUID_V4_REGEX);
      taskTrackingStore.completeTaskSession('test');
      const tasks = taskTrackingStore.getAllTaskSessions();
      expect(tasks).toEqual({});
      const val = sessionStorage.getItem(STORAGE_KEY);

      if (val) {
        expect(JSON.parse(val)).toEqual({});
        return;
      }
      throw new Error('Unexpected error. Expected value from getItem');
    });

    test('should not error when removing key from empty object', () => {
      const currentState = {};
      // eslint-disable-next-line no-underscore-dangle
      const updatedState = taskTrackingStore._safelyRemoveKey(currentState);
      expect(updatedState).toEqual({});
    });

    test('should return an empty object instead of deleting from an null state', () => {
      const currentState = null;
      // eslint-disable-next-line no-underscore-dangle
      const updatedState = taskTrackingStore._safelyRemoveKey(currentState);
      expect(updatedState).toEqual({});
    });

    test('should override tasks if a new one is created', () => {
      taskTrackingStore.createTaskSession('test');
      const secondId = taskTrackingStore.createTaskSession('test');
      const tasks = taskTrackingStore.getAllTaskSessions();
      expect(tasks).toEqual({
        test: secondId,
      });
    });
  });

  describe('generates uris correctly', () => {
    const spy: any = jest.spyOn(uuidv4, 'default');
    beforeEach(() => {
      taskTrackingStore = new TaskSessionStore();
      spy.mockImplementation(() => '3e26efea-4a79-4673-9d7f-d14860155be4');
    });

    test('works with no task sessions', () => {
      const formatted = taskTrackingStore.formatTaskSessionQueryString({
        uri: 'http://localhost/',
      });
      expect(formatted).toEqual('http://localhost/');
    });

    test('works with no task sessions but existing query parameters', () => {
      const formatted = taskTrackingStore.formatTaskSessionQueryString({
        uri: 'http://localhost/?foo=bar',
      });
      expect(formatted).toEqual('http://localhost/?foo=bar');
    });

    test('should generate a query string from a URI', () => {
      taskTrackingStore.createTaskSession('test');
      const formatted = taskTrackingStore.formatTaskSessionQueryString({
        uri: 'http://localhost/',
      });
      expect(formatted).toEqual(
        'http://localhost/?awc.test=3e26efea-4a79-4673-9d7f-d14860155be4',
      );
    });

    test('should generate a query string with lots of task sessions', () => {
      taskTrackingStore.createTaskSession('test');
      taskTrackingStore.createTaskSession('other');
      taskTrackingStore.createTaskSession('another');
      const formatted = taskTrackingStore.formatTaskSessionQueryString({
        uri: 'http://localhost/',
      });
      expect(formatted).toEqual(
        'http://localhost/?awc.another=3e26efea-4a79-4673-9d7f-d14860155be4&awc.other=3e26efea-4a79-4673-9d7f-d14860155be4&awc.test=3e26efea-4a79-4673-9d7f-d14860155be4',
      );
    });

    test('should preserve existing query parameters', () => {
      taskTrackingStore.createTaskSession('test');
      const formatted = taskTrackingStore.formatTaskSessionQueryString({
        uri: 'http://localhost/?foo=bar',
      });
      expect(formatted).toEqual(
        'http://localhost/?awc.test=3e26efea-4a79-4673-9d7f-d14860155be4&foo=bar',
      );
    });

    test('should ignore reserved origin task sessions', () => {
      taskTrackingStore.createTaskSession('test');
      taskTrackingStore.createTaskSession('atlOrigin');
      const formatted = taskTrackingStore.formatTaskSessionQueryString({
        uri: 'http://localhost/?foo=bar',
      });
      expect(formatted).toEqual(
        'http://localhost/?awc.test=3e26efea-4a79-4673-9d7f-d14860155be4&foo=bar',
      );
    });

    test('should url encode query parameters', () => {
      taskTrackingStore.createTaskSession('🇳🇿');
      const formatted = taskTrackingStore.formatTaskSessionQueryString({
        uri: 'http://localhost/',
      });
      expect(formatted).toEqual(
        'http://localhost/?awc.%F0%9F%87%B3%F0%9F%87%BF=3e26efea-4a79-4673-9d7f-d14860155be4',
      );
    });

    test('should only include task sessions with certain names if specified', () => {
      taskTrackingStore.createTaskSession('taskOne');
      taskTrackingStore.createTaskSession('taskTwo');
      const formatted = taskTrackingStore.formatTaskSessionQueryString({
        uri: 'http://localhost/',
        includedTaskSessions: ['taskOne'],
      });
      expect(formatted).toEqual(
        'http://localhost/?awc.taskOne=3e26efea-4a79-4673-9d7f-d14860155be4',
      );
    });
  });

  describe('strips urls correctly', () => {
    let replaceFn: any;

    beforeEach(() => {
      taskTrackingStore = new TaskSessionStore();
      replaceFn = jest.fn();
      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          href:
            'http://localhost/?awc.test=3e26efea-4a79-4673-9d7f-d14860155be4&foo=bar',
          hostname: 'localhost',
          host: 'localhost',
          hash: '',
        },
      });

      Object.defineProperty(window, 'history', {
        writable: true,
        value: {
          replaceState: replaceFn,
        },
      });
    });

    test('should strip the url', () => {
      taskTrackingStore.stripQueryParameters();
      expect(replaceFn).toHaveBeenCalledWith(
        {},
        '',
        'http://localhost/?foo=bar',
      );
    });

    test('should extract the right task sessions from the url', () => {
      taskTrackingStore.stripQueryParameters();
      const taskSessions = taskTrackingStore.getAllTaskSessions();
      expect(taskSessions).toEqual({
        test: '3e26efea-4a79-4673-9d7f-d14860155be4',
      });
    });

    test('should store the right task sessions in session storage', () => {
      taskTrackingStore.stripQueryParameters();
      const val = sessionStorage.getItem(STORAGE_KEY);
      if (val) {
        expect(JSON.parse(val)).toEqual({
          test: '3e26efea-4a79-4673-9d7f-d14860155be4',
        });

        return;
      }

      throw new Error('Unexpected error. expected value from getItem');
    });

    test('should extract the right task sessions from the url with multiple task sessions', () => {
      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          href:
            'http://localhost/?awc.another=d185bf4b-ab1d-44a2-9375-cbf62d87925a&awc.other=fe459e11-897f-4946-9150-782018b5d09c&awc.test=3e26efea-4a79-4673-9d7f-d14860155be4&foo=bar',
          hostname: 'localhost',
          host: 'localhost',
          hash: '',
        },
      });

      taskTrackingStore.stripQueryParameters();
      const taskSessions = taskTrackingStore.getAllTaskSessions();
      expect(taskSessions).toEqual({
        test: '3e26efea-4a79-4673-9d7f-d14860155be4',
        other: 'fe459e11-897f-4946-9150-782018b5d09c',
        another: 'd185bf4b-ab1d-44a2-9375-cbf62d87925a',
      });
    });

    test('should work with a lot of task sessions', () => {
      const uuid = jest.requireActual('../src/uuid');
      const taskSessionNames = Array(100)
        .fill(1)
        .map(() => uuid.default());

      taskSessionNames.forEach((taskName) => taskTrackingStore.createTaskSession(taskName));

      const url = taskTrackingStore.formatTaskSessionQueryString({
        uri: 'http://localhost/',
      });

      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          href: url,
          hash: '',
          hostname: 'localhost',
          host: 'localhost',
        },
      });

      taskTrackingStore.stripQueryParameters();
      const taskSessions = taskTrackingStore.getAllTaskSessions();
      expect(Object.keys(taskSessions)).toEqual(taskSessionNames);
    });

    test('does not strip anything if there is no task session', () => {
      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          href: 'http://localhost/',
          hostname: 'localhost',
        },
      });

      taskTrackingStore.stripQueryParameters();
      expect(replaceFn).toHaveBeenCalledTimes(0);
    });
  });

  describe('attaches to analytics events', () => {
    let analyticsClient: any = null;
    let mockXHR: any = null;
    beforeAll(() => {
      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          href:
            'http://localhost/?atlOrigin=eyJpIjoiZjMwZDZhYjhkOWZkNDQ0Mjg5NTNiYTQwNmIxMGI1MzkiLCJwIjoiaiJ9&foo=bar',
          hash: '',
          hostname: 'localhost',
          host: 'localhost',
        },
      });
    });

    beforeEach(() => {
      analyticsClient = new AnalyticsWebClient(PRODUCT_INFO);
      mockXHR = createDefaultMockXHR();
      // @ts-ignore
      window.XMLHttpRequest = jest.fn(() => mockXHR);
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
      jest.clearAllMocks();
      jest.clearAllTimers();
    });

    const eventTypes = [
      {
        sendFn: (t: any) => analyticsClient.sendScreenEvent(t),
        event: SCREEN_EVENT,
        type: 'screen',
      },
      {
        sendFn: (t: any) => analyticsClient.sendTrackEvent(t),
        event: ACTION_EVENT,
        type: 'track',
      },
      {
        sendFn: (t: any) => analyticsClient.sendUIEvent(t),
        event: ACTION_EVENT,
        type: 'ui',
      },
      {
        sendFn: (t: any) => analyticsClient.sendOperationalEvent(t),
        event: ACTION_EVENT,
        type: 'operational',
      },
    ];

    eventTypes.forEach(({ sendFn, event, type }) => {
      const spy: any = jest.spyOn(uuidv4, 'default');
      beforeAll(() => {
        spy.mockImplementation(() => '6976aea2-9631-4c64-925a-f5df888870fa');
      });

      test(`attaches to ${type} events`, () => {
        analyticsClient.task.createTaskSession('test');
        sendFn(event);

        waitForEventsToSend();
        expect(mockXHR.send).toHaveBeenCalledTimes(1);
        const request = getEventsFromMockXHR(mockXHR, 1)[0];
        expect(request.properties.taskSessions).toEqual({
          test: '6976aea2-9631-4c64-925a-f5df888870fa',
        });
      });
    });
  });
});
