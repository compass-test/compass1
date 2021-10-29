import testEpic from '../../common/util/test-epic';
import createMockStore from '../../common/util/create-mock-store';
import * as fetchRequestAnalytics from '../../common/fetch-request-analytics';
import {
  connectConfluenceSpace,
  putProjectSpaceLink,
  putProjectSpaceLinkError,
} from '../actions';

import connectConfluenceSpaceEpic from './connect-confluence-space';

const mockProjectKey = 'MEGATRON';
const mockSpaceKey = 'PGT';
const mockSelectedSpace = {
  spaceKey: mockSpaceKey,
  spaceName: 'Product Growth Team',
};

const mockStoreFactory = (
  selectedSpace: any,
  projectKey: string | null = mockProjectKey,
) =>
  createMockStore({
    project: {
      key: projectKey,
    },
    ui: {
      connectSpaceDialog: {
        selectedSpace,
      },
    },
  });

jest.mock('../../common/fetch-request-analytics', () => ({
  __esModule: true,
  fetchFailed: jest.fn(),
  fetchSuccess: jest.fn(),
}));

describe('connect confluence space epic', () => {
  let fetchFailedMock = fetchRequestAnalytics.fetchFailed as jest.Mock;
  let fetchSuccessMock = fetchRequestAnalytics.fetchSuccess as jest.Mock;

  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should emit putProjectSpaceLink with expected payload when the selected space key is not null', () =>
    testEpic({
      arrange: (input$: any) =>
        connectConfluenceSpaceEpic(
          input$,
          mockStoreFactory(mockSelectedSpace)(),
        ),
      act: (input$: any) => {
        input$.next(connectConfluenceSpace());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([
          putProjectSpaceLink({
            spaceKey: mockSpaceKey,
            projectKey: mockProjectKey,
          }),
        ]);
        expect(fetchSuccessMock).toBeCalledTimes(1);
        expect(fetchSuccessMock.mock.calls[0][0]).toBe(
          'connect.confluence.space',
        );
      },
    }));

  test('should emit putProjectSpaceLinkError when the selected space is null', () =>
    testEpic({
      arrange: (input$: any) =>
        connectConfluenceSpaceEpic(input$, mockStoreFactory(null)()),
      act: (input$: any) => {
        input$.next(connectConfluenceSpace());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([putProjectSpaceLinkError()]);
        expect(fetchFailedMock).toBeCalledTimes(1);
        expect(fetchFailedMock.mock.calls[0][0]).toBe(
          'connect.confluence.space',
        );
        expect(fetchFailedMock.mock.calls[0][1]).toMatchObject(
          new Error('missing selected space spaceKey'),
        );
      },
    }));

  test('should emit putProjectSpaceLinkError when the selected space key is null', () =>
    testEpic({
      arrange: (input$: any) =>
        connectConfluenceSpaceEpic(
          input$,
          mockStoreFactory({ spaceKey: null })(),
        ),
      act: (input$: any) => {
        input$.next(connectConfluenceSpace());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([putProjectSpaceLinkError()]);
        expect(fetchFailedMock).toBeCalledTimes(1);
        expect(fetchFailedMock.mock.calls[0][0]).toBe(
          'connect.confluence.space',
        );
        expect(fetchFailedMock.mock.calls[0][1]).toMatchObject(
          new Error('missing selected space spaceKey'),
        );
      },
    }));

  test('should emit putProjectSpaceLinkError when the projectKey is null', () =>
    testEpic({
      arrange: (input$: any) =>
        connectConfluenceSpaceEpic(
          input$,
          mockStoreFactory(mockSelectedSpace, null)(),
        ),
      act: (input$: any) => {
        input$.next(connectConfluenceSpace());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([putProjectSpaceLinkError()]);
        expect(fetchFailedMock).toBeCalledTimes(1);
        expect(fetchFailedMock.mock.calls[0][0]).toBe(
          'connect.confluence.space',
        );
        expect(fetchFailedMock.mock.calls[0][1]).toMatchObject(
          new Error('missing projectKey'),
        );
      },
    }));
});
