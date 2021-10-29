import React from 'react';

import { render } from '@testing-library/react';
import { DiProvider, injectable } from 'react-magnetic-di';

import {
  GetTeamMembersMock,
  useGetTeamMembers,
} from '@atlassian/dragonfruit-rest';
import {
  CompassTestProvider,
  MOCK_COMPASS_TEAM_ID,
} from '@atlassian/dragonfruit-testing';

import TeamAvatarGroup from './index';

describe('TeamAvatarGroup', () => {
  const useGetTeamMembersMock = injectable(
    useGetTeamMembers,
    GetTeamMembersMock,
  );

  it('should display avatar group with proper test id', async () => {
    const groupBaseTestId = 'dragonfruit.teams.component-owner.team';
    const avatarId = `${groupBaseTestId}--avatar-0`;
    const avatar1Id = `${groupBaseTestId}--avatar-1`;
    const avatar2Id = `${groupBaseTestId}--avatar-2`;
    const avatar3Id = `${groupBaseTestId}--avatar-3`;
    const groupId = `${groupBaseTestId}--avatar-group`;

    const { getByTestId } = render(
      <DiProvider use={[useGetTeamMembersMock]}>
        <CompassTestProvider locale="en">
          <TeamAvatarGroup teamId={MOCK_COMPASS_TEAM_ID} />
        </CompassTestProvider>
      </DiProvider>,
    );
    expect(getByTestId(groupId)).toBeInTheDocument();
    expect(getByTestId(avatarId)).toBeInTheDocument();
    expect(getByTestId(avatar1Id)).toBeInTheDocument();
    expect(getByTestId(avatar2Id)).toBeInTheDocument();
    expect(getByTestId(avatar3Id)).toBeInTheDocument();
  });
});
