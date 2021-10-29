import React, { useState } from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { Notifications as NotificationIcon } from '@atlaskit/atlassian-navigation';
import { Notifications } from '@atlaskit/atlassian-notifications';
import { NotificationIndicator } from '@atlaskit/notification-indicator';
import { NotificationLogClient } from '@atlaskit/notification-log-client';
import { Popup } from '@atlaskit/popup';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { MenuContainer } from './styled';

interface ValueUpdatedParam {
  oldCount: number;
  newCount: number;
  source: string;
}

export const NotificationsPopup = () => {
  const { formatMessage } = useIntl();
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const notificationLogClient = new NotificationLogClient(
    '/gateway/api/notification-log',
  );

  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);
  const [newNotificationsCount, setNewNotificationsCount] = useState<number>(0);

  notificationLogClient
    .countUnseenNotifications()
    .then((response) => setNewNotificationsCount(response.count));

  const NotificationsBadge = () => {
    return (
      <NotificationIndicator
        onCountUpdated={updateButtonLabel}
        notificationLogProvider={Promise.resolve(notificationLogClient)}
      />
    );
  };

  const updateButtonLabel = (updatedPara: ValueUpdatedParam) => {
    setNewNotificationsCount(updatedPara.newCount || 0);
  };

  const onNotificationsIconClick = () => {
    setIsNotificationPopupOpen((curr) => !curr);

    const event = createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'icon',
    });

    fireUIAnalytics(event, 'notificationsPopupIcon');
  };

  const onClose = () => {
    setIsNotificationPopupOpen(false);
  };

  return (
    <Popup
      placement="bottom-end"
      content={() => (
        <MenuContainer>
          <Notifications isNewExperience={true} />
        </MenuContainer>
      )}
      isOpen={isNotificationPopupOpen}
      onClose={onClose}
      trigger={(triggerProp) => (
        <NotificationIcon
          badge={NotificationsBadge}
          onClick={onNotificationsIconClick}
          tooltip={formatMessage(messages.notificationsTooltip, {
            newNotificationsCount,
          })}
          isSelected={isNotificationPopupOpen}
          testId="dragonfruit-navigations.ui.notifications-popup.notifications-icon"
          {...triggerProp}
        />
      )}
      testId={
        'dragonfruit-navigations.ui.notifications-popup.notifications-drawer'
      }
    />
  );
};
