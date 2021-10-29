import { defineMessages, FormattedMessage } from 'react-intl';

type MessageType =
  | 'migrationHomePageInterimHeading'
  | 'migrationHomePageInterimDescription'
  | 'migrationHomePageInterimAssessAppsHeading'
  | 'migrationHomePageInterimAssessAppsTitle'
  | 'migrationHomePageInterimAssessAppsDescription'
  | 'migrationHomePageInterimPrepareAppsDescriptionEAP'
  | 'migrationHomePageInterimPrepareAppsHeading'
  | 'migrationHomePageInterimPrepareAppsTitle'
  | 'migrationHomePageInterimPrepareAppsDescription'
  | 'migrationHomePageInterimMigrateDataHeading'
  | 'migrationHomePageInterimMigrateDataTitle'
  | 'migrationHomePageInterimMigrateDataDescription'
  | 'migrationHomePageInterimAboutYourProductHeading'
  | 'migrationHomePageInterimAdditionalResourcesHeading'
  | 'migrationHomePageInterimPrepareMigrationDescription'
  | 'migrationHomePageInterimBestPracticeGuideDescription'
  | 'migrationHomePageInterimGuideForPlanningDescription';

type Messages = Record<MessageType, FormattedMessage.MessageDescriptor>;

export const messages = defineMessages<Messages>({
  migrationHomePageInterimHeading: {
    id: 'com.atlassian.migrations-platform.home-page-interim.heading',
    defaultMessage: 'Migration Assistant home',
    description: 'Label for migration assistant home heading',
  },
  migrationHomePageInterimDescription: {
    id: 'com.atlassian.migrations-platform.home-page-interim.description',
    defaultMessage:
      'This tool will help you assess and create your migration plan. You’ll then be able to test and migrate to a cloud-hosted site.',
    description: 'Text for migration assistant home page description',
  },
  migrationHomePageInterimAssessAppsHeading: {
    id:
      'com.atlassian.migrations-platform.home-page-interim.assess-apps.heading',
    defaultMessage: 'Assess',
    description:
      'Heading for migration assistant home page interim assess apps link',
  },
  migrationHomePageInterimAssessAppsTitle: {
    id: 'com.atlassian.migrations-platform.home-page-interim.assess-apps.title',
    defaultMessage: '1. Assess your apps',
    description:
      'Title for migration assistant home page interim assess apps link',
  },
  migrationHomePageInterimAssessAppsDescription: {
    id:
      'com.atlassian.migrations-platform.home-page-interim.assess-apps.description',
    defaultMessage:
      'Decide which apps you need to bring to cloud. The assessment must be 100% complete before you can migrate your app data.',
    description:
      'Description for migration assistant home page interim assess apps link',
  },
  migrationHomePageInterimPrepareAppsHeading: {
    id:
      'com.atlassian.migrations-platform.home-page-interim.prepare-apps.heading',
    defaultMessage: 'Prepare',
    description:
      'Heading for migration assistant home page interim prepare apps link',
  },
  migrationHomePageInterimPrepareAppsTitle: {
    id:
      'com.atlassian.migrations-platform.home-page-interim.prepare-apps.title',
    defaultMessage: '2 . Prepare your apps',
    description:
      'Title for migration assistant home page interim prepare apps link',
  },
  migrationHomePageInterimPrepareAppsDescription: {
    id:
      'com.atlassian.migrations-platform.home-page-interim.prepare-apps.description',
    defaultMessage:
      'Connect to a cloud site and install your apps before you migrate to cloud.',

    description:
      'Description for migration assistant home page interim prepare apps link',
  },
  migrationHomePageInterimPrepareAppsDescriptionEAP: {
    id:
      'com.atlassian.migrations-platform.home-page-interim.prepare-apps.description.eap',
    defaultMessage:
      'Connect to a cloud site, install your apps and consent to app data migration before you migrate to cloud.',
    description:
      'Description for migration assistant home page interim prepare apps link for EAP release',
  },
  migrationHomePageInterimMigrateDataHeading: {
    id:
      'com.atlassian.migrations-platform.home-page-interim.migrate-data.heading',
    defaultMessage: 'Migrate',
    description:
      'Heading for migration assistant home page interim migrate data link',
  },
  migrationHomePageInterimMigrateDataTitle: {
    id:
      'com.atlassian.migrations-platform.home-page-interim.migrate-data.title',
    defaultMessage: '3. Migrate your data',
    description:
      'Title for migration assistant home page interim migrate data link',
  },
  migrationHomePageInterimMigrateDataDescription: {
    id:
      'com.atlassian.migrations-platform.home-page-interim.migrate-data.description',
    defaultMessage: '',
    description:
      'Description for migration assistant home page interim migrate data link',
  },
  migrationHomePageInterimAboutYourProductHeading: {
    id:
      'com.atlassian.migrations-platform.home-page-interim.about-your-product.heading',
    defaultMessage: 'About your product',
    description: 'Heading for About your product',
  },
  migrationHomePageInterimAdditionalResourcesHeading: {
    id:
      'com.atlassian.migrations-platform.home-page-interim.additional-resource.heading',
    defaultMessage: 'Additional resources',
    description: 'Heading for additional resources',
  },
  migrationHomePageInterimPrepareMigrationDescription: {
    id:
      'com.atlassian.migrations-platform.home-page-interim.prepare-migration.description',
    defaultMessage: 'Preparing for migration',
    description: 'Description for prepare your migration link',
  },
  migrationHomePageInterimBestPracticeGuideDescription: {
    id:
      'com.atlassian.migrations-platform.home-page-interim.best-practice-guide.description',
    defaultMessage:
      'View our best practice guides for more information on app migration security, migration testing, and preparation.',
    description: 'Description for viewing best practices',
  },
  migrationHomePageInterimGuideForPlanningDescription: {
    id:
      'com.atlassian.migrations-platform.home-page-interim.guide-for-planning.description',
    defaultMessage: 'View our guides and learn how to prepare for your move.',
    description: 'Description for guide for planning migration',
  },
});
