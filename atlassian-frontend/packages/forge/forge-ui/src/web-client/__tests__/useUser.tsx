import React from 'react';
import { temporarilySilenceActAndAtlaskitDeprecationWarnings } from '@atlassian/aux-test-utils';
import { ApolloProvider } from '@apollo/react-hooks';
import { renderHook } from '@testing-library/react-hooks';
import { DocumentNode } from 'graphql';
import { createMockClient, RequestHandler } from 'mock-apollo-client';
import { userQuery, useUser, usersQuery, useUsers } from '../hooks/useUser';

const createMockedQueryProvider = (
  query: DocumentNode,
  handler: RequestHandler,
): React.FunctionComponent => ({ children }) => {
  const mockClient = createMockClient();
  mockClient.setRequestHandler(query, handler);
  return <ApolloProvider client={mockClient}>{children}</ApolloProvider>;
};

temporarilySilenceActAndAtlaskitDeprecationWarnings();

const NAME_1 = 'Ryan Braganza';
const ACCOUNT_ID_1 = '123';
const PICTURE_1 =
  'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/557058:6eb7858d-8169-4d19-b4b4-3e1b6b8627dd/7bc47cd5-30a8-4ed8-b6eb-26e97de79ed4/128';

const NAME_2 = 'Nathan Hur';
const ACCOUNT_ID_2 = '234';
const PICTURE_2 =
  'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5c35519ce6047225b6d54c23/9ad4bf55-3604-4c72-82ac-269fa91d34c4/128';

describe('useUser', () => {
  it('sends the correct query and returns a name and picture from the GraphQL response', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useUser(ACCOUNT_ID_1),
      {
        wrapper: createMockedQueryProvider(userQuery, async ({ accountId }) => {
          expect(accountId).toEqual(ACCOUNT_ID_1);
          return {
            data: {
              user: {
                name: NAME_1,
                accountId: ACCOUNT_ID_1,
                picture: PICTURE_1,
              },
            },
          };
        }),
      },
    );
    await waitForNextUpdate();

    const { name, picture } = result.current;
    expect(name).toBe(NAME_1);
    expect(picture).toBe(PICTURE_1);
  });
});

describe('useUsers', () => {
  it('returns empty strings for data if the response is null in the case of an error', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useUser('123'), {
      wrapper: createMockedQueryProvider(userQuery, async () => ({
        data: null,
      })),
    });
    await waitForNextUpdate();

    const { name, picture } = result.current;
    expect(name).toBe('');
    expect(picture).toBe('');
  });

  it('sends the correct query and returns multiple names and pictures from the GraphQL response', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useUsers([ACCOUNT_ID_1, ACCOUNT_ID_2]),
      {
        wrapper: createMockedQueryProvider(
          usersQuery,
          async ({ accountIds }) => {
            expect(accountIds).toEqual([ACCOUNT_ID_1, ACCOUNT_ID_2]);
            return {
              data: {
                users: [
                  {
                    name: NAME_1,
                    accountId: ACCOUNT_ID_1,
                    picture: PICTURE_1,
                  },
                  {
                    name: NAME_2,
                    accountId: ACCOUNT_ID_2,
                    picture: PICTURE_2,
                  },
                ],
              },
            };
          },
        ),
      },
    );
    await waitForNextUpdate();

    const firstUser = result.current[ACCOUNT_ID_1];
    const secondUser = result.current[ACCOUNT_ID_2];
    expect(firstUser).toEqual({
      name: NAME_1,
      accountId: ACCOUNT_ID_1,
      picture: PICTURE_1,
    });
    expect(secondUser).toEqual({
      name: NAME_2,
      accountId: ACCOUNT_ID_2,
      picture: PICTURE_2,
    });
  });

  it('returns an empty object if no users are returned from request', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useUsers(['123', '456']),
      {
        wrapper: createMockedQueryProvider(usersQuery, async () => {
          return {
            data: {
              users: [],
            },
          };
        }),
      },
    );
    await waitForNextUpdate();

    expect(result.current).toEqual({});
  });
});
