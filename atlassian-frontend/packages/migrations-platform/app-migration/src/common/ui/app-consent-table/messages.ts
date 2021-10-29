import { defineMessages, FormattedMessage } from 'react-intl';

type MessageType =
  | 'tableHeaderCallToAction'
  | 'tableHeaderConsentStatus'
  | 'tableHeaderNeededInCloud'
  | 'contactVendorUrl'
  | 'revokeConsent'
  | 'upgradeApp'
  | 'viewPolicy'
  | 'statusConsentGiven'
  | 'statusConsentNotGiven'
  | 'statusConsentOutdated'
  | 'statusNoAutomatedMigrationPath'
  | 'statusNoMigratingAlternative'
  | 'statusNoMigrationNeeded'
  | 'statusServerAppOutdated';

type Messages = Record<MessageType, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  tableHeaderCallToAction: {
    id:
      'com.atlassian.migrations-platform.consent-page.table-header.call-to-action',
    defaultMessage: 'Policy details',
    description: 'Call to action for policy',
  },
  tableHeaderConsentStatus: {
    id:
      'com.atlassian.migrations-platform.consent-page.table-header.consent-status',
    defaultMessage: 'Apps migration agreement status',
    description: 'Apps migration agreement status table column header',
  },
  tableHeaderNeededInCloud: {
    id:
      'com.atlassian.migrations-platform.consent-page.table-header.needed-in-cloud',
    defaultMessage: 'Apps needed in cloud ({count})',
    description: 'Apps needed in cloud table column header',
  },
  contactVendorUrl: {
    id: 'com.atlassian.migrations-platform.consent-page.contact-vendor-url',
    defaultMessage: 'Contact the app vendor',
    description: 'The link to the marketplace app vendor contact page',
  },
  revokeConsent: {
    id: 'com.atlassian.migrations-platform.consent-page.revoke-consent',
    defaultMessage: 'Revoke agreement',
    description: 'Revoke the app migration agreement',
  },
  upgradeApp: {
    id: 'com.atlassian.migrations-platform.consent-page.upgrade-app',
    defaultMessage: 'Update app',
    description:
      'The linke to the marketplace app vendor server app to help the user updating their server app',
  },
  viewPolicy: {
    id: 'com.atlassian.migrations-platform.consent-page.view-policy',
    defaultMessage: 'View policy',
    description:
      'View the app privacy policy so the user can determine whether to give the migration consent',
  },
  statusConsentGiven: {
    id: 'com.atlassian.migrations-platform.consent-page.status.consent-given',
    defaultMessage:
      'You have agreed to third-party automated app data migration for this app.',
    description: 'The user has given consent to migrate the app',
  },
  statusConsentNotGiven: {
    id:
      'com.atlassian.migrations-platform.consent-page.status.consent-not-given',
    defaultMessage:
      'You must review and agree to this data migration policy, or your app data cannot be migrated.',
    description: 'The user has not given consent to migrate the app',
  },
  statusConsentOutdated: {
    id:
      'com.atlassian.migrations-platform.consent-page.status.consent-outdated',
    defaultMessage:
      'The policy you agreed to has been updated. Review changes and agree again before your app data can be migrated.',
    description: 'The policy you have given consent to has updated',
  },
  statusNoAutomatedMigrationPath: {
    id:
      'com.atlassian.migrations-platform.consent-page.status.no-automated-migration-path',
    defaultMessage:
      'This app does not have an automated migration path. {link} for migration support.',
    description: 'There is no automated migration path for the app',
  },
  statusNoMigratingAlternative: {
    id:
      'com.atlassian.migrations-platform.consent-page.status.no-migrating-alternative',
    defaultMessage:
      'An automated migration path between alternative app selections is not available. {link} for migration support.',
    description: 'There is no migration path for alternative apps',
  },
  statusNoMigrationNeeded: {
    id:
      'com.atlassian.migrations-platform.consent-page.status.no-migration-needed',
    defaultMessage:
      'This app does not require an app data migration to function on your cloud site. Install it, migrate your core data and you’re ready to go.',
    description: 'The app does not need migration',
  },
  statusServerAppOutdated: {
    id:
      'com.atlassian.migrations-platform.consent-page.status.server-app-outdated',
    defaultMessage:
      'This app version does not support app data migrations. You must update your server app version in order to agree to the relevant app migration policy.',
    description:
      'You need to upgrade the outdated app before proceeding the migration',
  },
});
