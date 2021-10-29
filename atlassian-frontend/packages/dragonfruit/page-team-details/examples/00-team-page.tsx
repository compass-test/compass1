import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { DiProvider, injectable } from 'react-magnetic-di';

import {
  TeamHeader,
  TeamMemberCard,
  TeamMemberCardSuccess,
} from '@atlassian/dragonfruit-teams';
import { TeamHeaderSuccess } from '@atlassian/dragonfruit-teams/mocks';
import {
  CompassTestProvider,
  MOCK_COMPASS_TEAM_ID,
} from '@atlassian/dragonfruit-testing';
import { CompassIntlProvider } from '@atlassian/dragonfruit-utils';

import { TeamDashboard } from '../src/ui/team-dashboard';

export default function TeamDashboardPage() {
  // @ts-ignore
  const TeamHeaderDi = injectable(TeamHeader, TeamHeaderSuccess);
  const TeamMemberCardDi = injectable(TeamMemberCard, TeamMemberCardSuccess);

  return (
    <CompassIntlProvider locale="en">
      <CompassTestProvider>
        <DiProvider use={[TeamHeaderDi, TeamMemberCardDi]}>
          <MockedProvider addTypename={false}>
            <TeamDashboard teamId={MOCK_COMPASS_TEAM_ID} />
          </MockedProvider>
        </DiProvider>
      </CompassTestProvider>
    </CompassIntlProvider>
  );
}
