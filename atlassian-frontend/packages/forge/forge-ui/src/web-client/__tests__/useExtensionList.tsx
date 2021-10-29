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
  getExtensionListQuery,
  useExtensionList,
  getExtensionsFromGQLResult,
} from '../hooks/useExtensionList';
import { GQLExtensionContext } from '../graphql/types';
import { MetalClientProvider } from '../../context';
import { DocumentNode } from 'graphql';
import { createMockClient } from 'mock-apollo-client';

temporarilySilenceActAndAtlaskitDeprecationWarnings();

const queryVariablesNoAppOwner = {
  contextIds: ['ari:cloud:confluence::site/1'],
  type: '',
};
const queryVariablesWithAppOwner = {
  ...queryVariablesNoAppOwner,
  expandAppOwner: true,
};

const queryVariablesWithConsent = {
  ...queryVariablesNoAppOwner,
  egressConsentFlowEnabled: true,
};

const queryResponse: (
  expandAppOwner?: boolean,
  egressConsentFlowEnabled?: boolean,
) => { data: { extensionContexts: GQLExtensionContext[] } } = (
  expandAppOwner = false,
  egressConsentFlowEnabled = false,
) => ({
  data: {
    extensionContexts: [
      {
        id: 'ari:cloud:confluence::site/1',
        extensionsByType: [
          {
            id:
              'ari:cloud:ecosystem::extension/app-id/environment-id/static/test-key',
            type: 'xen:macro',
            properties: {},
            environmentId: 'envId1',
            environmentType: 'DEVELOPMENT',
            installationId: 'example-installation-id',
            appVersion: '1.0.0',
            ...(expandAppOwner
              ? { appOwner: { name: 'Bob', accountId: 'mockId', picture: '' } }
              : {}),
            ...(egressConsentFlowEnabled
              ? {
                  consentUrl: 'https://mock.dev',
                  currentUserConsent: {
                    appEnvironmentVersion: {
                      id: '',
                    },
                    user: {
                      aaid: '',
                    },
                    consentedAt: '',
                  },
                  requiresUserConsent: true,
                }
              : {}),
          },
        ],
      },
    ],
  },
});

const MockedQueryProvider: FunctionComponent = ({ children }) => {
  const mockClient = createMockClient();
  mockClient.setRequestHandler(getExtensionListQuery(), async () =>
    queryResponse(),
  );
  mockClient.setRequestHandler(getExtensionListQuery(true), async () =>
    queryResponse(true),
  );
  mockClient.setRequestHandler(
    getExtensionListQuery(undefined, true),
    async () => queryResponse(undefined, true),
  );
  return <ApolloProvider client={mockClient}>{children}</ApolloProvider>;
};

const page = 'editPageScreen';

describe('useExtensionList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns a list of extensions from a graphQL query after a loading state', async () => {
    const rendered = renderHook(useExtensionList, {
      initialProps: queryVariablesWithAppOwner,
      wrapper: MockedQueryProvider,
    });

    expect(getRenderedProperty(rendered, 'loading')).toBe(true);

    await rendered.waitForNextUpdate();
    expect(getRenderedProperty(rendered, 'loading')).toBe(false);
    expect(getRenderedProperty(rendered, 'extensions').length).toBeGreaterThan(
      0,
    );
  });

  describe('app owner', () => {
    it('returns app owner in response when requested', async () => {
      const rendered = renderHook(useExtensionList, {
        initialProps: queryVariablesWithAppOwner,
        wrapper: MockedQueryProvider,
      });
      await rendered.waitForNextUpdate();
      const [extension] = getRenderedProperty(rendered, 'extensions');

      expect(extension.appOwner).toBeDefined();
    });

    it('excludes app owner in response when not requested', async () => {
      const rendered = renderHook(useExtensionList, {
        initialProps: queryVariablesNoAppOwner,
        wrapper: MockedQueryProvider,
      });
      await rendered.waitForNextUpdate();
      const [extension] = getRenderedProperty(rendered, 'extensions');

      expect(extension.appOwner).toBeUndefined();
    });
  });

  describe('egress consent', () => {
    it('returns egress consent in response when requested', async () => {
      const rendered = renderHook(useExtensionList, {
        initialProps: queryVariablesWithConsent,
        wrapper: MockedQueryProvider,
      });
      await rendered.waitForNextUpdate();
      const [extension] = getRenderedProperty(rendered, 'extensions');

      expect(extension.consentUrl).toBe('https://mock.dev');
      expect(extension.currentUserConsent).toBeDefined();
      expect(extension.requiresUserConsent).toBe(true);
    });

    it('excludes egress consent in response when not requested', async () => {
      const rendered = renderHook(useExtensionList, {
        initialProps: queryVariablesNoAppOwner,
        wrapper: MockedQueryProvider,
      });
      await rendered.waitForNextUpdate();
      const [extension] = getRenderedProperty(rendered, 'extensions');

      expect(extension.consentUrl).toBeUndefined();
      expect(extension.currentUserConsent).toBeUndefined();
      expect(extension.requiresUserConsent).toBeUndefined();
    });
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

    it('submits a latency metric event to metal after the extension list is retrieved', async () => {
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

      const rendered = renderHook(useExtensionList, {
        initialProps: queryVariablesWithAppOwner,
        wrapper: Wrapper,
      });

      expect(getRenderedProperty(rendered, 'loading')).toBe(true);
      expect(metalMetricSubmitSpy).not.toHaveBeenCalled();

      await rendered.waitForNextUpdate();
      expect(getRenderedProperty(rendered, 'loading')).toBe(false);
      await waitForNextTick();
      expect(metalMetricSubmitSpy).toHaveBeenCalledWith({
        component: 'useExtensionList',
        page,
        name: catalog.performance.COMPONENT_READY,
        value: expect.any(Number),
      });
    });

    it('does not submit a latency metric event to metal if the GraphQL data is null', async () => {
      const mockClient = createMockClient();
      mockClient.setRequestHandler(getExtensionListQuery(true), async () => ({
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

      const rendered = renderHook(useExtensionList, {
        initialProps: queryVariablesWithAppOwner,
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
          component: 'useExtensionList',
          page,
          name: catalog.error.COMPONENT_GRAPHQL,
        },
      ],
      [
        'an underlying service error',
        [{ extensions: { errorSource: 'UNDERLYING_SERVICE' } }],
        {
          component: 'useExtensionList',
          page,
          name: catalog.error.COMPONENT_API,
        },
      ],
      [
        'an unknown error',
        [{ extensions: { errorSource: 'UNKNOWN' } }],
        {
          component: 'useExtensionList',
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
          component: 'useExtensionList',
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
        mockClient.setRequestHandler(getExtensionListQuery(true), async () => ({
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

        const rendered = renderHook(useExtensionList, {
          initialProps: queryVariablesWithAppOwner,
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

describe('getExtensionsFromGQLResult', () => {
  const extensionsByType = [
    {
      id: 'example:extensions',
      properties: {
        title: 'Here is my title',
        description: 'Here is my description',
      },
    },
  ];

  const mockGQLData = {
    extensionContexts: [
      {
        extensionsByType,
      },
    ],
  };

  it('returns the extensions from the request when loaded and present', () => {
    const extensionList = getExtensionsFromGQLResult({
      data: mockGQLData,
      loading: false,
    });
    expect(extensionList).toBe(extensionsByType);
  });

  it('returns null when data is still loading', () => {
    const extensionList = getExtensionsFromGQLResult({
      data: mockGQLData,
      loading: true,
    });
    expect(extensionList).toBe(null);
  });

  it('returns null when GQL Result loaded with no data', () => {
    const extensionList = getExtensionsFromGQLResult({ loading: false });
    expect(extensionList).toBe(null);
  });

  it('returns null when GQL Result loaded with no extension contexts present in result', () => {
    const extensionList = getExtensionsFromGQLResult({
      data: {},
      loading: false,
    });
    expect(extensionList).toBe(null);
  });

  it('returns null when GQL Result loaded with empty extension context list', () => {
    const extensionList = getExtensionsFromGQLResult({
      data: { extensionContexts: [] },
      loading: false,
    });
    expect(extensionList).toBe(null);
  });

  it('returns null when GQL Result loaded with no extensions found by type', () => {
    const extensionList = getExtensionsFromGQLResult({
      data: { extensionContexts: [{}] },
      loading: false,
    });
    expect(extensionList).toBe(null);
  });
});

describe('getExtensionListQuery', () => {
  const getSubSelectionsByName = (selection: any, name: string) =>
    selection.selectionSet.selections.filter(
      (node: any) => node.name.value === name,
    );

  const getFirstSubSelectionByName = (selection: any, name: string) =>
    getSubSelectionsByName(selection, name)[0];

  const findAppOwner = (extensionListQuery: DocumentNode) => {
    const extensionList = extensionListQuery.definitions[0];
    const extensionContexts = getFirstSubSelectionByName(
      extensionList,
      'extensionContexts',
    );
    const extensionsByType = getFirstSubSelectionByName(
      extensionContexts,
      'extensionsByType',
    );

    return getFirstSubSelectionByName(extensionsByType, 'appOwner');
  };

  it('includes app owner in the query when requested', () => {
    expect(findAppOwner(getExtensionListQuery(true))).toBeDefined();
  });

  it('excludes app owner in the query when not requested', () => {
    expect(findAppOwner(getExtensionListQuery(false))).toBeUndefined();
    expect(findAppOwner(getExtensionListQuery(undefined))).toBeUndefined();
  });

  it('includes extensionsByType queries for each module', () => {
    const query = getExtensionListQuery(false, true, [
      'jira:issuePanel',
      'jira:issueGlance',
    ]);

    const extensionContexts = getFirstSubSelectionByName(
      query.definitions[0],
      'extensionContexts',
    );

    const extensionsByType = getSubSelectionsByName(
      extensionContexts,
      'extensionsByType',
    );

    const moduleKeys = extensionsByType.map(
      (ext: any) => ext.arguments[0].value.value,
    );

    expect(moduleKeys[0]).toBe('jira:issuePanel');
    expect(moduleKeys[1]).toBe('jira:issueGlance');
  });
});
