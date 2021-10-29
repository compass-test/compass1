import {
  buildConfluenceNotification,
  buildConfluenceNotificationWithoutContent,
  buildJiraNotification,
  buildJiraNotificationWithoutContent,
} from '../../../../common/mocks/notifications-factory';
import {
  LoadingState,
  ReadState as RenderableReadState,
} from '../../../../common/types';
import { convertToRenderableNotifications } from '../create-renderable-notifications';

import mergePaginatedNotifications from './index';

describe('mergePaginatedNotifications', () => {
  test('should update LOADING notifications with Documents and LoadingState but ignore updated ReadState', () => {
    // Initial Notifications with no content in a LOADING state
    const initialNotifications = convertToRenderableNotifications(
      [
        buildConfluenceNotificationWithoutContent({
          id: '1',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-09T04:00:00.000Z',
        }),
        buildJiraNotificationWithoutContent({
          id: '2',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-08T04:00:00.000Z',
        }),
        buildJiraNotificationWithoutContent({
          id: '3',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-07T04:00:00.000Z',
        }),
      ],
      LoadingState.LOADING,
    );
    // Incoming notifications with content in a COMPLETE state
    const incomingNotifications = convertToRenderableNotifications(
      [
        buildConfluenceNotification({
          id: '1',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-09T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '2',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-08T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '3',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-07T04:00:00.000Z',
        }),
      ],
      LoadingState.COMPLETE,
    );

    const expectedNotifications = convertToRenderableNotifications(
      [
        buildConfluenceNotification({
          id: '1',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-09T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '2',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-08T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '3',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-07T04:00:00.000Z',
        }),
      ],
      LoadingState.COMPLETE,
    );
    expect(
      mergePaginatedNotifications(initialNotifications, incomingNotifications),
    ).toEqual(expectedNotifications);
  });

  // This can occur if the CONTENT call returns before the call without CONTENT
  test('should ignore updates to notification if the current notification has LoadingState === COMPLETE', () => {
    // Initial notifications with content in a COMPLETE state
    const initialNotifications = convertToRenderableNotifications(
      [
        buildConfluenceNotification({
          id: '1',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-09T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '2',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-08T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '3',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-07T04:00:00.000Z',
        }),
      ],
      LoadingState.COMPLETE,
    );
    // Incoming Notifications with no content in a COMPLETE state
    const incomingNotifications = convertToRenderableNotifications(
      [
        buildConfluenceNotificationWithoutContent({
          id: '1',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-09T04:00:00.000Z',
        }),
        buildJiraNotificationWithoutContent({
          id: '2',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-08T04:00:00.000Z',
        }),
        buildJiraNotificationWithoutContent({
          id: '3',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-07T04:00:00.000Z',
        }),
      ],
      LoadingState.LOADING,
    );

    const expectedNotifications = convertToRenderableNotifications(
      [
        buildConfluenceNotification({
          id: '1',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-09T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '2',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-08T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '3',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-07T04:00:00.000Z',
        }),
      ],
      LoadingState.COMPLETE,
    );
    expect(
      mergePaginatedNotifications(initialNotifications, incomingNotifications),
    ).toEqual(expectedNotifications);
  });

  test('should add new notifications that do not match any existing notification ids', () => {
    // Incoming notifications with content in a COMPLETE state
    const previousNotifications = convertToRenderableNotifications(
      [
        buildConfluenceNotification({
          id: '1',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-12T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '2',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-11T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '3',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-10T04:00:00.000Z',
        }),
      ],
      LoadingState.COMPLETE,
    );
    // Incoming notifications with content in a COMPLETE state
    const incomingNotifications = convertToRenderableNotifications(
      [
        buildJiraNotification({
          id: '4',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-09T04:00:00.000Z',
        }),
        buildConfluenceNotification({
          id: '6',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-08T04:00:00.000Z',
        }),
      ],
      LoadingState.COMPLETE,
    );

    expect(
      mergePaginatedNotifications(previousNotifications, incomingNotifications),
    ).toEqual([...previousNotifications, ...incomingNotifications]);
  });

  test('should add new notifications and update existing notifications', () => {
    // Incoming notifications with content in a COMPLETE state
    const initialNotifications = convertToRenderableNotifications(
      [
        buildConfluenceNotificationWithoutContent({
          id: '1',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-12T04:00:00.000Z',
        }),
        buildJiraNotificationWithoutContent({
          id: '2',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-11T04:00:00.000Z',
        }),
        buildJiraNotificationWithoutContent({
          id: '3',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-10T04:00:00.000Z',
        }),
      ],
      LoadingState.LOADING,
    );
    // Incoming notifications with content in a COMPLETE state
    const incomingNotifications = convertToRenderableNotifications(
      [
        buildConfluenceNotification({
          id: '1',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-12T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '2',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-11T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '3',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-10T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '4',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-09T04:00:00.000Z',
        }),
        buildConfluenceNotification({
          id: '6',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-08T04:00:00.000Z',
        }),
      ],
      LoadingState.COMPLETE,
    );

    const expectedNotifications = convertToRenderableNotifications(
      [
        buildConfluenceNotification({
          id: '1',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-12T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '2',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-11T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '3',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-10T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '4',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-09T04:00:00.000Z',
        }),
        buildConfluenceNotification({
          id: '6',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-08T04:00:00.000Z',
        }),
      ],
      LoadingState.COMPLETE,
    );
    expect(
      mergePaginatedNotifications(initialNotifications, incomingNotifications),
    ).toEqual(expectedNotifications);
  });

  test('should merge and sort notifications by timestamp', () => {
    // Incoming notifications with content in a COMPLETE state
    const initialNotifications = convertToRenderableNotifications(
      [
        buildConfluenceNotificationWithoutContent({
          id: '1',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-12T04:00:00.000Z',
        }),
        buildJiraNotificationWithoutContent({
          id: '2',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-11T04:00:00.000Z',
        }),
        buildJiraNotificationWithoutContent({
          id: '3',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-10T04:00:00.000Z',
        }),
      ],
      LoadingState.LOADING,
    );
    // Incoming notifications with content in a COMPLETE state
    const incomingNotifications = convertToRenderableNotifications(
      [
        buildConfluenceNotification({
          id: '1',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-12T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '2',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-11T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '3',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-10T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '4',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-13T04:00:00.000Z',
        }),
        buildConfluenceNotification({
          id: '6',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-14T04:00:00.000Z',
        }),
      ],
      LoadingState.COMPLETE,
    );

    const expectedNotifications = convertToRenderableNotifications(
      [
        buildConfluenceNotification({
          id: '6',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-14T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '4',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-13T04:00:00.000Z',
        }),
        buildConfluenceNotification({
          id: '1',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-12T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '2',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-11T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '3',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-10T04:00:00.000Z',
        }),
      ],
      LoadingState.COMPLETE,
    );
    expect(
      mergePaginatedNotifications(initialNotifications, incomingNotifications),
    ).toEqual(expectedNotifications);
  });
});
