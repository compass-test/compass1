import React, { memo, ReactNode } from 'react';

import AvatarGroup, { AvatarProps } from '@atlaskit/avatar-group';

import type { CollabParticipant } from '../../common/types';

import { Container } from './styled';
import toAvatar from './utils';

interface Props {
  participants: CollabParticipant[] | null;
  sessionId: string | null;
  children?: ReactNode;
  testId?: string;
}

export const PresenceAvatarGroup: React.ComponentType<Props> = memo(
  ({ sessionId, participants, testId, children }: Props) => {
    if (!participants) {
      return null;
    }

    const avatars = participants
      .sort(p => (p.sessionId === sessionId ? -1 : 1))
      .map(toAvatar);

    if (!avatars.length) {
      return null;
    }

    return (
      <Container data-testid={testId}>
        <AvatarGroup
          appearance="stack"
          size="medium"
          data={avatars}
          overrides={{
            Avatar: {
              render: (
                Component: React.ElementType<AvatarProps>,
                avatarProps: AvatarProps,
                index: number,
              ) => (
                <Component
                  {...avatarProps}
                  key={index}
                  borderColor={avatars[index].borderColor}
                />
              ),
            },
          }}
        />
        {children}
      </Container>
    );
  },
);
