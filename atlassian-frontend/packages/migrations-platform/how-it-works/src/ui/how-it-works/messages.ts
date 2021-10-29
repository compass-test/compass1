import { defineMessages, FormattedMessage } from 'react-intl';

type MessageType =
  | 'connectToCloudHeading'
  | 'connectToCloudDescription'
  | 'chooseWhatToMigrateHeading'
  | 'chooseWhatToMigrateDescription'
  | 'checkForErrorsHeading'
  | 'checkForErrorsDescription'
  | 'reviewHeading'
  | 'reviewDescription'
  | 'migrateNowOrLaterHeading'
  | 'migrateNowOrLaterDescription';

type Messages = Record<MessageType, FormattedMessage.MessageDescriptor>;

export const messages = defineMessages<Messages>({
  connectToCloudHeading: {
    id:
      'com.atlassian.migrations-platform.how-it-works.connect-to-cloud-heading',
    defaultMessage: 'Connect to cloud',
    description: "Heading for 'Connect to cloud' step",
  },
  connectToCloudDescription: {
    id:
      'com.atlassian.migrations-platform.how-it-works.connect-to-cloud-description',
    defaultMessage: 'Connect to a new or existing Atlassian cloud site.',
    description: "Description for 'Connect to cloud' step",
  },
  chooseWhatToMigrateHeading: {
    id:
      'com.atlassian.migrations-platform.how-it-works.choose-what-to-migrate-heading',
    defaultMessage: 'Choose what to migrate',
    description: "Heading for 'Choose what to migrate' step",
  },
  chooseWhatToMigrateDescription: {
    id:
      'com.atlassian.migrations-platform.how-it-works.choose-what-to-migrate-description',
    defaultMessage:
      'You can migrate everything at once or break it up into different stages.',
    description: "Description for 'Choose what to migrate' step",
  },
  checkForErrorsHeading: {
    id:
      'com.atlassian.migrations-platform.how-it-works.check-for-errors-heading',
    defaultMessage: 'Check for errors',
    description: "Heading for 'Check for errors' step",
  },
  checkForErrorsDescription: {
    id:
      'com.atlassian.migrations-platform.how-it-works.check-for-errors-description',
    defaultMessage:
      "We'll check for any errors or conflicts so you can resolve them before you migrate.",
    description: "Description for 'Check for errors' step",
  },
  reviewHeading: {
    id: 'com.atlassian.migrations-platform.how-it-works.review-heading',
    defaultMessage: 'Review',
    description: "Heading for 'Review' step",
  },
  reviewDescription: {
    id: 'com.atlassian.migrations-platform.how-it-works.review-description',
    defaultMessage: "Review what you're planning to migrate.",
    description: "Description for 'Review' step",
  },
  migrateNowOrLaterHeading: {
    id:
      'com.atlassian.migrations-platform.how-it-works.migrate-now-or-later-heading',
    defaultMessage: 'Migrate now or later',
    description: "Heading for 'Migrate now or later' step",
  },
  migrateNowOrLaterDescription: {
    id:
      'com.atlassian.migrations-platform.how-it-works.migrate-now-or-later-description',
    defaultMessage: 'Run your migration straight away or save it to run later.',
    description: "Description for 'Migrate now or later' step",
  },
});
