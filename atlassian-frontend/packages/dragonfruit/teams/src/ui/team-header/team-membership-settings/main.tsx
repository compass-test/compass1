import React from 'react';

import LockFilledIcon from '@atlaskit/icon/glyph/lock-filled';
import Tooltip from '@atlaskit/tooltip';
import { TeamMembershipSettings } from '@atlassian/dragonfruit-rest';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { TeamMembershipSettingsWrapper } from './styled';

interface Props {
  membershipSettings?: TeamMembershipSettings;
  testId?: string;
}

const TeamMembership: React.FC<Props> = ({ membershipSettings, testId }) => {
  const { formatMessage } = useIntl();

  return membershipSettings !== TeamMembershipSettings.OPEN ? (
    <Tooltip content={formatMessage(messages.invitationOnlyTooltip)}>
      <TeamMembershipSettingsWrapper data-testid={testId}>
        <LockFilledIcon label="" size="small" />
        {formatMessage(messages.invitationOnly)}
      </TeamMembershipSettingsWrapper>
    </Tooltip>
  ) : null;
};

export default TeamMembership;
