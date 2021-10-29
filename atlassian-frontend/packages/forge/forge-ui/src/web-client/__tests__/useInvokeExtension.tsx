import React, { FunctionComponent } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { renderHook } from '@testing-library/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { temporarilySilenceActAndAtlaskitDeprecationWarnings } from '@atlassian/aux-test-utils';

import {
  invokeExtensionMutation,
  useInvokeExtension,
} from '../hooks/useInvokeExtension';

temporarilySilenceActAndAtlaskitDeprecationWarnings();

const contextIds = ['123'];
const extensionId = '123';

const mockClient = createMockClient();

mockClient.setRequestHandler(invokeExtensionMutation, async () => ({
  data: {
    invokeExtension: {
      success: true,
      errors: null,
      response: {
        body: {
          message: 'Hello world!',
        },
      },
    },
  },
}));

const MockedQueryProvider: FunctionComponent = ({ children }) => {
  return <ApolloProvider client={mockClient}>{children}</ApolloProvider>;
};

describe('useInvokeExtension', () => {
  it('returns an invoker function for the invokeExtension mutation', async () => {
    const { result } = renderHook(
      ({ contextIds, extensionId }) =>
        useInvokeExtension(contextIds, extensionId),
      {
        initialProps: { contextIds, extensionId },
        wrapper: MockedQueryProvider,
      },
    );
    expect(result.current).toBeInstanceOf(Function);
    const res = await result.current({
      call: {
        functionKey: 'key',
        payload: {},
      },
      context: {},
    });
    expect(res).toStrictEqual({
      data: {
        invokeExtension: {
          success: true,
          errors: null,
          response: {
            body: {
              message: 'Hello world!',
            },
          },
        },
      },
    });
  });
});
