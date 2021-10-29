import React, {
  EffectCallback,
  DependencyList,
  FunctionComponent,
} from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { renderHook } from '@testing-library/react-hooks';

import {
  getRenderedProperty,
  temporarilySilenceActAndAtlaskitDeprecationWarnings,
  waitForNextTick,
  provideMockMetalClient,
} from '@atlassian/aux-test-utils';

const { metalMetricSubmitSpy, metalErrorSubmitSpy } = provideMockMetalClient();

import { catalog, ErrorPayload } from '@atlassiansox/metal-client';

import {
  getActiveTunnelsQuery,
  useCustomUITunnelsList,
  getCustomUITunnelsFromGQLResult,
} from '../hooks/useCustomUITunnelsList';
import { MetalClientProvider } from '../../context';
import { createMockClient } from 'mock-apollo-client';

temporarilySilenceActAndAtlaskitDeprecationWarnings();

const queryVariables = {
  appId: 'ari:cloud:ecosystem::app/some-app-id',
  environmentType: 'DEVELOPMENT',
  environmentId: '1a4793e5-dca7-4deb-a9c8-a01a7fb749e3',
};

const queryResponse = () => ({
  data: {
    appActiveTunnels: {
      customUI: [
        {
          resourceKey: 'res-1',
          tunnelUrl: 'http://localhost:8080',
        },
        {
          resourceKey: 'res-2',
          tunnelUrl: 'http://localhost:8081',
        },
      ],
    },
  },
});

const MockedQueryProvider: FunctionComponent = ({ children }) => {
  const mockClient = createMockClient();
  mockClient.setRequestHandler(getActiveTunnelsQuery(), async () =>
    queryResponse(),
  );
  return <ApolloProvider client={mockClient}>{children}</ApolloProvider>;
};

const page = 'editPageScreen';

describe('useCustomUITunnelsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns a list of activeTunnels from a graphQL query after a loading state', async () => {
    const rendered = renderHook(useCustomUITunnelsList, {
      initialProps: queryVariables,
      wrapper: MockedQueryProvider,
    });

    expect(getRenderedProperty(rendered, 'loading')).toBe(true);

    await rendered.waitForNextUpdate();
    expect(getRenderedProperty(rendered, 'loading')).toBe(false);
    expect(getRenderedProperty(rendered, 'tunnels').length).toBe(2);
    expect(getRenderedProperty(rendered, 'tunnels')).toStrictEqual([
      {
        resourceKey: 'res-1',
        tunnelUrl: 'http://localhost:8080',
      },
      {
        resourceKey: 'res-2',
        tunnelUrl: 'http://localhost:8081',
      },
    ]);
  });

  it('returns an empty and does not call the graphQL query if environment is other than DEV', async () => {
    const rendered = renderHook(useCustomUITunnelsList, {
      initialProps: {
        ...queryVariables,
        environmentType: 'PRODUCTION',
      },
      wrapper: MockedQueryProvider,
    });

    expect(getRenderedProperty(rendered, 'loading')).toBe(false);
    expect(getRenderedProperty(rendered, 'tunnels').length).toBe(0);
  });

  describe('metrics', () => {
    let originalUseEffect: (
      effect: EffectCallback,
      deps?: DependencyList,
    ) => void;
    beforeAll(() => {
      originalUseEffect = React.useEffect;
      React.useEffect = React.useLayoutEffect;
    });
    afterAll(() => {
      React.useEffect = originalUseEffect;
    });

    it('submits a latency metric event to metal after the active tunnel list is retrieved', async () => {
      const Wrapper = ({ children }: { children?: React.ReactNode }) => (
        <MetalClientProvider
          value={{
            product: 'tests',
            page,
          }}
        >
          <MockedQueryProvider>{children}</MockedQueryProvider>
        </MetalClientProvider>
      );

      const rendered = renderHook(useCustomUITunnelsList, {
        initialProps: queryVariables,
        wrapper: Wrapper,
      });

      expect(getRenderedProperty(rendered, 'loading')).toBe(true);
      expect(metalMetricSubmitSpy).not.toHaveBeenCalled();

      await rendered.waitForNextUpdate();
      expect(getRenderedProperty(rendered, 'loading')).toBe(false);
      await waitForNextTick();
      expect(metalMetricSubmitSpy).toHaveBeenCalledWith({
        component: 'useCustomUITunnelsList',
        page,
        name: catalog.performance.COMPONENT_READY,
        value: expect.any(Number),
      });
    });

    it('does not submit a latency metric event to metal if the GraphQL data is null', async () => {
      const mockClient = createMockClient();
      mockClient.setRequestHandler(getActiveTunnelsQuery(), async () => ({
        data: null,
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

      const rendered = renderHook(useCustomUITunnelsList, {
        initialProps: queryVariables,
        wrapper: Wrapper,
      });

      await rendered.waitForNextUpdate();
      expect(getRenderedProperty(rendered, 'loading')).toBe(false);
      expect(metalMetricSubmitSpy).not.toHaveBeenCalled();
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
          component: 'useCustomUITunnelsList',
          page,
          name: catalog.error.COMPONENT_GRAPHQL,
        },
      ],
      [
        'an underlying service error',
        [{ extensions: { errorSource: 'UNDERLYING_SERVICE' } }],
        {
          component: 'useCustomUITunnelsList',
          page,
          name: catalog.error.COMPONENT_API,
        },
      ],
      [
        'an unknown error',
        [{ extensions: { errorSource: 'UNKNOWN' } }],
        {
          component: 'useCustomUITunnelsList',
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
          component: 'useCustomUITunnelsList',
          page,
          name: catalog.error.COMPONENT_API,
        },
      ],
      ['no errors', undefined, false],
    ];

    test.each(testCases)(
      'correctly handles reporting of %s',
      async (_, responseErrors, expectedMetalErrorPayload) => {
        const mockClient = createMockClient();
        mockClient.setRequestHandler(getActiveTunnelsQuery(), async () => ({
          data: null,
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

        const rendered = renderHook(useCustomUITunnelsList, {
          initialProps: queryVariables,
          wrapper: Wrapper,
        });

        await rendered.waitForNextUpdate();
        await waitForNextTick(); // added as of TS 3.9.6 update -- seems metalClient's methods aren't used until after the next tick

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

describe('getCustomUITunnelsFromGQLResult', () => {
  const listOfTunnels = [
    {
      resourceKey: 'res-1',
      tunnelUrl: 'http://localhost:8080',
    },
    {
      resourceKey: 'res-2',
      tunnelUrl: 'http://localhost:8081',
    },
  ];

  const mockGQLData = {
    appActiveTunnels: {
      customUI: listOfTunnels,
    },
  };

  it('returns the active tunnels from the request when loaded and present', () => {
    const tunnelList = getCustomUITunnelsFromGQLResult({
      data: mockGQLData,
      loading: false,
    });
    expect(tunnelList).toBe(listOfTunnels);
  });

  it('returns undefined when data is still loading', () => {
    const tunnelList = getCustomUITunnelsFromGQLResult({
      data: mockGQLData,
      loading: true,
    });
    expect(tunnelList).toBeUndefined();
  });

  it('returns undefined when GQL Result loaded with no data', () => {
    const tunnelList = getCustomUITunnelsFromGQLResult({ loading: false });
    expect(tunnelList).toBeUndefined();
  });

  it('returns undefined when GQL Result loaded with no active tunnels present in result', () => {
    const tunnelList = getCustomUITunnelsFromGQLResult({
      data: {},
      loading: false,
    });
    expect(tunnelList).toBeUndefined();
  });

  it('returns undefined when GQL Result loaded with empty active tunnels response', () => {
    const tunnelList = getCustomUITunnelsFromGQLResult({
      data: { appActiveTunnels: {} },
      loading: false,
    });
    expect(tunnelList).toBeUndefined();
  });

  it('returns empty array when GQL Result loaded with no customUI active tunnels', () => {
    const tunnelList = getCustomUITunnelsFromGQLResult({
      data: { appActiveTunnels: { customUI: [] } },
      loading: false,
    });
    expect(tunnelList).toStrictEqual([]);
  });
});
