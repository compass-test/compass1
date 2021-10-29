import React from 'react';

import Avatar from '@atlaskit/avatar';

import { RowWrapper, StyledLink } from './styled';

type TeamMemberCardProps = {
  accountId: string;
  picture: string;
  name: string;
};

const MemberRow: React.FC<TeamMemberCardProps> = ({
  accountId,
  picture,
  name,
}) => {
  return (
    <RowWrapper
      key={accountId}
      data-testid={`dragonfruit-teams.ui.team-member-card.content.${accountId}`}
    >
      <Avatar src={picture} appearance="circle" size="small" />
      <StyledLink
        target="_blank"
        href={`${window.location.origin}/people/${accountId}`}
      >
        {name}
      </StyledLink>
    </RowWrapper>
  );
};

export default MemberRow;
