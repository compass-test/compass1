jest.mock('apollo-client');

import { temporarilySilenceActAndAtlaskitDeprecationWarnings } from '@atlassian/aux-test-utils';
temporarilySilenceActAndAtlaskitDeprecationWarnings();

import { createExtensionListQueryOptions } from '../../web-client';

import { getForgeUIExtensionsAsync } from '../../ui/getForgeUIExtensionsAsync';
import { FetchPolicy } from 'apollo-client';
import { EXTENSION_LIST_RESULTS } from '../__fixtures__/queries';

const client = { query: jest.fn() } as any;
const contextIds = ['ari:cloud:confluence::site/1'];
const moduleType = 'dummy:module';
const queryOptions = { fetchPolicy: 'network-only' as FetchPolicy };
const expandAppOwner = true;

let clientQueryMock: jest.Mock;

describe('getForgeUIExtensionsAsync', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('requests extensions and returns the extensions it gets back', async () => {
    clientQueryMock = (client.query as jest.MockedFunction<
      typeof client.query
    >).mockResolvedValue({
      data: {
        extensionContexts: [
          {
            extensionsByType: EXTENSION_LIST_RESULTS,
          },
        ],
      },
      loading: false,
    });

    const result = await getForgeUIExtensionsAsync({
      client,
      contextIds,
      moduleType,
      queryOptions,
      expandAppOwner,
    });

    expect(clientQueryMock).toHaveBeenCalledWith(
      createExtensionListQueryOptions(
        client,
        contextIds,
        moduleType,
        queryOptions,
        expandAppOwner,
      ),
    );
    expect(result).toStrictEqual({
      extensions: EXTENSION_LIST_RESULTS,
      errors: undefined,
    });
  });

  it('rethrows the exception when retrieving extensions throws an exception', async () => {
    const mockError = new Error();

    if (jest.isMockFunction(client.query)) {
      client.query.mockImplementation(() => {
        throw mockError;
      });
    }

    await expect(
      getForgeUIExtensionsAsync({
        client,
        contextIds,
        moduleType,
        queryOptions,
        expandAppOwner,
      }),
    ).rejects.toBe(mockError);
  });

  it('returns GraphQL errors if there are some', async () => {
    const testErrors = [
      { extensions: { errorSource: 'UNDERLYING_SERVICE' } },
      { extensions: { errorSource: 'GRAPHQL_GATEWAY' } },
    ];
    (client.query as jest.MockedFunction<
      typeof client.query
    >).mockResolvedValue({
      data: null,
      loading: false,
      errors: testErrors,
    });
    await expect(
      getForgeUIExtensionsAsync({
        client,
        contextIds,
        moduleType,
        queryOptions,
        expandAppOwner,
      }),
    ).resolves.toStrictEqual({
      extensions: null,
      errors: testErrors,
    });
  });
});
