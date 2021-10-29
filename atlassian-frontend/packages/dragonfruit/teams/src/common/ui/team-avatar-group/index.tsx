import React from 'react';

import { di } from 'react-magnetic-di';

import { SizeType, Skeleton } from '@atlaskit/avatar';
import AvatarGroup, { AvatarProps } from '@atlaskit/avatar-group';
import { R300 } from '@atlaskit/theme/colors';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { TeamMember, useGetTeamMembers } from '@atlassian/dragonfruit-rest';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { SkeletonWrapper } from './styled';

type Props = {
  teamId: string;
  size?: SizeType;
  testId?: string;
};

const TeamAvatarGroup = (props: Props) => {
  di(useGetTeamMembers);

  const { teamId, size, testId } = props;
  const { formatMessage } = useIntl();
  const { data, isLoading, error } = useGetTeamMembers(teamId);

  if (isLoading) {
    return (
      <SkeletonWrapper>
        <Skeleton appearance="circle" size={size || 'medium'} />
      </SkeletonWrapper>
    );
  } else if (error) {
    const emptyData: AvatarProps[] = [
      {
        name: formatMessage(CommonMessages.error),
      },
    ];

    return (
      <AvatarGroup
        borderColor={R300}
        appearance="stack"
        size="medium"
        data={emptyData}
      />
    );
  } else if (data) {
    const avatarsData: AvatarProps[] = data.map((member: TeamMember) => {
      return {
        key: member.accountId,
        name: member.name,
        src: member.picture,
        testId: `avatar-${member.accountId}`,
      };
    });

    return (
      <AvatarGroup
        // avatar-group gets appeneded to this test id so we cut it short here at team
        testId={testId || 'dragonfruit.teams.component-owner.team'}
        appearance="stack"
        size={size || 'medium'}
        data={avatarsData}
      />
    );
  }
  return <div />;
};

export default TeamAvatarGroup;
