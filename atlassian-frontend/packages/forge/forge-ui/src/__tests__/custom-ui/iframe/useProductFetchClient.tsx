import { ApolloProvider } from '@apollo/react-hooks';
import { renderHook } from '@testing-library/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import React, { FunctionComponent } from 'react';
import {
  authTokenForExtensionMutation,
  Product,
  useProductFetchClient,
} from '../../../custom-ui/iframe/useProductFetchClient';
import { temporarilySilenceActAndAtlaskitDeprecationWarnings } from '@atlassian/aux-test-utils';
import { ProductEnvironment } from '@atlassian/forge-ui-types';

temporarilySilenceActAndAtlaskitDeprecationWarnings();

const queryVariables = {
  extensionId: 'extension-id',
  cloudId: 'cloud-id',
  environment: ProductEnvironment.PRODUCTION,
};

const mutationResponse = jest.fn().mockImplementation(() => ({
  data: {
    userAuthTokenForExtension: {
      success: true,
      authToken: {
        token: 'auth-token',
        ttl: 2000, // 2000 seconds
      },
      errors: null,
    },
  },
}));

const MockedMutationProvider: FunctionComponent = ({ children }) => {
  const mockClient = createMockClient();
  mockClient.setRequestHandler(authTokenForExtensionMutation, async () =>
    mutationResponse(),
  );
  return <ApolloProvider client={mockClient}>{children}</ApolloProvider>;
};

const mockResponse = new Response();
const mockedFetch = jest.fn().mockResolvedValue(mockResponse);

window.fetch = mockedFetch;

describe('useProductFetchClient', () => {
  let mockDateNow: jest.SpyInstance<number, []>;
  beforeEach(() => {
    jest.clearAllMocks();
    mockDateNow = jest.spyOn(Date, 'now');
  });
  afterEach(() => {
    mockDateNow.mockRestore();
  });

  it.each(['jira', 'confluence'] as Product[])(
    'calls the correct url for %s apis',
    async (product) => {
      const rendered = renderHook(useProductFetchClient, {
        initialProps: queryVariables,
        wrapper: MockedMutationProvider,
      });

      const productFetchClient = rendered.result.current;
      const response = await productFetchClient('/rest/foo', product, {});

      const url = mockedFetch.mock.calls[0][0];

      expect(url).toEqual(
        `https://api.atlassian.com/ex/${product}/cloud-id/rest/foo`,
      );
      expect(response).toBe(mockResponse);
    },
  );

  it.each(['jira', 'confluence'] as const)(
    'handles errors when a token is not returned',
    async (product) => {
      const rendered = renderHook(useProductFetchClient, {
        initialProps: queryVariables,
        wrapper: MockedMutationProvider,
      });

      const productFetchClient = rendered.result.current;

      mutationResponse.mockResolvedValueOnce({
        data: {
          data: null,
        },
      });
      await expect(
        productFetchClient('/rest/foo', product, {}),
      ).rejects.toThrowError(
        'An unexpected error occurred when fetching an auth token',
      );
    },
  );

  it.each(['jira', 'confluence'] as const)(
    'propagates errors from the mutation response handler',
    async (product) => {
      const rendered = renderHook(useProductFetchClient, {
        initialProps: queryVariables,
        wrapper: MockedMutationProvider,
      });

      const productFetchClient = rendered.result.current;

      mutationResponse.mockRejectedValueOnce(new Error('oof'));
      await expect(
        productFetchClient('/rest/foo', product, {}),
      ).rejects.toThrowError('Network error: oof');
    },
  );

  it.each([
    '../another-cloud-site/rest/foo',
    '../../another-product/cloud-id/rest/foo',
  ])(
    'prevents path traversal when building the product URL',
    async (restPath) => {
      const rendered = renderHook(useProductFetchClient, {
        initialProps: queryVariables,
        wrapper: MockedMutationProvider,
      });

      const productFetchClient = rendered.result.current;
      await expect(
        productFetchClient(restPath, 'jira', {}),
      ).rejects.toThrowError('Invalid product URL');
    },
  );

  it('rejects invalid products', async () => {
    const rendered = renderHook(useProductFetchClient, {
      initialProps: queryVariables,
      wrapper: MockedMutationProvider,
    });

    const productFetchClient = rendered.result.current;
    await expect(
      // @ts-expect-error we are passing an invalid product
      productFetchClient('/', 'jira/rest/api/3/serverInfo#', {}),
    ).rejects.toThrowError('Invalid product: jira/rest/api/3/serverInfo#');
  });

  it('fetches an oauth token the first time fetch is called', async () => {
    const rendered = renderHook(useProductFetchClient, {
      initialProps: queryVariables,
      wrapper: MockedMutationProvider,
    });

    const productFetchClient = rendered.result.current;
    await productFetchClient('/rest/foo', 'jira', {});

    const call = mockedFetch.mock.calls[0][1]['headers'];

    expect(call.get('Authorization')).toEqual(`Bearer auth-token`);
  });

  it('replaces an existing Authorization field', async () => {
    const rendered = renderHook(useProductFetchClient, {
      initialProps: queryVariables,
      wrapper: MockedMutationProvider,
    });

    const productFetchClient = rendered.result.current;
    await productFetchClient('/rest/foo', 'jira', {
      headers: { Authorization: 'bearer foo' },
    });

    const call = mockedFetch.mock.calls[0][1]['headers'];

    expect(call.get('Authorization')).toEqual(`Bearer auth-token`);
  });

  it('keeps existing init values', async () => {
    const rendered = renderHook(useProductFetchClient, {
      initialProps: queryVariables,
      wrapper: MockedMutationProvider,
    });

    const productFetchClient = rendered.result.current;
    await productFetchClient('/rest/foo', 'jira', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    });

    const call = mockedFetch.mock.calls[0][1];

    expect(call.headers.get('Authorization')).toEqual(`Bearer auth-token`);
    expect(call.headers.get('Content-Type')).toEqual('application/json');
    expect(call.method).toEqual('POST');
  });

  it('fetches a new token when expired', async () => {
    const rendered = renderHook(useProductFetchClient, {
      initialProps: queryVariables,
      wrapper: MockedMutationProvider,
    });

    const productFetchClient = rendered.result.current;

    // Start at time "0" seconds
    mockDateNow.mockReturnValue(0 * 1000);
    await productFetchClient('/rest/foo', 'jira', {});

    // We don't have a token, so we need to fetch it.
    expect(mutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedFetch).toHaveBeenCalledTimes(1);
    const call = mockedFetch.mock.calls[0][1]['headers'];
    expect(call.get('Authorization')).toEqual(`Bearer auth-token`);

    // Start another request at 1000 seconds - before the previous token has expired
    mockDateNow.mockReturnValue(1000 * 1000);
    await productFetchClient('/rest/foo', 'jira', {});

    // We don't fetch another token yet
    expect(mutationResponse).toHaveBeenCalledTimes(1);
    // one additional time for the endpoint
    expect(mockedFetch).toHaveBeenCalledTimes(2);

    // More than the 2000 second TTL of the initial token
    mockDateNow.mockReturnValue(2001 * 1000);
    await productFetchClient('/rest/foo', 'jira', {});

    // Since the token is expired, we need to fetch again.
    expect(mutationResponse).toHaveBeenCalledTimes(2);
    // yet another fetch for the endpoint
    expect(mockedFetch).toHaveBeenCalledTimes(3);
  });
});
