import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

import testEpic from '../../common/util/test-epic';
import {
  generateSpaceKey,
  noValidKey,
  noValidKeyFailure,
  updateSuggestedKey,
} from '../actions';

import generateSpaceKeyEpic from './generate-space-key';
import * as requests from './requests';

jest.mock('../../common/analytics/analytics-web-client');
jest.mock('./requests', () => ({
  __esModule: true,
  checkConfluenceSpaceAvailability$: jest.fn(),
}));

describe('generate space key epic', () => {
  let checkConfluenceSpaceAvailabilityMock = requests.checkConfluenceSpaceAvailability$ as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should emit updateSuggestedKey action with payload of first available key generated', () =>
    testEpic({
      arrange: (input$: any) => {
        checkConfluenceSpaceAvailabilityMock.mockImplementation((arg) => {
          switch (arg) {
            case 'ME':
              return of({ available: false, key: 'ME' });
            case 'MEGATRON':
              return of({ available: true, key: 'MEGATRON' });
            case 'MKT':
              return of({ available: true, key: 'MKT' });
          }
        });

        return generateSpaceKeyEpic(input$);
      },
      act: (input$: any) => {
        input$.next(generateSpaceKey('MEGATRON KEY TEST'));
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toContainEqual(updateSuggestedKey('MEGATRON'));
      },
    }));

  test('should emit updateSuggestedKey action with payload of an alphanumeric key', () =>
    testEpic({
      arrange: (input$: any) => {
        checkConfluenceSpaceAvailabilityMock.mockImplementation((arg) => {
          switch (arg) {
            case '12E':
              return of({ available: false, key: '12E' });
            case '12EGATRON':
              return of({ available: true, key: '12EGATRON' });
            case '1KT':
              return of({ available: true, key: '1KT' });
          }
        });

        return generateSpaceKeyEpic(input$);
      },
      act: (input$: any) => {
        input$.next(generateSpaceKey('!$!12EG#ATR%$$$ON ?K!EY TEST'));
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toContainEqual(updateSuggestedKey('12EGATRON'));
      },
    }));

  test('should handle a space name of just numbers and symbols', () =>
    testEpic({
      arrange: (input$: any) => {
        checkConfluenceSpaceAvailabilityMock.mockImplementation((arg) => {
          switch (arg) {
            case '12':
              return of({ available: false, key: '12' });
            case '136':
              return of({ available: true, key: '136' });
          }
        });

        return generateSpaceKeyEpic(input$);
      },
      act: (input$: any) => {
        input$.next(generateSpaceKey('!$!12#%$$$ ?3!45 6789'));
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toContainEqual(updateSuggestedKey('136'));
      },
    }));

  test('should emit noValidKey action when no key generated is available', () =>
    testEpic({
      arrange: (input$: any) => {
        checkConfluenceSpaceAvailabilityMock.mockImplementation((arg) => {
          switch (arg) {
            case 'ME':
              return of({ available: false, key: 'ME' });
            case 'MEGATRON':
              return of({ available: false, key: 'MEGATRON' });
            case 'MKT':
              return of({ available: false, key: 'MKT' });
          }
        });

        return generateSpaceKeyEpic(input$);
      },
      act: (input$: any) => {
        input$.next(generateSpaceKey('MEGATRON KEY TEST'));
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toContainEqual(noValidKey());
      },
    }));

  test('should emit updateSuggestedKey action if at least one check succeeds without error and is available', () =>
    testEpic({
      arrange: (input$: any) => {
        checkConfluenceSpaceAvailabilityMock.mockImplementation((arg) => {
          switch (arg) {
            case 'ME':
              return _throw(Error('it all broke'));
            case 'MEGATRON':
              return of({ available: false, key: 'MEGATRON' });
            case 'MKT':
              return of({ available: true, key: 'MKT' });
          }
        });

        return generateSpaceKeyEpic(input$);
      },
      act: (input$: any) => {
        input$.next(generateSpaceKey('MEGATRON KEY TEST'));
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toContainEqual(updateSuggestedKey('MKT'));
      },
    }));

  test('should emit noValidKeyFailure action when an error occurs for every attempt', () =>
    testEpic({
      arrange: (input$: any) => {
        checkConfluenceSpaceAvailabilityMock.mockImplementation((arg) => {
          switch (arg) {
            case 'ME':
              return _throw(Error('it all broke'));
            case 'MEGATRON':
              return _throw(Error('it broke again'));
            case 'MKT':
              return _throw(Error('the world is on fire'));
          }
        });

        return generateSpaceKeyEpic(input$);
      },
      act: (input$: any) => {
        input$.next(generateSpaceKey('MEGATRON KEY TEST'));
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toContainEqual(noValidKeyFailure());
      },
    }));
});
