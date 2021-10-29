import { defineMessages, FormattedMessage } from 'react-intl';

type Messages = Record<'editButton', FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  editButton: {
    id:
      'com.atlassian.migrations-platform.migration-details.task-card.edit-button',
    defaultMessage: 'Edit',
  },
});
