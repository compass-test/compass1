import React from 'react';

import { act, render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'fetch-mock/cjs/client';
import { IntlProvider } from 'react-intl';

import { AnalyticsListener } from '@atlaskit/analytics-next';
import {
  mockCreateTeam,
  mockInviteTeamMembers,
  resetFetchMock,
  testProposedMembersData,
  testTeamData,
} from '@atlassian/ptc-test-utils';

import { Product } from '../../../../types';
import {
  triggerAnalyticsForCreateTeamFailed,
  triggerAnalyticsForCreateTeamSuccess,
  triggerAnalyticsForInviteMembersFailed,
  triggerAnalyticsForInviteMembersSuccess,
} from '../../../analytics';
import TeamCreateDialog from '../../index';

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
  onInviteMembersFailed: jest.fn(),
  createTeamAndAddMembers: jest.fn(),
  principalId: 'current-profile-id',
  cloudId: 'test-cloud-id',
  orgId: undefined,
  product: 'confluence' as Product,
  pushRoute: jest.fn(),
  addFlag: jest.fn(),
  proposedMembers: testProposedMembersData,
};

const mockHandleAnalyticsEvent = jest.fn();

const renderTeamCreateDialog = (props = {}) => {
  return render(
    <AnalyticsListener channel="*" onEvent={mockHandleAnalyticsEvent}>
      <IntlProvider messages={{}} locale="en">
        <TeamCreateDialog {...defaultProps} {...props} />
      </IntlProvider>
    </AnalyticsListener>,
  );
};

const renderDialogAndTypeTeamName = async (customProps = {}) => {
  const renderResult = renderTeamCreateDialog(customProps);

  const teamNameInput = renderResult.getByTestId('team-name-input');

  act(() => {
    userEvent.type(teamNameInput, 'Hello');
  });

  return renderResult;
};

beforeEach(() => {
  resetFetchMock();
  jest.resetAllMocks();
});

describe('onCreateTeamSuccess', () => {
  // TODO: https://product-fabric.atlassian.net/browse/PTC-3937 flaky: fix later
  it.skip('should call onCreateTeamSuccess when both creating team + inviting team requests succeed', async () => {
    mockCreateTeam(defaultProps.cloudId, defaultProps.product, 0);
    mockInviteTeamMembers(defaultProps.cloudId, defaultProps.product, 0);

    const { getByText } = await renderDialogAndTypeTeamName();

    act(() => {
      const btnStart = getByText('Start team');
      userEvent.click(btnStart);
    });

    await fetchMock.flush(true);

    await wait(() => {
      expect(defaultProps.onCreateTeamSuccess).toHaveBeenCalledWith(
        testTeamData,
        testProposedMembersData,
      );
      expect(triggerAnalyticsForCreateTeamSuccess).toHaveBeenCalled();
      expect(triggerAnalyticsForInviteMembersSuccess).toHaveBeenCalled();
      expect(defaultProps.addFlag).toHaveBeenCalledWith({
        title: expect.anything(),
        description: expect.anything(),
        appearance: 'success',
        id: 'create.team.success',
        actions: [
          {
            content: expect.anything(),
            // redirect to team page
            onClick: expect.anything(),
            href:
              '/wiki/people/team/76bec70a-8768-4b2b-b28f-6dfff8538f89?ref=confluence&src=peopleTeams',
          },
        ],
      });
    });
  });

  it('should not show flag when disableSuccessFlag is true and both creating team + inviting team requests succeed', async () => {
    mockCreateTeam(defaultProps.cloudId, defaultProps.product, 0);
    mockInviteTeamMembers(defaultProps.cloudId, defaultProps.product, 0);

    const { getByText } = await renderDialogAndTypeTeamName({
      disableSuccessFlag: true,
    });

    act(() => {
      const btnStart = getByText('Start team');
      userEvent.click(btnStart);
    });

    await fetchMock.flush(true);

    await wait(() => {
      expect(defaultProps.onCreateTeamSuccess).toHaveBeenCalledWith(
        testTeamData,
        testProposedMembersData,
      );
      expect(triggerAnalyticsForCreateTeamSuccess).toHaveBeenCalled();
      expect(triggerAnalyticsForInviteMembersSuccess).toHaveBeenCalled();
      expect(defaultProps.addFlag).toHaveBeenCalledTimes(0);
    });
  });

  it('should call onCreateTeamSuccess when creating team request succeeds but inviting members fails', async () => {
    resetFetchMock();
    mockCreateTeam(defaultProps.cloudId, defaultProps.product, 0);

    const { getByText } = await renderDialogAndTypeTeamName();

    act(() => {
      const btnStart = getByText('Start team');
      userEvent.click(btnStart);
    });

    await fetchMock.flush(true);

    await wait(
      () => {
        expect(triggerAnalyticsForCreateTeamSuccess).toHaveBeenCalled();
        expect(defaultProps.onCreateTeamSuccess).toHaveBeenCalledWith(
          testTeamData,
          testProposedMembersData,
        );
        expect(triggerAnalyticsForInviteMembersSuccess).not.toHaveBeenCalled();
        expect(defaultProps.addFlag).toHaveBeenCalledWith({
          title: expect.anything(),
          description: expect.anything(),
          appearance: 'success',
          id: 'create.team.success',
          actions: [
            {
              content: expect.anything(),
              // redirect to team page
              onClick: expect.anything(),
              href:
                '/wiki/people/team/76bec70a-8768-4b2b-b28f-6dfff8538f89?ref=confluence&src=peopleTeams',
            },
          ],
        });
      },
      {
        timeout: 5000,
      },
    );
  });
});

describe('onCreateTeamFailed', () => {
  it('should call onCreateTeamFailed when creating team request fails', async () => {
    const { getByText } = await renderDialogAndTypeTeamName();

    act(() => {
      const btnStart = getByText('Start team');
      userEvent.click(btnStart);
    });

    await fetchMock.flush(true);

    await wait(() => {
      expect(defaultProps.onCreateTeamFailed).toHaveBeenCalled();
      expect(triggerAnalyticsForCreateTeamFailed).toHaveBeenCalled();
      expect(defaultProps.addFlag).toHaveBeenCalledWith({
        title: expect.anything(),
        description: expect.anything(),
        appearance: 'error',
        id: 'create.team.failed',
      });
    });
  });
});

describe('onInviteMembersFailed', () => {
  it('should call onInviteMembersFailed when inviting members fails', async () => {
    mockCreateTeam(defaultProps.cloudId, defaultProps.product, 0);

    const { getByText } = await renderDialogAndTypeTeamName();

    act(() => {
      const btnStart = getByText('Start team');
      userEvent.click(btnStart);
    });

    await fetchMock.flush(true);

    await wait(() => {
      expect(defaultProps.onInviteMembersFailed).toHaveBeenCalled();
      expect(triggerAnalyticsForInviteMembersFailed).toHaveBeenCalled();
      expect(defaultProps.addFlag).toHaveBeenCalledWith({
        title: expect.anything(),
        description: expect.anything(),
        appearance: 'error',
        id: 'create.team.with.invite.failed',
      });
    });
  });
});
