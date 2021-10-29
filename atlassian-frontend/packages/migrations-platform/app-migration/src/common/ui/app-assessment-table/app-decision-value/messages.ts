import { defineMessages, FormattedMessage } from 'react-intl';

type Messages = Record<
  'alternative' | 'needed' | 'notNeeded' | 'unassigned',
  FormattedMessage.MessageDescriptor
>;

export default defineMessages<Messages>({
  alternative: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-decision-value.alternative',
    defaultMessage: 'Use alternative',
    description:
      'The admin decides to use the alternative cloud app for this app migration',
  },
  needed: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-decision-value.needed',
    defaultMessage: 'Needed in cloud',
    description: 'The admin indicates this app is needed in this migration',
  },
  notNeeded: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-decision-value.not-needed',
    defaultMessage: 'Not needed in cloud',
    description: 'The admin indicates this app is not needed in this migration',
  },
  unassigned: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-decision-value.unassigned',
    defaultMessage: 'No decision made',
    description:
      'The empty placeholder message if user has not decided what to do with the app',
  },
});
