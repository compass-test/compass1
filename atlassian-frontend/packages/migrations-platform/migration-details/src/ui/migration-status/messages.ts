import { defineMessages, FormattedMessage } from 'react-intl';

type MessageKey =
  | 'checksHeader'
  | 'estimatedTimeToMigrateHeader'
  | 'lastCheckedHeader'
  | 'creationHeader'
  | 'creationHeaderInfo'
  | 'containerAccessJiraHeader'
  | 'lessThanAMinute'
  | 'oneToFiveMinutes'
  | 'fiveToTenMinutes'
  | 'tenToThirtyMinutes'
  | 'halfHourToAnHour'
  | 'oneToTwoHours'
  | 'twoToFiveHours'
  | 'fiveToTwelveHours'
  | 'halfDayToADay'
  | 'oneToTwoDays'
  | 'twoToFiveDays'
  | 'moreThanAWeek'
  | 'estimatedTimeAt16Mbps'
  | 'notAvailable';

type Messages = Record<MessageKey, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  checksHeader: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.checks-header',
    defaultMessage: 'Checks',
    description: 'Migration status header for checks',
  },
  estimatedTimeToMigrateHeader: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.estimated-time-to-migrate-header',
    defaultMessage: 'Estimated time to migrate',
    description: 'Migration status header for estimated time to migrate',
  },
  lastCheckedHeader: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.last-checked-header',
    defaultMessage: 'Last updated',
    description: 'Migration status header for last updated time',
  },
  creationHeader: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.creation-header',
    defaultMessage: 'Migration created',
    description: 'Migration status header for created time',
  },
  creationHeaderInfo: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.creation-header-info',
    defaultMessage:
      'Migration details will be available on the dashboard for 14 days from the day the migration was created.',
    description: 'Migration status info for created time',
  },
  containerAccessJiraHeader: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.container-access-jira-header',
    defaultMessage: 'Project access',
    description: 'Migration status header for public container access in Jira',
  },
  lessThanAMinute: {
    id:
      'com.atlassian.migrations-platform.migration-details.status.estimated-time-content.less-than-a-minute',
    defaultMessage: '0 min',
    description: 'Estimated time range - less than a minute',
  },
  oneToFiveMinutes: {
    id:
      'com.atlassian.migrations-platform.migration-details.status.estimated-time-content.one-to-five-minutes',
    defaultMessage: '1 - 5 min',
    description: 'Estimated time range - 1 to 5 minutes',
  },
  fiveToTenMinutes: {
    id:
      'com.atlassian.migrations-platform.migration-details.status.estimated-time-content.five-to-ten-minutes',
    defaultMessage: '5 - 10 min',
    description: 'Estimated time range - 5 to 10 minutes',
  },
  tenToThirtyMinutes: {
    id:
      'com.atlassian.migrations-platform.migration-details.status.estimated-time-content.ten-to-thirty-minutes',
    defaultMessage: '10 - 30 min',
    description: 'Estimated time range - 5 to 10 minutes',
  },
  halfHourToAnHour: {
    id:
      'com.atlassian.migrations-platform.migration-details.status.estimated-time-content.half-hour-to-an-hour',
    defaultMessage: '30 min - 1 h',
    description: 'Estimated time range - 30 mins to 1 hour',
  },
  oneToTwoHours: {
    id:
      'com.atlassian.migrations-platform.migration-details.status.estimated-time-content.one-to-two-hours',
    defaultMessage: '1 - 2 h',
    description: 'Estimated time range - 1 to 2 hours',
  },
  twoToFiveHours: {
    id:
      'com.atlassian.migrations-platform.migration-details.status.estimated-time-content.two-to-five-hours',
    defaultMessage: '2 - 5 h',
    description: 'Estimated time range - 2 to 5 hours',
  },
  fiveToTwelveHours: {
    id:
      'com.atlassian.migrations-platform.migration-details.status.estimated-time-content.five-to-twelve-hours',
    defaultMessage: '5 - 12 h',
    description: 'Estimated time range - 5 to 12 hours',
  },
  halfDayToADay: {
    id:
      'com.atlassian.migrations-platform.migration-details.status.estimated-time-content.half-day-to-a-day',
    defaultMessage: '12 h - 1 d',
    description: 'Estimated time range - 12 hours to 1 day',
  },
  oneToTwoDays: {
    id:
      'com.atlassian.migrations-platform.migration-details.status.estimated-time-content.one-to-two-days',
    defaultMessage: '1 - 2 d',
    description: 'Estimated time range - 1 to 2 days',
  },
  twoToFiveDays: {
    id:
      'com.atlassian.migrations-platform.migration-details.status.estimated-time-content.two-to-five-days',
    defaultMessage: '2 - 5 d',
    description: 'Estimated time range - 2 to 5 days',
  },
  moreThanAWeek: {
    id:
      'com.atlassian.migrations-platform.migration-details.status.estimated-time-content.more-than-a-week',
    defaultMessage: '~ 1 w',
    description: 'Estimated time range - more than a week',
  },
  estimatedTimeAt16Mbps: {
    id:
      'com.atlassian.migrations-platform.migration-details.status.estimated-time-content.estimated-time-at-16-mbps',
    defaultMessage: '(estimated time at 16 Mbps)',
    description: 'Estimated time qualifier',
  },
  notAvailable: {
    id:
      'com.atlassian.migrations-platform.migration-details.status.estimated-time-content.not-available',
    defaultMessage: 'No estimate available',
    description: 'When there is no estimation available',
  },
});
