import { defineMessages, FormattedMessage } from 'react-intl';

type Messages = Record<'skipButton', FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  skipButton: {
    id:
      'com.atlassian.migrations-platform.migration-details.task-card.skip-button',
    defaultMessage: 'Skip {lowerCaseTaskName}',
  },
});
