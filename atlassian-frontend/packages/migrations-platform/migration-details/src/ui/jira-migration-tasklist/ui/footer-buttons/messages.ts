import { defineMessages, FormattedMessage } from 'react-intl';

type MessageKey = 'backButton' | 'checkForErrorsButton';

type Messages = Record<MessageKey, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  backButton: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-tasklist.back-button',
    defaultMessage: 'Back',
  },
  checkForErrorsButton: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-tasklist.check-for-errors-button',
    defaultMessage: 'Check for errors',
  },
});
