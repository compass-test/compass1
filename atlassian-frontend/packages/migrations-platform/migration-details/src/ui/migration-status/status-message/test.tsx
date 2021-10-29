import React from 'react';

import { render } from '@testing-library/react';

import messages from '../../../common/messages';

import {
  StatusMessageBasic,
  StatusMessageChecksAutoSaveRunning,
  StatusMessageChecksRunning,
  StatusMessageIncompleteForCloudMigration,
  StatusMessageMigrationWithCustomRefeshLabel,
  StatusMessageWithCustomAction,
} from './examples';

describe('<StatusMessage />', () => {
  it('should show message based on migration status', () => {
    const { getByText } = render(<StatusMessageBasic />);

    expect(
      getByText(messages.checksErrorsTitle.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(messages.checksErrorsDescription.defaultMessage!),
    ).toBeInTheDocument();
  });

  it('should display disabled Refresh button when checks are running', () => {
    const { getByTestId } = render(<StatusMessageChecksRunning />);
    const refreshButton = getByTestId('refreshMigrationDataButton');

    expect(refreshButton).toBeInTheDocument();
    expect(refreshButton.textContent).toMatch(/Refresh/i);
    expect(refreshButton).toBeDisabled();
  });

  it('should display C2C message when checks are running', () => {
    const { getByText } = render(<StatusMessageChecksAutoSaveRunning />);

    expect(
      getByText(messages.checksRunningTitle.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(messages.checksRunningAutoSaveDescription.defaultMessage!),
    ).toBeInTheDocument();
  });

  it('should display custom Refresh button label', () => {
    const { getByTestId } = render(
      <StatusMessageMigrationWithCustomRefeshLabel />,
    );
    const refreshButton = getByTestId('refreshMigrationDataButton');

    expect(refreshButton).toBeInTheDocument();
    expect(refreshButton.textContent).toMatch('Re-run checks');
  });

  it('should override default button action', () => {
    const { queryByTestId, getByText } = render(
      <StatusMessageWithCustomAction />,
    );
    const refreshButton = queryByTestId('refreshMigrationDataButton');
    const actionContent = getByText('Hello World');

    expect(refreshButton).not.toBeInTheDocument();
    expect(actionContent).toBeDefined();
  });

  it('should render right content for cloud migration', () => {
    const { getByTestId } = render(
      <StatusMessageIncompleteForCloudMigration />,
    );
    const migrationStatusDesc = getByTestId('migrationStatusDescription');

    expect(migrationStatusDesc).toBeInTheDocument();
    expect(migrationStatusDesc.textContent).toMatch(
      'We could not migrate some data.',
    );
  });
});
