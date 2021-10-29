import { AssessmentApp } from '../../types';

const BASE_ASSESS_APP = {
  // Base
  logoUrl:
    'https://marketplace-cdn.atlassian.com/files/images/9ffe3549-de47-4170-a76a-147db9f10c65.png',
  contactVendorUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  privacyPolicyUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  // AppNotesValue
  migrationNotes: 'Fake app notes.',
};

export const APP_UNASSIGNED: AssessmentApp = {
  ...BASE_ASSESS_APP,
  key: 'com.fca.jira.plugins.workflowToolbox.workflow-toolbox.unassigned',
  name: 'Jira Workflow Toolbox Unassigned',
  migrationStatus: 'Unassigned',
  // CloudLink: None
  hasCloudVersion: false,
  hasFeatureDifferences: 'unknown',
  // AppCanBeMigratedValue: Yes
  canBeMigrated: 'yes',
  upgradeAppUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  migrationPathInstructionsUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  // AppUsageValue: Success
  hasMacros: true,
  isEnabled: true,
  status: 'Success',
  pages: 1,
  users: 1,
  reliabilityState: 'alpha',
};

export const APP_ALTERNATIVE: AssessmentApp = {
  ...BASE_ASSESS_APP,
  key: 'com.fca.jira.plugins.workflowToolbox.workflow-toolbox.alternative',
  name: 'Jira Workflow Toolbox Alternative',
  migrationStatus: 'Alternative',
  // CloudLink: Differences
  hasCloudVersion: true,
  hasFeatureDifferences: 'yes',
  featureDifferencesUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  // AppCanBeMigratedValue: InstallOnly
  canBeMigrated: 'install_only',
  upgradeAppUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  migrationPathInstructionsUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  // AppUsageValue: Success but not enabled
  hasMacros: true,
  isEnabled: false,
  status: 'Success',
  pages: 1,
  users: 1,
  reliabilityState: 'beta',
};

export const APP_NEEDED: AssessmentApp = {
  ...BASE_ASSESS_APP,
  key: 'com.fca.jira.plugins.workflowToolbox.workflow-toolbox.needed',
  name: 'Jira Workflow Toolbox Needed',
  migrationStatus: 'Needed',
  // CloudLink: Listing
  hasCloudVersion: true,
  hasFeatureDifferences: 'no',
  cloudUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=overview',
  // AppCanBeMigratedValue: Upgrade
  canBeMigrated: 'upgrade',
  upgradeAppUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  migrationPathInstructionsUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  // AppUsageValue: Success but no Macros
  hasMacros: false,
  isEnabled: false,
  status: 'Success',
  pages: 1,
  users: 1,
};

export const APP_NEEDED_VIEW_ROADMAP: AssessmentApp = {
  ...BASE_ASSESS_APP,
  key:
    'com.fca.jira.plugins.workflowToolbox.workflow-toolbox.needed-view-roadmap',
  name: 'Jira Workflow Toolbox Needed',
  migrationStatus: 'Needed',
  // CloudLink: Listing
  hasCloudVersion: true,
  hasFeatureDifferences: 'yes',
  cloudVersionDevelopmentRoadmap:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=overview',
  cloudUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=overview',
  // AppCanBeMigratedValue: Upgrade
  canBeMigrated: 'upgrade',
  upgradeAppUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  migrationPathInstructionsUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  // AppUsageValue: Success but no Macros
  hasMacros: false,
  isEnabled: false,
  status: 'Success',
  pages: 1,
  users: 1,
};

export const APP_NEEDED_MIGRATION_REQUEST: AssessmentApp = {
  ...BASE_ASSESS_APP,
  key:
    'com.fca.jira.plugins.workflowToolbox.workflow-toolbox.needed-migration-request',
  name: 'Jira Workflow Toolbox Needed',
  migrationStatus: 'Needed',
  // CloudLink: Listing
  hasCloudVersion: true,
  hasFeatureDifferences: 'yes',
  cloudVersionDevelopmentRoadmap:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=overview',
  cloudUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=overview',
  // AppCanBeMigratedValue: Upgrade
  canBeMigrated: 'unknown',
  upgradeAppUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  migrationPathInstructionsUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  // AppUsageValue: Success but no Macros
  migrationRoadmapRequest:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  hasMacros: false,
  isEnabled: false,
  status: 'Success',
  pages: 1,
  users: 1,
};

export const APP_NOT_NEEDED: AssessmentApp = {
  ...BASE_ASSESS_APP,
  key: 'com.fca.jira.plugins.workflowToolbox.workflow-toolbox.not-needed',
  name: 'Jira Workflow Toolbox Not Needed',
  migrationStatus: 'NotNeeded',
  // CloudLink: Listing
  hasCloudVersion: true,
  hasFeatureDifferences: 'yes',
  cloudUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=overview',
  // AppCanBeMigratedValue: Manual
  canBeMigrated: 'manual',
  upgradeAppUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  migrationPathInstructionsUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  // AppUsageValue: Success but bigger value
  hasMacros: true,
  isEnabled: true,
  status: 'Success',
  pages: 100,
  users: 100,
};

export const APP_NOT_NEEDED_CONTACT_VENDOR: AssessmentApp = {
  ...BASE_ASSESS_APP,
  key:
    'com.fca.jira.plugins.workflowToolbox.workflow-toolbox.not-needed-contact-vendor',
  name: 'Jira Workflow Toolbox Not Needed',
  migrationStatus: 'NotNeeded',
  // CloudLink: Listing
  hasCloudVersion: true,
  hasFeatureDifferences: 'install_only',
  // AppCanBeMigratedValue: Unknown
  canBeMigrated: 'unknown',
  upgradeAppUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  migrationPathInstructionsUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  // AppUsageValue: Running
  hasMacros: true,
  isEnabled: true,
  status: 'Running',
  pages: 100,
  users: 100,
};

export const APP_NOT_NEEDED_CONTACT_VENDOR_NO_MIGRATION: AssessmentApp = {
  ...BASE_ASSESS_APP,
  key:
    'com.fca.jira.plugins.workflowToolbox.workflow-toolbox.not-needed-contact-vendor-no-migration',
  name: 'Jira Workflow Toolbox Not Needed',
  migrationStatus: 'NotNeeded',
  // CloudLink: Listing
  hasCloudVersion: true,
  hasFeatureDifferences: 'install_only',
  // AppCanBeMigratedValue: Unknown
  canBeMigrated: 'no',
  upgradeAppUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  migrationPathInstructionsUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  // AppUsageValue: Error
  hasMacros: true,
  isEnabled: true,
  status: 'Error',
  pages: 100,
  users: 100,
};

export const APP_NOT_NEEDED_CONTACT_VENDOR_DISCARDED: AssessmentApp = {
  ...BASE_ASSESS_APP,
  key:
    'com.fca.jira.plugins.workflowToolbox.workflow-toolbox.not-needed-contact-vendor-discarded',
  name: 'Jira Workflow Toolbox Not Needed',
  migrationStatus: 'NotNeeded',
  // CloudLink: Listing
  hasCloudVersion: true,
  hasFeatureDifferences: 'install_only',
  // AppCanBeMigratedValue: Unknown
  canBeMigrated: 'discarded',
  upgradeAppUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  migrationPathInstructionsUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  // AppUsageValue: Error
  hasMacros: true,
  isEnabled: true,
  status: 'Error',
  pages: 100,
  users: 100,
};
