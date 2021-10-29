import { defineMessages, FormattedMessage } from 'react-intl';

type MessageKey = 'projectsAvailableToPublic' | 'containersAvailableToPublic';

type Messages = Record<MessageKey, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  projectsAvailableToPublic: {
    id:
      'com.atlassian.migrations-platform.migration-details.status.anonymous-access-content.projects',
    defaultMessage: 'Projects and data will be available to the public',
  },
  containersAvailableToPublic: {
    id:
      'com.atlassian.migrations-platform.migration-details.status.anonymous-access-content.containers',
    defaultMessage: 'Data will be available to the public',
  },
});
