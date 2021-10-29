import React from 'react';

import Avatar from '@atlaskit/avatar';
import {
  CloudIcon,
  TeamPlaceholderIcon,
} from '@atlassian/dragonfruit-common-ui/assets';
import { ComponentTypeIcon } from '@atlassian/dragonfruit-components';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import {
  ComponentDisplay,
  LabelText,
  ManagedExternallyIndicator,
  NoOwnerIndicator,
  Option,
  PlaceholderTeamIcon,
  PlaceholderTeamName,
  TeamDisplay,
  TruncatedLabelText,
} from './styled';
import { ComponentOption } from './types';

interface Props {
  option: ComponentOption;
  isOwnerTeamLoaded: boolean | undefined | null | '';
}

export const ComponentOptionLabel: React.FC<Props> = ({
  option,
  isOwnerTeamLoaded,
}) => {
  const { label, type, isManaged, teamName, teamAvatarUrl } = option;

  const { formatMessage } = useIntl();

  return (
    <Option>
      <ComponentDisplay>
        <ComponentTypeIcon type={type} size="medium" />
        <TruncatedLabelText>{label}</TruncatedLabelText>
        {isManaged && (
          <ManagedExternallyIndicator>
            <img src={CloudIcon} alt="" />
            <LabelText>{formatMessage(messages.managedExternally)}</LabelText>
          </ManagedExternallyIndicator>
        )}
      </ComponentDisplay>

      {!isOwnerTeamLoaded && (
        <TeamDisplay data-testid="team-component-picker-modal-option-placeholder">
          <PlaceholderTeamIcon>
            <img src={TeamPlaceholderIcon} alt="" />
          </PlaceholderTeamIcon>
          <PlaceholderTeamName />
        </TeamDisplay>
      )}
      {teamName && (
        <TeamDisplay>
          <Avatar
            appearance="circle"
            src={teamAvatarUrl || undefined}
            size="xsmall"
            name={teamName}
          />
          <TruncatedLabelText>{teamName}</TruncatedLabelText>
        </TeamDisplay>
      )}

      {isOwnerTeamLoaded && !teamName && (
        <NoOwnerIndicator>{formatMessage(messages.noOwner)}</NoOwnerIndicator>
      )}
    </Option>
  );
};
