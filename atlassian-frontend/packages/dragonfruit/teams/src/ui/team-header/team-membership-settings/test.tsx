import React from 'react';

import { render } from '@testing-library/react';

import { TeamMembershipSettings } from '@atlassian/dragonfruit-rest';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import TeamMembershipSettingsComponent from './main';
describe('<TeamMembershipSettings />', () => {
  describe('when membership settings not OPEN', () => {
    let membershipSettings: HTMLElement | null;

    const { getByTestId } = render(
      <CompassTestProvider>
        <TeamMembershipSettingsComponent
          testId="membership-test"
          membershipSettings={TeamMembershipSettings.ADMIN_INVITE}
        />
      </CompassTestProvider>,
    );
    membershipSettings = getByTestId('membership-test');

    it('should render invite-only component', () => {
      expect(membershipSettings).toBeInTheDocument();
    });
  });

  describe('when membership settings are OPEN', () => {
    let membershipSettings: HTMLElement | null;

    const { getByTestId } = render(
      <CompassTestProvider>
        <TeamMembershipSettingsComponent
          testId="membership-test"
          membershipSettings={TeamMembershipSettings.OPEN}
        />
      </CompassTestProvider>,
    );
    membershipSettings = getByTestId('membership-test');

    it('should not render invite-only component', () => {
      expect(membershipSettings).not.toBeInTheDocument();
    });
  });
});
