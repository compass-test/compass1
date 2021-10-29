import React, { ReactElement } from 'react';

import { MockCompassRecentsProvider } from '@atlassian/compass-search-cache';
import {
  fetchMockGet,
  MOCK_COMPASS_TEAM_ID,
  RestMock,
} from '@atlassian/dragonfruit-testing';
import { CompassIntlProvider } from '@atlassian/dragonfruit-utils';

import TeamHeader from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassIntlProvider locale="en">
        <MockCompassRecentsProvider>{storyFn()}</MockCompassRecentsProvider>
      </CompassIntlProvider>
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

export const TeamHeaderSuccess = () => {
  mockCompassTeamRestCall();

  return <TeamHeader teamId={MOCK_COMPASS_TEAM_ID} inline />;
};
