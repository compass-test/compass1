import { defineMessages, FormattedMessage } from 'react-intl';

export default defineMessages<
  Record<'refresh', FormattedMessage.MessageDescriptor>
>({
  refresh: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.status-message.refresh',
    defaultMessage: 'Refresh',
    description: 'Refresh button label',
  },
});
