import { FormattedMessage, InjectedIntl } from 'react-intl';

import {
  Check,
  CurrentChecksStatus,
  CurrentMigrationStatus,
} from '../../common/types';

import {
  checksStatusToOverallStatus,
  estimatedRangeGroupsForSeconds,
  largestEstimatedRangeGroup,
  migrationStatusToOverallStatus,
} from './constants';
import messages from './messages';

type ChecksInfo = {
  checksStatus: CurrentChecksStatus;
  lastChecked: number | undefined;
  creation: number | undefined;
};

export const getChecksInfo = (
  checks: Check[],
  isExecutionErrorBlocking?: boolean,
): ChecksInfo => {
  let checksStatus: CurrentChecksStatus;
  let lastChecked: number | undefined;
  let isAnyError = false;
  let isAnyWarning = false;
  let isAnyExecutionError = false;
  let isAnyRunning = false;
  let creation: number | undefined;

  checks.forEach((check) => {
    const { status, lastExecution, createdOn } = check;
    if (lastChecked === undefined) {
      lastChecked = lastExecution;
    }
    if (
      lastExecution !== undefined &&
      lastChecked !== undefined &&
      lastChecked > lastExecution
    ) {
      lastChecked = lastExecution;
    }

    if (creation === undefined) {
      creation = createdOn;
    }

    switch (status) {
      case 'Error':
        isAnyError = true;
        break;
      case 'ExecutionError':
        isAnyExecutionError = true;
        break;
      case 'Warning':
        isAnyWarning = true;
        break;
      case 'Running':
        isAnyRunning = true;
        break;
      default:
        break;
    }
  });

  if (isAnyRunning) {
    checksStatus = 'Running';
  } else if (isAnyError) {
    checksStatus = 'Error';
  } else if (isAnyExecutionError) {
    checksStatus = isExecutionErrorBlocking
      ? 'BlockingExecutionError'
      : 'ExecutionError';
  } else if (isAnyWarning) {
    checksStatus = 'Warning';
  } else {
    checksStatus = 'Success';
  }

  return { checksStatus, lastChecked, creation };
};

export const getOverallMigrationStatus = (
  checksStatus: CurrentChecksStatus,
  migrationStatus?: CurrentMigrationStatus,
) => {
  return migrationStatus
    ? migrationStatusToOverallStatus[migrationStatus]
    : checksStatusToOverallStatus[checksStatus];
};

export const getEstimatedTimeRangeMessage = (
  estimateSeconds: number,
): FormattedMessage.MessageDescriptor => {
  const rangeGroup =
    estimatedRangeGroupsForSeconds.find(
      ([rangeNumber]) => estimateSeconds < rangeNumber,
    ) || largestEstimatedRangeGroup;

  return rangeGroup[1];
};

export const getEstimatedTimeSection = (
  estimatedTimeSeconds: number | undefined,
  intl: InjectedIntl,
  showSpeedDetails: boolean,
) => {
  return estimatedTimeSeconds && estimatedTimeSeconds >= 0
    ? `${intl.formatMessage(
        getEstimatedTimeRangeMessage(estimatedTimeSeconds),
      )}${
        showSpeedDetails
          ? ` ${intl.formatMessage(messages.estimatedTimeAt16Mbps)}`
          : ''
      }`
    : intl.formatMessage(messages.notAvailable);
};
