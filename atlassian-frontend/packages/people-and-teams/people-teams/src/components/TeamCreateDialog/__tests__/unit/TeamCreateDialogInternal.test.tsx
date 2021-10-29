import React from 'react';

import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';

import { AnalyticsListener } from '@atlaskit/analytics-next';
import { testProposedMembersData } from '@atlassian/ptc-test-utils';

import { Product } from '../../../../types';
import { CustomIntlProvider } from '../../../i18n';
import TeamCreateDialogInternal from '../../TeamCreateDialogInternal';

jest.mock('../../../analytics', () => {
  return {
    ...jest.requireActual<Object>('../../../analytics'),
    triggerAnalyticsForCreateTeamFailed: jest.fn(),
    triggerAnalyticsForCreateTeamSuccess: jest.fn(),
    triggerAnalyticsForInviteMembersFailed: jest.fn(),
    triggerAnalyticsForInviteMembersSuccess: jest.fn(),
  };
});

const defaultProps = {
  onClose: jest.fn(),
  onCreateTeamSuccess: jest.fn(),
  onCreateTeamFailed: jest.fn(),
  createTeamAndAddMembers: jest.fn(),
  principalId: 'current-profile-id',
  cloudId: 'test-cloud-id',
  product: 'confluence' as Product,
};

const mockHandleAnalyticsEvent = jest.fn();

const renderTeamCreateDialog = (props = {}) => {
  return render(
    <AnalyticsListener channel="*" onEvent={mockHandleAnalyticsEvent}>
      <IntlProvider messages={{}} locale="en">
        <CustomIntlProvider>
          <TeamCreateDialogInternal {...defaultProps} {...props} />
        </CustomIntlProvider>
      </IntlProvider>
    </AnalyticsListener>,
  );
};

beforeEach(() => {
  jest.resetAllMocks();
});

it('Start button should be disabled at first time', () => {
  const { getByText } = renderTeamCreateDialog();

  const btnStart = getByText('Start team');
  expect(btnStart).toBeInTheDocument();
  act(() => {
    userEvent.click(btnStart);
  });
  expect(defaultProps.createTeamAndAddMembers).not.toHaveBeenCalled();
});

it('renders dialog when options prop is not set', async () => {
  const { getByTestId, getByText } = renderTeamCreateDialog({
    proposedMembers: testProposedMembersData,
  });

  // type in team name input
  const teamNameInput = getByTestId('team-name-input');
  expect(teamNameInput).toBeInTheDocument();

  act(() => {
    // We use `userEvent` here because `fireEvent.keyDown` does not work somehow
    // fireEvent.change(teamNameInput, { key: 'H', code: 'KeyH', charCode: 72 });
    userEvent.type(teamNameInput, 'Hello');
  });

  act(() => {
    // click on Start button
    const btnStart = getByText('Start team');
    userEvent.click(btnStart);
  });

  expect(defaultProps.createTeamAndAddMembers).toHaveBeenCalledWith(
    'Hello',
    testProposedMembersData,
  );
});
