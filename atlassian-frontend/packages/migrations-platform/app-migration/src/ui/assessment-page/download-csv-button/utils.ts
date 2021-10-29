import type { AssessmentApp } from '../../../common/types';

import {
  APP_ASSESSMENT_COLUMNS,
  APP_MIGRATION_STATUS_LABELS,
  COLUMN_SEPARATOR,
  ROW_SEPARATOR,
} from './constants';

const getAppUsageMessage = ({
  isEnabled,
  hasMacros,
}: {
  isEnabled: boolean;
  hasMacros: boolean;
}) => {
  if (!isEnabled) {
    return 'Disabled';
  }
  if (!hasMacros) {
    return 'Not applicable*';
  }
  return '';
};

const migrationStatusToLabel = (app: AssessmentApp, key: 'migrationStatus') => {
  return APP_MIGRATION_STATUS_LABELS[app[key]];
};

const nullishToString = (app: AssessmentApp, key: keyof AssessmentApp) => {
  return app[key] === null || typeof app[key] === 'undefined' ? '' : app[key];
};

const booleanToWord = (app: AssessmentApp, key: keyof AssessmentApp) => {
  return app[key] ? 'yes' : 'no';
};

const appUsageToMessage = (app: AssessmentApp, key: 'users' | 'pages') => {
  const { isEnabled, hasMacros } = app;
  const message = getAppUsageMessage({ isEnabled, hasMacros });

  return message || nullishToString(app, key);
};

const getAppsCSVFilename = (now = new Date()) => {
  const dateString = `${now.toLocaleDateString()}-${now.toLocaleTimeString()}`;

  return `AppAssessment_Downloaded-${dateString}.csv`;
};

// Is migrationPathInstructionsUrl is empty, it should default to contactVendorUrl
const migrationInstructionsUrlToDefaultUrl = (
  app: AssessmentApp,
  key: 'migrationPathInstructionsUrl',
) => {
  return app[key] || app.contactVendorUrl || '';
};

const csvValuesMappers = {
  name: nullishToString,
  migrationStatus: migrationStatusToLabel,
  hasCloudVersion: booleanToWord,
  cloudUrl: nullishToString,
  isEnabled: booleanToWord,
  pages: appUsageToMessage,
  users: appUsageToMessage,
  jiraUsage: nullishToString,
  canBeMigrated: nullishToString,
  migrationPathInstructionsUrl: migrationInstructionsUrlToDefaultUrl,
  alternativeAppKey: nullishToString,
  cloudPricing: nullishToString,
  serverPricing: nullishToString,
  migrationNotes: nullishToString,
};

/**
 * Returns a csv string presentation of apps
 */
const formatAppsToCSV = (apps: AssessmentApp[], hasUsage = false): string => {
  const { pages, users, jiraUsage, ...commonColumns } = APP_ASSESSMENT_COLUMNS;
  const resolvedColumns = hasUsage
    ? { ...commonColumns, pages, users }
    : { ...commonColumns, jiraUsage };

  const csvKeys = Object.keys(
    resolvedColumns,
  ) as (keyof typeof resolvedColumns)[];
  const csvLabels = csvKeys.map(
    (key) => `"${resolvedColumns[key].label.toUpperCase()}"`,
  );
  const csvDescriptions = csvKeys.map(
    (key) => `"${resolvedColumns[key].description}"`,
  );
  const csvHeadRows = [csvLabels, csvDescriptions];
  const appsRows = apps.map((app) =>
    csvKeys.map((key) => {
      // @ts-ignore remove that once we refactor the function
      const value = csvValuesMappers[key](app, key);
      return `"${value}"`;
    }),
  );

  const csvString = [...csvHeadRows, ...appsRows]
    .map((row) => row.join(COLUMN_SEPARATOR))
    .join(ROW_SEPARATOR);
  return csvString;
};

// Refactor later to remove the any type. I basically copy and paste this file from old MPKit
export const downloadAppsCsv = (apps: any, showUsage: boolean) => {
  const csvFileName = getAppsCSVFilename(new Date());
  const csvContent = formatAppsToCSV(apps, showUsage);
  const a = document.createElement('a');

  a.setAttribute(
    'href',
    `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`,
  );
  a.setAttribute('target', '_blank');
  a.setAttribute('download', csvFileName);
  document.body.appendChild(a);
  a.click();
  a.remove();
};
