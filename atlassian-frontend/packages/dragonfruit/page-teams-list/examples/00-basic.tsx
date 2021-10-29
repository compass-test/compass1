import React from 'react';

import {
  mockGetTeamsSuccess,
  TeamsSearchResponse,
} from '@atlassian/dragonfruit-rest';
import {
  CompassTestProvider,
  fetchMockGet,
} from '@atlassian/dragonfruit-testing';

import { PageTeamsList } from '../src';

export default function Basic() {
  fetchMockGet<TeamsSearchResponse>(mockGetTeamsSuccess());

  return (
    <CompassTestProvider>
      <PageTeamsList testId="page-teams-list" />
    </CompassTestProvider>
  );
}
