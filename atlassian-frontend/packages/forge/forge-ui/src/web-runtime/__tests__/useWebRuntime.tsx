import ApolloClient from 'apollo-client';
import React, { useEffect } from 'react';
import { temporarilySilenceActAndAtlaskitDeprecationWarnings } from '@atlassian/aux-test-utils';
import { Dispatch } from '@atlassian/forge-ui-types';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { AnalyticsWebClient, ForgeUIAnalyticsListener } from '../../analytics';
import { useWebRuntime } from '../useWebRuntime';

temporarilySilenceActAndAtlaskitDeprecationWarnings();

function mockAnalyticsClient() {
  return {
    sendUIEvent: jest.fn(),
    sendOperationalEvent: jest.fn(),
    sendTrackEvent: jest.fn(),
    sendScreenEvent: jest.fn(),
  };
}

function MyWrappedExtension({
  analyticsClient = mockAnalyticsClient(),
  skipInitialRender = false,
  ...props
}: {
  analyticsClient: AnalyticsWebClient;
  apolloClient: ApolloClient<any>;
  contextIds: string[];
  extensionId: string;
  coreData: { cloudId: string; localId: string };
  setDispatch: (dispatch: Dispatch) => void;
  skipInitialRender?: boolean;
}) {
  // need to wrap the useWebRuntime hook usage
  return (
    <ForgeUIAnalyticsListener
      client={analyticsClient}
      commonAttributes={{ moduleType: 'jest:test' }}
    >
      <MyExtension skipInitialRender={skipInitialRender} {...props} />
    </ForgeUIAnalyticsListener>
  );
}

function MyExtension({
  apolloClient,
  contextIds,
  extensionId,
  coreData,
  setDispatch,
  skipInitialRender = false,
}: {
  apolloClient: ApolloClient<any>;
  contextIds: string[];
  extensionId: string;
  coreData: { cloudId: string; localId: string };
  setDispatch: (dispatch: Dispatch) => void;
  skipInitialRender: boolean;
}) {
  const [dispatch, { forgeDoc, loading, error }] = useWebRuntime({
    apolloClient,
    contextIds,
    extensionId,
    coreData,
  });

  useEffect(() => {
    setDispatch(dispatch);
  }, [dispatch, setDispatch]);

  useEffect(() => {
    if (!skipInitialRender) {
      dispatch({ type: 'render', extensionData: {} });
    }
  }, [dispatch, skipInitialRender]);

  return (
    <div>
      <div>loading: {JSON.stringify(loading)}</div>
      <div>error: {JSON.stringify(error || 'no error')}</div>
      <div>forgeDoc: {JSON.stringify(forgeDoc || 'no forgeDoc')}</div>
    </div>
  );
}

function createDispatchRef(): {
  current: Dispatch;
} {
  return {
    current: () => {
      throw new Error('not set yet');
    },
  };
}

function mockSuccessfulApolloClientResponse(effects: object[]) {
  return {
    mutate: jest.fn(() => {
      return Promise.resolve({
        data: {
          invokeAuxEffects: {
            result: {
              effects,
            },
            success: true,
            errors: null,
          },
        },
      });
    }),
  };
}

function mockSuccessfulApolloClientResponseWithXenError(
  effects: object[],
  errorMessage: string,
) {
  return {
    mutate: jest.fn(() => {
      return Promise.resolve({
        data: {
          invokeAuxEffects: {
            result: {
              effects,
            },
            success: false,
            errors: [
              {
                message: errorMessage,
                extensions: {
                  statusCode: 400,
                  errorType: 'DUMMY',
                },
              },
            ],
          },
        },
      });
    }),
  };
}

function mockFailedApolloClientResponse(errorMessage: string) {
  return {
    mutate: jest.fn(() => {
      return Promise.resolve({
        data: {
          invokeAuxEffects: {
            success: false,
            errors: [
              {
                message: errorMessage,
                extensions: {
                  statusCode: 500,
                  errorType: 'DUMMY',
                },
              },
            ],
          },
        },
      });
    }),
  };
}

it('can dispatch a render effect and receive a successful forgeDoc result', async () => {
  const dispatchRef = createDispatchRef();

  const mockApolloClient = mockSuccessfulApolloClientResponse([
    {
      type: 'result',
      forgeDoc: 'stub forgeDoc',
      state: {},
    },
  ]);

  const view = render(
    <MyWrappedExtension
      analyticsClient={mockAnalyticsClient()}
      apolloClient={(mockApolloClient as unknown) as ApolloClient<any>}
      contextIds={['jest', 'test']}
      extensionId="ari:cloud:ecosystem::extension/app-id/environment-id/static/module-key"
      setDispatch={(dispatch) => (dispatchRef.current = dispatch)}
      coreData={{ cloudId: 'my-cloud-id', localId: 'my-local-id' }}
    />,
  );

  // Initial render
  view.getByText(`loading: true`);

  expect(await view.findByText(`loading: false`)).toBeTruthy();
  await view.findByText(`forgeDoc: "stub forgeDoc"`);
  await view.findByText(`error: "no error"`);
});

it('can receive a result effect and then send a new effect in the right shape', async () => {
  const dispatchRef = createDispatchRef();

  const mockApolloClient = mockSuccessfulApolloClientResponse([
    {
      type: 'result',
      forgeDoc: 'stub forgeDoc',
      state: {},
    },
  ]);

  const view = render(
    <MyWrappedExtension
      analyticsClient={mockAnalyticsClient()}
      apolloClient={(mockApolloClient as unknown) as ApolloClient<any>}
      contextIds={['jest', 'test']}
      extensionId="ari:cloud:ecosystem::extension/app-id/environment-id/static/module-key"
      setDispatch={(dispatch) => (dispatchRef.current = dispatch)}
      coreData={{ cloudId: 'my-cloud-id', localId: 'my-local-id' }}
      skipInitialRender
    />,
  );

  const extensionDataObj = {
    isConfig: true,
    config: { my: 'config', myOther: 'configgo' },
    contentId: '123',
    selectedText: 'inspiration',
  };

  dispatchRef.current({
    type: 'render',
    extensionData: extensionDataObj,
  });

  // Initial render
  view.getByText(`loading: true`);

  expect(await view.findByText(`loading: false`)).toBeTruthy();
  await view.findByText(`forgeDoc: "stub forgeDoc"`);
  await view.findByText(`error: "no error"`);

  expect(mockApolloClient.mutate).toHaveBeenLastCalledWith(
    expect.objectContaining({
      variables: {
        input: {
          contextIds: ['jest', 'test'],
          extensionId:
            'ari:cloud:ecosystem::extension/app-id/environment-id/static/module-key',
          payload: {
            context: {
              cloudId: 'my-cloud-id',
              localId: 'my-local-id',
              extensionData: extensionDataObj,
              moduleKey: 'module-key',
            },
            effects: [{ type: 'initialize' }],
            state: {},
          },
        },
      },
    }),
  );

  const newExtensionDataObj = {
    isConfig: true,
    config: { my: 'config', myOther: 'configgo' },
    contentId: '123',
    selectedText: 'new inspiration',
  };

  // Re render with new effect shape
  dispatchRef.current({
    type: 'render',
    extensionData: newExtensionDataObj,
  });
  expect(mockApolloClient.mutate).toBeCalledTimes(2);
  expect(mockApolloClient.mutate).toHaveBeenLastCalledWith(
    expect.objectContaining({
      variables: {
        input: {
          contextIds: ['jest', 'test'],
          extensionId:
            'ari:cloud:ecosystem::extension/app-id/environment-id/static/module-key',
          payload: {
            context: {},
            effects: [
              {
                type: 'render',
                coreData: {
                  cloudId: 'my-cloud-id',
                  localId: 'my-local-id',
                  moduleKey: 'module-key',
                },
                extensionData: newExtensionDataObj,
                state: {},
              },
            ],
            state: {},
          },
        },
      },
    }),
  );
});

it('can dispatch a render effect and handle an unexpected/unsuccessful response', async () => {
  const dispatchRef = createDispatchRef();

  const mockApolloClient = mockFailedApolloClientResponse(
    'oh no, an oops happened',
  );

  const view = render(
    <MyWrappedExtension
      analyticsClient={mockAnalyticsClient()}
      apolloClient={(mockApolloClient as unknown) as ApolloClient<any>}
      contextIds={['jest', 'test']}
      extensionId="ari:cloud:ecosystem::extension/app-id/environment-id/static/module-key"
      setDispatch={(dispatch) => (dispatchRef.current = dispatch)}
      coreData={{ cloudId: 'my-cloud-id', localId: 'my-local-id' }}
    />,
  );

  // Initial render
  view.getByText(`loading: true`);

  expect(await view.findByText(`loading: false`)).toBeTruthy();
  expect(await view.findByText(`forgeDoc: "no forgeDoc"`)).toBeTruthy();
  expect(
    await view.findByText(
      `error: "Unexpected error occurred. Try refreshing your browser."`,
    ),
  ).toBeTruthy();
});

it('can recover after an unexpected/unsuccessful response', async () => {
  const dispatchRef = createDispatchRef();

  // bad response then good response
  const mockApolloClient = {
    mutate: jest
      .fn()
      .mockImplementationOnce(
        mockFailedApolloClientResponse('oh no, an oops happened').mutate,
      )
      .mockImplementationOnce(
        mockSuccessfulApolloClientResponse([
          {
            type: 'result',
            forgeDoc: 'stub forgeDoc',
            state: {},
          },
        ]).mutate,
      ),
  };

  const view = render(
    <MyWrappedExtension
      analyticsClient={mockAnalyticsClient()}
      apolloClient={(mockApolloClient as unknown) as ApolloClient<any>}
      contextIds={['jest', 'test']}
      extensionId="ari:cloud:ecosystem::extension/app-id/environment-id/static/module-key"
      setDispatch={(dispatch) => (dispatchRef.current = dispatch)}
      coreData={{ cloudId: 'my-cloud-id', localId: 'my-local-id' }}
    />,
  );

  // Initial render
  view.getByText(`loading: true`);

  expect(await view.findByText(`loading: false`)).toBeTruthy();
  await view.findByText(`forgeDoc: "no forgeDoc"`);
  await view.findByText(
    `error: "Unexpected error occurred. Try refreshing your browser."`,
  );

  dispatchRef.current({ type: 'render', extensionData: {} });

  expect(await view.findByText(`loading: false`)).toBeTruthy();
  await view.findByText(`forgeDoc: "stub forgeDoc"`);
  await view.findByText(`error: "no error"`);
});

it('keeps forgeDoc consistent with no effects in response', async () => {
  const dispatchRef = createDispatchRef();

  // bad response then good response
  const mockApolloClient = {
    mutate: jest
      .fn()
      .mockImplementationOnce(
        mockSuccessfulApolloClientResponse([
          {
            type: 'result',
            forgeDoc: 'stub forgeDoc',
            state: {},
          },
        ]).mutate,
      )
      .mockImplementationOnce(
        // an empty effect array can be returned if no state changes happen during reconciliation
        mockSuccessfulApolloClientResponse([]).mutate,
      ),
  };

  const view = render(
    <MyWrappedExtension
      analyticsClient={mockAnalyticsClient()}
      apolloClient={(mockApolloClient as unknown) as ApolloClient<any>}
      contextIds={['jest', 'test']}
      extensionId="ari:cloud:ecosystem::extension/app-id/environment-id/static/module-key"
      setDispatch={(dispatch) => (dispatchRef.current = dispatch)}
      coreData={{ cloudId: 'my-cloud-id', localId: 'my-local-id' }}
    />,
  );

  // Initial render
  view.getByText(`loading: true`);

  expect(await view.findByText(`loading: false`)).toBeTruthy();
  expect(await view.findByText(`forgeDoc: "stub forgeDoc"`)).toBeTruthy();

  dispatchRef.current({
    type: 'event',
    extensionData: {},
    handler: { componentKey: 'NA', prop: 'onClick' },
    args: [],
  });

  expect(await view.findByText(`loading: false`)).toBeTruthy();
  expect(await view.findByText(`forgeDoc: "stub forgeDoc"`)).toBeTruthy();
});

it('sends an analytics event on mount', async () => {
  const analyticsClient = mockAnalyticsClient();
  const mockApolloClient = mockSuccessfulApolloClientResponse([
    {
      type: 'result',
      forgeDoc: 'stub forgeDoc',
      state: {},
    },
  ]);
  const view = render(
    <MyWrappedExtension
      analyticsClient={analyticsClient}
      apolloClient={(mockApolloClient as unknown) as ApolloClient<any>}
      contextIds={['jest', 'test']}
      extensionId="ari:cloud:ecosystem::extension/app-id/environment-id/static/test-key"
      setDispatch={(dispatch) => jest.fn()}
      coreData={{ cloudId: 'my-cloud-id', localId: 'my-local-id' }}
    />,
  );

  await view.findByText(`loading: false`);

  expect(analyticsClient.sendUIEvent).toHaveBeenCalledWith({
    action: 'viewed',
    actionSubject: 'forgeUIExtension',
    actionSubjectId: 'editorMacro',
    attributes: {
      moduleType: 'jest:test',
    }, // ARI attribute extraction is tested in the @atlassian/forge-ui package
    eventType: 'ui',
    source: 'unknown',
  });
});

it('adds entryPoint to the payload for payload versions 1 and 2', async () => {
  const client = (mockSuccessfulApolloClientResponse([
    {
      type: 'result',
      forgeDoc: 'stub forgeDoc',
      state: {},
    },
  ]) as unknown) as ApolloClient<any>;
  const props = {
    apolloClient: client,
    contextIds: ['jest', 'test'],
    extensionId:
      'ari:cloud:ecosystem::extension/app-id/environment-id/static/module-key',
    coreData: { cloudId: 'my-cloud-id', localId: 'my-local-id' },
    entryPoint: 'config',
  };
  const { result } = renderHook(useWebRuntime, {
    initialProps: props,
    wrapper: ({ children }) => (
      <ForgeUIAnalyticsListener
        client={mockAnalyticsClient()}
        actionSubjectId="jest:test"
      >
        {children}
      </ForgeUIAnalyticsListener>
    ),
  });
  const [dispatch] = result.current;
  await dispatch({ type: 'render', extensionData: {} });

  expect(client.mutate).toHaveBeenLastCalledWith(
    expect.objectContaining({
      variables: {
        input: {
          contextIds: ['jest', 'test'],
          extensionId:
            'ari:cloud:ecosystem::extension/app-id/environment-id/static/module-key',
          entryPoint: 'config',
          payload: {
            config: undefined,
            context: {
              cloudId: 'my-cloud-id',
              localId: 'my-local-id',
              moduleKey: 'module-key',
              extensionData: {},
            },
            effects: [{ type: 'initialize' }],
            state: {},
          },
        },
      },
    }),
  );
  // payload version is now 2

  await dispatch({ type: 'render', extensionData: {} });

  expect(client.mutate).toHaveBeenLastCalledWith(
    expect.objectContaining({
      variables: {
        input: {
          contextIds: ['jest', 'test'],
          extensionId:
            'ari:cloud:ecosystem::extension/app-id/environment-id/static/module-key',
          entryPoint: 'config',
          payload: {
            context: {},
            state: {},
            effects: [
              {
                coreData: {
                  cloudId: 'my-cloud-id',
                  localId: 'my-local-id',
                  moduleKey: 'module-key',
                },
                extensionData: {},
                state: {},
                type: 'render',
              },
            ],
          },
        },
      },
    }),
  );

  expect(client.mutate).toBeCalledTimes(2);
});

it('expands out temporaryContext in downgradeInvokeAuxEffectsInput()', async () => {
  const client = (mockSuccessfulApolloClientResponse([
    {
      type: 'render',
      aux: 'stub forgeDoc',
      state: {},
    },
  ]) as unknown) as ApolloClient<any>;
  const props = {
    apolloClient: client,
    contextIds: ['jest', 'test'],
    extensionId:
      'ari:cloud:ecosystem::extension/app-id/environment-id/static/module-key',
    coreData: { cloudId: 'my-cloud-id', localId: 'my-local-id' },
    temporaryContext: { testKey: 'testValue' },
  };
  const { result } = renderHook(useWebRuntime, {
    initialProps: props,
    wrapper: ({ children }) => (
      <ForgeUIAnalyticsListener
        client={mockAnalyticsClient()}
        actionSubjectId="jest:test"
      >
        {children}
      </ForgeUIAnalyticsListener>
    ),
  });
  const [dispatch] = result.current;
  await dispatch({
    type: 'render',
    extensionData: {
      test: 'extension data',
    },
  });

  expect(client.mutate).toHaveBeenLastCalledWith(
    expect.objectContaining({
      variables: {
        input: {
          contextIds: ['jest', 'test'],
          extensionId:
            'ari:cloud:ecosystem::extension/app-id/environment-id/static/module-key',
          payload: {
            config: undefined,
            context: {
              cloudId: 'my-cloud-id',
              localId: 'my-local-id',
              extensionData: {
                test: 'extension data',
              },
              testKey: 'testValue',
              moduleKey: 'module-key',
            },
            effects: [{ type: 'initialize' }],
            state: {},
          },
        },
      },
    }),
  );

  await dispatch({ type: 'render', extensionData: {} });

  expect(client.mutate).toHaveBeenLastCalledWith(
    expect.objectContaining({
      variables: {
        input: {
          contextIds: ['jest', 'test'],
          extensionId:
            'ari:cloud:ecosystem::extension/app-id/environment-id/static/module-key',
          payload: {
            config: undefined,
            context: {
              cloudId: 'my-cloud-id',
              localId: 'my-local-id',
              extensionData: {},
              testKey: 'testValue',
              moduleKey: 'module-key',
            },
            effects: [{ type: 'initialize' }],
            state: {},
          },
        },
      },
    }),
  );

  expect(client.mutate).toBeCalledTimes(2);
});

it('does not return an error when the invocation error returns client effects', async () => {
  const dispatchRef = createDispatchRef();
  const mockApolloClient = mockSuccessfulApolloClientResponseWithXenError(
    [
      {
        type: 'result',
        forgeDoc: 'stub forgeDoc',
        state: {},
      },
    ],
    'Authentication required',
  );

  const view = render(
    <MyWrappedExtension
      analyticsClient={mockAnalyticsClient()}
      apolloClient={(mockApolloClient as unknown) as ApolloClient<any>}
      contextIds={['jest', 'test']}
      extensionId="ari:cloud:ecosystem::extension/app-id/environment-id/static/module-key"
      setDispatch={(dispatch) => (dispatchRef.current = dispatch)}
      coreData={{ cloudId: 'my-cloud-id', localId: 'my-local-id' }}
    />,
  );

  // Initial render
  view.getByText(`loading: true`);

  expect(await view.findByText(`forgeDoc: "stub forgeDoc"`)).toBeTruthy();
  expect(await view.findByText(`error: "no error"`)).toBeTruthy();
});
