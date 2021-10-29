import { defineMessages, FormattedMessage } from 'react-intl';

type Messages = Record<'justNow', FormattedMessage.MessageDescriptor>;

export const messages = defineMessages<Messages>({
  justNow: {
    id: 'com.atlassian.migrations-platform.mpt-timeago.ui.just-now',
    defaultMessage: 'just now',
    description: 'Label for "just now" relative time',
  },
});
