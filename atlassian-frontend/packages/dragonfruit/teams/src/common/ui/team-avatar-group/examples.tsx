import React, { ReactElement } from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { DiProvider, injectable } from 'react-magnetic-di';

import {
  getMockCompassTeamMembersRest,
  GetTeamMembersMock,
  mockGetCompassTeamUsersDataSuccess,
  TeamsMembershipResponse,
  useGetTeamMembers,
} from '@atlassian/dragonfruit-rest';
import {
  CompassTestProvider,
  fetchMockGet,
  MOCK_COMPASS_TEAM_ID,
} from '@atlassian/dragonfruit-testing';
import { CompassIntlProvider } from '@atlassian/dragonfruit-utils';

import TeamAvatarGroup from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassIntlProvider locale="en">{storyFn()}</CompassIntlProvider>
    ),
  ],
};

export const TeamCompassAvatarsFailure = () => {
  fetchMockGet<TeamsMembershipResponse>(getMockCompassTeamMembersRest());

  return (
    <MockedProvider>
      <TeamAvatarGroup teamId={MOCK_COMPASS_TEAM_ID} />
    </MockedProvider>
  );
};

const mockCompassTeamMembersSuccess = () => {
  fetchMockGet<TeamsMembershipResponse>(getMockCompassTeamMembersRest());
};

const useGetTeamMembersMock = injectable(useGetTeamMembers, GetTeamMembersMock);

export const TeamCompassAvatarsSuccess = () => {
  mockCompassTeamMembersSuccess();

  return (
    <DiProvider use={[useGetTeamMembersMock]}>
      <CompassTestProvider>
        <CompassIntlProvider locale="en">
          <MockedProvider
            addTypename={false}
            mocks={[mockGetCompassTeamUsersDataSuccess]}
          >
            <TeamAvatarGroup teamId={MOCK_COMPASS_TEAM_ID} />
          </MockedProvider>
        </CompassIntlProvider>
      </CompassTestProvider>
    </DiProvider>
  );
};
