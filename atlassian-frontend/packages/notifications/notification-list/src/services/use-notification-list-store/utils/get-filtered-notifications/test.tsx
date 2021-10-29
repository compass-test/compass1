import {
  buildConfluenceNotificationWithoutContent,
  buildJiraNotificationWithoutContent,
} from '../../../../common/mocks/notifications-factory';
import {
  LoadingState,
  ReadState as RenderableReadState,
  RequestCategory,
  RequestReadState,
} from '../../../../common/types';
import { convertToRenderableNotifications } from '../create-renderable-notifications';

import getFilteredNotifications from './index';

describe('getFilteredNotifications', () => {
  test('should filter any loadstate = LOADING | ERROR notifications', () => {
    // Initial Notifications with no content in a LOADING state
    const notifications = convertToRenderableNotifications(
      [
        buildConfluenceNotificationWithoutContent({
          id: '1',
          readState: RenderableReadState.UNREAD,
        }),
        buildJiraNotificationWithoutContent({
          id: '2',
          readState: RenderableReadState.UNREAD,
        }),
        buildJiraNotificationWithoutContent({
          id: '3',
          readState: RenderableReadState.UNREAD,
        }),
      ],
      LoadingState.LOADING,
    );
    notifications[0].loadingState = LoadingState.ERROR;
    notifications[1].loadingState = LoadingState.COMPLETE;

    expect(
      getFilteredNotifications(
        notifications,
        RequestReadState.ANY,
        RequestCategory.ANY,
      ),
    ).toEqual([notifications[1]]);
  });

  test('should filter out any readstate = READ with ReadStateFilter == UNREAD notifications', () => {
    // Initial Notifications with no content in a LOADING state
    const notifications = convertToRenderableNotifications(
      [
        buildConfluenceNotificationWithoutContent({
          id: '1',
          readState: RenderableReadState.READ,
        }),
        buildJiraNotificationWithoutContent({
          id: '2',
          readState: RenderableReadState.UNREAD,
        }),
        buildJiraNotificationWithoutContent({
          id: '3',
          readState: RenderableReadState.UNREAD,
        }),
      ],
      LoadingState.COMPLETE,
    );

    expect(
      getFilteredNotifications(
        notifications,
        RequestReadState.UNREAD,
        RequestCategory.ANY,
      ),
    ).toEqual([notifications[1], notifications[2]]);
  });

  test('should filter by WATCHING notifications', () => {
    // Initial Notifications with no content in a LOADING state
    const notifications = convertToRenderableNotifications(
      [
        buildConfluenceNotificationWithoutContent({
          id: '1',
          readState: RenderableReadState.READ,
          category: 'direct',
        }),
        buildJiraNotificationWithoutContent({
          id: '2',
          readState: RenderableReadState.READ,
          category: undefined,
        }),
        buildJiraNotificationWithoutContent({
          id: '3',
          readState: RenderableReadState.READ,
          category: 'direct',
        }),
      ],
      LoadingState.COMPLETE,
    );

    expect(
      getFilteredNotifications(
        notifications,
        RequestReadState.ANY,
        RequestCategory.NONE,
      ),
    ).toEqual([notifications[1]]);
  });

  test('should filter by DIRECT notifications', () => {
    // Initial Notifications with no content in a LOADING state
    const notifications = convertToRenderableNotifications(
      [
        buildConfluenceNotificationWithoutContent({
          id: '1',
          readState: RenderableReadState.READ,
          category: 'direct',
        }),
        buildJiraNotificationWithoutContent({
          id: '2',
          readState: RenderableReadState.READ,
          category: undefined,
        }),
        buildJiraNotificationWithoutContent({
          id: '3',
          readState: RenderableReadState.READ,
          category: 'direct',
        }),
      ],
      LoadingState.COMPLETE,
    );

    expect(
      getFilteredNotifications(
        notifications,
        RequestReadState.ANY,
        RequestCategory.DIRECT,
      ),
    ).toEqual([notifications[0], notifications[2]]);
  });

  test('should filter notifications with filter combinations', () => {
    // Initial Notifications with no content in a LOADING state
    const notifications = convertToRenderableNotifications(
      [
        buildConfluenceNotificationWithoutContent({
          id: '1',
          readState: RenderableReadState.READ,
          category: 'direct',
        }),
        buildJiraNotificationWithoutContent({
          id: '2',
          readState: RenderableReadState.READ,
          category: undefined,
        }),
        buildJiraNotificationWithoutContent({
          id: '3',
          readState: RenderableReadState.UNREAD,
          category: 'direct',
        }),
      ],
      LoadingState.COMPLETE,
    );

    expect(
      getFilteredNotifications(
        notifications,
        RequestReadState.UNREAD,
        RequestCategory.DIRECT,
      ),
    ).toEqual([notifications[2]]);
  });
});
