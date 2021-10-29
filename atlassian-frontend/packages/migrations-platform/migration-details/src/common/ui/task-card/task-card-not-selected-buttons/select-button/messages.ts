import { defineMessages, FormattedMessage } from 'react-intl';

type Messages = Record<'selectButton', FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  selectButton: {
    id:
      'com.atlassian.migrations-platform.migration-details.task-card.select-button',
    defaultMessage: 'Select',
  },
});
