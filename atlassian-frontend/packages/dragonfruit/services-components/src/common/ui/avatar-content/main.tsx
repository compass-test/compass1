import React from 'react';

import Avatar from '@atlaskit/avatar';
import {
  AvatarContentAction,
  TextOverflowWrapper,
} from '@atlassian/dragonfruit-common-ui';

type AvatarContentProps = {
  avatarUrl?: string;
  avatar?: React.ReactNode;
  children: React.ReactNode;
};

export function AvatarContent(props: AvatarContentProps) {
  return (
    <AvatarContentAction
      avatar={
        <Avatar
          size="small"
          appearance="circle"
          {...(props.avatarUrl && { src: props.avatarUrl })}
          {...(props.avatar && { children: () => props.avatar })}
        />
      }
    >
      <TextOverflowWrapper>{props.children}</TextOverflowWrapper>
    </AvatarContentAction>
  );
}
