import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

import testEpic from '../../common/util/test-epic';
import * as analyticsClient from '../../common/analytics/analytics-web-client';
import {
  fetchConfluenceSpaces,
  fetchConfluenceSpacesError,
  updateConfluenceSpaces,
} from '../actions';

import * as requests from './requests';
import retrieveConfluenceSpaces from './retrieve-confluence-spaces';

jest.mock('./requests');
jest.mock('../../common/analytics/analytics-web-client');

const samplePromotedSpaceData = {
  id: 'OP',
  text: 'Optimus Prime',
};

const sampleOtherSpaceData = {
  id: 'MEGATRON',
  text: 'MEGATRON',
};

const encodedSpaceData = {
  id: 'ENC',
  text: 'it&#39;s encoded',
};

describe('retrieve confluence spaces epic', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should emit updateConfluenceSpaces action with expected payload when spaces are fetched', () =>
    testEpic({
      arrange: (input$: any) => {
        (requests.requestConfluenceSpaces$ as jest.Mock).mockReturnValue(
          of([samplePromotedSpaceData, sampleOtherSpaceData]),
        );
        return retrieveConfluenceSpaces(input$);
      },
      act: (input$: any) => {
        input$.next(fetchConfluenceSpaces());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([
          updateConfluenceSpaces(
            [samplePromotedSpaceData, sampleOtherSpaceData].map(
              ({ id: spaceKey, text: spaceName }) => ({
                spaceKey,
                spaceName,
              }),
            ),
          ),
        ]);
        expect(
          analyticsClient.sendOperationalAnalyticsEvent,
        ).toHaveBeenCalledTimes(1);
        expect(
          analyticsClient.sendOperationalAnalyticsEvent,
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            action: 'success',
            actionSubject: 'fetch',
            source: 'confluence.spaces',
          }),
        );
      },
    }));

  test('should emit fetchConfluenceSpacesError action when spaces fail to be fetched', () =>
    testEpic({
      arrange: (input$: any) => {
        (requests.requestConfluenceSpaces$ as jest.Mock).mockReturnValue(
          _throw({ message: 'it all went wrong' }),
        );
        return retrieveConfluenceSpaces(input$);
      },
      act: (input$: any) => {
        input$.next(fetchConfluenceSpaces());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([fetchConfluenceSpacesError()]);
        expect(
          analyticsClient.sendOperationalAnalyticsEvent,
        ).toHaveBeenCalledTimes(1);
        expect(
          analyticsClient.sendOperationalAnalyticsEvent,
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            action: 'failed',
            actionSubject: 'fetch',
            source: 'confluence.spaces',
          }),
        );
      },
    }));

  test('should decode html encoded space names when spaces are fetched', () =>
    testEpic({
      arrange: (input$: any) => {
        (requests.requestConfluenceSpaces$ as jest.Mock).mockReturnValue(
          of([encodedSpaceData]),
        );
        return retrieveConfluenceSpaces(input$);
      },
      act: (input$: any) => {
        input$.next(fetchConfluenceSpaces());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([
          updateConfluenceSpaces([
            {
              spaceKey: 'ENC',
              spaceName: "it's encoded",
            },
          ]),
        ]);
      },
    }));
});
