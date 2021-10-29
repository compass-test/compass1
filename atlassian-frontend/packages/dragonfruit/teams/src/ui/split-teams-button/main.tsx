import React, { MutableRefObject } from 'react';

import { Link, useRouter } from 'react-resource-router';

import {
  PrimaryButton,
  PrimaryDropdownButton,
} from '@atlaskit/atlassian-navigation';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { routes } from '@atlassian/dragonfruit-routes';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { TeamButtonsContainer, VerticalSeparator } from './styled';
import { SplitButtonProps } from './types';
export const SplitTeamsButton = (props: SplitButtonProps) => {
  const { formatMessage } = useIntl();
  const [{ match }] = useRouter();
  const { triggerProps, dropdownButtonProps, linkButtonProps } = props;
  const isTeamsHighlighted = match.path === routes.TEAMS();

  return (
    <TeamButtonsContainer
      innerRef={triggerProps.ref as MutableRefObject<HTMLDivElement>}
      isOpen={dropdownButtonProps.isSelected}
      isTeamsPath={isTeamsHighlighted}
    >
      <PrimaryButton
        href={routes.TEAMS()}
        component={Link}
        {...linkButtonProps}
        isHighlighted={isTeamsHighlighted}
        testId="dragonfruit.team.link-button"
        id="team-button"
      >
        {formatMessage(CommonMessages.teams)}
      </PrimaryButton>
      <VerticalSeparator />
      <PrimaryDropdownButton
        {...dropdownButtonProps}
        {...triggerProps}
        testId="dragonfruit.team.dropdown-button"
        id="team-dropdown-button"
      ></PrimaryDropdownButton>
    </TeamButtonsContainer>
  );
};
