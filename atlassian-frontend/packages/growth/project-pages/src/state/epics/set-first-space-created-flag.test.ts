import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

import testEpic from '../../common/util/test-epic';
import * as analyticsClient from '../../common/analytics/analytics-web-client';
import { setFirstSpaceCreatedFlag } from '../actions';

import * as requests from './requests';
import setFirstSpaceCreatedFlagEpic from './set-first-space-created-flag';

jest.mock('./requests');
jest.mock('../../common/analytics/analytics-web-client');

describe('create confluence space epic', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should emit nothing and trigger correct analytics when successful', () =>
    testEpic({
      arrange: (input$: any) => {
        (requests.putFirstSpaceCreatedFlag$ as jest.Mock).mockReturnValue(
          of(null),
        );

        return setFirstSpaceCreatedFlagEpic(input$);
      },
      act: (input$: any) => {
        input$.next(setFirstSpaceCreatedFlag());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([]);
        expect(
          analyticsClient.sendOperationalAnalyticsEvent,
        ).toHaveBeenCalledTimes(1);
        expect(
          analyticsClient.sendOperationalAnalyticsEvent,
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            action: 'success',
            actionSubject: 'fetch',
            source: 'confluence.first.space.created.flag',
          }),
        );
      },
    }));

  test('should emit nothing and trigger correct analytics when request fails', () =>
    testEpic({
      arrange: (input$: any) => {
        (requests.putFirstSpaceCreatedFlag$ as jest.Mock).mockReturnValue(
          _throw({ message: 'it all went wrong' }),
        );

        return setFirstSpaceCreatedFlagEpic(input$);
      },
      act: (input$: any) => {
        input$.next(setFirstSpaceCreatedFlag());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([]);
        expect(
          analyticsClient.sendOperationalAnalyticsEvent,
        ).toHaveBeenCalledTimes(1);
        expect(
          analyticsClient.sendOperationalAnalyticsEvent,
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            action: 'failed',
            actionSubject: 'fetch',
            source: 'confluence.first.space.created.flag',
          }),
        );
      },
    }));
});
