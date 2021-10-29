import React, { useState, useEffect } from 'react';
import fetchMock from 'fetch-mock/cjs/client';
import {
  getDefaultInviteFixtureForAllProducts,
  InviteResponseMode,
  InviteFixtureData,
} from './mockInviteServer';
import { InviteFixtureSettings } from './InviteFixtureSettings';
import { InviteFixtureSettingsProps } from './index';
import {
  mockInviteCapabilitiesResponse,
  mockInviteResponse,
  mockViralSettings,
} from './fetchMocks';

interface Props {
  initialInviteFixture?: InviteFixtureData;
  children: (props: {
    InviteFixtureSettings: typeof InviteFixtureSettings;
    inviteFixtureKey: string;
    inviteResponseMode: InviteResponseMode;
    inviteFixture: InviteFixtureData;
    innerProps: InviteFixtureSettingsProps;
  }) => React.ReactNode;
}

export const getFixtureKey = (settings: {
  inviteResponseMode: string;
  inviteFixture: InviteFixtureData;
}) =>
  [
    settings.inviteResponseMode,
    settings.inviteFixture
      .map(
        ({ capability, result }) => capability.slice(0, 1) + result.slice(0, 1),
      )
      .join(''),
  ].join('-');

export const InviteFixture: React.FC<Props> = ({
  initialInviteFixture = getDefaultInviteFixtureForAllProducts(),
  children,
}) => {
  const [inviteFixture, setInviteFixture] = React.useState(
    initialInviteFixture,
  );

  const [inviteResponseMode, setInviteResponseMode] = useState<
    InviteResponseMode
  >('use-capabilities');
  const [key, setKey] = React.useState('initial');

  useEffect(() => {
    mockInviteCapabilitiesResponse(inviteFixture);
    mockInviteResponse(inviteFixture, inviteResponseMode);

    // Guarantee UI refresh *after* mocks have been updated:
    setKey(getFixtureKey({ inviteResponseMode, inviteFixture }));
  }, [inviteResponseMode, inviteFixture]);

  useEffect(() => {
    mockViralSettings();
    return () => {
      fetchMock.done();
    };
  }, []);

  return (
    <div>
      {children({
        innerProps: {
          fixture: inviteFixture,
          onFixtureChange: setInviteFixture,
          inviteResponseMode,
          onInviteResponseModeChange: setInviteResponseMode,
        },
        InviteFixtureSettings,
        inviteFixtureKey: key,
        inviteResponseMode,
        inviteFixture,
      })}
    </div>
  );
};
