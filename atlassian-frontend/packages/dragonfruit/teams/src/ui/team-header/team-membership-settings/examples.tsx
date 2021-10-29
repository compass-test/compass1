import React from 'react';

import { TeamMembershipSettings } from '@atlassian/dragonfruit-rest';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import TeamMembershipSettingsComponent from './main';

export const TeamMembershipSettingsExample = () => {
  return (
    <CompassTestProvider>
      <TeamMembershipSettingsComponent
        membershipSettings={TeamMembershipSettings.ADMIN_INVITE}
      />
    </CompassTestProvider>
  );
};
