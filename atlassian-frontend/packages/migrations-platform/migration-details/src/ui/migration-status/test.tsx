import React from 'react';

import { render } from '@testing-library/react';

import commonMessages from '../../common/messages';

import {
  MigrationRunningStatusWithCreationTime,
  MigrationStatusChecksBlockingExecutionError,
  MigrationStatusChecksContainersPubliclyAvailable,
  MigrationStatusChecksError,
  MigrationStatusChecksExecutionError,
  MigrationStatusChecksLastUpdated,
  MigrationStatusChecksRunning,
  MigrationStatusChecksSuccess,
  MigrationStatusChecksWarning,
  MigrationStatusChecksWithCreationDate,
  MigrationStatusLinkToErrorLogs,
  MigrationStatusMigrationComplete,
  MigrationStatusMigrationEstimatedTimeHidden,
  MigrationStatusMigrationFailed,
  MigrationStatusMigrationFiveToTenMinutes,
  MigrationStatusMigrationFiveToTwelveHours,
  MigrationStatusMigrationHalfDayToADay,
  MigrationStatusMigrationHalfHourToAnHour,
  MigrationStatusMigrationIncomplete,
  MigrationStatusMigrationLessThanAMinute,
  MigrationStatusMigrationMoreThanAWeek,
  MigrationStatusMigrationNotAvailable,
  MigrationStatusMigrationOneToFiveMinutes,
  MigrationStatusMigrationOneToTwoDays,
  MigrationStatusMigrationOneToTwoHours,
  MigrationStatusMigrationRunning,
  MigrationStatusMigrationStopped,
  MigrationStatusMigrationStopping,
  MigrationStatusMigrationTenToThirtyMinutes,
  MigrationStatusMigrationTwoToFiveDays,
  MigrationStatusMigrationTwoToFiveHours,
  MigrationStatusMigrationValidating,
  MigrationStatusReadyToRunCloud,
  MigrationStatusWithCreationTime,
} from './examples';
import messages from './messages';

beforeAll(() => {
  jest
    .spyOn(global.Date, 'now')
    .mockReturnValue(new Date('2020-11-01T19:00:00Z').getTime());
});

describe('<MigrationStatus />', () => {
  it('should show checks error message when there is an error', () => {
    const { getByText } = render(<MigrationStatusChecksError />);

    expect(
      getByText(commonMessages.checksErrorsTitle.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(commonMessages.checksErrorsDescription.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(messages.checksHeader.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(messages.lastCheckedHeader.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(messages.estimatedTimeToMigrateHeader.defaultMessage!),
    ).toBeInTheDocument();
  });

  it('should show checks execution error message when there is an execution error', () => {
    const { getByText } = render(<MigrationStatusChecksExecutionError />);

    expect(
      getByText(commonMessages.checksExecutionErrorsTitle.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(
        commonMessages.checksExecutionErrorsDescription.defaultMessage!,
      ),
    ).toBeInTheDocument();
    expect(
      getByText(messages.checksHeader.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(messages.lastCheckedHeader.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(messages.estimatedTimeToMigrateHeader.defaultMessage!),
    ).toBeInTheDocument();
  });

  it('should show checks blocking execution error message when there is an execution error and they are blocking plan run', () => {
    const { getByText } = render(
      <MigrationStatusChecksBlockingExecutionError />,
    );

    expect(
      getByText(commonMessages.checksBlockingErrorsTitle.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(commonMessages.checksBlockingErrorsDescription.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(messages.checksHeader.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(messages.lastCheckedHeader.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(messages.estimatedTimeToMigrateHeader.defaultMessage!),
    ).toBeInTheDocument();
  });

  it('should show checks warning message when there is a warning', () => {
    const { getByText } = render(<MigrationStatusChecksWarning />);

    expect(
      getByText(commonMessages.checksWarningsTitle.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(commonMessages.checksWarningsDescription.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(messages.checksHeader.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(messages.lastCheckedHeader.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(messages.estimatedTimeToMigrateHeader.defaultMessage!),
    ).toBeInTheDocument();
  });

  it('should show checks running message when any check is running', () => {
    const { getByText, queryByText } = render(<MigrationStatusChecksRunning />);

    expect(
      getByText(commonMessages.checksRunningTitle.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(commonMessages.checksRunningDescription.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(messages.checksHeader.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      queryByText(messages.lastCheckedHeader.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      queryByText(messages.estimatedTimeToMigrateHeader.defaultMessage!),
    ).not.toBeInTheDocument();
  });

  it('should show checks success message when all successful', () => {
    const { getByText } = render(<MigrationStatusChecksSuccess />);

    expect(
      getByText(commonMessages.checksSuccessTitle.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(commonMessages.checksSuccessDescription.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(messages.checksHeader.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(messages.lastCheckedHeader.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(messages.estimatedTimeToMigrateHeader.defaultMessage!),
    ).toBeInTheDocument();
  });

  it('should show migration validating message when validating', () => {
    const { getByText, queryByText } = render(
      <MigrationStatusMigrationValidating />,
    );

    expect(
      getByText(commonMessages.migrationValidatingTitle.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(commonMessages.migrationValidatingDescription.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      queryByText(messages.checksHeader.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      queryByText(messages.lastCheckedHeader.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      queryByText(messages.estimatedTimeToMigrateHeader.defaultMessage!),
    ).not.toBeInTheDocument();
  });

  it('should show migration running message when running', () => {
    const { getByText, queryByText } = render(
      <MigrationStatusMigrationRunning />,
    );

    expect(
      getByText(commonMessages.migrationRunningTitle.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(commonMessages.migrationRunningDescription.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      queryByText(messages.checksHeader.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      queryByText(messages.lastCheckedHeader.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      queryByText(messages.estimatedTimeToMigrateHeader.defaultMessage!),
    ).not.toBeInTheDocument();
  });

  it('should show migration complete message when completed successfully', () => {
    const { getByText, queryByText } = render(
      <MigrationStatusMigrationComplete />,
    );

    expect(
      getByText(commonMessages.migrationCompleteTitle.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(
        commonMessages.siteCloudDestinationMigrationCompleteDescription
          .defaultMessage!,
      ),
    ).toBeInTheDocument();
    expect(
      queryByText(messages.checksHeader.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      queryByText(messages.lastCheckedHeader.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      queryByText(messages.estimatedTimeToMigrateHeader.defaultMessage!),
    ).not.toBeInTheDocument();
  });

  it('should show migration incomplete message when migration finished but incomplete', () => {
    const { getByText, queryByText } = render(
      <MigrationStatusMigrationIncomplete />,
    );

    expect(
      getByText(commonMessages.migrationIncompleteTitle.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(commonMessages.migrationIncompleteDescription.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      queryByText(messages.checksHeader.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      queryByText(messages.lastCheckedHeader.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      queryByText(messages.estimatedTimeToMigrateHeader.defaultMessage!),
    ).not.toBeInTheDocument();
  });

  it('should show migration failed message when migration failed', () => {
    const { getByText, queryByText } = render(
      <MigrationStatusMigrationFailed />,
    );

    expect(
      getByText(commonMessages.migrationFailedTitle.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(commonMessages.migrationFailedDescription.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      queryByText(messages.checksHeader.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      queryByText(messages.lastCheckedHeader.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      queryByText(messages.estimatedTimeToMigrateHeader.defaultMessage!),
    ).not.toBeInTheDocument();
  });

  it('should show migration stopping message when migration stopping', () => {
    const { getByText, queryByText } = render(
      <MigrationStatusMigrationStopping />,
    );

    expect(
      getByText(commonMessages.migrationStoppingTitle.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(commonMessages.migrationStoppingDescription.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      queryByText(messages.checksHeader.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      queryByText(messages.lastCheckedHeader.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      queryByText(messages.estimatedTimeToMigrateHeader.defaultMessage!),
    ).not.toBeInTheDocument();
  });

  it('should show migration stopped message when migration stopped', () => {
    const { getByText, queryByText } = render(
      <MigrationStatusMigrationStopped />,
    );

    expect(
      getByText(commonMessages.migrationStoppedTitle.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(commonMessages.migrationStoppedDescription.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      queryByText(messages.checksHeader.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      queryByText(messages.lastCheckedHeader.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      queryByText(messages.estimatedTimeToMigrateHeader.defaultMessage!),
    ).not.toBeInTheDocument();
  });

  it('should show access message when containers are publicly available', () => {
    const { getByText } = render(
      <MigrationStatusChecksContainersPubliclyAvailable />,
    );

    expect(
      getByText(messages.containerAccessJiraHeader.defaultMessage!),
    ).toBeInTheDocument();
  });

  [
    <MigrationStatusChecksSuccess />,
    <MigrationStatusChecksError />,
    <MigrationStatusChecksExecutionError />,
    <MigrationStatusChecksBlockingExecutionError />,
    <MigrationStatusChecksWarning />,
  ].forEach((component) => {
    it('should display Refresh button when it is pre-migration', () => {
      const { getByTestId } = render(component);

      const refreshButton = getByTestId('refreshMigrationDataButton');
      expect(refreshButton).toBeInTheDocument();
      expect(refreshButton.textContent).toMatch(/Refresh/i);
      expect(refreshButton).toBeEnabled();
    });
  });

  [
    <MigrationStatusMigrationRunning />,
    <MigrationStatusMigrationComplete />,
    <MigrationStatusMigrationIncomplete />,
    <MigrationStatusMigrationFailed />,
  ].forEach((component) => {
    it('should not display Refresh button during or after migration', () => {
      const { queryByTestId } = render(component);

      const refreshButton = queryByTestId('refreshMigrationDataButton');
      expect(refreshButton).not.toBeInTheDocument();
    });
  });

  it('should display disabled Refresh button when checks are running', () => {
    const { getByTestId } = render(<MigrationStatusChecksRunning />);

    const refreshButton = getByTestId('refreshMigrationDataButton');
    expect(refreshButton).toBeInTheDocument();
    expect(refreshButton.textContent).toMatch(/Refresh/i);
    expect(refreshButton).toBeDisabled();
  });

  it('should display last updated based on oldest check execution', () => {
    // Starting from 01/11/2020 19:00:00
    const firstExecutionId = 1604255677000; // 01/11/2020 18:34:37
    const secondExecutionId = 1604254800000; // 01/11/2020 18:20:00
    const lastExecutionId = 1604254698000; // 01/11/2020 18:18:18
    const lastExecutionText = '42 minutes ago';
    const { getByText } = render(
      <MigrationStatusChecksLastUpdated
        lastExecutions={[firstExecutionId, lastExecutionId, secondExecutionId]}
      />,
    );

    expect(getByText(lastExecutionText)).toBeInTheDocument();
  });

  it('should display link to error logs', () => {
    const { getByText } = render(<MigrationStatusLinkToErrorLogs />);

    expect(getByText('Link to error logs')).toBeInTheDocument();
  });

  describe('Estimated time Content', () => {
    it('should show less than a minute', () => {
      const { getByText } = render(<MigrationStatusMigrationLessThanAMinute />);

      expect(
        getByText(messages.lessThanAMinute.defaultMessage!, { exact: false }),
      ).toBeInTheDocument();
    });

    it('should show 1 to 5 minutes', () => {
      const { getByText } = render(
        <MigrationStatusMigrationOneToFiveMinutes />,
      );

      expect(
        getByText(messages.oneToFiveMinutes.defaultMessage!, { exact: false }),
      ).toBeInTheDocument();
    });

    it('should show 5 to 10 minutes', () => {
      const { getByText } = render(
        <MigrationStatusMigrationFiveToTenMinutes />,
      );

      expect(
        getByText(messages.fiveToTenMinutes.defaultMessage!, { exact: false }),
      ).toBeInTheDocument();
    });

    it('should show 10 to 30 minutes', () => {
      const { getByText } = render(
        <MigrationStatusMigrationTenToThirtyMinutes />,
      );

      expect(
        getByText(messages.tenToThirtyMinutes.defaultMessage!, {
          exact: false,
        }),
      ).toBeInTheDocument();
    });

    it('should show half hour to an hour', () => {
      const { getByText } = render(
        <MigrationStatusMigrationHalfHourToAnHour />,
      );

      expect(
        getByText(messages.halfHourToAnHour.defaultMessage!, { exact: false }),
      ).toBeInTheDocument();
    });

    it('should show 1 to 2 hours', () => {
      const { getByText } = render(<MigrationStatusMigrationOneToTwoHours />);

      expect(
        getByText(messages.oneToTwoHours.defaultMessage!, { exact: false }),
      ).toBeInTheDocument();
    });

    it('should show 2 to 5 hours', () => {
      const { getByText } = render(<MigrationStatusMigrationTwoToFiveHours />);

      expect(
        getByText(messages.twoToFiveHours.defaultMessage!, { exact: false }),
      ).toBeInTheDocument();
    });

    it('should show 5 to 12 hours', () => {
      const { getByText } = render(
        <MigrationStatusMigrationFiveToTwelveHours />,
      );

      expect(
        getByText(messages.fiveToTwelveHours.defaultMessage!, { exact: false }),
      ).toBeInTheDocument();
    });

    it('should show half day to a day', () => {
      const { getByText } = render(<MigrationStatusMigrationHalfDayToADay />);

      expect(
        getByText(messages.halfDayToADay.defaultMessage!, { exact: false }),
      ).toBeInTheDocument();
    });

    it('should show 1 to 2 days', () => {
      const { getByText } = render(<MigrationStatusMigrationOneToTwoDays />);

      expect(
        getByText(messages.oneToTwoDays.defaultMessage!, { exact: false }),
      ).toBeInTheDocument();
    });

    it('should show 2 to 5 days', () => {
      const { getByText } = render(<MigrationStatusMigrationTwoToFiveDays />);

      expect(
        getByText(messages.twoToFiveDays.defaultMessage!, { exact: false }),
      ).toBeInTheDocument();
    });

    it('should show more than a week', () => {
      const { getByText } = render(<MigrationStatusMigrationMoreThanAWeek />);

      expect(
        getByText(messages.moreThanAWeek.defaultMessage!, { exact: false }),
      ).toBeInTheDocument();
    });

    it('should show no estimate available message if estimatedTimeSeconds is less than 0', () => {
      const { getByText } = render(<MigrationStatusMigrationNotAvailable />);

      expect(
        getByText(messages.notAvailable.defaultMessage!, { exact: false }),
      ).toBeInTheDocument();
    });

    it('should not show time estimate if estimatedTimeSeconds is undefined', () => {
      const { queryByText } = render(
        <MigrationStatusMigrationEstimatedTimeHidden />,
      );

      expect(
        queryByText(messages.estimatedTimeToMigrateHeader.defaultMessage!, {
          exact: false,
        }),
      ).toBeNull();
    });
    it('should not show speed text for cloud migrations', () => {
      const { getByText } = render(<MigrationStatusReadyToRunCloud />);
      const estimatedTimeValue = getByText(
        messages.tenToThirtyMinutes.defaultMessage!,
        { exact: false },
      );
      expect(estimatedTimeValue.textContent).not.toContain(
        messages.estimatedTimeAt16Mbps.defaultMessage,
      );
    });
    it('should show speed text for server to cloud migrations', () => {
      const { getByText } = render(
        <MigrationStatusMigrationTenToThirtyMinutes />,
      );
      const estimatedTimeValue = getByText(
        messages.tenToThirtyMinutes.defaultMessage!,
        { exact: false },
      );
      expect(estimatedTimeValue.textContent).toContain(
        messages.estimatedTimeAt16Mbps.defaultMessage,
      );
    });
  });

  describe('Creation time', () => {
    it('should display creation time for migration checks', () => {
      const { getByText } = render(<MigrationStatusChecksWithCreationDate />);

      expect(
        getByText(commonMessages.checksSuccessTitle.defaultMessage!),
      ).toBeInTheDocument();
      expect(
        getByText(commonMessages.checksSuccessDescription.defaultMessage!),
      ).toBeInTheDocument();
      expect(
        getByText(messages.checksHeader.defaultMessage!),
      ).toBeInTheDocument();
      expect(
        getByText(messages.lastCheckedHeader.defaultMessage!),
      ).toBeInTheDocument();
      expect(
        getByText(messages.estimatedTimeToMigrateHeader.defaultMessage!),
      ).toBeInTheDocument();
      expect(
        getByText(messages.creationHeader.defaultMessage!),
      ).toBeInTheDocument();
      expect(
        getByText(messages.creationHeaderInfo.defaultMessage!),
      ).toBeInTheDocument();
    });

    it('should display creation time for migration status', () => {
      const { getByText, queryByText } = render(
        <MigrationStatusWithCreationTime />,
      );

      expect(
        getByText(commonMessages.migrationCompleteTitle.defaultMessage!),
      ).toBeInTheDocument();
      expect(
        getByText(
          commonMessages.siteCloudDestinationMigrationCompleteDescription
            .defaultMessage!,
        ),
      ).toBeInTheDocument();
      expect(
        queryByText(messages.checksHeader.defaultMessage!),
      ).not.toBeInTheDocument();
      expect(
        queryByText(messages.lastCheckedHeader.defaultMessage!),
      ).not.toBeInTheDocument();
      expect(
        getByText(messages.creationHeader.defaultMessage!),
      ).toBeInTheDocument();
      expect(
        getByText(messages.creationHeaderInfo.defaultMessage!),
      ).toBeInTheDocument();
    });

    it('should not display creation time for migration running status', () => {
      const { getByText, queryByText } = render(
        <MigrationRunningStatusWithCreationTime />,
      );

      expect(
        getByText(commonMessages.migrationRunningTitle.defaultMessage!),
      ).toBeInTheDocument();
      expect(
        getByText(commonMessages.migrationRunningDescription.defaultMessage!),
      ).toBeInTheDocument();
      expect(
        queryByText(messages.checksHeader.defaultMessage!),
      ).not.toBeInTheDocument();
      expect(
        queryByText(messages.lastCheckedHeader.defaultMessage!),
      ).not.toBeInTheDocument();
      expect(
        queryByText(messages.creationHeader.defaultMessage!),
      ).not.toBeInTheDocument();
      expect(
        queryByText(messages.creationHeaderInfo.defaultMessage!),
      ).not.toBeInTheDocument();
    });
  });
});
