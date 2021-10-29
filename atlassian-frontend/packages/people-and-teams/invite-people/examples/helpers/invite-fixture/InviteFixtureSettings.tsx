import React from 'react';
import { InviteResponseMode, InviteFixtureData } from './mockInviteServer';
import { InviteFixtureCapabilities } from './InviteFixtureCapabilities';
import { RadioGroup } from '@atlaskit/radio';
import { inviteResponseModeOptions } from '../uiOptions';
import * as colors from '@atlaskit/theme/colors';

export interface Props {
  fixture: InviteFixtureData;
  onFixtureChange: (fixture: InviteFixtureData) => void;
  inviteResponseMode: InviteResponseMode;
  onInviteResponseModeChange: (mode: InviteResponseMode) => void;
}

export const InviteFixtureSettings: React.FC<Props> = (props) => {
  return (
    <div>
      <InviteFixtureCapabilities
        value={props.fixture}
        onChange={props.onFixtureChange}
      />
      <p>When inviting&hellip;</p>
      <RadioGroup
        options={inviteResponseModeOptions}
        onChange={(e) =>
          props.onInviteResponseModeChange(
            e.currentTarget.value as InviteResponseMode,
          )
        }
        value={props.inviteResponseMode}
      />
      <p style={{ color: colors.subtleText() }}>
        Hint: 'error' in an email forces an error for that user
      </p>
    </div>
  );
};
