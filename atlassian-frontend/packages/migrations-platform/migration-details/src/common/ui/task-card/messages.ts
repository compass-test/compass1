import { defineMessages, FormattedMessage } from 'react-intl';

type MessageKey =
  | 'statusIndicatorSelectedIconLabel'
  | 'statusIndicatorNotSelectedIconLabel';

type Messages = Record<MessageKey, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  statusIndicatorSelectedIconLabel: {
    id:
      'com.atlassian.migrations-platform.migration-details.task-card.status-indicator-selected-icon-label',
    defaultMessage: 'Completed',
  },
  statusIndicatorNotSelectedIconLabel: {
    id:
      'com.atlassian.migrations-platform.migration-details.task-card.status-indicator-not-selected-icon-label',
    defaultMessage: 'Not completed',
  },
});
