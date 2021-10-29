import React, { ReactElement } from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { DiProvider, injectable } from 'react-magnetic-di';

import { mockDataManager } from '@atlassian/dragonfruit-external-component-management';
import {
  CompassTestProvider,
  fetchMockGet,
  MOCK_COMPASS_TEAM_ID,
  RestMock,
} from '@atlassian/dragonfruit-testing';
import { CompassIntlProvider } from '@atlassian/dragonfruit-utils';

import TeamAvatarGroup from '../../../common/ui/team-avatar-group';
import { TeamCompassAvatarsSuccess } from '../../../common/ui/team-avatar-group/examples';

import ComponentOwnerHeader from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <MockedProvider>
        <CompassIntlProvider locale="en">{storyFn()}</CompassIntlProvider>
      </MockedProvider>
    ),
  ],
};

const mockCompassTeamRest: RestMock = {
  request: {
    url: `/gateway/api/v3/teams/${MOCK_COMPASS_TEAM_ID}`,
  },
  result: {
    id: `ari:cloud:teams::team/${MOCK_COMPASS_TEAM_ID}`,
    displayName: 'Compass team',
    smallAvatarImageUrl:
      'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/teams/avatars/2.svg',
  },
  delay: 100,
};

const mockCompassTeamRestCall = () => {
  fetchMockGet(mockCompassTeamRest);
};

export const ComponentOwnerHeaderSuccess = () => {
  mockCompassTeamRestCall();

  const TeamAvatarGroupDi = injectable(
    TeamAvatarGroup,
    // @ts-ignore
    TeamCompassAvatarsSuccess,
  );

  return (
    <CompassTestProvider locale="en">
      <DiProvider use={[TeamAvatarGroupDi]}>
        <ComponentOwnerHeader
          teamId={MOCK_COMPASS_TEAM_ID}
          componentId={'testId'}
        />
      </DiProvider>
    </CompassTestProvider>
  );
};

export const ComponentOwnerHeaderSuccessDisabled = () => {
  mockCompassTeamRestCall();

  const TeamAvatarGroupDi = injectable(
    TeamAvatarGroup,
    // @ts-ignore
    TeamCompassAvatarsSuccess,
  );

  return (
    <CompassTestProvider locale="en">
      <DiProvider use={[TeamAvatarGroupDi]}>
        <ComponentOwnerHeader
          teamId={MOCK_COMPASS_TEAM_ID}
          componentId={'testId'}
          dataManager={mockDataManager}
        />
      </DiProvider>
    </CompassTestProvider>
  );
};
