import { render } from '@forge/ui';
import { createMockClient } from 'mock-apollo-client';
import {
  invokeAuxEffectsMutation,
  userQuery,
  usersQuery,
  getExtensionListQuery,
} from '../web-client';

import { mockUsers } from './mockUsers';

// mock client
export const mockClientWithApps = (apps: {
  [extName: string]: ReturnType<typeof render>;
}) => {
  const mockClient = createMockClient();

  mockClient.setRequestHandler(
    userQuery,
    async ({ accountId }: { accountId: string }) => {
      await new Promise((res) => setTimeout(res, 1000));

      return {
        data: {
          user: mockUsers.find((user) => user.accountId === accountId),
        },
      };
    },
  );

  mockClient.setRequestHandler(
    usersQuery,
    async ({ accountIds }: { accountIds: string[] }) => {
      await new Promise((res) => setTimeout(res, 1000));
      return {
        data: {
          users: mockUsers.filter((user) =>
            accountIds.includes(user.accountId),
          ),
        },
      };
    },
  );

  mockClient.setRequestHandler(invokeAuxEffectsMutation, async (...args) => {
    const appFn = apps[args[0].input.extensionId];
    const payload = args[0].input.payload;
    const effects = await appFn(payload);
    await new Promise((res) => setTimeout(res, 1000));
    return {
      data: {
        invokeAuxEffects: {
          success: true,
          result: { effects },
        },
      },
    };
  });
  mockClient.setRequestHandler(getExtensionListQuery(), async () => {
    return {
      data: {
        extensionContexts: [
          // This returned data must correspond to the properties requested in getExtensionListQuery
          // otherwise the query will return null data
          {
            id:
              'ari:cloud:confluence::site/DUMMY-158c8204-ff3b-47c2-adbb-a0906ccc722b',
            extensionsByType: Object.keys(apps).map((extId) => ({
              id: extId,
              appOwner: { name: 'App Owner' },
              environmentType: 'development',
              properties: {
                title: `App ${extId}`,
                function: 'function-name',
              },
              type: 'abc',
              environmentId: 'env-id',
              appVersion: 'app-version',
              installationId: 'installation-id',
            })),
          },
        ],
      },
    };
  });

  return mockClient;
};
