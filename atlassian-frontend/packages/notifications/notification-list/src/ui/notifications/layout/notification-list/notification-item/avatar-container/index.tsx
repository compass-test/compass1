import React, { useMemo } from 'react';

import Avatar from '@atlaskit/avatar';
import { ProfileCardTrigger } from '@atlaskit/profilecard';

import {
  AvatarSkeleton,
  AvatarWrapper,
} from '../../../../../../common/ui/avatar-layout';
import { useProfileClient } from '../../../../../../common/ui/profile-client-context';

type Actor = {
  displayName?: string;
  ari?: string;
  avatarUrl: string;
};

type AvatarContainerProps = {
  actors: Actor[];
};

function AvatarContainer({ actors }: AvatarContainerProps) {
  const userId = useMemo(() => actors[0]?.ari?.split('/')[1], [actors]);
  const profileClient = useProfileClient();
  if (!actors.length) {
    return <AvatarSkeleton />;
  }
  return (
    <AvatarWrapper>
      <ProfileCardTrigger
        trigger="hover"
        userId={userId}
        resourceClient={profileClient}
      >
        <Avatar
          name={actors[0].displayName}
          appearance="circle"
          src={actors[0].avatarUrl}
          size="large"
        />
      </ProfileCardTrigger>
    </AvatarWrapper>
  );
}

export default AvatarContainer;
