import React from 'react';

import { fireEvent, render, wait } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import waitForExpect from 'wait-for-expect';

import {
  LoadingState,
  ReadState,
  RequestCategory,
  RequestReadState,
} from '../../../../../common/types';
import { NotificationsStoreContext } from '../../../../../common/ui/notifications-context';
import { createMockProviders } from '../../../../../common/utils/test-helpers';

import {
  fakeNotificationWithoutStatus,
  fakeNotificationWithStatus,
} from './mocks';
import { buildPathText } from './utils';

import NotificationItem, {
  NotificationItemWithKeyboardNavigation,
} from './index';

const mockNotificationsStoreContext: NotificationsStoreContext = {
  state: {
    notifications: [],
    canLoadMore: true,
    fetchState: LoadingState.LOADING,
    isMarkAllAsReadVisible: true,
    markBulkNotifications: jest.fn(),
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

// Somehow open is not implemented in tests
window.open = jest.fn();

// mock no text selection in tests. window.getSelection().toString() was
// returning [object Object] otherwise.
window.getSelection = jest.fn().mockReturnValue(null);

describe('(Component) NotificationItem', () => {
  describe('Tab Order', () => {
    test('should focus the notification elements in logical order', async () => {
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <NotificationItem
            listIndex={1}
            forceContentLoading={false}
            notification={{ ...fakeNotificationWithStatus }}
          />
        </IntlProvider>,
      );

      await wait(() => {
        expect(
          getByTestId('notification-item-document-wrapper'),
        ).toBeInTheDocument();
      });

      userEvents.tab();
      expect(getByTestId('notification-item-main-action')).toHaveFocus();

      userEvents.tab();
      expect(getByTestId('notification-item-entity-link')).toHaveFocus();

      userEvents.tab();
      expect(getByTestId('notification-item-path-link')).toHaveFocus();

      userEvents.tab();
      expect(getByTestId('read-state-indicator')).toHaveFocus();

      userEvents.tab();
      expect(getByTestId('notification-item-document-wrapper')).toHaveFocus();
    });

    test('should toggle read state when pressing "r"', () => {
      const { MockProviders, onAnalyticEventFired } = createMockProviders();

      const { getByTestId } = render(
        <MockProviders>
          <NotificationsStoreContext.Provider
            value={mockNotificationsStoreContext}
          >
            <NotificationItemWithKeyboardNavigation
              listIndex={1}
              forceContentLoading={false}
              notification={{ ...fakeNotificationWithStatus }}
            />
          </NotificationsStoreContext.Provider>
        </MockProviders>,
      );

      userEvents.tab();

      fireEvent.keyDown(getByTestId('notification-item-main-action'), {
        key: 'r',
      });

      expect(onAnalyticEventFired).toHaveBeenCalledTimes(2);

      expect(onAnalyticEventFired.mock.calls[0][0].action).toEqual('pressed');
      expect(onAnalyticEventFired.mock.calls[0][0].actionSubject).toEqual(
        'keyboardShortcut',
      );
      expect(onAnalyticEventFired.mock.calls[0][0].actionSubjectId).toEqual(
        'markNotificationReadKeyboardShortcut',
      );

      expect(
        mockNotificationsStoreContext.state.markBulkNotifications,
      ).toHaveBeenCalledTimes(1);
    });

    test('should toggle expand state when pressing "e"', () => {
      const { MockProviders, onAnalyticEventFired } = createMockProviders();
      const { getByTestId } = render(
        <MockProviders>
          <NotificationItemWithKeyboardNavigation
            listIndex={1}
            forceContentLoading={false}
            notification={{ ...fakeNotificationWithStatus }}
          />
        </MockProviders>,
      );

      userEvents.tab();
      fireEvent.keyDown(getByTestId('notification-item-main-action'), {
        key: 'e',
      });

      expect(onAnalyticEventFired).toHaveBeenCalledTimes(2);

      expect(onAnalyticEventFired.mock.calls[0][0].action).toEqual('pressed');
      expect(onAnalyticEventFired.mock.calls[0][0].actionSubject).toEqual(
        'keyboardShortcut',
      );
      expect(onAnalyticEventFired.mock.calls[0][0].actionSubjectId).toEqual(
        'expandNotificationKeyboardShortcut',
      );

      expect(onAnalyticEventFired.mock.calls[1][0].action).toEqual('expanded');
      expect(onAnalyticEventFired.mock.calls[1][0].actionSubject).toEqual(
        'notification',
      );
      expect(onAnalyticEventFired.mock.calls[1][0].actionSubjectId).toEqual(
        'document',
      );
    });
  });

  describe('analytic events', () => {
    const expectedNotificationAttributes = {
      listIndex: 1,
      notificationAgeInSeconds: Math.floor(
        (Date.now() -
          new Date(fakeNotificationWithStatus.timestamp).getTime()) /
          1000,
      ),
      notificationCategory: 'direct',
      notificationReadState: 'read',
    };
    const expectedContainers = {
      notification: {
        id: '1610341211607-pdlMrTzSDQ4JTddk',
      },
    };
    test('triggers notification link item viewed', async () => {
      const { MockProviders, onAnalyticEventFired } = createMockProviders();
      render(
        <MockProviders>
          <NotificationItem
            listIndex={1}
            forceContentLoading={false}
            notification={{ ...fakeNotificationWithStatus }}
          />
        </MockProviders>,
      );
      await waitForExpect(() => {
        expect(onAnalyticEventFired).toHaveBeenCalledTimes(1);
      });
      expect(onAnalyticEventFired.mock.calls[0][0]).toEqual({
        action: 'viewed',
        actionSubject: 'notification',
        actionSubjectId: '1610341211607-pdlMrTzSDQ4JTddk',
        attributes: {
          cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
          categoryFilter: 'direct',
          readStateFilter: 'any',
          product: 'unset',
          registrationName: 'streamhub-jira-issue-mention',
          registrationOwner: 'streamhub-jira',
          registrationProduct: 'jira',
          userHourOfDay: expect.any(Number),
          ...expectedNotificationAttributes,
        },
        containers: expectedContainers,
        eventType: 'track',
        tenantIdType: 'none',
      });
    });
    test('triggers mark on as unread', async () => {
      const { MockProviders, onAnalyticEventFired } = createMockProviders();
      const { getByTestId } = render(
        <MockProviders>
          <NotificationItem
            listIndex={1}
            forceContentLoading={false}
            notification={{
              ...fakeNotificationWithStatus,
              readState: ReadState.READ,
            }}
          />
        </MockProviders>,
      );
      userEvents.click(getByTestId('read-state-indicator'));
      expect(onAnalyticEventFired).toHaveBeenCalledTimes(1);
      expect(onAnalyticEventFired.mock.calls[0][0]).toEqual({
        action: 'marked',
        actionSubject: 'notification',
        actionSubjectId: '1610341211607-pdlMrTzSDQ4JTddk',
        attributes: {
          cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
          categoryFilter: 'direct',
          readStateFilter: 'any',
          product: 'unset',
          registrationName: 'streamhub-jira-issue-mention',
          registrationOwner: 'streamhub-jira',
          registrationProduct: 'jira',
          userHourOfDay: expect.any(Number),
          toState: 'unread',
          markType: 'single',
          ...expectedNotificationAttributes,
        },
        containers: expectedContainers,
        eventType: 'track',
        tenantIdType: 'none',
      });
    });
    test('triggers mark on as read', async () => {
      const { MockProviders, onAnalyticEventFired } = createMockProviders();
      const { getByTestId } = render(
        <MockProviders>
          <NotificationItem
            listIndex={1}
            forceContentLoading={false}
            notification={{
              ...fakeNotificationWithStatus,
              readState: ReadState.UNREAD,
            }}
          />
        </MockProviders>,
      );
      userEvents.click(getByTestId('read-state-indicator'));
      expect(onAnalyticEventFired).toHaveBeenCalledTimes(1);
      expect(onAnalyticEventFired.mock.calls[0][0]).toEqual({
        action: 'marked',
        actionSubject: 'notification',
        actionSubjectId: '1610341211607-pdlMrTzSDQ4JTddk',
        attributes: {
          cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
          categoryFilter: 'direct',
          readStateFilter: 'any',
          product: 'unset',
          registrationName: 'streamhub-jira-issue-mention',
          registrationOwner: 'streamhub-jira',
          registrationProduct: 'jira',
          userHourOfDay: expect.any(Number),
          toState: 'read',
          markType: 'single',
          ...expectedNotificationAttributes,
          notificationReadState: 'unread',
        },
        containers: expectedContainers,
        eventType: 'track',
        tenantIdType: 'none',
      });
    });
    test('triggers link item clicked event for main action', async () => {
      const { MockProviders, onAnalyticEventFired } = createMockProviders();
      const { getByTestId } = render(
        <MockProviders>
          <NotificationItem
            listIndex={1}
            forceContentLoading={false}
            notification={{ ...fakeNotificationWithStatus }}
          />
        </MockProviders>,
      );
      userEvents.click(getByTestId('notification-item-main-action'));
      expect(onAnalyticEventFired).toHaveBeenCalledTimes(1);
      expect(onAnalyticEventFired.mock.calls[0][0]).toEqual({
        action: 'clicked',
        actionSubject: 'link',
        actionSubjectId: 'mainAction',
        attributes: {
          cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
          // no AnalyticsContext
          isCrossSite: 'unknown',
          isCrossProduct: 'true',
          categoryFilter: 'direct',
          readStateFilter: 'any',
          product: 'unset',
          registrationName: 'streamhub-jira-issue-mention',
          registrationOwner: 'streamhub-jira',
          registrationProduct: 'jira',
          userHourOfDay: expect.any(Number),
          ...expectedNotificationAttributes,
        },
        containers: expectedContainers,
        eventType: 'ui',
        tenantIdType: 'none',
      });
    });

    test('triggers link item clicked event for entity', async () => {
      const { MockProviders, onAnalyticEventFired } = createMockProviders();
      const { getByTestId } = render(
        <MockProviders>
          <NotificationItem
            listIndex={1}
            forceContentLoading={false}
            notification={{ ...fakeNotificationWithStatus }}
          />
        </MockProviders>,
      );
      userEvents.click(getByTestId('notification-item-entity-link'));
      expect(onAnalyticEventFired).toHaveBeenCalledTimes(1);
      expect(onAnalyticEventFired.mock.calls[0][0]).toEqual({
        action: 'clicked',
        actionSubject: 'link',
        actionSubjectId: 'entity',
        attributes: {
          cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
          isCrossSite: 'unknown',
          isCrossProduct: 'true',
          categoryFilter: 'direct',
          readStateFilter: 'any',
          product: 'unset',
          registrationName: 'streamhub-jira-issue-mention',
          registrationOwner: 'streamhub-jira',
          registrationProduct: 'jira',
          userHourOfDay: expect.any(Number),
          ...expectedNotificationAttributes,
        },
        containers: expectedContainers,
        eventType: 'ui',
        tenantIdType: 'none',
      });
    });

    test('triggers link item clicked event for path', async () => {
      const { MockProviders, onAnalyticEventFired } = createMockProviders();
      const { getByTestId } = render(
        <MockProviders>
          <NotificationItem
            forceContentLoading={false}
            listIndex={1}
            notification={{ ...fakeNotificationWithStatus }}
          />
        </MockProviders>,
      );
      userEvents.click(getByTestId('notification-item-path-link'));
      expect(onAnalyticEventFired).toHaveBeenCalledTimes(1);
      expect(onAnalyticEventFired.mock.calls[0][0]).toEqual({
        action: 'clicked',
        actionSubject: 'link',
        actionSubjectId: 'path',
        attributes: {
          cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
          isCrossSite: 'unknown',
          isCrossProduct: 'true',
          categoryFilter: 'direct',
          readStateFilter: 'any',
          product: 'unset',
          registrationName: 'streamhub-jira-issue-mention',
          registrationOwner: 'streamhub-jira',
          registrationProduct: 'jira',
          userHourOfDay: expect.any(Number),
          ...expectedNotificationAttributes,
        },
        containers: expectedContainers,
        eventType: 'ui',
        tenantIdType: 'none',
      });
    });

    test('triggers document expand & collapse', async () => {
      const { MockProviders, onAnalyticEventFired } = createMockProviders();
      const { getByTestId } = render(
        <MockProviders>
          <NotificationItem
            forceContentLoading={false}
            listIndex={1}
            notification={{ ...fakeNotificationWithStatus }}
          />
        </MockProviders>,
      );

      const documentWrapper = getByTestId('notification-item-document-wrapper');
      documentWrapper.focus();
      expect(documentWrapper).toHaveFocus();
      fireEvent.click(documentWrapper);
      expect(onAnalyticEventFired).toHaveBeenCalledTimes(1);
      expect(onAnalyticEventFired.mock.calls[0][0]).toEqual({
        action: 'expanded',
        actionSubject: 'notification',
        actionSubjectId: 'document',
        attributes: {
          cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
          categoryFilter: 'direct',
          feature: 'expand',
          readStateFilter: 'any',
          product: 'unset',
          registrationName: 'streamhub-jira-issue-mention',
          registrationOwner: 'streamhub-jira',
          registrationProduct: 'jira',
          userHourOfDay: expect.any(Number),
          ...expectedNotificationAttributes,
        },
        containers: expectedContainers,
        eventType: 'ui',
        tenantIdType: 'none',
      });
      fireEvent.click(documentWrapper);
      expect(onAnalyticEventFired).toHaveBeenCalledTimes(2);
      expect(onAnalyticEventFired.mock.calls[1][0]).toEqual({
        action: 'collapsed',
        actionSubject: 'notification',
        actionSubjectId: 'document',
        attributes: {
          cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
          categoryFilter: 'direct',
          feature: 'expand',
          readStateFilter: 'any',
          product: 'unset',
          registrationName: 'streamhub-jira-issue-mention',
          registrationOwner: 'streamhub-jira',
          registrationProduct: 'jira',
          userHourOfDay: expect.any(Number),
          ...expectedNotificationAttributes,
        },
        containers: expectedContainers,
        eventType: 'ui',
        tenantIdType: 'none',
      });
    });
  });
  // TODO: Replace these snapshots with stable assertions. Renderer bumps break the snapshots.
  describe.skip('Adf Expand', () => {
    test('should expand notification adf using enter keypress', async () => {
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <NotificationItem
            listIndex={1}
            forceContentLoading={false}
            notification={{ ...fakeNotificationWithStatus }}
          />
        </IntlProvider>,
      );

      const documentWrapper = getByTestId('notification-item-document-wrapper');
      documentWrapper.focus();
      expect(getByTestId('notification-item-document-wrapper')).toHaveFocus();

      expect(documentWrapper).toMatchSnapshot();

      fireEvent.keyDown(documentWrapper, { key: 'Enter', code: 'Enter' });

      expect(documentWrapper).toMatchSnapshot();
    });

    test('should expand notification adf on click', async () => {
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <NotificationItem
            listIndex={1}
            forceContentLoading={false}
            notification={{ ...fakeNotificationWithStatus }}
          />
        </IntlProvider>,
      );

      const documentWrapper = getByTestId('notification-item-document-wrapper');
      documentWrapper.focus();
      expect(getByTestId('notification-item-document-wrapper')).toHaveFocus();

      expect(documentWrapper).toMatchSnapshot();

      fireEvent.click(documentWrapper);

      expect(documentWrapper).toMatchSnapshot();
    });
  });
});

describe('buildPathText()', () => {
  test('should construct correct path text when given Jira issue', () => {
    expect(
      buildPathText(
        fakeNotificationWithStatus.content.path,
        fakeNotificationWithStatus.content.entity,
      ),
    ).toEqual('STAR-1 • Backlog');
  });

  test('should construct path without status when status is null', () => {
    expect(
      buildPathText(
        fakeNotificationWithoutStatus.content.path,
        fakeNotificationWithoutStatus.content.entity,
      ),
    ).toEqual('CLIN-3');
  });

  test('should return empty string when path is empty list', () => {
    expect(
      buildPathText([], fakeNotificationWithStatus.content.entity),
    ).toEqual('');
  });
});
