import React, { FC } from 'react';

import { IntlProvider } from 'react-intl';

import { MigrationStatus } from './index';

const defaultProps = {
  estimatedTimeSeconds: 1800,
  productFamilyKey: 'jira' as const,
  onViewChecks: () => undefined,
  onRefresh: () => undefined,
};

const threeHoursAgo = Date.now() - 1000 * 60 * 180;
const twoDaysAgo = Date.now() - 1000 * 60 * 60 * 24 * 2;

export const MigrationStatusChecksContainersPubliclyAvailable = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[{ status: 'Success', lastExecution: threeHoursAgo }]}
        areAnyContainersPubliclyAvailable={true}
      />
    </IntlProvider>
  );
};

export const MigrationStatusChecksError = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[
          { status: 'Success' },
          { status: 'Error' },
          { status: 'Warning', lastExecution: threeHoursAgo },
          { status: 'ExecutionError' },
        ]}
      />
    </IntlProvider>
  );
};

export const MigrationStatusChecksExecutionError = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[
          { status: 'Success' },
          { status: 'Warning' },
          { status: 'ExecutionError', lastExecution: threeHoursAgo },
        ]}
      />
    </IntlProvider>
  );
};

export const MigrationStatusChecksBlockingExecutionError = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        isExecutionErrorBlocking
        checks={[
          { status: 'Success', lastExecution: threeHoursAgo },
          { status: 'Warning' },
          { status: 'ExecutionError' },
        ]}
      />
    </IntlProvider>
  );
};

export const MigrationStatusChecksWarning = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        isExecutionErrorBlocking
        checks={[
          { status: 'Success', lastExecution: threeHoursAgo },
          { status: 'Warning', lastExecution: threeHoursAgo },
        ]}
      />
    </IntlProvider>
  );
};

export const MigrationStatusChecksRunning = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        isExecutionErrorBlocking
        checks={[
          { status: 'Running' },
          { status: 'Success', lastExecution: threeHoursAgo },
          { status: 'Error', lastExecution: threeHoursAgo },
          { status: 'Warning', lastExecution: threeHoursAgo },
          { status: 'ExecutionError', lastExecution: threeHoursAgo },
        ]}
      />
    </IntlProvider>
  );
};

export const MigrationStatusChecksRunningAutoSave = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        isExecutionErrorBlocking
        isCloudMigration
        checks={[
          { status: 'Running' },
          { status: 'Success', lastExecution: threeHoursAgo },
          { status: 'Error', lastExecution: threeHoursAgo },
          { status: 'Warning', lastExecution: threeHoursAgo },
          { status: 'ExecutionError', lastExecution: threeHoursAgo },
        ]}
      />
    </IntlProvider>
  );
};

export const MigrationStatusChecksSuccess = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        isExecutionErrorBlocking
        checks={[
          { status: 'Success', lastExecution: threeHoursAgo },
          { status: 'Success', lastExecution: threeHoursAgo },
        ]}
      />
    </IntlProvider>
  );
};

export const MigrationStatusMigrationValidating = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[
          { status: 'Success', lastExecution: threeHoursAgo },
          { status: 'Success', lastExecution: threeHoursAgo },
        ]}
        migrationStatus="Validating"
      />
    </IntlProvider>
  );
};

export const MigrationStatusMigrationRunning = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[
          { status: 'Success', lastExecution: threeHoursAgo },
          { status: 'Success', lastExecution: threeHoursAgo },
        ]}
        migrationStatus="Running"
      />
    </IntlProvider>
  );
};

export const MigrationStatusMigrationComplete = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[
          { status: 'Warning', lastExecution: threeHoursAgo },
          { status: 'Success', lastExecution: threeHoursAgo },
        ]}
        migrationStatus="Complete"
      />
    </IntlProvider>
  );
};

export const MigrationStatusMigrationIncomplete = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[{ status: 'Success', lastExecution: threeHoursAgo }]}
        migrationStatus="Incomplete"
      />
    </IntlProvider>
  );
};

export const MigrationStatusMigrationFailed = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[{ status: 'Warning', lastExecution: threeHoursAgo }]}
        migrationStatus="Failed"
      />
    </IntlProvider>
  );
};

export const MigrationStatusChecksLastUpdated: FC<{
  lastExecutions: number[];
}> = ({
  lastExecutions = [
    Date.now() - 1000 * 60 * 180,
    Date.now() - 1000 * 60 * 240,
    Date.now() - 1000 * 60 * 300,
  ],
}) => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        isExecutionErrorBlocking
        checks={[
          { lastExecution: lastExecutions[0], status: 'Success' },
          { lastExecution: lastExecutions[1], status: 'Error' },
          { lastExecution: lastExecutions[2], status: 'Warning' },
        ]}
      />
    </IntlProvider>
  );
};

export const MigrationStatusMigrationLessThanAMinute = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[]}
        estimatedTimeSeconds={45}
      />
    </IntlProvider>
  );
};

export const MigrationStatusMigrationOneToFiveMinutes = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[]}
        estimatedTimeSeconds={60}
      />
    </IntlProvider>
  );
};

export const MigrationStatusMigrationFiveToTenMinutes = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[]}
        estimatedTimeSeconds={7 * 60}
      />
    </IntlProvider>
  );
};

export const MigrationStatusMigrationTenToThirtyMinutes = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[]}
        estimatedTimeSeconds={15 * 60}
      />
    </IntlProvider>
  );
};

export const MigrationStatusMigrationHalfHourToAnHour = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[]}
        estimatedTimeSeconds={45 * 60}
      />
    </IntlProvider>
  );
};

export const MigrationStatusMigrationOneToTwoHours = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[]}
        estimatedTimeSeconds={1.5 * 60 * 60}
      />
    </IntlProvider>
  );
};

export const MigrationStatusMigrationTwoToFiveHours = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[]}
        estimatedTimeSeconds={4 * 60 * 60}
      />
    </IntlProvider>
  );
};

export const MigrationStatusMigrationFiveToTwelveHours = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[]}
        estimatedTimeSeconds={10 * 60 * 60}
      />
    </IntlProvider>
  );
};

export const MigrationStatusMigrationHalfDayToADay = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[]}
        estimatedTimeSeconds={20 * 60 * 60}
      />
    </IntlProvider>
  );
};

export const MigrationStatusMigrationOneToTwoDays = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[]}
        estimatedTimeSeconds={42 * 60 * 60}
      />
    </IntlProvider>
  );
};

export const MigrationStatusMigrationTwoToFiveDays = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[]}
        estimatedTimeSeconds={3 * 24 * 60 * 60}
      />
    </IntlProvider>
  );
};

export const MigrationStatusMigrationMoreThanAWeek = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[]}
        estimatedTimeSeconds={10 * 24 * 60 * 60}
      />
    </IntlProvider>
  );
};

export const MigrationStatusMigrationNotAvailable = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[]}
        estimatedTimeSeconds={-1}
      />
    </IntlProvider>
  );
};

export const MigrationStatusMigrationEstimatedTimeHidden = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[]}
        estimatedTimeSeconds={undefined}
      />
    </IntlProvider>
  );
};

export const MigrationStatusMigrationStopping = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[]}
        migrationStatus="Stopping"
      />
    </IntlProvider>
  );
};

export const MigrationStatusMigrationStopped = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[]}
        migrationStatus="Stopped"
      />
    </IntlProvider>
  );
};

export const MigrationStatusChecksWithCreationDate = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[
          {
            status: 'Success',
            lastExecution: threeHoursAgo,
            createdOn: twoDaysAgo,
          },
        ]}
      />
    </IntlProvider>
  );
};

export const MigrationStatusWithCreationTime = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[
          {
            status: 'Warning',
            lastExecution: threeHoursAgo,
            createdOn: twoDaysAgo,
          },
          {
            status: 'Success',
            lastExecution: threeHoursAgo,
            createdOn: twoDaysAgo,
          },
        ]}
        migrationStatus="Complete"
      />
    </IntlProvider>
  );
};

export const MigrationRunningStatusWithCreationTime = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[
          {
            status: 'Success',
            lastExecution: threeHoursAgo,
            createdOn: twoDaysAgo,
          },
        ]}
        migrationStatus="Running"
      />
    </IntlProvider>
  );
};

export const MigrationStatusLinkToErrorLogs = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        checks={[
          {
            status: 'Error',
            lastExecution: threeHoursAgo,
            createdOn: twoDaysAgo,
          },
        ]}
        migrationStatus="Failed"
      >
        <a href="#">Link to error logs</a>
      </MigrationStatus>
    </IntlProvider>
  );
};

export const MigrationStatusReadyToRunCloud = () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        {...defaultProps}
        isCloudMigration
        checks={[{ status: 'Success', lastExecution: threeHoursAgo }]}
        estimatedTimeSeconds={15 * 60}
      />
    </IntlProvider>
  );
};
