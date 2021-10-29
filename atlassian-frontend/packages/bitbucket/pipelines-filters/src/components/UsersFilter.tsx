import React from 'react';

import AvatarGroup from '@atlaskit/avatar-group';
import * as colors from '@atlaskit/theme/colors';

import { UserFilterProps } from '../types';

import { UsersFilterWrapper } from './styled';

const MAX_AVATAR_COUNT = 1;

const emptyData = Array(MAX_AVATAR_COUNT).fill({});

export const UsersEmptyState = () => {
  return (
    <UsersFilterWrapper>
      <AvatarGroup
        appearance="stack"
        maxCount={MAX_AVATAR_COUNT}
        data={emptyData}
      />
    </UsersFilterWrapper>
  );
};

export const UsersFilter = ({
  users,
  selectedUser,
  onUserAvatarClick,
}: UserFilterProps) => {
  const onAvatarClick = (e: any, a: any, index: number) => {
    const uuid = users[index].uuid;
    onUserAvatarClick(uuid);
  };

  return (
    <UsersFilterWrapper>
      <AvatarGroup
        data={users.map((user) => ({
          name: user.displayName,
          uuid: user.uuid,
          src: user.avatarUrl,
        }))}
        onAvatarClick={onAvatarClick}
        overrides={{
          Avatar: {
            render: (Component, props, index) => {
              const isSelectedUser =
                selectedUser && selectedUser === (props as any).uuid;
              return (
                <Component
                  {...{
                    ...props,
                    ...(isSelectedUser ? { borderColor: colors.B300 } : {}),
                  }}
                  key={`avatarItem-${index}`}
                />
              );
            },
          },
        }}
      />
    </UsersFilterWrapper>
  );
};
