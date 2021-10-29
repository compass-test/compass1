import { defineMessages, FormattedMessage } from 'react-intl';

type Messages = Record<
  'emptyDescription' | 'migrationHomeCta',
  FormattedMessage.MessageDescriptor
>;

export default defineMessages<Messages>({
  emptyDescription: {
    id:
      'com.atlassian.migrations-platform.common-ui-app-table.empty-description',
    defaultMessage:
      'Head back to Migrations home to continue preparing for your migration.',
    description: 'The empty state description for a generic migration table',
  },
  migrationHomeCta: {
    id:
      'com.atlassian.migrations-platform.common-ui-app-table.migration-home-cta',
    defaultMessage: 'Migrations Home',
    description: 'The cta button to go migration home page',
  },
});
