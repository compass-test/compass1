export const COLUMN_SEPARATOR = ',';
export const ROW_SEPARATOR = '\r\n';

// Only uses for generating CSV, should be refactored later to better incoporate
// maybe built-in in to individual component
export const APP_MIGRATION_STATUS_LABELS = {
  Unassigned: 'No decision made',
  Needed: 'Needed in cloud',
  NotNeeded: 'Not needed in cloud',
  Alternative: 'Use alternative',
};

// Only uses for generating CSV
export const APP_ASSESSMENT_COLUMNS = {
  name: {
    label: 'App name',
    description: 'Name of your server app',
  },
  migrationStatus: {
    label: 'Status',
    description: 'Status options you can assign to your app',
  },
  hasCloudVersion: {
    label: 'Exists in cloud',
    description:
      'Shows whether this app has an equivalent cloud version by the same vendor',
  },
  cloudUrl: {
    label: 'Marketplace link',
    description: '',
  },
  isEnabled: {
    label: 'Enabled',
    description: 'Currently enabled on server',
  },
  pages: {
    label: 'Appears on',
    description: 'Number of pages containing the macros of this app',
  },
  users: {
    label: 'Viewed by',
    description:
      'Number of unique user views of relevant macros, from the last 60 days',
  },
  jiraUsage: {
    label: 'Usage',
    description:
      'How much is this app used? How many people use it? How many projects or issues is it used on?',
  },
  canBeMigrated: {
    label: 'Can be migrated',
    description: 'Shows the available vendor migration pathway',
  },
  migrationPathInstructionsUrl: {
    label: 'Migration instructions',
    description: 'Link to vendor documentation if available',
  },
  alternativeAppKey: {
    label: 'Cloud alternative',
    description: 'Does the app have cloud alternatives?',
  },
  cloudPricing: {
    label: 'Cloud pricing',
    description: '',
  },
  serverPricing: {
    label: 'Server pricing',
    description: '',
  },
  migrationNotes: {
    label: 'Notes',
    description: 'Add notes for yourself here',
  },
};
