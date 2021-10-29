import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';
import InvitePeople, { InvitePeopleProps } from '../../../..';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { IntlProvider } from 'react-intl';

export const mockShowFlags = jest.fn();
export const mockOnSend = jest.fn();
export const mockOnCancel = jest.fn();
export const cloudId = '0125594b-5d14-4f19-ba76-9c8840d22e99';
export const resourceAri = `ari:cloud:confluence::site/${cloudId}`;
export const mockSiteUrl = 'https://hello.atlassian.net';

export const defaultProps = {
  showFlag: mockShowFlags,
  onCancelHandler: mockOnCancel,
  onSendHandler: mockOnSend,
  continueUrl: mockSiteUrl,
};

export const waitForFormToLoad = async () => {
  expect(
    screen.getByTestId('testId-invite-people-spinner'),
  ).toBeInTheDocument();

  await waitForElementToBeRemoved(() =>
    screen.queryByTestId('testId-invite-people-spinner'),
  );
  await waitFor(() => {
    expect(screen.getByTestId('testId-invite-people-form')).toBeInTheDocument();
  });
};

export const getUserPicker = async () => {
  const input = (await screen
    .getByTestId('testId-invite-people-invitee-list')
    .querySelectorAll('#invite-user-picker')[0]) as HTMLElement;
  return input;
};

export const submitForm = async (waitForSubmission: boolean = false) => {
  const submitBtn = screen
    .getByTestId('testId-invite-people-form')
    .querySelectorAll('button[type="submit"]')[0];
  fireEvent.click(submitBtn);

  if (waitForSubmission) {
    await waitFor(() => {
      expect(mockOnSend).toHaveBeenCalledTimes(1);
    });
  }
};

export const fillAndSubmitForm = async (waitForSubmission: boolean = true) => {
  const input = screen
    .getByTestId('testId-invite-people-form')
    .querySelectorAll('input[type="email"]');

  fireEvent.change(input[0], { target: { value: 'testing@acme.com' } });
  fireEvent.blur(input[0]);

  await submitForm(waitForSubmission);
};

export const renderInvitePeople = (
  props?: Partial<InvitePeopleProps>,
): RenderResult =>
  render(
    <AnalyticsListener channel="*" onEvent={jest.fn()}>
      <IntlProvider messages={{}} locale="en">
        <InvitePeople resourceAri={resourceAri} {...defaultProps} {...props} />
      </IntlProvider>
    </AnalyticsListener>,
  );
