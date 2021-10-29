import React, { FunctionComponent } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { ApolloProvider } from '@apollo/react-hooks';
import { catalog } from '@atlassiansox/metal-client';
import { ErrorPayload } from '@atlassiansox/metal-client';
import {
  temporarilySilenceActAndAtlaskitDeprecationWarnings,
  provideMockMetalClient,
} from '@atlassian/aux-test-utils';
import {
  ForgeEffectsInvoker,
  ExtensionInstanceIds,
} from '@atlassian/forge-ui-types';
import { createMockClient } from 'mock-apollo-client';
import * as createAuxEffectsInvoker from '../hooks/lib/createAuxEffectsInvoker';
import {
  useInvokeAuxEffects,
  APIError,
  invokeAuxEffectsMutation,
} from '../hooks/useInvokeAuxEffects';
import { MetalClientProvider } from '../../context';

const mockClient = createMockClient();
mockClient.setRequestHandler(invokeAuxEffectsMutation, async () => ({
  data: {
    invokeAuxEffects: {
      success: true,
      errors: null,
      result: {
        effects: [
          {
            type: 'render',
            aux: {
              type: 'View',
              children: [],
            },
            state: {},
          },
        ],
      },
    },
  },
}));

const MockQueryProvider: FunctionComponent = ({ children }) => {
  return <ApolloProvider client={mockClient}>{children}</ApolloProvider>;
};

temporarilySilenceActAndAtlaskitDeprecationWarnings();

const { metalErrorSubmitSpy } = provideMockMetalClient();

const page = 'editPageScreen';

function createExtensionInstanceIds(
  partialExtensionInstanceIds?: Partial<ExtensionInstanceIds>,
): ExtensionInstanceIds {
  return {
    contextIds: ['ari:cloud:xen::test/1'],
    extensionId: 'definition-uuid-1',
    localId: 'local-uuid-1',
    ...(partialExtensionInstanceIds || {}),
  };
}

describe('useInvokeAuxEffects', () => {
  const firstInvokeAuxEffects: ForgeEffectsInvoker = async () => [];
  const subsequentInvokeAuxEffects: ForgeEffectsInvoker = async () => [];
  const createAuxEffectsInvokerSpy = jest.spyOn(
    createAuxEffectsInvoker,
    'createAuxEffectsInvoker',
  );

  beforeEach(() => {
    createAuxEffectsInvokerSpy.mockClear();
    createAuxEffectsInvokerSpy
      .mockReturnValue(subsequentInvokeAuxEffects)
      .mockReturnValueOnce(firstInvokeAuxEffects);
  });

  it('uses createAuxEffectsInvoker', () => {
    const extensionInstanceIds = createExtensionInstanceIds();
    const { result } = renderHook(useInvokeAuxEffects, {
      initialProps: extensionInstanceIds,
      wrapper: MockQueryProvider,
    });

    const [spyExtensionInstanceIds] = createAuxEffectsInvokerSpy.mock.calls[0];
    expect(result.current).toBe(firstInvokeAuxEffects);
    expect(spyExtensionInstanceIds).toEqual(extensionInstanceIds);
  });

  it('mutationFn from useMutation has the same identity even when handler details change', () => {
    const extensionInstanceIds = createExtensionInstanceIds({
      localId: '1',
    });
    const otherExtensionInstanceIds = createExtensionInstanceIds({
      localId: '2',
    });

    const { rerender } = renderHook(useInvokeAuxEffects, {
      initialProps: extensionInstanceIds,
      wrapper: MockQueryProvider,
    });
    rerender(otherExtensionInstanceIds);

    const [
      spyExtensionInstanceIds,
      spyMutationFn,
    ] = createAuxEffectsInvokerSpy.mock.calls[0];
    const [
      spyOtherExtensionInstanceIds,
      spyOtherMutationFn,
    ] = createAuxEffectsInvokerSpy.mock.calls[1];

    expect(spyExtensionInstanceIds).toEqual(extensionInstanceIds);
    expect(spyOtherExtensionInstanceIds).toEqual(otherExtensionInstanceIds);
    expect(spyMutationFn).toBe(spyOtherMutationFn);
  });

  it('return value has the same identity between renders', () => {
    const extensionInstanceIds = createExtensionInstanceIds();
    const { result, rerender } = renderHook(useInvokeAuxEffects, {
      initialProps: extensionInstanceIds,
      wrapper: MockQueryProvider,
    });

    const firstResult = result.current;
    rerender(extensionInstanceIds);
    expect(result.current).toBe(firstResult);
  });

  it('return value has the same identity for different contextIds array references', async () => {
    const contextId = 'ari-1';
    const { result, rerender } = renderHook(useInvokeAuxEffects, {
      initialProps: createExtensionInstanceIds({ contextIds: [contextId] }),
      wrapper: MockQueryProvider,
    });
    const firstInvokeAuxEffects = result.current;

    rerender(createExtensionInstanceIds({ contextIds: [contextId] }));

    expect(result.current).toBe(firstInvokeAuxEffects);
  });

  it('return value does not have the same identity when handler details change', async () => {
    const { result, rerender } = renderHook(useInvokeAuxEffects, {
      initialProps: createExtensionInstanceIds({ localId: '1' }),
      wrapper: MockQueryProvider,
    });
    const firstInvokeAuxEffects = result.current;

    rerender(createExtensionInstanceIds({ localId: '2' }));

    expect(result.current).not.toBe(firstInvokeAuxEffects);
  });

  describe('errors', () => {
    beforeEach(() => {
      createAuxEffectsInvokerSpy.mockRestore();
      jest.resetAllMocks();
    });
    type ResponseErrors = { extensions: { errorSource: string } }[] | undefined;
    type ExpectedMetalErrorPayload = ErrorPayload | false;
    type ErrorMetricReportingTestCase = [
      string,
      ResponseErrors,
      ExpectedMetalErrorPayload,
    ];

    const testCases: ErrorMetricReportingTestCase[] = [
      [
        'a GraphQL error',
        [{ extensions: { errorSource: 'GRAPHQL_GATEWAY' } }],
        {
          component: 'renderer',
          page,
          name: catalog.error.COMPONENT_GRAPHQL,
        },
      ],
      [
        'an underlying service error',
        [{ extensions: { errorSource: 'UNDERLYING_SERVICE' } }],
        {
          component: 'renderer',
          page,
          name: catalog.error.COMPONENT_API,
        },
      ],
      [
        'an unknown error',
        [{ extensions: { errorSource: 'UNKNOWN' } }],
        {
          component: 'renderer',
          page,
          name: catalog.error.UNCAUGHT,
        },
      ],
      [
        'multiple underlying service errors',
        [
          { extensions: { errorSource: 'UNDERLYING_SERVICE' } },
          { extensions: { errorSource: 'UNDERLYING_SERVICE' } },
        ],
        {
          component: 'renderer',
          page,
          name: catalog.error.COMPONENT_API,
        },
      ],
    ];
    test.each(testCases)(
      'correctly handles reporting of %s',
      async (_, responseErrors, expectedMetalErrorPayload) => {
        const mockClient = createMockClient();
        mockClient.setRequestHandler(invokeAuxEffectsMutation, async () => ({
          data: {
            invokeAuxEffects: {
              success: true,
              errors: null,
              result: {
                effects: [],
              },
            },
          },
          errors: responseErrors,
        }));

        const Wrapper = ({ children }: { children?: React.ReactNode }) => (
          <MetalClientProvider
            value={{
              product: 'tests',
              page,
            }}
          >
            <ApolloProvider client={mockClient}>{children}</ApolloProvider>
          </MetalClientProvider>
        );

        const { result } = renderHook(useInvokeAuxEffects, {
          initialProps: createExtensionInstanceIds({ localId: '1' }),
          wrapper: Wrapper,
        });

        await expect(
          result.current({
            context: { localId: 1 },
            effects: [],
            state: {},
          }),
        ).rejects.toBeInstanceOf(APIError);

        if (expectedMetalErrorPayload) {
          expect(metalErrorSubmitSpy).toHaveBeenCalledTimes(1);
          expect(metalErrorSubmitSpy).toHaveBeenCalledWith(
            expectedMetalErrorPayload,
          );
        } else {
          expect(metalErrorSubmitSpy).not.toHaveBeenCalled();
        }
      },
    );
  });
});
