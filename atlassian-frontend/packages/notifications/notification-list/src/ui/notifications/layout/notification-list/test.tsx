import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Waypoint } from 'react-waypoint';

import { buildJiraNotification } from '../../../../common/mocks/notifications-factory';
import {
  LoadingState,
  RequestCategory,
  RequestReadState,
  TimeGroup,
} from '../../../../common/types';
import { NotificationsStoreContext } from '../../../../common/ui/notifications-context';
import { FeatureFlagsProvider } from '../../../../common/utils/feature-flags';
import messages from '../../../../common/utils/i18n/messages';
import { createMockProviders } from '../../../../common/utils/test-helpers';
import { convertToRenderableNotifications } from '../../../../services/use-notification-list-store/utils/create-renderable-notifications';

import { calculateAboveGroup, calculateBelowGroup } from './utils';

import NotificationList from './index';

const customRender = (
  ui: React.ReactNode,
  mockStore: NotificationsStoreContext,
) => {
  const { MockProviders, onAnalyticEventFired } = createMockProviders();

  return {
    ...render(
      <MockProviders>
        <NotificationsStoreContext.Provider value={mockStore}>
          {ui}
        </NotificationsStoreContext.Provider>
      </MockProviders>,
    ),
    onAnalyticEventFired,
  };
};

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

function buildMockStore(
  notificationsCount: number,
): { mockContext: NotificationsStoreContext; notificationIds: string[] } {
  const notificationIds = [...Array(notificationsCount)].map(
    (_, index) => `${index}`,
  );
  const notifications = notificationIds.map((id) => {
    return buildJiraNotification({ id });
  });
  const mockContext = {
    ...mockNotificationsStoreContext,
    state: {
      ...mockNotificationsStoreContext.state,
      isMarkAllAsReadVisible: true,
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
  return { notificationIds, mockContext };
}

describe('NotificationList', () => {
  describe('optimised rendering', () => {
    it('should render a few notifications first, and then, the rest', () => {
      jest.useFakeTimers();
      const { MockProviders } = createMockProviders({
        shouldTrackAnalyticsPayload: (args) => args.action === 'marked',
      });
      const { mockContext } = buildMockStore(200);
      const { queryAllByTestId } = render(
        <MockProviders>
          <NotificationsStoreContext.Provider value={mockContext}>
            <NotificationList updateGroupingHeaders={() => {}} />
          </NotificationsStoreContext.Provider>
        </MockProviders>,
      );
      expect(queryAllByTestId('notification-item-opt-skeleton')).toHaveLength(
        192,
      );
      // Time to render content of the initial items followed by time to render the remaining items in the list
      jest.advanceTimersByTime(300);
      expect(queryAllByTestId('notification-item-opt-skeleton')).toHaveLength(
        0,
      );
    });
  });
  describe('analytics', () => {
    test('should trigger an analytic event when clicking the mark all button', async () => {
      const { mockContext } = buildMockStore(5);
      const { MockProviders, onAnalyticEventFired } = createMockProviders({
        shouldTrackAnalyticsPayload: (args) => args.action === 'marked',
      });
      const { getByTestId } = render(
        <MockProviders>
          <NotificationsStoreContext.Provider value={mockContext}>
            <NotificationList updateGroupingHeaders={() => {}} />
          </NotificationsStoreContext.Provider>
        </MockProviders>,
      );

      userEvent.click(getByTestId('mark-all-button'));

      expect(onAnalyticEventFired.mock.calls[0][0]).toEqual({
        action: 'marked',
        actionSubject: 'notification',
        attributes: {
          categoryFilter: 'any',
          readStateFilter: 'any',
          toState: 'read',
          product: 'unset',
          userHourOfDay: expect.any(Number),
          markType: 'all',
        },
        eventType: 'track',
        tenantIdType: 'none',
      });
    });
  });

  describe('calculateAboveGroup', () => {
    const timeGroups = [
      {
        timeGroup: TimeGroup.TODAY,
        notifications: [],
      },
      {
        timeGroup: TimeGroup.YESTERDAY,
        notifications: [],
      },
      {
        timeGroup: TimeGroup.OLDER,
        notifications: [],
      },
    ];
    test('should return a valid grouping message if scrolling up', () => {
      expect(
        calculateAboveGroup(
          Waypoint.above,
          Waypoint.inside,
          2,
          timeGroups,
          false,
        ),
      ).toEqual(messages.timeGroupingYesterday);
    });
    test('should fallback to the first group if already at the first group', () => {
      expect(
        calculateAboveGroup(
          Waypoint.above,
          Waypoint.inside,
          0,
          timeGroups,
          false,
        ),
      ).toEqual(messages.timeGroupingToday);
    });
    test('should fallback to latest message if onlyOlderTimeGroup is true', () => {
      expect(
        calculateAboveGroup(
          Waypoint.above,
          Waypoint.inside,
          // You cannot scroll "up" from a group to the last group
          // so this value won't be encountered in practice.
          // (Indeed, index < timeGroups.length for all timeGroups.)
          3,
          timeGroups,
          true,
        ),
      ).toEqual(messages.timeGroupingLatest);
    });
    test('should return no message if not a valid scroll up', () => {
      expect(
        calculateAboveGroup(
          Waypoint.inside,
          Waypoint.above,
          1,
          timeGroups,
          false,
        ),
      ).toEqual(undefined);
    });
  });

  describe('calculateBelowGroup', () => {
    const timeGroups = [
      {
        timeGroup: TimeGroup.TODAY,
        notifications: [],
      },
      {
        timeGroup: TimeGroup.YESTERDAY,
        notifications: [],
      },
      {
        timeGroup: TimeGroup.OLDER,
        notifications: [],
      },
    ];
    test('should return a valid grouping message if scrolling down', () => {
      expect(
        calculateBelowGroup(
          Waypoint.inside,
          Waypoint.above,
          1,
          timeGroups,
          false,
        ),
      ).toEqual(messages.timeGroupingYesterday);
    });
    test('should fallback to latest message if onlyOlderTimeGroup is true', () => {
      expect(
        calculateBelowGroup(
          Waypoint.inside,
          Waypoint.above,
          2,
          timeGroups,
          true,
        ),
      ).toEqual(messages.timeGroupingLatest);
    });
    test('should return no message if not a valid scroll down', () => {
      expect(
        calculateBelowGroup(
          Waypoint.above,
          Waypoint.inside,
          0,
          timeGroups,
          false,
        ),
      ).toEqual(undefined);
    });
  });

  describe('fetchState', () => {
    describe('grouping', () => {
      test('should display 3 time groupings of notifications', () => {
        const mockContext = {
          ...mockNotificationsStoreContext,
          state: {
            ...mockNotificationsStoreContext.state,
            notifications: [
              {
                notifications: convertToRenderableNotifications(
                  [buildJiraNotification({ id: '0' })],
                  LoadingState.COMPLETE,
                ),
                timeGroup: TimeGroup.TODAY,
              },
              {
                notifications: convertToRenderableNotifications(
                  [buildJiraNotification({ id: '1' })],
                  LoadingState.COMPLETE,
                ),
                timeGroup: TimeGroup.YESTERDAY,
              },
              {
                notifications: convertToRenderableNotifications(
                  [buildJiraNotification({ id: '2' })],
                  LoadingState.COMPLETE,
                ),
                timeGroup: TimeGroup.OLDER,
              },
            ],
          },
        };

        const { queryAllByTestId } = customRender(
          <NotificationList updateGroupingHeaders={() => {}} />,
          mockContext,
        );

        expect(queryAllByTestId('notification-item-container').length).toBe(3);
        expect(queryAllByTestId('time-group-heading-TODAY').length).toBe(1);
        expect(queryAllByTestId('time-group-heading-YESTERDAY').length).toBe(1);
        expect(queryAllByTestId('time-group-heading-OLDER').length).toBe(1);
      });

      test('should display OLDER time grouping as LATEST if no other groupings', () => {
        const mockContext = {
          ...mockNotificationsStoreContext,
          state: {
            ...mockNotificationsStoreContext.state,
            notifications: [
              {
                notifications: convertToRenderableNotifications(
                  [buildJiraNotification({ id: '2' })],
                  LoadingState.COMPLETE,
                ),
                timeGroup: TimeGroup.OLDER,
              },
            ],
          },
        };

        const { queryAllByTestId, getByText } = customRender(
          <NotificationList updateGroupingHeaders={() => {}} />,
          mockContext,
        );

        expect(queryAllByTestId('notification-item-container').length).toBe(1);
        expect(queryAllByTestId('time-group-heading-TODAY').length).toBe(0);
        expect(queryAllByTestId('time-group-heading-YESTERDAY').length).toBe(0);
        expect(queryAllByTestId('time-group-heading-OLDER').length).toBe(1);
        expect(getByText('Latest')).toBeInTheDocument();
      });
    });
  });

  describe('keyboard navigation', () => {
    function setupMockComponent() {
      const notifications = [...Array(3)].map((_, index) => {
        return buildJiraNotification({
          id: `${index}`,
        });
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

      return customRender(
        <FeatureFlagsProvider
          flags={{
            enableKeyboardNavigation: true,
          }}
        >
          <NotificationList updateGroupingHeaders={() => {}} />
        </FeatureFlagsProvider>,
        mockContext,
      );
    }

    test('should navigate down notification with the DownArrow key and wrap to top', () => {
      const { queryAllByTestId, onAnalyticEventFired } = setupMockComponent();

      function getNotificationByIndex(index: number): HTMLElement {
        return queryAllByTestId('notification-item-main-action')[index];
      }

      userEvent.tab(); // Mark all as read button
      userEvent.tab(); // first notification

      const firstNotification = getNotificationByIndex(0);
      expect(firstNotification).toHaveFocus();

      fireEvent.keyDown(firstNotification, { key: 'ArrowDown' });
      const secondNotification = getNotificationByIndex(1);
      expect(secondNotification).toHaveFocus();

      expect(onAnalyticEventFired).toHaveBeenLastCalledWith(
        expect.objectContaining({
          action: 'pressed',
          actionSubject: 'keyboardShortcut',
          actionSubjectId: 'NextNotificationKeyboardShortcut',
        }),
      );

      fireEvent.keyDown(secondNotification, { key: 'ArrowDown' });
      const thirdNotification = getNotificationByIndex(2);
      expect(thirdNotification).toHaveFocus();

      // Assert it wraps back to the top
      fireEvent.keyDown(thirdNotification, { key: 'ArrowDown' });
      expect(firstNotification).toHaveFocus();
    });

    test('should navigate up notifications with the ArrowUp key and wrap to bottom', () => {
      const { queryAllByTestId, onAnalyticEventFired } = setupMockComponent();

      function getNotificationByIndex(index: number): HTMLElement {
        return queryAllByTestId('notification-item-main-action')[index];
      }

      const firstNotification = getNotificationByIndex(0);
      const secondNotification = getNotificationByIndex(1);
      const thirdNotification = getNotificationByIndex(2);

      userEvent.tab(); // Mark all as read button
      userEvent.tab(); // first notification

      expect(firstNotification).toHaveFocus();

      // Assert it wraps back to the top
      fireEvent.keyDown(firstNotification, { key: 'ArrowUp' });
      expect(thirdNotification).toHaveFocus();

      expect(onAnalyticEventFired).toHaveBeenLastCalledWith(
        expect.objectContaining({
          action: 'pressed',
          actionSubject: 'keyboardShortcut',
          actionSubjectId: 'PreviousNotificationKeyboardShortcut',
        }),
      );

      fireEvent.keyDown(thirdNotification, { key: 'ArrowUp' });
      expect(secondNotification).toHaveFocus();

      fireEvent.keyDown(secondNotification, { key: 'ArrowUp' });
      expect(firstNotification).toHaveFocus();
    });

    test('should navigate to the first/last notification when the Shift + "Up"/"Down" keys are pressed', () => {
      const { queryAllByTestId, onAnalyticEventFired } = setupMockComponent();

      function getNotificationByIndex(index: number): HTMLElement {
        return queryAllByTestId('notification-item-main-action')[index];
      }

      const firstNotification = getNotificationByIndex(0);
      const lastNotification = getNotificationByIndex(2);

      userEvent.tab(); // Mark all as read button
      userEvent.tab(); // first notification

      expect(firstNotification).toHaveFocus();

      fireEvent.keyDown(firstNotification, {
        key: 'ArrowDown',
        shiftKey: true,
      });
      expect(lastNotification).toHaveFocus();

      expect(onAnalyticEventFired).toHaveBeenLastCalledWith(
        expect.objectContaining({
          action: 'pressed',
          actionSubject: 'keyboardShortcut',
          actionSubjectId: 'LastNotificationKeyboardShortcut',
        }),
      );

      fireEvent.keyDown(lastNotification, { key: 'ArrowUp', shiftKey: true });
      expect(firstNotification).toHaveFocus();
      expect(onAnalyticEventFired).toHaveBeenLastCalledWith(
        expect.objectContaining({
          action: 'pressed',
          actionSubject: 'keyboardShortcut',
          actionSubjectId: 'FirstNotificationKeyboardShortcut',
        }),
      );
    });

    test('should navigate through all tabable items with "Tab"', () => {
      const { queryAllByTestId } = setupMockComponent();

      function getNotificationByIndex(index: number): HTMLElement {
        return queryAllByTestId('notification-item-main-action')[index];
      }

      const firstNotification = getNotificationByIndex(0);
      const secondNotification = getNotificationByIndex(1);

      userEvent.tab(); // Mark all as read button
      userEvent.tab(); // first notification

      expect(firstNotification).toHaveFocus();

      userEvent.tab();
      expect(
        queryAllByTestId('notification-item-entity-link')[0],
      ).toHaveFocus();

      userEvent.tab();
      expect(queryAllByTestId('notification-item-path-link')[0]).toHaveFocus();

      userEvent.tab();
      expect(queryAllByTestId('read-state-indicator')[0]).toHaveFocus();

      userEvent.tab();
      expect(secondNotification).toHaveFocus();
    });

    test('should activate the first notification when ArrowDown is pressed', () => {
      const { queryAllByTestId } = setupMockComponent();

      function getNotificationByIndex(index: number): HTMLElement {
        return queryAllByTestId('notification-item-main-action')[index];
      }

      const firstNotification = getNotificationByIndex(0);

      expect(firstNotification).not.toHaveFocus();

      fireEvent.keyDown(document, {
        key: 'ArrowDown',
        shiftKey: true,
      });

      expect(firstNotification).toHaveFocus();
    });
  });
});
