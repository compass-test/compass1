import React, { ReactElement } from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { DiProvider, injectable } from 'react-magnetic-di';

import {
  getMockCompassTeamMembersRest,
  GetTeamMembersMock,
  GetTeamMembersMockFailure,
  mockGetCompassTeamUsersDataFailure,
  mockGetCompassTeamUsersDataSuccess,
  TeamMember,
  TeamsMembershipResponse,
  useGetTeamMembers,
} from '@atlassian/dragonfruit-rest';
import {
  CompassTestProvider,
  fetchMockGet,
  MOCK_COMPASS_TEAM_ID,
} from '@atlassian/dragonfruit-testing';

import TeamMemberCard from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider locale="en">{storyFn()}</CompassTestProvider>
    ),
  ],
};

// accountIds are obtained through REST request
const mockCompassTeamMembersSuccess = () => {
  fetchMockGet<TeamsMembershipResponse>(getMockCompassTeamMembersRest());
};
GetTeamMembersMockFailure;

describe('TeamMemberCard', () => {
  describe('success team members loading success', () => {
    const useGetTeamMembersMock = injectable(
      useGetTeamMembers,
      GetTeamMembersMock,
    );
    const baseTestId = 'dragonfruit-teams.ui.team-member-card';
    const disclosureTestId = `${baseTestId}.disclosure`;

    test('should display team member card with proper test id', () => {
      mockCompassTeamMembersSuccess();
      const { getByTestId } = render(
        <DiProvider use={[useGetTeamMembersMock]}>
          <CompassTestProvider>
            <CompassTestProvider locale="en">
              <MockedProvider
                addTypename={false}
                mocks={[mockGetCompassTeamUsersDataSuccess]}
              >
                <TeamMemberCard teamId={MOCK_COMPASS_TEAM_ID} />
              </MockedProvider>
            </CompassTestProvider>
          </CompassTestProvider>
        </DiProvider>,
      );

      expect(getByTestId(disclosureTestId)).toBeInTheDocument();
      mockGetCompassTeamUsersDataSuccess.result.data.users.mockData.forEach(
        (member: TeamMember) => {
          expect(
            getByTestId(`${baseTestId}.content.${member.accountId}`),
          ).toBeInTheDocument();
        },
      );
    });
  });

  describe('error scenario', () => {
    test('should display error state if loading team fails', () => {
      const useGetTeamMembersMock = injectable(
        useGetTeamMembers,
        GetTeamMembersMockFailure,
      );
      const errorContentId = 'dragonfruit.teams-cards.error-state';
      const { getByTestId } = render(
        <DiProvider use={[useGetTeamMembersMock]}>
          <CompassTestProvider>
            <CompassTestProvider locale="en">
              <MockedProvider
                addTypename={false}
                mocks={[mockGetCompassTeamUsersDataFailure]}
              >
                <TeamMemberCard teamId={MOCK_COMPASS_TEAM_ID} />
              </MockedProvider>
            </CompassTestProvider>
          </CompassTestProvider>
        </DiProvider>,
      );

      expect(getByTestId(errorContentId)).toBeInTheDocument();
    });

    test('should display error state if loading team fails because of permissions', () => {
      const mockTeamById403 = () => {
        return {
          data: undefined,
          error: {
            name: 'error',
            message: 'message',
          },
          errorCode: 403,
          isLoading: false,
        };
      };
      const useGetTeamMembersMock = injectable(
        useGetTeamMembers,
        mockTeamById403,
      );
      const errorContentId = 'dragonfruit.teams-cards.error-state';
      const { getByTestId } = render(
        <DiProvider use={[useGetTeamMembersMock]}>
          <CompassTestProvider>
            <CompassTestProvider locale="en">
              <MockedProvider
                addTypename={false}
                mocks={[mockGetCompassTeamUsersDataFailure]}
              >
                <TeamMemberCard teamId={MOCK_COMPASS_TEAM_ID} />
              </MockedProvider>
            </CompassTestProvider>
          </CompassTestProvider>
        </DiProvider>,
      );

      expect(getByTestId(errorContentId)).toBeInTheDocument();
    });
  });
});
