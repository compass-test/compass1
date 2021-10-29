import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  appAssessmentIncompleteDescription: {
    id: 'migration.preflight.apps.assessment.incomplete.description',
    defaultMessage:
      'You need to complete the app assessment table before your required app data can be migrated to cloud. We will migrate the data from your apps you mark as `Needed in cloud` if a pathway exists.',
    description: 'Description for preflight check error message',
  },
  appAssessmentIncompleteLabel: {
    id: 'migration.preflight.apps.assessment.incomplete.label',
    defaultMessage: 'Complete app assessment',
    description: 'Description for preflight check error message',
  },
  appsNotInstalledOnCloudDescription: {
    id: 'migration.preflight.apps.not.installed.cloud.description',
    defaultMessage:
      'In order to migrate your app data, your cloud site needs the relevant apps installed first. To continue you can:',
    description: 'Description for preflight check error message',
  },
  appsNotInstalledOnCloudHeading: {
    id: 'migration.preflight.apps.not.installed.cloud.heading',
    defaultMessage: 'Apps not installed on your cloud site',
    description: 'Heading for list of apps not installed on cloud',
  },
  appsNotInstalledOnCloudChangeLabel: {
    id: 'migration.preflight.apps.not.installed.cloud.change.label',
    defaultMessage: 'Change my decision in App Assessment',
    description: 'List item for apps not installed on cloud',
  },
  appsNotInstalledOnCloudRemoveLabel: {
    id: 'migration.preflight.apps.not.installed.cloud.remove.label',
    defaultMessage:
      'Remove {count} {count, plural, zero {apps} one {app} other {apps}} from this migration',
    description: 'Button label to remove apps from migration',
  },
  appsNotInstalledOnCloudListItem01: {
    id: 'migration.preflight.apps.not.installed.cloud.list.item01',
    defaultMessage: 'install apps you need from the {message} listed below',
    description: 'List item for apps not installed on cloud',
  },
  appsNotInstalledOnCloudListItem02: {
    id: 'migration.preflight.apps.not.installed.cloud.list.item02',
    defaultMessage:
      'remove apps from assessment entirely by selecting {message}',
    description: 'List item for apps not installed on cloud',
  },
  appsNotInstalledOnCloudListItem03: {
    id: 'migration.preflight.apps.not.installed.cloud.list.item03',
    defaultMessage:
      "remove apps you don't need in this migration by selecting {message}",
    description: 'List item for apps not installed on cloud',
  },
  appDataMigrationConsentDescription: {
    id: 'migration.preflight.apps.data.migration.consent.description',
    defaultMessage:
      "In order for automated app data migration paths to work, you must first consent to app data migration. If you've already consented, there may be app policy changes that require you to consent again.",
    description: 'Description for preflight check error message',
  },
  appDataMigrationConsentGiveLabel: {
    id: 'migration.preflight.apps.data.migration.consent.give.label',
    defaultMessage: 'Give consent',
    description: 'Button label to give app data migration consent',
  },
  appDataMigrationConsentRemoveLabel: {
    id: 'migration.preflight.apps.data.migration.consent.remove.label',
    defaultMessage:
      'Remove {count} {count, plural, zero {apps} one {app} other {apps}} from this migration',
    description: 'Button label to remove apps from data migration',
  },
  appDataMigrationConsentHeading: {
    id: 'migration.preflight.apps.data.migration.consent.heading',
    defaultMessage: 'Consent not given or is outdated',
    description: 'Heading to show which apps need consent or are outdated',
  },
  appOutdatedDescription: {
    id: 'migration.preflight.apps.outdated.description',
    defaultMessage:
      'In your App Assessment, you marked some apps as `Needed in cloud`. The server versions of the below apps are out of date, and thus do not have an automated migration path. To continue you can:',
    description: 'Description for preflight check error messages',
  },
  appOutdatedChangeLabel: {
    id: 'migration.preflight.apps.outdated.change.label',
    defaultMessage: 'Change my decision in App Assessment',
    description: 'Button to change decision on App Assesssment',
  },
  appOutdatedRemoveLabel: {
    id: 'migration.preflight.apps.outdated.remove.label',
    defaultMessage:
      'Remove {count} {count, plural, zero {apps} one {app} other {apps}} from this migration',
    description: 'Button to remove apps from migration',
  },
  appOutdatedCurrentServerVersionHeading: {
    id: 'migration.preflight.apps.outdated.server.version',
    defaultMessage: 'Current server version',
    description: 'Heading to show current server version of apps',
  },
  appOutdatedServerVersionWithMigrationPathHeading: {
    id: 'migration.preflight.apps.outdated.server.version',
    defaultMessage: 'Server version with migration path',
    description: 'Heading to show current server version with migration path',
  },
  appOutdatedListItem01: {
    id: 'migration.preflight.apps.outdated.server.list.item01',
    defaultMessage: 'upgrade the relevant apps to the {message}',
    description: 'List item for App Outdated',
  },
  appOutdatedListItem02: {
    id: 'migration.preflight.apps.outdated.server.list.item02',
    defaultMessage:
      'remove the relevant apps from you App Assessment by selecting {message}',
    description: 'List item for App Outdated',
  },
  appOutdatedListItem03: {
    id: 'migration.preflight.apps.outdated.server.list.item03',
    defaultMessage:
      'remove the relevant apps from this migration only by selecting {message}',
    description: 'List item for App Outdated',
  },
  errorSummary: {
    id: 'migration.preflight.error.summary',
    defaultMessage:
      '{count} blocking {count, plural, zero {errors} one {error} other {errors}}',
    description: 'To show how many preflight blocking errors',
  },
  errorSummarySuccess: {
    id: 'migration.preflight.error.summary.success',
    defaultMessage: 'No blocking errors found',
    description: 'To show there are no blocking errors',
  },
});
