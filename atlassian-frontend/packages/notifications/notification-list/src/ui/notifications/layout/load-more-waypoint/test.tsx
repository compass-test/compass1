import React from 'react';

import { render } from '@testing-library/react';

import { buildJiraNotification } from '../../../../common/mocks/notifications-factory';
import {
  LoadingState,
  RequestCategory,
  RequestReadState,
  TimeGroup,
} from '../../../../common/types';
import { NotificationsStoreContext } from '../../../../common/ui/notifications-context';
import { convertToRenderableNotifications } from '../../../../services/use-notification-list-store/utils/create-renderable-notifications';

import LoadMoreWaypoint from './index';

const mockNotificationsStoreContext: NotificationsStoreContext = {
  state: {
    notifications: [],
    canLoadMore: true,
    fetchState: LoadingState.LOADING,
    isMarkAllAsReadVisible: true,
    markBulkNotifications: () => {},
    markAllNotificationsRead: () => {},
    fetchData: () => {},
    readStateFilter: RequestReadState.ANY,
    requestCategory: RequestCategory.DIRECT,
    toggleReadStateFilter: () => {},
  },
  updateState: () => {},
  analyticsContext: {
    current: {
      product: 'unset',
      readStateFilter: RequestReadState.ANY,
      requestCategory: RequestCategory.ANY,
    },
  },
  updateAnalyticsContext: jest.fn(),
  intlLocale: {
    current: 'en',
  },
  updateIntlLocale: () => {},
};

describe('skeleton renders', () => {
  test.each([
    [0, 6],
    [1, 5],
    [2, 4],
    [3, 3],
    [4, 2],
    [5, 1],
    [6, 1],
    [10, 1],
  ])(
    `should display %i skeletons if there are %i notifications`,
    (numNotifications, expectedSkeletons) => {
      const notifications = [...Array(numNotifications)].map((_, index) => {
        return buildJiraNotification({ id: `${index}` });
      });

      const mockContext = {
        ...mockNotificationsStoreContext,
        state: {
          ...mockNotificationsStoreContext.state,
          notifications: [
            {
              notifications: convertToRenderableNotifications(
                notifications,
                LoadingState.COMPLETE,
              ),
              timeGroup: TimeGroup.TODAY,
            },
          ],
        },
      };

      const { queryAllByTestId } = render(
        <NotificationsStoreContext.Provider value={mockContext}>
          <LoadMoreWaypoint />
        </NotificationsStoreContext.Provider>,
      );

      expect(queryAllByTestId('notification-item-skeleton').length).toBe(
        expectedSkeletons,
      );
    },
  );
});
