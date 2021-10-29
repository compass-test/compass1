import React from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  ChecksContentBasic,
  ChecksContentBlockingExecutionError,
  ChecksContentError,
  ChecksContentExecutionError,
  ChecksContentSuccess,
  ChecksContentWarnings,
} from './examples';
import messages from './messages';

describe('ChecksContent', () => {
  const viewChecksLinkAnalyticsId = 'viewDetailsLink';

  it('Should display correctly when checks are running', async () => {
    const { getByText, queryByLabelText, queryByTestId } = render(
      <ChecksContentBasic />,
    );
    const warningIcon = queryByLabelText('Warning icon');
    const checkIcon = queryByLabelText('Check icon');
    const errorIcon = queryByLabelText('Error icon');
    const viewChecksLinkButton = queryByTestId(viewChecksLinkAnalyticsId);

    expect(
      getByText(messages.currentChecksStatusRunningTitle.defaultMessage!),
    ).toBeInTheDocument();
    expect(warningIcon).not.toBeInTheDocument();
    expect(checkIcon).not.toBeInTheDocument();
    expect(errorIcon).not.toBeInTheDocument();
    expect(viewChecksLinkButton).not.toBeInTheDocument();
  });

  it('Should display correctly when checks succeed', async () => {
    const { getByText, queryByLabelText, queryByTestId } = render(
      <ChecksContentSuccess />,
    );
    const warningIcon = queryByLabelText('Warning icon');
    const checkIcon = queryByLabelText('Check icon');
    const errorIcon = queryByLabelText('Error icon');
    const viewChecksLinkButton = queryByTestId(viewChecksLinkAnalyticsId);

    expect(
      getByText(messages.currentChecksStatusSuccessTitle.defaultMessage!),
    ).toBeInTheDocument();
    expect(checkIcon).toBeInTheDocument();
    expect(warningIcon).not.toBeInTheDocument();
    expect(errorIcon).not.toBeInTheDocument();
    expect(viewChecksLinkButton).not.toBeInTheDocument();
  });

  it('Should display correctly when checks have warnings', async () => {
    const onViewChecks = jest.fn();

    const { getByText, queryByLabelText, getByTestId } = render(
      <ChecksContentWarnings onViewChecks={onViewChecks} />,
    );

    const warningIcon = queryByLabelText('Warning icon');
    const checkIcon = queryByLabelText('Check icon');
    const errorIcon = queryByLabelText('Error icon');
    const viewChecksLinkButton = getByTestId(viewChecksLinkAnalyticsId);

    userEvent.click(viewChecksLinkButton);
    expect(onViewChecks).toHaveBeenCalledTimes(1);
    expect(
      getByText(messages.currentChecksStatusWarningTitle.defaultMessage!),
    ).toBeInTheDocument();
    expect(warningIcon).toBeInTheDocument();
    expect(checkIcon).not.toBeInTheDocument();
    expect(errorIcon).not.toBeInTheDocument();
  });

  it('Should display correctly when checks have errors', async () => {
    const viewChecksLinkAnalyticsId = 'viewErrorsLink';

    const { getByText, queryByLabelText, getByTestId } = render(
      <ChecksContentError />,
    );
    const warningIcon = queryByLabelText('Warning icon');
    const checkIcon = queryByLabelText('Check icon');
    const errorIcon = queryByLabelText('Error icon');

    expect(
      getByText(messages.currentChecksStatusErrorTitle.defaultMessage!),
    ).toBeInTheDocument();
    expect(errorIcon).toBeInTheDocument();
    expect(warningIcon).not.toBeInTheDocument();
    expect(checkIcon).not.toBeInTheDocument();
    expect(getByTestId(viewChecksLinkAnalyticsId)).toBeInTheDocument();
  });

  it('Should display correctly when checks block the migration', async () => {
    const { getByText, queryByLabelText } = render(
      <ChecksContentBlockingExecutionError />,
    );
    const warningIcon = queryByLabelText('Warning icon');
    const checkIcon = queryByLabelText('Check icon');
    const errorIcon = queryByLabelText('Error icon');

    expect(
      getByText(
        messages.currentChecksStatusBlockingExecutionErrorTitle.defaultMessage!,
      ),
    ).toBeInTheDocument();
    expect(warningIcon).toBeInTheDocument();
    expect(errorIcon).not.toBeInTheDocument();
    expect(checkIcon).not.toBeInTheDocument();
  });

  it('Should display correctly when checks have execution errors', async () => {
    const { getByText, queryByLabelText } = render(
      <ChecksContentExecutionError />,
    );
    const warningIcon = queryByLabelText('Warning icon');
    const checkIcon = queryByLabelText('Check icon');
    const errorIcon = queryByLabelText('Error icon');

    expect(
      getByText(
        messages.currentChecksStatusExecutionErrorTitle.defaultMessage!,
      ),
    ).toBeInTheDocument();
    expect(warningIcon).toBeInTheDocument();
    expect(errorIcon).not.toBeInTheDocument();
    expect(checkIcon).not.toBeInTheDocument();
  });
});
