import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { createDefaultExport } from '@atlassian/aux-test-utils';
import UserGroup from '.';
import { mockUser } from '../../storybook-utils';
import { usersQuery } from '../../web-client/hooks/useUser';
import { InlineContext } from '../../context/inline';

export default createDefaultExport();

function randomId() {
  return Math.random().toString(20);
}

function randomIds(n: number) {
  return Array.from({ length: n }, randomId);
}

const mockClient = createMockClient();
mockClient.setRequestHandler(
  usersQuery,
  async ({ accountIds }: { accountIds: string[] }) => {
    return {
      data: {
        users: accountIds.map((accountId) => mockUser(accountId)),
      },
    };
  },
);

export function Basic() {
  return (
    <ApolloProvider client={mockClient}>
      <UserGroup accountIds={randomIds(3)} client={undefined} />
      <InlineContext.Provider value={{ inline: true }}>
        <UserGroup accountIds={randomIds(3)} client={undefined} /> are editing
      </InlineContext.Provider>
    </ApolloProvider>
  );
}

export function Many() {
  return (
    <ApolloProvider client={mockClient}>
      <UserGroup accountIds={randomIds(40)} client={undefined} />
      <InlineContext.Provider value={{ inline: true }}>
        <UserGroup accountIds={randomIds(40)} client={undefined} /> are editing
      </InlineContext.Provider>
    </ApolloProvider>
  );
}

export function NoProvider() {
  return (
    <ApolloProvider client={createMockClient()}>
      <UserGroup accountIds={randomIds(10)} client={undefined} />
      <InlineContext.Provider value={{ inline: true }}>
        <UserGroup accountIds={randomIds(10)} client={undefined} /> are editing
      </InlineContext.Provider>
    </ApolloProvider>
  );
}
