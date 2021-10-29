import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

import testEpic from '../../common/util/test-epic';
import * as analyticsClient from '../../common/analytics/analytics-web-client';
import createMockStore from '../../common/util/create-mock-store';
import {
  createConfluenceSpace,
  createConfluenceSpaceError,
  putProjectSpaceLink,
  setFirstSpaceCreatedFlag,
} from '../actions';

import createConfluenceSpaceEpic from './create-confluence-space';
import * as requests from './requests';

jest.mock('./requests');
jest.mock('../../common/analytics/analytics-web-client');

const mockAvailableSpaces = [
  {
    spaceKey: 'EX',
    spaceName: 'Example',
  },
];
const mockSpaceName = 'some confluence space';
const mockProjectKey = 'XFLOW';
const mockSpaceKey = 'SCS';

const mockStore = createMockStore({
  confluence: {
    spaces: {
      availableSpaces: mockAvailableSpaces,
    },
  },
  context: {
    suggestedKey: mockSpaceKey,
  },
  project: {
    key: mockProjectKey,
  },
  ui: {
    createSpaceDialog: {
      userEnteredSpaceName: mockSpaceName,
    },
  },
});

describe('create confluence space epic', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should emit putProjectSpaceLink and setFirstSpaceCreatedFlag actions with expected payload after first space is created', () =>
    testEpic({
      arrange: (input$: any) => {
        (requests.requestCreateConfluenceSpace$ as jest.Mock).mockReturnValue(
          of({ spaceKey: mockSpaceKey, projectKey: mockProjectKey }),
        );

        const mockStoreWithNoAvailableSpaces = createMockStore({
          confluence: {
            spaces: {
              availableSpaces: [],
            },
          },
          context: {
            suggestedKey: mockSpaceKey,
          },
          project: {
            key: mockProjectKey,
          },
          ui: {
            createSpaceDialog: {
              userEnteredSpaceName: mockSpaceName,
            },
          },
        });

        return createConfluenceSpaceEpic(
          input$,
          mockStoreWithNoAvailableSpaces(),
        );
      },
      act: (input$: any) => {
        input$.next(createConfluenceSpace());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([
          putProjectSpaceLink({
            spaceKey: mockSpaceKey,
            projectKey: mockProjectKey,
          }),
          setFirstSpaceCreatedFlag(),
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
            source: 'confluence.space.create',
          }),
        );
      },
    }));

  test('should emit putProjectSpaceLink action with expected payload after space is created', () =>
    testEpic({
      arrange: (input$: any) => {
        (requests.requestCreateConfluenceSpace$ as jest.Mock).mockReturnValue(
          of({ spaceKey: mockSpaceKey, projectKey: mockProjectKey }),
        );
        return createConfluenceSpaceEpic(input$, mockStore());
      },
      act: (input$: any) => {
        input$.next(createConfluenceSpace());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([
          putProjectSpaceLink({
            spaceKey: mockSpaceKey,
            projectKey: mockProjectKey,
          }),
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
            source: 'confluence.space.create',
          }),
        );
      },
    }));

  test('should emit createConfluenceSpaceError action when creating a space fails', () =>
    testEpic({
      arrange: (input$: any) => {
        (requests.requestCreateConfluenceSpace$ as jest.Mock).mockReturnValue(
          _throw({ message: 'it all went wrong' }),
        );
        return createConfluenceSpaceEpic(input$, mockStore());
      },
      act: (input$: any) => {
        input$.next(createConfluenceSpace());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([createConfluenceSpaceError()]);
        expect(
          analyticsClient.sendOperationalAnalyticsEvent,
        ).toHaveBeenCalledTimes(1);
        expect(
          analyticsClient.sendOperationalAnalyticsEvent,
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            action: 'failed',
            actionSubject: 'fetch',
            source: 'confluence.space.create',
          }),
        );
      },
    }));

  test('should emit createConfluenceSpaceError action when the space key is empty string', () =>
    testEpic({
      arrange: (input$: any) => {
        (requests.requestCreateConfluenceSpace$ as jest.Mock).mockReturnValue(
          of({ spaceKey: mockSpaceKey, projectKey: mockProjectKey }),
        );
        const mockStoreWithNullKey = createMockStore({
          confluence: {
            spaces: {
              availableSpaces: mockAvailableSpaces,
            },
          },
          context: {
            suggestedKey: '',
          },
          project: {
            key: mockProjectKey,
          },
          ui: {
            createSpaceDialog: {
              userEnteredSpaceName: mockSpaceName,
            },
          },
        });

        return createConfluenceSpaceEpic(input$, mockStoreWithNullKey());
      },
      act: (input$: any) => {
        input$.next(createConfluenceSpace());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toContainEqual(createConfluenceSpaceError());
      },
    }));
});
