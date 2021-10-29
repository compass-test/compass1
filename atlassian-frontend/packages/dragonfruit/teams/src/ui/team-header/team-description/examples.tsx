import React from 'react';

import { text } from '@storybook/addon-knobs';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import TeamDescription from './main';

export const TeamMembershipSettingsExample = () => {
  const description = text('description', '');
  const teamId = text('team ID', 'ari:cloud:teams::team/mock-team-id');

  return (
    <CompassTestProvider>
      <TeamDescription description={description} teamId={teamId} />
    </CompassTestProvider>
  );
};
