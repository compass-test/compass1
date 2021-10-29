import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

import testEpic from '../../common/util/test-epic';
import * as analyticsClient from '../../common/analytics/analytics-web-client';
import createMockStore from '../../common/util/create-mock-store';
import {
  getProjectSpaceLink,
  getProjectSpaceLinkError,
  putProjectSpaceLink,
  putProjectSpaceLinkError,
  successfullyConnectedSpace,
  updateProjectSpaceLink,
  updateConnectedSpaceOrPageContent,
  fetchConnectedSpace,
} from '../actions';

import projectSpaceLinkEpic from './project-space-link';
import * as requests from './requests';

jest.mock('./requests');
jest.mock('../../common/analytics/analytics-web-client');

const mockProjectKey = 'XFLOW';
const mockSpaceKey = 'SCS';
const mockSpaceName = 'Super Cool Space';
const mockPageId = '1000';

const mockStoreFactory = ({
  isProjectPagesProductionisation,
}: { isProjectPagesProductionisation?: boolean } = {}) =>
  createMockStore({
    context: {
      cloudId: 'DUMMY-00000-00000-00000-00000',
    },
    ui: {
      createSpaceDialog: {
        userEnteredSpaceName: mockSpaceName,
      },
      connectSpaceDialog: {
        selectedSpace: {
          spaceKey: mockSpaceKey,
          spaceName: mockSpaceName,
        },
      },
    },
    featureFlags: {
      isProjectPagesProductionisation: isProjectPagesProductionisation || false,
    },
  });

describe('project space link epic', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('putProjectSpaceLink', () => {
    test('should emit successfullyConnectedSpace and updateProjectSpaceLink actions with expected payload when link is put', () =>
      testEpic({
        arrange: (input$: any) => {
          (requests.retrieveRootPageId$ as jest.Mock).mockReturnValue(
            of(mockPageId),
          );
          (requests.putProjectSpaceLinkViaXflow$ as jest.Mock).mockReturnValue(
            of(null),
          );
          return projectSpaceLinkEpic(input$, mockStoreFactory()() as any);
        },
        act: (input$: any) => {
          input$.next(
            putProjectSpaceLink({
              spaceKey: mockSpaceKey,
              projectKey: mockProjectKey,
            }),
          );
          input$.complete();
        },
        assert: (actions: any) => {
          expect(actions).toEqual([
            updateConnectedSpaceOrPageContent({
              title: mockSpaceName,
              isConnectedToPage: false,
              iconUrl: null,
              pageId: mockPageId,
            }),
            successfullyConnectedSpace(mockSpaceName, false),
            updateProjectSpaceLink(mockSpaceKey, mockPageId),
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
              source: 'put.project.space',
            }),
          );
        },
      }));

    test('should emit putProjectSpaceLinkError action when root page fails to be retrieved', () =>
      testEpic({
        arrange: (input$: any) => {
          (requests.retrieveRootPageId$ as jest.Mock).mockReturnValue(
            _throw({ message: 'it all went wrong' }),
          );
          (requests.putProjectSpaceLinkViaXflow$ as jest.Mock).mockReturnValue(
            of(null),
          );
          return projectSpaceLinkEpic(input$, mockStoreFactory()() as any);
        },
        act: (input$: any) => {
          input$.next(
            putProjectSpaceLink({
              spaceKey: mockSpaceKey,
              projectKey: mockProjectKey,
            }),
          );
          input$.complete();
        },
        assert: (actions: any) => {
          expect(actions).toEqual([putProjectSpaceLinkError()]);
          expect(
            analyticsClient.sendOperationalAnalyticsEvent,
          ).toHaveBeenCalledTimes(1);
          expect(
            analyticsClient.sendOperationalAnalyticsEvent,
          ).toHaveBeenCalledWith(
            expect.objectContaining({
              action: 'failed',
              actionSubject: 'fetch',
              source: 'put.project.space',
            }),
          );
        },
      }));

    test('should emit putProjectSpaceLinkError action with error when link fails to be put', () =>
      testEpic({
        arrange: (input$: any) => {
          (requests.retrieveRootPageId$ as jest.Mock).mockReturnValue(
            of(mockPageId),
          );
          (requests.putProjectSpaceLinkViaXflow$ as jest.Mock).mockReturnValue(
            _throw({ message: 'it all went wrong' }),
          );
          return projectSpaceLinkEpic(input$, mockStoreFactory()() as any);
        },
        act: (input$: any) => {
          input$.next(
            putProjectSpaceLink({
              spaceKey: mockSpaceKey,
              projectKey: mockProjectKey,
            }),
          );
          input$.complete();
        },
        assert: (actions: any) => {
          expect(actions).toEqual([putProjectSpaceLinkError()]);
          expect(
            analyticsClient.sendOperationalAnalyticsEvent,
          ).toHaveBeenCalledTimes(1);
          expect(
            analyticsClient.sendOperationalAnalyticsEvent,
          ).toHaveBeenCalledWith(
            expect.objectContaining({
              action: 'failed',
              actionSubject: 'fetch',
              source: 'put.project.space',
            }),
          );
        },
      }));

    test('should emit an action to fetch space name and icon if linking a space', () =>
      testEpic({
        arrange: (input$) => {
          (requests.retrieveRootPageId$ as jest.Mock).mockReturnValue(
            of(mockPageId),
          );
          (requests.putProjectSpaceLinkViaXflow$ as jest.Mock).mockReturnValue(
            of(null),
          );
          return projectSpaceLinkEpic(
            input$,
            mockStoreFactory({
              isProjectPagesProductionisation: true,
            })() as any,
          );
        },
        act: (input$) => {
          input$.next(
            putProjectSpaceLink({
              spaceKey: mockSpaceKey,
              projectKey: mockProjectKey,
            }),
          );
          input$.complete();
        },
        assert: (actions) => {
          expect(actions).toEqual([
            successfullyConnectedSpace(mockSpaceName, false),
            updateProjectSpaceLink(mockSpaceKey, null),
            fetchConnectedSpace(mockSpaceKey),
          ]);
        },
      }));
  });

  describe('fetchProjectSpaceLink', () => {
    test('should emit updateProjectSpaceLink action with expected payload when link is fetched', () =>
      testEpic({
        arrange: (input$: any) => {
          (requests.fetchProjectSpaceLinkViaXflow$ as jest.Mock).mockReturnValue(
            of({ spaceKey: mockSpaceKey, pageId: mockPageId }),
          );
          return projectSpaceLinkEpic(input$, mockStoreFactory()() as any);
        },
        act: (input$: any) => {
          input$.next(getProjectSpaceLink(mockProjectKey));
          input$.complete();
        },
        assert: (actions: any) => {
          expect(actions).toEqual([
            updateProjectSpaceLink(mockSpaceKey, mockPageId),
          ]);
          expect(analyticsClient.sendTrackAnalyticsEvent).toHaveBeenCalledWith(
            expect.objectContaining({
              action: 'update',
              actionSubject: 'link',
              source: 'project.space',
            }),
          );
          expect(
            analyticsClient.sendOperationalAnalyticsEvent,
          ).toHaveBeenCalledWith(
            expect.objectContaining({
              action: 'success',
              actionSubject: 'fetch',
              source: 'fetch.project.space',
            }),
          );
        },
      }));

    test('should emit updateProjectSpaceLink action with null fallback values when spaceKey or pageId are not provided', () =>
      testEpic({
        arrange: (input$: any) => {
          (requests.fetchProjectSpaceLinkViaXflow$ as jest.Mock).mockReturnValue(
            of({ spaceKey: '', pageId: '' }),
          );
          return projectSpaceLinkEpic(input$, mockStoreFactory()() as any);
        },
        act: (input$: any) => {
          input$.next(getProjectSpaceLink(mockProjectKey));
          input$.complete();
        },
        assert: (actions: any) => {
          expect(actions).toEqual([updateProjectSpaceLink(null, null)]);
          expect(analyticsClient.sendTrackAnalyticsEvent).toHaveBeenCalledWith(
            expect.objectContaining({
              action: 'update',
              actionSubject: 'link',
              source: 'project.space',
            }),
          );
          expect(
            analyticsClient.sendOperationalAnalyticsEvent,
          ).toHaveBeenCalledWith(
            expect.objectContaining({
              action: 'success',
              actionSubject: 'fetch',
              source: 'fetch.project.space',
            }),
          );
        },
      }));

    test('should emit getProjectSpaceLinkError action with error when link fails to be fetched', () =>
      testEpic({
        arrange: (input$: any) => {
          (requests.fetchProjectSpaceLinkViaXflow$ as jest.Mock).mockReturnValue(
            _throw({ message: 'it all went wrong' }),
          );
          return projectSpaceLinkEpic(input$, mockStoreFactory()() as any);
        },
        act: (input$: any) => {
          input$.next(getProjectSpaceLink(mockProjectKey));
          input$.complete();
        },
        assert: (actions: any) => {
          expect(actions).toEqual([getProjectSpaceLinkError()]);
          expect(
            analyticsClient.sendOperationalAnalyticsEvent,
          ).toHaveBeenCalledTimes(1);
          expect(
            analyticsClient.sendOperationalAnalyticsEvent,
          ).toHaveBeenCalledWith(
            expect.objectContaining({
              action: 'failed',
              actionSubject: 'fetch',
              source: 'fetch.project.space',
            }),
          );
        },
      }));
  });
});
