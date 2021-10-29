import { defineMessages, FormattedMessage } from 'react-intl';

type Messages = Record<'placeholder', FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  placeholder: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-notes-value.placeholder',
    defaultMessage: 'Enter your notes here',
    description:
      'The empty placeholder message if user does not have any migration notes',
  },
});
