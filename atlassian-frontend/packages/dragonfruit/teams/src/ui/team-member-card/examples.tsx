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

import TeamMemberCard from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassIntlProvider locale="en">{storyFn()}</CompassIntlProvider>
    ),
  ],
};

// accountIds are obtained through REST request
const mockCompassTeamMembersSuccess = () => {
  fetchMockGet<TeamsMembershipResponse>(getMockCompassTeamMembersRest());
};

const useGetTeamMembersMock = injectable(useGetTeamMembers, GetTeamMembersMock);

export const TeamMemberCardSuccess = () => {
  mockCompassTeamMembersSuccess();
  // MockedProvider from apollo: apollo::useLazyQuery is used to get user information
  return (
    <DiProvider use={[useGetTeamMembersMock]}>
      <CompassTestProvider>
        <CompassIntlProvider locale="en">
          <MockedProvider
            addTypename={false}
            mocks={[mockGetCompassTeamUsersDataSuccess]}
          >
            <TeamMemberCard teamId={MOCK_COMPASS_TEAM_ID} />
          </MockedProvider>
        </CompassIntlProvider>
      </CompassTestProvider>
    </DiProvider>
  );
};
