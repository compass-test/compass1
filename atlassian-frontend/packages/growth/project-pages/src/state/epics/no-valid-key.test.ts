import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

import testEpic from '../../common/util/test-epic';
import * as analyticsClient from '../../common/analytics/analytics-web-client';
import { noValidKey, noValidKeyFailure, updateSuggestedKey } from '../actions';

import noValidKeyEpic from './no-valid-key';
import * as requests from './requests';

jest.mock('./requests');
jest.mock('../../common/analytics/analytics-web-client');

const succeedAfterAttempts = (n: number) => {
  let attempts = 0;
  return (key: string) => {
    attempts += 1;
    const result = {
      available: attempts >= n,
      key,
    };
    return of(result);
  };
};

// Used to ensure Math.random is predictable
// const randomReturnValues = [
//     0.2534840411631769,
//     0.1468280232560777,
//     0.07831137571307756,
//     0.8402477527925245,
//     0.4264496943568461,
//     0.7447836393986245,
//     0.7120580222393575,
//     0.2007917466911917,
//     0.09777555893402745,
//     0.8128594248901022,
//     0.9508872948900513,
//     0.8111422264342405,
//     0.20884315854045798,
//     0.7137383463670139,
//     0.27019259272698837,
//     0.48128116689257916,
//     0.8892034458446316,
//     0.2619571848779161,
//     0.24867285517022175,
//     0.004222032565644573,
// ];

// const predictableRandom = () => {
//     let counter = 0;
//     return () => randomReturnValues[counter++ % randomReturnValues.length]; // eslint-disable-line no-plusplus
// };

// TODO: fix broken tests
describe('no valid key epic', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should emit updateSuggestedKey action with expected payload when they key is available', () =>
    testEpic({
      arrange: (input$: any) => {
        (requests.checkConfluenceSpaceAvailability$ as jest.Mock).mockReturnValue(
          of({
            available: true,
            key: 'PASS',
          }),
        );
        return noValidKeyEpic(input$);
      },
      act: (input$: any) => {
        input$.next(noValidKey());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([updateSuggestedKey('PASS')]);
        expect(analyticsClient.sendTrackAnalyticsEvent).toHaveBeenCalledTimes(
          1,
        );
        expect(analyticsClient.sendTrackAnalyticsEvent).toHaveBeenCalledWith(
          expect.objectContaining({
            source: 'space.key',
            action: 'success',
            actionSubject: 'randomly.generate',
          }),
        );
      },
    }));

  test('should retry when the generated key is not available', () =>
    testEpic({
      arrange: (input$: any) => {
        (requests.checkConfluenceSpaceAvailability$ as jest.Mock).mockImplementation(
          succeedAfterAttempts(2),
        );
        return noValidKeyEpic(input$);
      },
      act: (input$: any) => {
        input$.next(noValidKey());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([
          updateSuggestedKey(
            (requests.checkConfluenceSpaceAvailability$ as jest.Mock).mock
              .calls[1][0],
          ),
        ]);
        expect(analyticsClient.sendTrackAnalyticsEvent).toHaveBeenCalledTimes(
          1,
        );
        expect(analyticsClient.sendTrackAnalyticsEvent).toHaveBeenCalledWith(
          expect.objectContaining({
            source: 'space.key',
            action: 'success',
            actionSubject: 'randomly.generate',
          }),
        );
      },
    }));

  test('should retry up to 3 times with new keys when the generated keys are not available', () =>
    testEpic({
      arrange: (input$: any) => {
        (requests.checkConfluenceSpaceAvailability$ as jest.Mock).mockImplementation(
          succeedAfterAttempts(4),
        );
        return noValidKeyEpic(input$);
      },
      act: (input$: any) => {
        input$.next(noValidKey());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([
          updateSuggestedKey(
            (requests.checkConfluenceSpaceAvailability$ as jest.Mock).mock
              .calls[3][0],
          ),
        ]);

        // Ensure that keys are randomly generated (very slim chance of duplicates occurring)
        const [
          duplicateFound,
        ] = (requests.checkConfluenceSpaceAvailability$ as jest.Mock).mock.calls
          .reduce((allArgs, args) => {
            allArgs.push(args[0]);
            return allArgs;
          }, [])
          .sort()
          .reduce(
            ([match, prev]: any, current: any) => [
              match || prev === current,
              current,
            ],
            [false, null],
          );

        expect(duplicateFound).toBe(false);

        expect(
          requests.checkConfluenceSpaceAvailability$,
        ).toHaveBeenCalledTimes(4);
        expect(analyticsClient.sendTrackAnalyticsEvent).toHaveBeenCalledTimes(
          1,
        );
        expect(analyticsClient.sendTrackAnalyticsEvent).toHaveBeenCalledWith(
          expect.objectContaining({
            source: 'space.key',
            action: 'success',
            actionSubject: 'randomly.generate',
          }),
        );
      },
    }));

  test('should emit noValidKeyFailure after 4 attemps when the generated key is not available', () =>
    testEpic({
      arrange: (input$: any) => {
        (requests.checkConfluenceSpaceAvailability$ as jest.Mock).mockImplementation(
          succeedAfterAttempts(5),
        );
        return noValidKeyEpic(input$);
      },
      act: (input$: any) => {
        input$.next(noValidKey());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([noValidKeyFailure()]);
        expect(
          requests.checkConfluenceSpaceAvailability$,
        ).toHaveBeenCalledTimes(4);
        expect(analyticsClient.sendTrackAnalyticsEvent).toHaveBeenCalledTimes(
          1,
        );
        expect(analyticsClient.sendTrackAnalyticsEvent).toHaveBeenCalledWith(
          expect.objectContaining({
            source: 'space.key',
            action: 'error',
            actionSubject: 'randomly.generate',
          }),
        );
      },
    }));
});
