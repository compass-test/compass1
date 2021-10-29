import React from 'react';
import { useUsers, UserData } from '../../web-client/hooks/useUser';
import { UserProps } from '@atlassian/forge-ui-types';
import { Props } from '..';
import ApolloClient from 'apollo-client';

import { RenderFn } from '../../renderer/RendererNext';
import { useInlineContext } from '../../context/inline';

const AKAvatarGroup = React.lazy(() => import('@atlaskit/avatar-group'));
const AKBadge = React.lazy(() => import('@atlaskit/badge'));

type AKAGData = { key: string; name: string; src: string };
export function usersToAKAGData(
  users: Record<string, UserData>,
  accountIds: string[],
): AKAGData[] {
  // order should match accountIds
  return accountIds.map((key, i) => {
    const { name = `Unknown User`, picture = '' } = users[key] || {};
    return { key, name, src: picture };
  });
}

export function AvatarStack({ data }: { data: AKAGData[] }) {
  return <AKAvatarGroup appearance="stack" data={data} />;
}

function More({ data }: { data: AKAGData[] }) {
  return <AKBadge>{`+${data.length}`}</AKBadge>;
}

export function UserGroupInline({ data }: { data: AKAGData[] }) {
  const end = Math.max(Math.min(8, data.length), 0); // 4 would be the same as AvatarStack
  const shown = data.slice(0, end);
  const more = data.slice(end);
  const hasMore = more.length > 0;

  return (
    <span>
      {shown.map(({ name }: AKAGData, i) => {
        return (
          <>
            <AKBadge appearance="primary">{name}</AKBadge>
            {hasMore || i !== end - 1 ? ' ' : null}
          </>
        );
      })}
      {hasMore ? <More data={more} /> : null}
    </span>
  );
}

type Dependencies = {
  client: ApolloClient<any> | undefined;
};

export default function UserGroup({
  accountIds,
  client,
}: { accountIds: string[] } & Dependencies) {
  const users = useUsers(accountIds, client);
  const data = usersToAKAGData(users, accountIds);
  const { inline } = useInlineContext();

  if (inline) {
    return <UserGroupInline data={data} />;
  }

  return <AvatarStack data={data} />;
}

export function UserGroupFn({ children }: Props) {
  const accountIds = children
    .map((child) => {
      if (child.type !== 'User' && child.type !== 'Avatar') {
        return '';
      }

      const { props } = child;
      const { accountId } = props as UserProps;
      return accountId;
    })
    .filter((x) => x);

  return <UserGroup accountIds={accountIds} client={undefined} />;
}

// New-style component requires ApolloClient as a prop to make a function
// Avatar doesn't use `dispatch` so no upgrading/downgrading required
export function makeUserGroup({ client }: Dependencies): RenderFn {
  return function avatarStackNext({ forgeDoc: { props, children } }) {
    const accountIds = children
      .map((child) => {
        if (child.type !== 'User' && child.type !== 'Avatar') {
          return '';
        }

        const { props } = child;
        const { accountId } = props as UserProps;
        return accountId;
      })
      .filter((x) => x);

    return <UserGroup accountIds={accountIds} client={client} />;
  };
}
