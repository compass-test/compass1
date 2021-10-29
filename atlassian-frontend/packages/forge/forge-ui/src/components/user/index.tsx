/** @jsx jsx */
import ApolloClient from 'apollo-client';
import React from 'react';
import { css, jsx } from '@emotion/core';
import { UserProps } from '@atlassian/forge-ui-types';
import { useUser } from '../../web-client/hooks/useUser';
import { Props } from '..';
import { useInlineContext } from '../../context/inline';
import { RenderFn } from '../../renderer/RendererNext';

const AKAvatar = React.lazy(() => import('@atlaskit/avatar'));
const AKBadge = React.lazy(() => import('@atlaskit/badge'));
const AKAvatarItem = React.lazy(() =>
  import('@atlaskit/avatar').then((module) => ({
    default: module.AvatarItem,
  })),
);

interface Dependencies {
  client: ApolloClient<any> | undefined;
}

function Avatar({ name, picture }: { name: string; picture: string }) {
  return (
    <div
      // Reduce Atlaskit padding to vertically-align with other components
      css={css`
        > span {
          padding-left: 0;
          background-color: transparent;
          cursor: default;
        }
      `}
    >
      <AKAvatarItem
        avatar={<AKAvatar name={name} src={picture} />}
        primaryText={name}
      />
    </div>
  );
}

function UserInline({ name }: { name?: string }) {
  return <AKBadge appearance="primary">{name || 'Unknown User'}</AKBadge>;
}

export default function User({ accountId, client }: UserProps & Dependencies) {
  const { picture, name } = useUser(accountId, client);
  const { inline } = useInlineContext();

  if (inline) {
    return <UserInline name={name} />;
  }
  return <Avatar name={name} picture={picture} />;
}

export function UserFn({ props }: Props) {
  const { accountId } = props as UserProps;
  return <User accountId={accountId} client={undefined} />;
}

// new approach requires ApolloClient as a prop
export function makeUser({ client }: Dependencies): RenderFn {
  return function UserFnNext({ forgeDoc: { props } }) {
    const { accountId } = props as UserProps;
    return <User accountId={accountId} client={client} />;
  };
}
