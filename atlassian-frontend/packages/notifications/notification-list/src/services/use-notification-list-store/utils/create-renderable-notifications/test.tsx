import {
  buildConfluenceNotification,
  buildConfluenceNotificationWithoutContent,
  buildJiraNotification,
  buildJiraNotificationWithoutContent,
} from '../../../../common/mocks/notifications-factory';
import { LoadingState, Notification } from '../../../../common/types';

import createRenderableNotifications, {
  convertToRenderableNotifications,
} from './index';

const notificationsWithContent: Notification[] = [
  buildConfluenceNotification({}),
  buildJiraNotification({}),
];

const notificationsWithoutContent: Notification[] = [
  buildConfluenceNotificationWithoutContent({}),
  buildJiraNotificationWithoutContent({}),
];

const emptyMergeState: Notification[] = [];

describe('createRenderableNotifications', () => {
  it('should return an empty state when none of the states are COMPLETE / ERROR', () => {
    expect(
      createRenderableNotifications(
        {
          withoutContent: LoadingState.INITIAL,
          withContent: LoadingState.INITIAL,
        },
        notificationsWithoutContent,
        notificationsWithContent,
      ),
    ).toEqual(emptyMergeState);
    expect(
      createRenderableNotifications(
        {
          withoutContent: LoadingState.LOADING,
          withContent: LoadingState.INITIAL,
        },
        notificationsWithoutContent,
        notificationsWithContent,
      ),
    ).toEqual(emptyMergeState);
    expect(
      createRenderableNotifications(
        {
          withoutContent: LoadingState.INITIAL,
          withContent: LoadingState.LOADING,
        },
        notificationsWithoutContent,
        notificationsWithContent,
      ),
    ).toEqual(emptyMergeState);
    expect(
      createRenderableNotifications(
        {
          withoutContent: LoadingState.LOADING,
          withContent: LoadingState.LOADING,
        },
        notificationsWithoutContent,
        notificationsWithContent,
      ),
    ).toEqual(emptyMergeState);
  });
  test('should return an empty state when content call is still loading, no-content call failed', () => {
    expect(
      createRenderableNotifications(
        {
          withoutContent: LoadingState.ERROR,
          withContent: LoadingState.LOADING,
        },
        notificationsWithoutContent,
        notificationsWithContent,
      ),
    ).toEqual(emptyMergeState);
  });
  test('should return an empty state when both have failed', () => {
    expect(
      createRenderableNotifications(
        {
          withoutContent: LoadingState.ERROR,
          withContent: LoadingState.ERROR,
        },
        notificationsWithoutContent,
        notificationsWithContent,
      ),
    ).toEqual(emptyMergeState);
  });
  test('should return COMPLETE notifications when both have finished', () => {
    expect(
      createRenderableNotifications(
        {
          withoutContent: LoadingState.COMPLETE,
          withContent: LoadingState.COMPLETE,
        },
        notificationsWithoutContent,
        notificationsWithContent,
      ),
    ).toEqual(
      convertToRenderableNotifications(
        notificationsWithContent,
        LoadingState.COMPLETE,
      ),
    );
  });
  test('should return LOADING notifications when no-content call finished loading, content call is still loading', () => {
    expect(
      createRenderableNotifications(
        {
          withoutContent: LoadingState.COMPLETE,
          withContent: LoadingState.LOADING,
        },
        notificationsWithoutContent,
        notificationsWithContent,
      ),
    ).toEqual(
      convertToRenderableNotifications(
        notificationsWithoutContent,
        LoadingState.LOADING,
      ),
    );
  });
  test('should return ERROR notifications when no-content call finished loading, content call failed', () => {
    expect(
      createRenderableNotifications(
        {
          withoutContent: LoadingState.COMPLETE,
          withContent: LoadingState.ERROR,
        },
        notificationsWithoutContent,
        notificationsWithContent,
      ),
    ).toEqual(
      convertToRenderableNotifications(
        notificationsWithoutContent,
        LoadingState.ERROR,
      ),
    );
  });

  test('should return an empty state when call without content is still loading and content call failed', () => {
    expect(
      createRenderableNotifications(
        {
          withoutContent: LoadingState.LOADING,
          withContent: LoadingState.ERROR,
        },
        notificationsWithoutContent,
        notificationsWithContent,
      ),
    ).toEqual(emptyMergeState);
  });

  test('should return COMPLETE notifications when content call finished loading first, no-content call is still loading', () => {
    expect(
      createRenderableNotifications(
        {
          withoutContent: LoadingState.LOADING,
          withContent: LoadingState.COMPLETE,
        },
        notificationsWithoutContent,
        notificationsWithContent,
      ),
    ).toEqual(
      convertToRenderableNotifications(
        notificationsWithContent,
        LoadingState.COMPLETE,
      ),
    );
  });
  test('should return COMPLETE notifications when content call finished loading, no-content call failed', () => {
    expect(
      createRenderableNotifications(
        {
          withoutContent: LoadingState.ERROR,
          withContent: LoadingState.COMPLETE,
        },
        notificationsWithoutContent,
        notificationsWithContent,
      ),
    ).toEqual(
      convertToRenderableNotifications(
        notificationsWithContent,
        LoadingState.COMPLETE,
      ),
    );
  });
});
