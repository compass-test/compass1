import testEpic from '../../common/util/test-epic';
import {
  fetchFailed,
  fetchSuccess,
} from '../../common/fetch-request-analytics';
import {
  fetchConfluenceAccessRequestCapabilities,
  updateConfluenceAccessRequestCapabilities,
} from '../actions';
import confluenceAccessRequestCapabilities from './confluence-access-request-capabilities';
import { getConfluenceAccessRequestCapabilities$ } from './requests';
import { State } from '../types';
import { MiddlewareAPI } from 'redux';
import { of } from 'rxjs/observable/of';
import {
  AccessRequestCapabilityResponse,
  AccessRequestCapabilityType,
} from '../confluence/access-request-capabilities/types';
import { fromPromise } from 'rxjs/observable/fromPromise';

jest.mock('../../common/fetch-request-analytics');
jest.mock('./requests');

describe('confluence access request capabilities epic', () => {
  const mockGetState = jest.fn();
  const mockStore: MiddlewareAPI<State> = {
    dispatch: jest.fn(),
    getState: mockGetState,
  };

  beforeEach(() => {
    jest.resetAllMocks();
    mockGetState.mockReturnValue({
      context: {
        cloudId: 'my-little-cloud-id',
      },
    });
  });

  it('should emit updateConfluenceAccessRequestCapabilities with the fetched capability', () =>
    testEpic({
      arrange: (input$) => {
        (getConfluenceAccessRequestCapabilities$ as jest.Mock).mockReturnValue(
          of<AccessRequestCapabilityResponse>({
            userAccessLevel: 'INTERNAL',
            verificationStatus: 'NOT_REQUIRED',
            results: {
              foo: AccessRequestCapabilityType.ACCESS_EXISTS,
            },
          }),
        );
        return confluenceAccessRequestCapabilities(input$, mockStore);
      },
      act: (input$) => {
        input$.next(fetchConfluenceAccessRequestCapabilities());
        input$.complete();
      },
      assert: (actions) => {
        expect(actions).toEqual([
          updateConfluenceAccessRequestCapabilities(
            AccessRequestCapabilityType.ACCESS_EXISTS,
          ),
        ]);
        expect(fetchSuccess).toHaveBeenCalledWith(
          'confluence.access-request-capabilities',
        );
        expect(
          getConfluenceAccessRequestCapabilities$ as jest.Mock,
        ).toHaveBeenCalledWith('my-little-cloud-id');
      },
    }));

  it('should emit an error if the request fails', () =>
    testEpic({
      arrange: (input$) => {
        (getConfluenceAccessRequestCapabilities$ as jest.Mock).mockReturnValue(
          fromPromise(new Promise((_, rej) => rej('unit-test-error'))),
        );
        return confluenceAccessRequestCapabilities(input$, mockStore);
      },
      act: (input$) => {
        input$.next(fetchConfluenceAccessRequestCapabilities());
        input$.complete();
      },
      assert: (actions) => {
        expect(actions).toEqual([
          updateConfluenceAccessRequestCapabilities(
            AccessRequestCapabilityType.ERROR,
          ),
        ]);
        expect(fetchFailed).toHaveBeenCalledWith(
          'confluence.access-request-capabilities',
          'unit-test-error',
        );
        expect(
          getConfluenceAccessRequestCapabilities$ as jest.Mock,
        ).toHaveBeenCalledWith('my-little-cloud-id');
      },
    }));

  it('should emit an error if the request returns more than one result', () =>
    testEpic({
      arrange: (input$) => {
        (getConfluenceAccessRequestCapabilities$ as jest.Mock).mockReturnValue(
          of<AccessRequestCapabilityResponse>({
            userAccessLevel: 'INTERNAL',
            verificationStatus: 'NOT_REQUIRED',
            results: {
              foo: AccessRequestCapabilityType.ACCESS_EXISTS,
              bar: AccessRequestCapabilityType.DIRECT_ACCESS,
            },
          }),
        );
        return confluenceAccessRequestCapabilities(input$, mockStore);
      },
      act: (input$) => {
        input$.next(fetchConfluenceAccessRequestCapabilities());
        input$.complete();
      },
      assert: (actions) => {
        expect(actions).toEqual([
          updateConfluenceAccessRequestCapabilities(
            AccessRequestCapabilityType.ERROR,
          ),
        ]);
        expect(fetchSuccess).toHaveBeenCalledWith(
          'confluence.access-request-capabilities',
        );
        expect(
          getConfluenceAccessRequestCapabilities$ as jest.Mock,
        ).toHaveBeenCalledWith('my-little-cloud-id');
      },
    }));

  it('should emit an error if the request result is unknown', () =>
    testEpic({
      arrange: (input$) => {
        (getConfluenceAccessRequestCapabilities$ as jest.Mock).mockReturnValue(
          of<AccessRequestCapabilityResponse>({
            userAccessLevel: 'INTERNAL',
            verificationStatus: 'NOT_REQUIRED',
            results: {
              foo: 'SOME_UNKNOWN_RESULT' as AccessRequestCapabilityType,
            },
          }),
        );
        return confluenceAccessRequestCapabilities(input$, mockStore);
      },
      act: (input$) => {
        input$.next(fetchConfluenceAccessRequestCapabilities());
        input$.complete();
      },
      assert: (actions) => {
        expect(actions).toEqual([
          updateConfluenceAccessRequestCapabilities(
            AccessRequestCapabilityType.ERROR,
          ),
        ]);
        expect(fetchSuccess).toHaveBeenCalledWith(
          'confluence.access-request-capabilities',
        );
        expect(
          getConfluenceAccessRequestCapabilities$ as jest.Mock,
        ).toHaveBeenCalledWith('my-little-cloud-id');
      },
    }));
});
