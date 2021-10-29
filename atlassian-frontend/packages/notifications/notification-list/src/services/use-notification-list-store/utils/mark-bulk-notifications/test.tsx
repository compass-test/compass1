import {
  buildConfluenceNotification,
  buildJiraNotification,
} from '../../../../common/mocks/notifications-factory';
import {
  LoadingState,
  MarkRequestReadState,
  ReadState as RenderableReadState,
  RequestReadState,
} from '../../../../common/types';
import { convertToRenderableNotifications } from '../create-renderable-notifications';

import markBulkNotifications from './index';

describe('markBulkNotifications', () => {
  test('should mark notifications as READ in the list that match ids', () => {
    const currentNotifiations = convertToRenderableNotifications(
      [
        buildConfluenceNotification({
          id: '1',
          readState: RenderableReadState.UNREAD,
        }),
        buildJiraNotification({
          id: '2',
          readState: RenderableReadState.UNREAD,
        }),
        buildJiraNotification({
          id: '3',
          readState: RenderableReadState.UNREAD,
        }),
      ],
      LoadingState.COMPLETE,
    );
    const notificationsToMark = convertToRenderableNotifications(
      [
        buildConfluenceNotification({
          id: '1',
        }),
        buildJiraNotification({
          id: '2',
        }),
        // Notification NOT in the current list - should just be ignored
        buildJiraNotification({
          id: '4',
        }),
      ],
      LoadingState.COMPLETE,
    );

    const expectedNotifications = convertToRenderableNotifications(
      [
        buildConfluenceNotification({
          id: '1',
          readState: RenderableReadState.READ,
        }),
        buildJiraNotification({
          id: '2',
          readState: RenderableReadState.READ,
        }),
        buildJiraNotification({
          id: '3',
          readState: RenderableReadState.UNREAD,
        }),
      ],
      LoadingState.COMPLETE,
    );
    expect(
      markBulkNotifications(
        currentNotifiations,
        notificationsToMark,
        MarkRequestReadState.READ,
        RequestReadState.ANY,
      ),
    ).toEqual(expectedNotifications);
  });

  test('should mark notifications as UNREAD in the list and NOT concat if list readstate filter = ANY', () => {
    const currentNotifiations = convertToRenderableNotifications(
      [
        buildConfluenceNotification({
          id: '1',
          readState: RenderableReadState.READ,
        }),
        buildJiraNotification({
          id: '2',
          readState: RenderableReadState.READ,
        }),
        buildJiraNotification({
          id: '3',
          readState: RenderableReadState.READ,
        }),
      ],
      LoadingState.COMPLETE,
    );
    const notificationsToMark = convertToRenderableNotifications(
      [
        buildConfluenceNotification({
          id: '1',
        }),
        buildJiraNotification({
          id: '3',
        }),
        // Notification NOT in the current list - should just be ignored
        buildJiraNotification({
          id: '4',
        }),
      ],
      LoadingState.COMPLETE,
    );

    const expectedNotifications = convertToRenderableNotifications(
      [
        buildConfluenceNotification({
          id: '1',
          readState: RenderableReadState.UNREAD,
        }),
        buildJiraNotification({
          id: '2',
          readState: RenderableReadState.READ,
        }),
        buildJiraNotification({
          id: '3',
          readState: RenderableReadState.UNREAD,
        }),
      ],
      LoadingState.COMPLETE,
    );
    expect(
      markBulkNotifications(
        currentNotifiations,
        notificationsToMark,
        MarkRequestReadState.UNREAD,
        RequestReadState.ANY,
      ),
    ).toEqual(expectedNotifications);
  });

  test('should mark notifications as UNREAD in the list and add missing notifications if list readstate filter = UNREAD', () => {
    const currentNotifiations = convertToRenderableNotifications(
      [
        buildConfluenceNotification({
          id: '1',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-10T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '2',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-09T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '3',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-08T04:00:00.000Z',
        }),
      ],
      LoadingState.COMPLETE,
    );
    const notificationsToMark = convertToRenderableNotifications(
      [
        buildConfluenceNotification({
          id: '1',
          timestamp: '2021-02-10T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '3',
          timestamp: '2021-02-09T04:00:00.000Z',
        }),
        // Notification NOT in the current list - should be added to UNREAD list
        buildJiraNotification({
          id: '4',
          timestamp: '2021-02-07T04:00:00.000Z',
        }),
        // Notification also NOT in the current list - should be added to UNREAD list sorted by timestamp
        buildJiraNotification({
          id: '0',
          timestamp: '2021-02-11T04:00:00.000Z',
        }),
      ],
      LoadingState.COMPLETE,
    );

    // Expected notifications sorted by timestamp
    const expectedNotifications = convertToRenderableNotifications(
      [
        buildJiraNotification({
          id: '0',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-11T04:00:00.000Z',
        }),
        buildConfluenceNotification({
          id: '1',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-10T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '2',
          readState: RenderableReadState.READ,
          timestamp: '2021-02-09T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '3',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-08T04:00:00.000Z',
        }),
        buildJiraNotification({
          id: '4',
          readState: RenderableReadState.UNREAD,
          timestamp: '2021-02-07T04:00:00.000Z',
        }),
      ],
      LoadingState.COMPLETE,
    );
    expect(
      markBulkNotifications(
        currentNotifiations,
        notificationsToMark,
        MarkRequestReadState.UNREAD,
        RequestReadState.UNREAD,
      ),
    ).toEqual(expectedNotifications);
  });
});
