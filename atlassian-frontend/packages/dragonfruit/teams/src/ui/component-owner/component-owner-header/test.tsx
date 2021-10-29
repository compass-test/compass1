import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { within } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { DiProvider, injectable } from 'react-magnetic-di';

import { mockDataManager } from '@atlassian/dragonfruit-external-component-management';
import { CONFIG_AS_CODE_FILE_NAME } from '@atlassian/dragonfruit-external-component-management/constants';
import {
  GetTeamMembersMock,
  mockGetCompassTeamUsersDataFailure404,
  mockGetCompassTeamUsersDataFailure410,
  mockGetCompassTeamUsersDataSuccess,
  useGetTeamMembers,
  useTeamService,
} from '@atlassian/dragonfruit-rest';
import {
  CompassTestProvider,
  MOCK_COMPASS_TEAM_ID,
} from '@atlassian/dragonfruit-testing';

import ComponentOwnerHeader from './index';

describe('ComponentOwnerHeader', () => {
  const MOCK_SERVICE_OWNERS_RESULT = {
    id: `ari:cloud:teams::team/${MOCK_COMPASS_TEAM_ID}`,
    displayName: 'Compass Crux',
    description: 'Great team',
    organizationId: 'orgId',
    smallAvatarImageUrl: 'http://placehold.it/24x24',
    largeAvatarImageUrl: 'http://placehold.it/24x24',
    smallHeaderImageUrl: 'http://placehold.it/24x24',
    largeHeaderImageUrl: 'http://placehold.it/24x24',
    permission: 'permission',
    restriction: 'restriction',
    state: 'state',
  };

  const mockTeamById = () => {
    return {
      data: MOCK_SERVICE_OWNERS_RESULT,
      error: undefined,
      loading: false,
    };
  };

  const useGetTeamMembersMock = injectable(
    useGetTeamMembers,
    GetTeamMembersMock,
  );

  const useTeamServiceMock = injectable(useTeamService, mockTeamById);

  it('should display avatar group and dropdown menu with proper test id & options', async () => {
    //mockCompassTeamMembersSuccess();
    const { getByTestId, getByText, findByText } = render(
      <DiProvider use={[useGetTeamMembersMock, useTeamServiceMock]}>
        <CompassTestProvider locale="en">
          <MockedProvider
            addTypename={false}
            mocks={[mockGetCompassTeamUsersDataSuccess]}
          >
            <ComponentOwnerHeader
              teamId={MOCK_COMPASS_TEAM_ID}
              componentId={'testId'}
            />
          </MockedProvider>
        </CompassTestProvider>
      </DiProvider>,
    );
    expect(
      getByTestId('dragonfruit.teams.component-owner.team--avatar-group'),
    ).toBeInTheDocument();
    expect(
      getByText(MOCK_SERVICE_OWNERS_RESULT.displayName),
    ).toBeInTheDocument();
    const actionsWrapper = getByTestId(
      `dragonfruit-teams.ui.component-owner-card.actions-wrapper-${MOCK_COMPASS_TEAM_ID}`,
    );
    expect(actionsWrapper).toBeInTheDocument();
    within(actionsWrapper).getByRole('button').click();

    expect(await findByText('Edit owner')).toBeInTheDocument();
    expect(await findByText('Remove owner')).toBeInTheDocument();
  });

  it('should display avatar group and action to edit in external source when there is a data manager', async () => {
    //mockCompassTeamMembersSuccess();
    const { getByTestId, getByText, findByText } = render(
      <DiProvider use={[useGetTeamMembersMock, useTeamServiceMock]}>
        <CompassTestProvider locale="en">
          <MockedProvider
            addTypename={false}
            mocks={[mockGetCompassTeamUsersDataSuccess]}
          >
            <ComponentOwnerHeader
              teamId={MOCK_COMPASS_TEAM_ID}
              componentId={'testId'}
              dataManager={mockDataManager}
            />
          </MockedProvider>
        </CompassTestProvider>
      </DiProvider>,
    );
    expect(
      getByTestId('dragonfruit.teams.component-owner.team--avatar-group'),
    ).toBeInTheDocument();
    expect(
      getByText(MOCK_SERVICE_OWNERS_RESULT.displayName),
    ).toBeInTheDocument();
    const actionsWrapper = getByTestId(
      `dragonfruit-teams.ui.component-owner-card.actions-wrapper-${MOCK_COMPASS_TEAM_ID}`,
    );
    expect(actionsWrapper).toBeInTheDocument();
    within(actionsWrapper).getByRole('button').click();

    expect(
      await findByText(`Change owner team in ${CONFIG_AS_CODE_FILE_NAME}`),
    ).toBeInTheDocument();
  });
});

describe('ComponentOwnerHeader Errors', () => {
  const mockTeamById = () => {
    return {
      data: undefined,
      error: {
        statusCode: 404,
      },
      loading: false,
    };
  };

  const useGetTeamMembersMock = injectable(
    useGetTeamMembers,
    GetTeamMembersMock,
  );

  const useTeamServiceMock = injectable(useTeamService, mockTeamById);

  it('should display empty state when team service returns 404', async () => {
    const { getByTestId } = render(
      <DiProvider use={[useGetTeamMembersMock, useTeamServiceMock]}>
        <CompassTestProvider locale="en">
          <MockedProvider
            addTypename={false}
            mocks={[mockGetCompassTeamUsersDataFailure404]}
          >
            <ComponentOwnerHeader
              teamId={MOCK_COMPASS_TEAM_ID}
              componentId={'testId'}
            />
          </MockedProvider>
        </CompassTestProvider>
      </DiProvider>,
    );

    expect(
      getByTestId('dragonfruit.teams.component-owner-empty-state'),
    ).toBeInTheDocument();
  });

  it('should display empty state when team service returns 410', async () => {
    const { getByTestId } = render(
      <DiProvider use={[useGetTeamMembersMock, useTeamServiceMock]}>
        <CompassTestProvider locale="en">
          <MockedProvider
            addTypename={false}
            mocks={[mockGetCompassTeamUsersDataFailure410]}
          >
            <ComponentOwnerHeader
              teamId={MOCK_COMPASS_TEAM_ID}
              componentId={'testId'}
            />
          </MockedProvider>
        </CompassTestProvider>
      </DiProvider>,
    );

    expect(
      getByTestId('dragonfruit.teams.component-owner-empty-state'),
    ).toBeInTheDocument();
  });

  it('should display error state when team service returns 403', async () => {
    const mockTeamById403 = () => {
      return {
        data: undefined,
        error: {
          statusCode: 403,
        },
        loading: false,
      };
    };
    const useTeamServiceMock403 = injectable(useTeamService, mockTeamById403);

    const { getByText } = render(
      <DiProvider use={[useGetTeamMembersMock, useTeamServiceMock403]}>
        <CompassTestProvider locale="en">
          <MockedProvider
            addTypename={false}
            mocks={[mockGetCompassTeamUsersDataSuccess]}
          >
            <ComponentOwnerHeader
              teamId={MOCK_COMPASS_TEAM_ID}
              componentId={'testId'}
            />
          </MockedProvider>
        </CompassTestProvider>
      </DiProvider>,
    );

    expect(
      getByText(
        'Unable to load team because it exists in a different organization.',
      ),
    ).toBeInTheDocument();
  });
});
