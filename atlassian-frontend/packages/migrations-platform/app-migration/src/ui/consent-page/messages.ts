import { defineMessages, FormattedMessage } from 'react-intl';

type MessageType =
  | 'title'
  | 'description'
  | 'appAssessmentLink'
  | 'progressStatusLabel'
  | 'doneButtonDisabledText';

type Messages = Record<MessageType, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  progressStatusLabel: {
    id: 'com.atlassian.migrations-platform.consent-page.progress-status-label',
    defaultMessage: 'policies agreed',
    description:
      'The label is used to inform user how many migration policies they have given consents',
  },
  title: {
    id: 'com.atlassian.migrations-platform.consent-page.title',
    defaultMessage: 'Agree to app migration',
    description: 'The title of the app consent page',
  },
  description: {
    id: 'com.atlassian.migrations-platform.consent-page.description',
    defaultMessage:
      'App vendors have access to your server when migrating your app data. Read and understand the policy for each app, before agreeing. You must agree in order to migrate or change your decision in the {link} table.',
    description: 'The description of the app consent page',
  },
  appAssessmentLink: {
    id: 'com.atlassian.migrations-platform.consent-page.app-assessment-link',
    defaultMessage: 'Assess your apps',
    description:
      'The link text to let the user navigate to the previous step of the migration',
  },
  doneButtonDisabledText: {
    id: 'com.atlassian.migrations-platform.consent-page.done-button-disabled',
    defaultMessage:
      'You must finish assessing, installing and consenting before proceeding.',
    description:
      'Tooltip message for the done button when disabled in the app consent page.',
  },
});
