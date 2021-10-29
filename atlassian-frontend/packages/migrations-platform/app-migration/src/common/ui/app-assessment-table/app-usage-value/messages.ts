import { defineMessages, FormattedMessage } from 'react-intl';

type MessageType =
  | 'disabledMessage'
  | 'notApplicableMessage'
  | 'notApplicableTooltipPage'
  | 'notApplicableTooltipUser';

type Messages = Record<MessageType, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  disabledMessage: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-usage-value.disabled-message',
    defaultMessage: 'Disabled',
    description: 'The app usage is disabled',
  },
  notApplicableMessage: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-usage-value.not-applicable-message',
    defaultMessage: 'Not applicable*',
    description:
      'The app usage is not applicable, asterick at the end means there is a further explanation once hover your cursor',
  },
  notApplicableTooltipPage: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-usage-value.not-applicable-tooltip-page',
    defaultMessage:
      'This is not a macro-based app and does not appear on any pages',
    description:
      'The tooltip explanation of why page usage column is not applicable',
  },
  notApplicableTooltipUser: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.app-usage-value.not-applicable-tooltip-user',
    defaultMessage:
      'This is not a macro-based app and cannot display user views of macros',
    description:
      'The tooltip explanation of why user usage column is not applicable',
  },
});
