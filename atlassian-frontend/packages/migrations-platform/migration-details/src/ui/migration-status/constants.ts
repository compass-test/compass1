import { FormattedMessage } from 'react-intl';

import {
  CurrentChecksStatus,
  CurrentMigrationStatus,
  OverallMigrationStatus,
} from '../../common/types';

import messages from './messages';

export const migrationStatusToOverallStatus: Record<
  CurrentMigrationStatus,
  OverallMigrationStatus
> = {
  Validating: 'MigrationValidating',
  Running: 'MigrationRunning',
  Complete: 'MigrationComplete',
  Incomplete: 'MigrationIncomplete',
  Failed: 'MigrationFailed',
  Stopping: 'MigrationStopping',
  Stopped: 'MigrationStopped',
};

export const checksStatusToOverallStatus: Record<
  CurrentChecksStatus,
  OverallMigrationStatus
> = {
  Running: 'ChecksRunning',
  Success: 'ChecksSuccess',
  Error: 'ChecksError',
  Warning: 'ChecksWarning',
  ExecutionError: 'ChecksExecutionError',
  BlockingExecutionError: 'ChecksBlockingExecutionError',
};

const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

export const estimatedRangeGroupsForSeconds: Array<[
  number,
  FormattedMessage.MessageDescriptor,
]> = [
  [1 * MINUTE, messages.lessThanAMinute],
  [5 * MINUTE, messages.oneToFiveMinutes],
  [10 * MINUTE, messages.fiveToTenMinutes],
  [30 * MINUTE, messages.tenToThirtyMinutes],
  [1 * HOUR, messages.halfHourToAnHour],
  [2 * HOUR, messages.oneToTwoHours],
  [5 * HOUR, messages.twoToFiveHours],
  [12 * HOUR, messages.fiveToTwelveHours],
  [1 * DAY, messages.halfDayToADay],
  [2 * DAY, messages.oneToTwoDays],
  [5 * DAY, messages.twoToFiveDays],
  [1 * WEEK, messages.moreThanAWeek],
];

export const largestEstimatedRangeGroup: [
  number,
  FormattedMessage.MessageDescriptor,
] = estimatedRangeGroupsForSeconds[estimatedRangeGroupsForSeconds.length - 1];
