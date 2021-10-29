import React from 'react';

import { waitFor } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvents from '@testing-library/user-event';

// TODO: This is now used in tests, maybe a good idea to move it outside examples
import {
  mockEndpoints,
  resetMocks,
} from '../../../examples/utils/mock-endpoints';
import { getExperienceTimeout } from '../../common/utils/experience-tracking/utils';
import { createMockProviders } from '../../common/utils/test-helpers';

import { ExpandableAdfDocument } from './layout/notification-list/notification-item/document-container/document/adf-document';
import Notifications from './main';

jest.mock(
  './layout/notification-list/notification-item/document-container/document/adf-document',
);
jest.mock('../../common/utils/experience-tracking/utils');
jest.mock('../../common/utils/facade/performance', () => {
  return function () {
    return {
      isAvailable: false,
      now: () => 100,
    };
  };
});

const componentTestId = 'notification-list';
const testIds = {
  categoryFilterTab: 'category-filter-tab',
  readStateToggle: 'read-state-toggle',
};
const waitForOptions = { timeout: 2000 };

const assertSloEventFired = (
  onAnalyticEventFired: jest.Mock<any, any>,
  action: string,
  actionSubject: string,
  extraAttributes?: { [key: string]: any },
) => {
  expect(onAnalyticEventFired).toHaveBeenCalledWith({
    action,
    actionSubject,
    attributes: {
      bucket: expect.any(String),
      categoryFilter: 'direct',
      duration: expect.any(Number),
      firstLoad: true,
      product: 'jira',
      readStateFilter: 'any',
      userHourOfDay: expect.any(Number),
      ...extraAttributes,
    },
    eventType: 'operational',
    tenantIdType: 'none',
  });
};

describe('Notifications layout', () => {
  beforeEach(() => {
    resetMocks();
    (ExpandableAdfDocument as jest.Mock).mockImplementation(() => {
      return <div>Mocked adf document</div>;
    });
    (getExperienceTimeout as jest.Mock).mockImplementation(() => {
      return 10000;
    });
  });

  describe('SLO events', () => {
    test('SLO good event - both with and without content renders', async () => {
      mockEndpoints({ withContentTimeout: 50, withoutContentTimeout: 10 });

      const { MockProviders, onAnalyticEventFired } = createMockProviders({
        shouldTrackAnalyticsPayload: (payload) => {
          return payload.action === 'renderSucceeded';
        },
      });
      render(
        <MockProviders>
          <Notifications product="jira" testId={componentTestId} />
        </MockProviders>,
      );

      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderSucceeded',
            'notificationsWithoutContent',
            { noNotificationsScreen: false },
          ),
        waitForOptions,
      );
      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderSucceeded',
            'notificationsWithContent',
            { noNotificationsScreen: false },
          ),
        waitForOptions,
      );
    });

    test('SLO good event - with content renders + without content client errors', async () => {
      mockEndpoints({
        withContentTimeout: 50,
        withoutContentTimeout: 10,
        withoutContentErrorCode: 403,
      });

      const { MockProviders, onAnalyticEventFired } = createMockProviders({
        shouldTrackAnalyticsPayload: (payload) => {
          return payload.action === 'renderSucceeded';
        },
      });
      render(
        <MockProviders>
          <Notifications product="jira" testId={componentTestId} />
        </MockProviders>,
      );

      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderSucceeded',
            'notificationsWithoutContent',
            { noNotificationsScreen: false },
          ),
        waitForOptions,
      );
      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderSucceeded',
            'notificationsWithContent',
            { noNotificationsScreen: false },
          ),
        waitForOptions,
      );
    });

    test('SLO good event - with content renders + without content fails', async () => {
      mockEndpoints({
        withContentTimeout: 50,
        withoutContentTimeout: 10,
        withoutContentErrorCode: 500,
      });

      const { MockProviders, onAnalyticEventFired } = createMockProviders({
        shouldTrackAnalyticsPayload: (payload) => {
          return payload.action === 'renderSucceeded';
        },
      });
      render(
        <MockProviders>
          <Notifications product="jira" testId={componentTestId} />
        </MockProviders>,
      );

      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderSucceeded',
            'notificationsWithoutContent',
            { noNotificationsScreen: false },
          ),
        waitForOptions,
      );
      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderSucceeded',
            'notificationsWithContent',
            { noNotificationsScreen: false },
          ),
        waitForOptions,
      );
    });

    test('SLO good event - no notifications to render', async () => {
      mockEndpoints({
        withContentTimeout: 50,
        withoutContentTimeout: 10,
        noNotifications: true,
      });

      const { MockProviders, onAnalyticEventFired } = createMockProviders({
        shouldTrackAnalyticsPayload: (payload) => {
          return payload.action === 'renderSucceeded';
        },
      });
      render(
        <MockProviders>
          <Notifications product="jira" testId={componentTestId} />
        </MockProviders>,
      );

      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderSucceeded',
            'notificationsWithoutContent',
            { noNotificationsScreen: true },
          ),
        waitForOptions,
      );
    });

    test('SLO abort events - closing the component aborts SLO events', async () => {
      mockEndpoints({ withContentTimeout: 1000, withoutContentTimeout: 1000 });

      const { MockProviders, onAnalyticEventFired } = createMockProviders({
        shouldTrackAnalyticsPayload: (payload) => {
          return payload.action === 'renderAborted';
        },
      });
      const { unmount } = render(
        <MockProviders>
          <Notifications product="jira" testId={componentTestId} />
        </MockProviders>,
      );

      unmount();

      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderAborted',
            'notificationsWithoutContent',
            { abortReason: 'component-unmounted' },
          ),
        waitForOptions,
      );

      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderAborted',
            'notificationsWithContent',
            { abortReason: 'component-unmounted' },
          ),
        waitForOptions,
      );
    });

    test('SLO abort event - changing filters aborts the SLO event', async () => {
      mockEndpoints({ withContentTimeout: 1000, withoutContentTimeout: 1000 });

      const { MockProviders, onAnalyticEventFired } = createMockProviders({
        shouldTrackAnalyticsPayload: (payload) => {
          return payload.action === 'renderAborted';
        },
      });
      const { getByTestId } = render(
        <MockProviders>
          <Notifications product="jira" testId={componentTestId} />
        </MockProviders>,
      );
      const [watchingFilterToggle] = getByTestId(
        testIds.categoryFilterTab,
      ).querySelectorAll('[role="tab"]');

      userEvents.click(watchingFilterToggle);

      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderAborted',
            'notificationsWithoutContent',
            { abortReason: 'change-filter' },
          ),
        waitForOptions,
      );

      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderAborted',
            'notificationsWithContent',
            { abortReason: 'change-filter' },
          ),
        waitForOptions,
      );
    });

    test('SLO withContent abort event - notification list without content aborts withContent call', async () => {
      mockEndpoints({
        withContentTimeout: 50,
        withoutContentTimeout: 10,
        removeAdf: true,
      });

      const { MockProviders, onAnalyticEventFired } = createMockProviders({
        shouldTrackAnalyticsPayload: (payload) => {
          return (
            payload.action === 'renderSucceeded' ||
            payload.action === 'renderAborted'
          );
        },
      });
      render(
        <MockProviders>
          <Notifications product="jira" testId={componentTestId} />
        </MockProviders>,
      );

      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderSucceeded',
            'notificationsWithoutContent',
            { noNotificationsScreen: false },
          ),
        waitForOptions,
      );

      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderAborted',
            'notificationsWithContent',
            { abortReason: 'no-adf-documents' },
          ),
        waitForOptions,
      );
    });

    test('SLO withContent abort event - withoutContent success + withContent client error', async () => {
      mockEndpoints({
        withContentTimeout: 50,
        withoutContentTimeout: 10,
        withContentErrorCode: 403,
        removeAdf: true,
      });

      const { MockProviders, onAnalyticEventFired } = createMockProviders({
        shouldTrackAnalyticsPayload: (payload) => {
          return (
            payload.action === 'renderSucceeded' ||
            payload.action === 'renderAborted'
          );
        },
      });
      render(
        <MockProviders>
          <Notifications product="jira" testId={componentTestId} />
        </MockProviders>,
      );

      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderSucceeded',
            'notificationsWithoutContent',
            { noNotificationsScreen: false },
          ),
        waitForOptions,
      );

      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderAborted',
            'notificationsWithContent',
            { abortReason: 'client-error', statusCode: 403 },
          ),
        waitForOptions,
      );
    });

    test('SLO abort events - fetch calls are client errors', async () => {
      mockEndpoints({
        withContentTimeout: 50,
        withoutContentTimeout: 10,
        withoutContentErrorCode: 403,
        withContentErrorCode: 403,
        removeAdf: true,
      });

      const { MockProviders, onAnalyticEventFired } = createMockProviders({
        shouldTrackAnalyticsPayload: (payload) => {
          return (
            payload.action === 'renderSucceeded' ||
            payload.action === 'renderAborted'
          );
        },
      });
      render(
        <MockProviders>
          <Notifications product="jira" testId={componentTestId} />
        </MockProviders>,
      );

      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderAborted',
            'notificationsWithoutContent',
            { abortReason: 'client-error', statusCode: 403 },
          ),
        waitForOptions,
      );

      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderAborted',
            'notificationsWithContent',
            { abortReason: 'client-error', statusCode: 403 },
          ),
        waitForOptions,
      );
    });

    test('SLO withContent bad event - content call failure', async () => {
      mockEndpoints({
        withoutContentTimeout: 10,
        withContentTimeout: 50,
        withContentErrorCode: 500,
      });

      const { MockProviders, onAnalyticEventFired } = createMockProviders({
        shouldTrackAnalyticsPayload: (payload) => {
          return (
            payload.action === 'renderSucceeded' ||
            payload.action === 'renderFailed'
          );
        },
      });
      render(
        <MockProviders>
          <Notifications product="jira" testId={componentTestId} />
        </MockProviders>,
      );

      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderSucceeded',
            'notificationsWithoutContent',
            { noNotificationsScreen: false },
          ),
        waitForOptions,
      );
      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderFailed',
            'notificationsWithContent',
            { failureReason: 'fetch-failed', statusCode: 500 },
          ),
        waitForOptions,
      );
    });

    test('SLO withContent bad event - ADF failed to render', async () => {
      mockEndpoints({
        withoutContentTimeout: 10,
        withContentTimeout: 50,
        brokenAdf: true,
      });
      (ExpandableAdfDocument as jest.Mock).mockImplementation(() => {
        throw new Error('ADF failed to render');
      });

      const { MockProviders, onAnalyticEventFired } = createMockProviders({
        shouldTrackAnalyticsPayload: (payload) => {
          return (
            payload.action === 'renderSucceeded' ||
            payload.action === 'renderFailed'
          );
        },
      });
      render(
        <MockProviders>
          <Notifications product="jira" testId={componentTestId} />
        </MockProviders>,
      );

      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderSucceeded',
            'notificationsWithoutContent',
            { noNotificationsScreen: false },
          ),
        waitForOptions,
      );
      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderFailed',
            'notificationsWithContent',
            { failureReason: 'adf-render-failed' },
          ),
        waitForOptions,
      );
    });

    test('SLO bad events - both calls failed', async () => {
      mockEndpoints({
        withoutContentTimeout: 10,
        withContentTimeout: 50,
        withoutContentErrorCode: 500,
        withContentErrorCode: 500,
      });

      const { MockProviders, onAnalyticEventFired } = createMockProviders({
        shouldTrackAnalyticsPayload: (payload) => {
          return (
            payload.action === 'renderSucceeded' ||
            payload.action === 'renderFailed'
          );
        },
      });
      render(
        <MockProviders>
          <Notifications product="jira" testId={componentTestId} />
        </MockProviders>,
      );

      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderFailed',
            'notificationsWithContent',
            { failureReason: 'fetch-failed', statusCode: 500 },
          ),
        waitForOptions,
      );
      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderFailed',
            'notificationsWithoutContent',
            { failureReason: 'fetch-failed', statusCode: 500 },
          ),
        waitForOptions,
      );
    });

    test('SLO bad events - closing the component after timeout fails SLO events', async () => {
      (getExperienceTimeout as jest.Mock).mockImplementation(() => {
        return 10;
      });

      mockEndpoints({ withContentTimeout: 1000, withoutContentTimeout: 1000 });

      const { MockProviders, onAnalyticEventFired } = createMockProviders({
        shouldTrackAnalyticsPayload: (payload) => {
          return payload.action === 'renderFailed';
        },
      });
      const { unmount } = render(
        <MockProviders>
          <Notifications product="jira" testId={componentTestId} />
        </MockProviders>,
      );

      unmount();

      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderFailed',
            'notificationsWithoutContent',
            { failureReason: 'abort-timeout' },
          ),
        waitForOptions,
      );

      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderFailed',
            'notificationsWithContent',
            { failureReason: 'abort-timeout' },
          ),
        waitForOptions,
      );
    });

    test('SLO bad events - root failure', async () => {
      mockEndpoints({
        withoutContentTimeout: 10,
        withContentTimeout: 50,
        breakComponentEntirely: true,
      });

      const { MockProviders, onAnalyticEventFired } = createMockProviders({
        shouldTrackAnalyticsPayload: (payload) => {
          return (
            payload.action === 'renderSucceeded' ||
            payload.action === 'renderFailed'
          );
        },
      });
      render(
        <MockProviders>
          <Notifications product="jira" testId={componentTestId} />
        </MockProviders>,
      );

      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderFailed',
            'notificationsWithContent',
            { failureReason: 'root-error-boundary' },
          ),
        waitForOptions,
      );
      await waitFor(
        () =>
          assertSloEventFired(
            onAnalyticEventFired,
            'renderFailed',
            'notificationsWithoutContent',
            { failureReason: 'root-error-boundary' },
          ),
        waitForOptions,
      );
    });
  });
  describe('Other analytic events', () => {
    test('filter switch view event', async () => {
      mockEndpoints({ withContentTimeout: 50, withoutContentTimeout: 10 });

      const { MockProviders, onAnalyticEventFired } = createMockProviders({
        shouldTrackAnalyticsPayload: (payload) =>
          payload.name === 'notificationList',
      });
      const { getByTestId } = render(
        <MockProviders>
          <Notifications product="jira" testId={componentTestId} />
        </MockProviders>,
      );
      const [directFilterToggle, watchingFilterToggle] = getByTestId(
        testIds.categoryFilterTab,
      ).querySelectorAll('[role="tab"]');
      const readStateToggle = getByTestId(testIds.readStateToggle);
      expect(getByTestId(testIds.categoryFilterTab)).toBeTruthy();

      expect(onAnalyticEventFired).toHaveBeenCalledWith({
        attributes: {
          categoryFilter: 'direct',
          product: 'jira',
          readStateFilter: 'any',
          firstRender: 'true',
          firstFilterView: 'true',
          userHourOfDay: expect.any(Number),
        },
        eventType: 'screen',
        name: 'notificationList',
        tenantIdType: 'none',
      });

      /** Switch to category watching, readState any  */
      userEvents.click(watchingFilterToggle);

      await waitFor(() => {
        expect(onAnalyticEventFired).toHaveBeenNthCalledWith(2, {
          attributes: {
            categoryFilter: 'none',
            product: 'jira',
            readStateFilter: 'any',
            firstRender: 'false',
            firstFilterView: 'true',
            userHourOfDay: expect.any(Number),
          },
          eventType: 'screen',
          name: 'notificationList',
          tenantIdType: 'none',
        });
      });

      /** Switch to category watching, readState unread  */
      userEvents.click(readStateToggle);

      await waitFor(() => {
        expect(onAnalyticEventFired).toHaveBeenNthCalledWith(3, {
          attributes: {
            categoryFilter: 'none',
            product: 'jira',
            readStateFilter: 'unread',
            firstRender: 'false',
            firstFilterView: 'true',
            userHourOfDay: expect.any(Number),
          },
          eventType: 'screen',
          name: 'notificationList',
          tenantIdType: 'none',
        });
      });

      /** Switch to category direct, readState unread  */
      userEvents.click(directFilterToggle);

      await waitFor(() => {
        expect(onAnalyticEventFired).toHaveBeenNthCalledWith(4, {
          attributes: {
            categoryFilter: 'direct',
            product: 'jira',
            readStateFilter: 'unread',
            firstRender: 'false',
            firstFilterView: 'true',
            userHourOfDay: expect.any(Number),
          },
          eventType: 'screen',
          name: 'notificationList',
          tenantIdType: 'none',
        });
      });

      /** Switch to category watching, readState any  */
      userEvents.click(readStateToggle);
      await waitFor(() => {
        expect(onAnalyticEventFired).toHaveBeenNthCalledWith(5, {
          attributes: {
            categoryFilter: 'direct',
            product: 'jira',
            readStateFilter: 'any',
            firstRender: 'false',
            firstFilterView: 'false',
            userHourOfDay: expect.any(Number),
          },
          eventType: 'screen',
          name: 'notificationList',
          tenantIdType: 'none',
        });
      });
    });
  });
});
