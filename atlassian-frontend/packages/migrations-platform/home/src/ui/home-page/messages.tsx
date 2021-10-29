import { defineMessages, FormattedMessage } from 'react-intl';

type MessageType =
  | 'migrationHomePageHeading'
  | 'migrationHomePageDescription'
  | 'migrationHomePagePlanHeading'
  | 'migrationHomePagePlanLinkTitle'
  | 'migrationHomePagePlanLinkDescription'
  | 'migrationHomePageAssessInstallLinkHeading'
  | 'migrationHomePageAssessInstallLinkDescription'
  | 'migrationHomePageAssessInstallLinkTitle'
  | 'migrationHomePageManageMigrationLinkHeading'
  | 'migrationHomePageManageMigrationLinkTitle'
  | 'migrationHomePageManageMigrationLinkDescription'
  | 'migrationHomePageAboutYourProductHeading'
  | 'migrationHomePageAdditionalResourcesHeading'
  | 'migrationHomePagePrepareMigrationDescription'
  | 'migrationHomePageBestPracticeGuideDescription'
  | 'migrationHomePageGuideForPlanningDescription';

type Messages = Record<MessageType, FormattedMessage.MessageDescriptor>;

export const messages = defineMessages<Messages>({
  migrationHomePageHeading: {
    id: 'com.atlassian.migrations-platform.home-page.heading',
    defaultMessage: 'Migration Assistant home',
    description: 'Label for migration assistant home heading',
  },
  migrationHomePageDescription: {
    id: 'com.atlassian.migrations-platform.home-page.description',
    defaultMessage:
      'This tool will help you assess and create your migration plan. You’ll then be able to test and migrate to a cloud-hosted site.',
    description: 'Text for migration assistant home page description',
  },
  migrationHomePagePlanHeading: {
    id: 'com.atlassian.migrations-platform.home-page.plan.heading',
    defaultMessage: 'Plan',
    description: 'Text for migration assistant home page plan heading',
  },
  migrationHomePagePlanLinkTitle: {
    id: 'com.atlassian.migrations-platform.home-page.plan.link.title',
    defaultMessage: 'Plan your migration',
    description: 'Text for Plan your migration link',
  },
  migrationHomePagePlanLinkDescription: {
    id: 'com.atlassian.migrations-platform.home-page.plan.link.description',
    defaultMessage:
      'Read Atlassian’s planning guides to learn how best to plan for your migration.',
    description: 'Description for Plan your migration link',
  },
  migrationHomePageAssessInstallLinkHeading: {
    id:
      'com.atlassian.migrations-platform.home-page.plan.assess-install.link.heading',
    defaultMessage: 'Prepare',
    description: 'Heading for Assess and Install link',
  },
  migrationHomePageAssessInstallLinkTitle: {
    id:
      'com.atlassian.migrations-platform.home-page.plan.assess-install.link.title',
    defaultMessage: 'Assess and install apps',
    description: 'Title for Assess and Install apps link',
  },
  migrationHomePageAssessInstallLinkDescription: {
    id:
      'com.atlassian.migrations-platform.home-page.plan.assess-install.link.description',
    defaultMessage:
      'Assess your on-premise apps, create or connect to a cloud site, and install the apps you need on cloud.',
    description: 'Description for Assess and Install apps link',
  },
  migrationHomePageManageMigrationLinkHeading: {
    id:
      'com.atlassian.migrations-platform.home-page.plan.manage-migration.link.heading',
    defaultMessage: 'Migrate',
    description: 'Heading for manage your migration link',
  },
  migrationHomePageManageMigrationLinkTitle: {
    id:
      'com.atlassian.migrations-platform.home-page.plan.manage-migration.link.title',
    defaultMessage: 'Manage your migration',
    description: 'Title for manage your migration link',
  },
  migrationHomePageManageMigrationLinkDescription: {
    id:
      'com.atlassian.migrations-platform.home-page.plan.manage-migration.link.description',
    defaultMessage: '',
    description: '',
  },
  migrationHomePageAboutYourProductHeading: {
    id:
      'com.atlassian.migrations-platform.home-page.about-your-product.heading',
    defaultMessage: 'About your product',
    description: 'Heading for About your product',
  },
  migrationHomePageAdditionalResourcesHeading: {
    id:
      'com.atlassian.migrations-platform.home-page.additional-resource.heading',
    defaultMessage: 'Additional resources',
    description: 'Heading for additional resources',
  },
  migrationHomePagePrepareMigrationDescription: {
    id:
      'com.atlassian.migrations-platform.home-page.prepare-migration.description',
    defaultMessage: 'Preparing for migration',
    description: 'Description for prepare your migration link',
  },
  migrationHomePageBestPracticeGuideDescription: {
    id:
      'com.atlassian.migrations-platform.home-page.best-practice-guide.description',
    defaultMessage:
      'View our best practice guides for more information on app migration security, migration testing, and preparation.',
    description: 'Description for viewing best practices',
  },
  migrationHomePageGuideForPlanningDescription: {
    id:
      'com.atlassian.migrations-platform.home-page.guide-for-planning.description',
    defaultMessage: 'View our guides and learn how to prepare for your move.',
    description: 'Description for guide for planning migration',
  },
});
