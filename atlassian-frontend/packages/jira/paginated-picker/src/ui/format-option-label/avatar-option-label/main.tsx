import React from 'react';

import Avatar from '@atlaskit/avatar';

import type { AvatarOption } from '../../../common/types';
import { StyledChild, StyledOption } from '../../../common/ui/styled';

interface Props {
  avatarOption: AvatarOption;
}

export const AvatarOptionLabel = ({ avatarOption }: Props) => (
  <StyledOption>
    <Avatar
      src={
        typeof avatarOption.avatar !== 'string'
          ? undefined
          : avatarOption.avatar
      }
      size="xsmall"
      appearance={
        typeof avatarOption.square === 'boolean' && avatarOption.square
          ? 'square'
          : 'circle'
      }
    />
    <StyledChild>{avatarOption.label}</StyledChild>
  </StyledOption>
);
