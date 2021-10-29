const BASE_CONSENT_APP = {
  vendorName: 'Decadis AG',
  logoUrl:
    'https://marketplace-cdn.atlassian.com/files/images/9ffe3549-de47-4170-a76a-147db9f10c65.png',
  cloudUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=overview',
  contactVendorUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
  privacyPolicyUrl:
    'https://marketplace.atlassian.com/apps/29496/jira-workflow-toolbox?hosting=cloud&tab=support',
};

export const CONSENT_GIVEN = {
  ...BASE_CONSENT_APP,
  key: 'com.fca.jira.plugins.workflowToolbox.workflow-toolbox.consent-given',
  name: 'Jira Workflow Toolbox Consent Given',
  status: 'ConsentGiven' as const,
  dataScopes: [
    'APP_DATA_OTHER' as const,
    'APP_DATA_PII' as const,
    'APP_DATA_SECURITY' as const,
    'APP_DATA_UGC' as const,
    'MIGRATION_TRACING_IDENTITY' as const,
  ],
};

export const CONSENT_GIVEN_2 = {
  ...BASE_CONSENT_APP,
  key: 'com.fca.jira.plugins.workflowToolbox.workflow-toolbox.consent-given-2',
  name: 'Jira Workflow Toolbox Consent Given',
  status: 'ConsentGiven' as const,
  dataScopes: [
    'APP_DATA_OTHER' as const,
    'APP_DATA_PII' as const,
    'APP_DATA_SECURITY' as const,
    'APP_DATA_UGC' as const,
    'MIGRATION_TRACING_IDENTITY' as const,
  ],
};

export const CONSENT_GIVEN_3 = {
  ...BASE_CONSENT_APP,
  key: 'com.fca.jira.plugins.workflowToolbox.workflow-toolbox.consent-given-3',
  name: 'Jira Workflow Toolbox Consent Given',
  status: 'ConsentGiven' as const,
  dataScopes: [
    'APP_DATA_OTHER' as const,
    'APP_DATA_PII' as const,
    'APP_DATA_SECURITY' as const,
    'APP_DATA_UGC' as const,
    'MIGRATION_TRACING_IDENTITY' as const,
  ],
};

export const CONSENT_NOT_GIVEN = {
  ...BASE_CONSENT_APP,
  key:
    'com.fca.jira.plugins.workflowToolbox.workflow-toolbox.consent-not-given',
  name: 'Jira Workflow Toolbox Consent Not Given',
  status: 'ConsentNotGiven' as const,
  dataScopes: [
    'APP_DATA_OTHER' as const,
    'APP_DATA_PII' as const,
    'APP_DATA_SECURITY' as const,
    'APP_DATA_UGC' as const,
    'MIGRATION_TRACING_IDENTITY' as const,
  ],
};

export const CONSENT_OUTDATED = {
  ...BASE_CONSENT_APP,
  key: 'com.fca.jira.plugins.workflowToolbox.workflow-toolbox.consent-outdated',
  name: 'Jira Workflow Toolbox Consent Outdated',
  status: 'ConsentOutdated' as const,
  dataScopes: [
    'APP_DATA_OTHER' as const,
    'APP_DATA_PII' as const,
    'APP_DATA_SECURITY' as const,
    'APP_DATA_UGC' as const,
    'MIGRATION_TRACING_IDENTITY' as const,
  ],
};
export const NO_MIGRATION_NEEDED = {
  ...BASE_CONSENT_APP,
  key:
    'com.fca.jira.plugins.workflowToolbox.workflow-toolbox.no-migration-needed',
  name: 'Jira Workflow Toolbox No Migration Needed',
  status: 'NoMigrationNeeded' as const,
};

export const NO_AUTOMATED_MIGRATION_PATH = {
  ...BASE_CONSENT_APP,
  key:
    'com.fca.jira.plugins.workflowToolbox.workflow-toolbox.no-automated-migration-path',
  name: 'Jira Workflow Toolbox No Automated Migration Path',
  status: 'NoAutomatedMigrationPath' as const,
};

export const NO_MIGRATION_ALTERNATIVE = {
  ...BASE_CONSENT_APP,
  key:
    'com.fca.jira.plugins.workflowToolbox.workflow-toolbox.no-migration-alternative',
  name: 'Jira Workflow Toolbox No Migration Alternative',
  status: 'NoMigratingAlternative' as const,
};

export const SERVER_APP_OUTDATED = {
  ...BASE_CONSENT_APP,
  key:
    'com.fca.jira.plugins.workflowToolbox.workflow-toolbox.server-app-outdated',
  name: 'Jira Workflow Toolbox Server App Outdated',
  status: 'ServerAppOutdated' as const,
  upgradeAppUrl: 'https://mock-upgrade',
};
