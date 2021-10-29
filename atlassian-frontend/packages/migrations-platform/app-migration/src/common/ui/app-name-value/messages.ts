import { defineMessages, FormattedMessage } from 'react-intl';

type Messages = Record<'noLogo', FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  noLogo: {
    id: 'com.atlassian.migrations-platform.no-logo',
    defaultMessage: 'No logo',
    description: 'The marketplace app has no logo',
  },
});
