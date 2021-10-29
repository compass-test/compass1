import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { useUrlData } from '../../../../../common/ui/url-data';
import { ItemCardContent } from '../index';
import { makeInstruction } from '../instruction';
import { Product, TaskId } from '../../../../../common/types';
import { CrossProductLink } from '../../../../link-utility/cross-product-link';

import messages from './messages';

const actionSubjectIds = {
  notifications: 'jsmGettingStartedPanelNotificationsSettings',
};

const NotificationsItemCardContentBase = ({ intl }: InjectedIntlProps) => {
  const { opsgenieBaseUrl } = useUrlData();
  // Note, Opsgenie is not translated, so these strings copied from
  // Opsgenie elements are also not translated.
  const keyElements = {
    settings: <strong>Settings</strong>,
    notifications: (
      <strong>
        <CrossProductLink
          linkProduct={Product.Opsgenie}
          url={`${opsgenieBaseUrl}/settings/user/notification`}
          subjectId={actionSubjectIds.notifications}
        >
          Notifications
        </CrossProductLink>
      </strong>
    ),
    alerts: <strong>{intl.formatMessage(messages.alerts)}</strong>,
    sms: <strong>SMS</strong>,
    voice: <strong>Voice</strong>,
    notificationRules: <strong>Notification rules</strong>,
  };
  return (
    <ItemCardContent
      description={intl.formatMessage(messages.notificationsDescription)}
      learnMore={{
        url: 'https://docs.opsgenie.com/docs/notification-preferences',
        text: intl.formatMessage(messages.notificationsLearnMore),
        taskId: TaskId.SetupProfileForNotifications,
      }}
      instructions={[
        makeInstruction(messages.notificationsStep1, keyElements),
        makeInstruction(messages.notificationsStep2, keyElements),
        makeInstruction(messages.notificationsStep3, keyElements),
        makeInstruction(messages.notificationsStep4, keyElements),
      ]}
    />
  );
};

export const NotificationsItemCardContent = injectIntl(
  NotificationsItemCardContentBase,
);
