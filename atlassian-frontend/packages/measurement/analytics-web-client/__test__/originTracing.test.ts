import { originTracingType } from '../src';
import AnalyticsWebClient from '../src/analyticsWebClient';
import * as webTypes from '../src/analyticsWebTypes';
import getResilienceQueue, {
  IntermediateBatchableQueue,
} from '../src/integration/intermediateResilienceQueue';
import OriginTracing from '../src/originTracing';
import uuidv4 from '../src/uuid';

import { ACTION_EVENT, PRODUCT_INFO, SCREEN_EVENT } from './util/commonTests';
import {
  moveToUrl,
  waitForEventsToSend,
} from './util/commonUtil';
import { createDefaultMockXHR, getEventsFromMockXHR } from './util/mockXHR';


jest.mock('../src/uuid');
jest.mock('../src/integration/intermediateResilienceQueue', () => ({
  __esModule: true,
  ...jest.requireActual<any>('../src/integration/intermediateResilienceQueue'),
  default: jest.fn(),
}));

const STORAGE_KEY = 'awc.taskSessions';
const mockOriginFn = (encodedOrigin: any) => {
  const originTracingAttributes = { id: encodedOrigin, product: 'jira' };
  return {
    originTracingAttributes,
    taskSessionId: originTracingAttributes.id,
  };
};
describe('originTracing', () => {
  let intermediateResilienceQueue: IntermediateBatchableQueue | undefined;

  const oldLocation = window.location;

  beforeEach(() => {
    moveToUrl('http://localhost/?atlOrigin=eyJpIjoiZjMwZDZhYjhkOWZkNDQ0Mjg5NTNiYTQwNmIxMGI1MzkiLCJwIjoiaiJ9&foo=bar');
    // Provides a way to get a new queue every test
    (getResilienceQueue as jest.Mock).mockImplementation((
      retryQueuePrefix: string,
      product: string,
      queueOptions: any
    ) => {
      if (!intermediateResilienceQueue) {
        intermediateResilienceQueue = new IntermediateBatchableQueue(retryQueuePrefix, product, queueOptions);
      }
      return intermediateResilienceQueue;
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    intermediateResilienceQueue = undefined;
    jest.clearAllTimers();
  });

  afterAll(() => {
    window.location = oldLocation;
  });

  describe('strips urls correctly', () => {
    let replaceFn: any;
    let analyticsClient: any;
    let originTracing: any;

    beforeEach(() => {
      replaceFn = jest.fn();
      // @ts-ignore
      sessionStorage.setItem(STORAGE_KEY, null);
      analyticsClient = new AnalyticsWebClient(PRODUCT_INFO);
      originTracing = new OriginTracing();

      Object.defineProperty(window, 'history', {
        writable: true,
        value: {
          replaceState: replaceFn,
        },
      });
    });

    test('should strip the url', () => {
      originTracing.handleOriginParameters({
        [originTracingType.ATL_ORIGIN]: mockOriginFn,
      });
      expect(replaceFn).toHaveBeenCalledWith(
        {},
        '',
        'http://localhost/?foo=bar',
      );
    });

    test('should fail on invalid params', () => {
      expect(() => originTracing.handleOriginParameters({ incorrect: mockOriginFn }),).toThrow(Error);
    });

    test('should create task session', () => {
      analyticsClient.setOriginTracingHandlers({
        [originTracingType.ATL_ORIGIN]: mockOriginFn,
      });

      expect(analyticsClient.task.getAllTaskSessions()).toEqual({
        atlOrigin:
          'eyJpIjoiZjMwZDZhYjhkOWZkNDQ0Mjg5NTNiYTQwNmIxMGI1MzkiLCJwIjoiaiJ9',
      });
    });
  });

  describe('handles multiple origin Ids', () => {
    const replaceFn = jest.fn();
    let analyticsClient: any;
    let originTracing: any;

    beforeEach(() => {
      moveToUrl('http://localhost/?atlOrigin=eyJpIjoiZjMwZDZhYjhkOWZkNDQ0Mjg5NTNiYTQwNmIxMGI1MzkiLCJwIjoiaiJ9&anotherOrigin=pickles&foo=bar');
      // @ts-ignore
      sessionStorage.setItem(STORAGE_KEY, null);
      analyticsClient = new AnalyticsWebClient(PRODUCT_INFO);
      originTracing = new OriginTracing();

      Object.defineProperty(window, 'history', {
        writable: true,
        value: {
          replaceState: replaceFn,
        },
      });

      Object.defineProperty(webTypes, 'originTracingType', {
        writable: true,
        value: {
          ATL_ORIGIN: 'atlOrigin',
          ANOTHER_ORIGIN: 'anotherOrigin',
        },
      });
      originTracing = new OriginTracing();
    });

    test('should strip the url of two origin params', () => {
      originTracing.handleOriginParameters({
        [webTypes.originTracingType.ATL_ORIGIN]: mockOriginFn,
        [(webTypes.originTracingType as any).ANOTHER_ORIGIN]: mockOriginFn,
      });

      expect(replaceFn).toHaveBeenCalledWith(
        {},
        '',
        'http://localhost/?foo=bar',
      );
    });

    test('should create task session double', () => {
      analyticsClient.setOriginTracingHandlers({
        [webTypes.originTracingType.ATL_ORIGIN]: mockOriginFn,
        [(webTypes.originTracingType as any).ANOTHER_ORIGIN]: mockOriginFn,
      });

      expect(analyticsClient.task.getAllTaskSessions()).toEqual({
        anotherOrigin: 'pickles',
        atlOrigin:
          'eyJpIjoiZjMwZDZhYjhkOWZkNDQ0Mjg5NTNiYTQwNmIxMGI1MzkiLCJwIjoiaiJ9',
      });
    });
  });
  describe('integration with analytics client', () => {
    describe('attaches to analytics events', () => {
      let mockXHR: any = null;
      let analyticsClient: any = null;
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

      beforeAll(() => {
        // @ts-ignore
        sessionStorage.setItem(STORAGE_KEY, null);
      });

      beforeEach(() => {
        analyticsClient = new AnalyticsWebClient(PRODUCT_INFO);
        mockXHR = createDefaultMockXHR();
        // @ts-ignore
        window.XMLHttpRequest = jest.fn(() => mockXHR);
        jest.useFakeTimers();
        analyticsClient.setOriginTracingHandlers({
          [originTracingType.ATL_ORIGIN]: mockOriginFn,
        });
        waitForEventsToSend();
        mockXHR.send.mockClear();
      });

      afterEach(() => {
        waitForEventsToSend();
        jest.useRealTimers();
      });

      test('fires origin landed', () => {
        analyticsClient.setOriginTracingHandlers({
          [originTracingType.ATL_ORIGIN]: mockOriginFn,
        });
        waitForEventsToSend();
        expect(mockXHR.send).toHaveBeenCalledTimes(1);
        const request = getEventsFromMockXHR(mockXHR, 1)[0];
        expect(request.event).toEqual('origin landed');

        expect(request.properties.attributes).toEqual({
          originTracesLanded: {
            atlOrigin: {
              id:
                'eyJpIjoiZjMwZDZhYjhkOWZkNDQ0Mjg5NTNiYTQwNmIxMGI1MzkiLCJwIjoiaiJ9',
              product: 'jira',
            },
          },
        });
      });
      eventTypes.forEach(({ sendFn, event, type }) => {
        beforeAll(() => {
          (uuidv4 as any).mockImplementation(
            () => '6976aea2-9631-4c64-925a-f5df888870fa',
          );
        });

        test(`attaches to ${type} events`, () => {
          analyticsClient.task.createTaskSession('test');
          sendFn(event);
          waitForEventsToSend();
          expect(mockXHR.send).toHaveBeenCalledTimes(1);
          const request = getEventsFromMockXHR(mockXHR, 1)[0];
          expect(request.properties.taskSessions).toEqual({
            test: '6976aea2-9631-4c64-925a-f5df888870fa',
            atlOrigin:
              'eyJpIjoiZjMwZDZhYjhkOWZkNDQ0Mjg5NTNiYTQwNmIxMGI1MzkiLCJwIjoiaiJ9',
          });
        });
      });
    });

    describe('integration with task sessions', () => {
      let analyticsClient: AnalyticsWebClient;
      beforeAll(() => {
        analyticsClient = new AnalyticsWebClient(PRODUCT_INFO);
        sessionStorage.setItem(STORAGE_KEY, '');
      });

      test('should create task session', () => {
        analyticsClient.setOriginTracingHandlers({
          [originTracingType.ATL_ORIGIN]: mockOriginFn,
        });
        expect(analyticsClient.task.getAllTaskSessions()).toEqual({
          atlOrigin:
            'eyJpIjoiZjMwZDZhYjhkOWZkNDQ0Mjg5NTNiYTQwNmIxMGI1MzkiLCJwIjoiaiJ9',
        });
      });

      test('should fail on non-string tasksession handler', () => {
        // eslint-disable-next-line no-shadow
        const mockOriginFn = (encodedOrigin: any) => {
          const dict = { id: encodedOrigin, product: 'jira' };
          return {
            originTracingAttributes: { id: dict.id, product: dict.product },
            taskSessionId: { something: dict.id },
          };
        };
        expect(() => analyticsClient.setOriginTracingHandlers({
          [originTracingType.ATL_ORIGIN]: mockOriginFn,
        }),).toThrow(TypeError);
      });
    });
  });
});
