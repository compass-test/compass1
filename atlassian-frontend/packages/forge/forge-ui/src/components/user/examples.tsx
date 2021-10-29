import React from 'react';
import User from './index';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { createDefaultExport } from '@atlassian/aux-test-utils';
import { mockUser } from '../../storybook-utils';
import { userQuery } from '../../web-client/hooks/useUser';
import { InlineContext } from '../../context/inline';

export default createDefaultExport();

function randomId() {
  return Math.random().toString(20);
}

const mockClient = createMockClient();
mockClient.setRequestHandler(
  userQuery,
  async ({ accountId }: { accountId: string }) => {
    return {
      data: {
        user: mockUser(accountId),
      },
    };
  },
);

export function Basic() {
  return (
    <ApolloProvider client={mockClient}>
      <User accountId={randomId()} client={undefined} />
      <InlineContext.Provider value={{ inline: true }}>
        <User accountId={randomId()} client={undefined} /> is editing
      </InlineContext.Provider>
    </ApolloProvider>
  );
}

export function NoProvider() {
  return (
    <ApolloProvider client={createMockClient()}>
      <User accountId={randomId()} client={undefined} />
      <InlineContext.Provider value={{ inline: true }}>
        <User accountId={randomId()} client={undefined} /> is editing
      </InlineContext.Provider>
    </ApolloProvider>
  );
}
