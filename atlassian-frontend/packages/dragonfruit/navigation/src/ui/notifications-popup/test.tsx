import React from 'react';

import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import {
  CompassTestProvider,
  fetchMockGet,
} from '@atlassian/dragonfruit-testing';

import { NotificationsPopup } from './main';

jest.mock('@atlassian/analytics-bridge', () => ({
  ...jest.requireActual<Object>('@atlassian/analytics-bridge'),
  fireUIAnalytics: jest.fn(),
}));

describe('Notifications Indicator Popup', () => {
  let result: RenderResult;

  // Mocking unseen notifications
  beforeEach(() => {
    const userResponse = {
      count: 5,
    };

    fetchMockGet({
      request: {
        url: `/gateway/api/notification-log/api/2/notifications/count/unseen?source=atlaskitNotificationLogClient&currentCount=0`,
      },
      result: userResponse,
    });

    fetchMockGet({
      request: {
        url: `/gateway/api/notification-log/api/2/notifications/count/unseen?source=atlaskitNotificationLogClient`,
      },
      result: userResponse,
    });

    result = render(
      <CompassTestProvider locale={'en'}>
        <NotificationsPopup />
      </CompassTestProvider>,
    );
  });
  test('Should display the in-app notification icon', () => {
    expect(
      result.getByTestId(
        'dragonfruit-navigations.ui.notifications-popup.notifications-icon',
      ),
    ).toBeInTheDocument();
  });

  test('Should fireUIAnalytics when icon is clicked', async () => {
    const notificationIcon = result.getByTestId(
      'dragonfruit-navigations.ui.notifications-popup.notifications-icon',
    );
    userEvent.click(notificationIcon);

    expect(fireUIAnalytics).toHaveBeenCalledTimes(1);

    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          action: 'clicked',
          actionSubject: 'icon',
        }),
      }),
      'notificationsPopupIcon',
    );
  });

  test('Should display the in-app notifications drawer when icon is clicked', async () => {
    const notificationIcon = result.getByTestId(
      'dragonfruit-navigations.ui.notifications-popup.notifications-icon',
    );
    userEvent.click(notificationIcon);

    expect(
      await result.findByTestId(
        'dragonfruit-navigations.ui.notifications-popup.notifications-drawer',
      ),
    ).toBeInTheDocument();
  });

  test('Button label should display number of unseen notifications', async () => {
    const notificationsLabel = await result.findByLabelText(
      'Notifications (5)',
    );
    expect(notificationsLabel).toBeInTheDocument();
  });
});
