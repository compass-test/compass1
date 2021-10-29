jest.mock('@atlassian/bridge-core', () => {
  let callbacksMap = {} as any;

  return {
    createIframeBridge: jest.fn().mockImplementation(({ features }) => {
      Object.entries(features).forEach(([eventKey, callback]) => {
        callbacksMap[eventKey] = callback;
      });

      return {
        open: jest.fn().mockImplementation(() => jest.fn()),
      };
    }),

    __mockCallBridge: (eventKey: string, payload: any) => {
      return callbacksMap[eventKey](payload);
    },
  };
});

import React from 'react';
import { IntlProvider } from 'react-intl';
import {
  render,
  fireEvent,
  waitForElement,
  getByTestId,
} from '@testing-library/react';
import { parse } from '@atlassian/cs-ari';
import {
  ExtensionProvider,
  getQuickInsertItemsFromModule,
  MenuItem,
  getExtensionKeyAndNodeKey,
} from '@atlaskit/editor-common';
import { combineExtensionProviders } from '@atlaskit/editor-common/extensions';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { catalog } from '@atlassiansox/metal-client';
import { ErrorPayload } from '@atlassiansox/metal-client/dist/client/es/core/error/types';
import { createMockClient } from 'mock-apollo-client';
import { clear as clearUserAgent, mockUserAgent } from 'jest-useragent-mock';

import {
  temporarilySilenceActAndAtlaskitDeprecationWarnings,
  provideMockMetalClient,
  getHasBeenCalledPromise,
} from '@atlassian/aux-test-utils';
temporarilySilenceActAndAtlaskitDeprecationWarnings();

import * as bridge from '@atlassian/bridge-core';

import { getExtensionListQuery, Extension } from '@atlassian/forge-ui';
import { ProductEnvironment } from '@atlassian/forge-ui-types';
import { extensionIdToAnalyticsAttributes } from '@atlassian/forge-ui';
import { Iframe } from '@atlassian/forge-ui/iframe';

import EditorActions from '@atlaskit/editor-core/src/actions';
import { EventDispatcher } from '@atlaskit/editor-core/src/event-dispatcher';
import EditorContext from '@atlaskit/editor-core/src/ui/EditorContext';
import { getContextPanel } from '@atlaskit/editor-core/src/plugins/extension/context-panel';

import { ForgeExtensionParameters } from '../ForgeEditorExtensionNext';
import getForgeExtensionProviderNext, {
  createDescriptionWithAppOwner,
  createTitleWithEnvironmentInfo,
} from '../getForgeExtensionProviderNext';
import { mockAnalyticsWebClient } from './__fixtures__';
import {
  createEditorView,
  configTextFieldLabel,
  defaultArgsNext,
  defaultExtensionId,
  defaultExtensionParameters,
  extensionData,
  extensionsByType,
  getExtensionProviderNextPromise,
  getNodeRenderer,
  hostedResourcesExtensionId,
  mockClient,
  mockContent,
  newConfigExtensionId,
  newConfigErrorExtensionId,
  page,
  secondExtensionId,
  temporaryContext,
  testExtensionKey,
  updateExtensionNode,
} from './__fixtures__/getForgeExtensionProvider';
import { EXTENSION_NAMESPACE } from '../constants';

jest.mock('memoize-one', () => ({
  __esModule: true,
  default: (fn: Function) => fn,
}));

jest.mock('@atlassian/forge-ui/iframe', () => {
  const actualImplementation = jest.requireActual('@atlassian/forge-ui/iframe');
  return {
    ...actualImplementation,
    Iframe: jest.fn(actualImplementation.Iframe),
  };
});

const createIframeBridge = bridge.createIframeBridge;
// @ts-ignore
const __mockCallBridge = bridge.__mockCallBridge;

const {
  metalMetricSubmitSpy,
  metalErrorSubmitSpy,
  metalClientDestroySpy,
} = provideMockMetalClient();

describe('getForgeExtensionProviderNext', () => {
  beforeEach(() => {
    const supportedBrowser =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'; // Chrome
    mockUserAgent(supportedBrowser);
  });
  afterEach(() => {
    clearUserAgent();
    jest.clearAllMocks();
  });

  it('can be used to render the extension', async () => {
    const { Renderer } = getNodeRenderer({
      extensionProvider: getExtensionProviderNextPromise(),
    });
    const renderResult = render(
      <Renderer
        node={{
          extensionKey: 'xen:macro',
          extensionType: EXTENSION_NAMESPACE,
          parameters: defaultExtensionParameters,
          localId: 'c145e554-f571-4208-a0f1-2170e1987722',
        }}
      />,
    );
    await expect(renderResult.findByText(mockContent)).resolves.toBeDefined();
  });

  describe('Custom UI', () => {
    const hostedResourcesExtensionParameters: ForgeExtensionParameters = {
      localId: 'test-local-id',
      extensionId: hostedResourcesExtensionId,
      extensionTitle: 'cheese',
      extension: extensionsByType[hostedResourcesExtensionId],
      config: {
        displayName: 'Fred',
        userName: 'fbloggs',
      },
    };

    it('renders a custom UI macro', async () => {
      const { Renderer } = getNodeRenderer({
        extensionKey: parse(hostedResourcesExtensionId).resourceId!,
        extensionProvider: getExtensionProviderNextPromise({
          shouldRenderHostedResources: true,
        }),
      });
      const renderResult = render(
        <Renderer
          node={{
            extensionKey: parse(hostedResourcesExtensionId).resourceId!,
            extensionType: EXTENSION_NAMESPACE,
            parameters: hostedResourcesExtensionParameters,
            localId: 'c145e554-f571-4208-a0f1-2170e1987722',
          }}
        />,
      );
      const iframeContainer = (await renderResult.findByTestId(
        'hosted-resources-iframe-container',
      )) as HTMLDivElement;
      const iframe = (await waitForElement(
        () => getByTestId(iframeContainer, 'hosted-resources-iframe'),
        { container: iframeContainer },
      )) as HTMLIFrameElement;

      expect(iframe.src).toEqual(
        'https://install-id.cdn.stg.atlassian-dev.net/app-id/env-id/1.3.5/resource-path/index.html',
      );
    });

    it('renders a custom UI macro that opens a dynamic modal', async () => {
      const createIframeBridgeMock = createIframeBridge as any;

      const { Renderer } = getNodeRenderer({
        extensionKey: parse(hostedResourcesExtensionId).resourceId!,
        extensionProvider: getExtensionProviderNextPromise({
          shouldRenderHostedResources: true,
        }),
      });
      const renderResult = render(
        <Renderer
          node={{
            extensionKey: parse(hostedResourcesExtensionId).resourceId!,
            extensionType: EXTENSION_NAMESPACE,
            parameters: hostedResourcesExtensionParameters,
            localId: 'c145e554-f571-4208-a0f1-2170e1987722',
          }}
        />,
      );
      const iframeContainer = (await renderResult.findByTestId(
        'hosted-resources-iframe-container',
      )) as HTMLDivElement;

      const iframe = (await waitForElement(
        () => getByTestId(iframeContainer, 'hosted-resources-iframe'),
        { container: iframeContainer },
      )) as HTMLIFrameElement;
      fireEvent.load(iframe);

      await __mockCallBridge('openModal', { data: { some: 'data' } });

      const modal = (await renderResult.findByTestId(
        'custom-ui-modal-dialog',
      )) as HTMLDivElement;

      expect(createIframeBridgeMock).toHaveBeenCalled();
      expect(modal).toBeDefined();
    });

    it('passes context correctly to the Iframe component', async () => {
      const { Renderer } = getNodeRenderer({
        extensionKey: parse(hostedResourcesExtensionId).resourceId!,
        extensionProvider: getExtensionProviderNextPromise({
          shouldRenderHostedResources: true,
        }),
      });
      const renderResult = render(
        <Renderer
          node={{
            extensionKey: parse(hostedResourcesExtensionId).resourceId!,
            extensionType: EXTENSION_NAMESPACE,
            parameters: hostedResourcesExtensionParameters,
            localId: 'c145e554-f571-4208-a0f1-2170e1987722',
          }}
        />,
      );
      const iframeContainer = (await renderResult.findByTestId(
        'hosted-resources-iframe-container',
      )) as HTMLDivElement;
      await waitForElement(
        () => getByTestId(iframeContainer, 'hosted-resources-iframe'),
        { container: iframeContainer },
      );
      expect(Iframe).toHaveBeenLastCalledWith(
        expect.objectContaining({
          extensionData: {
            ...defaultArgsNext.extensionData,
            config: hostedResourcesExtensionParameters.config,
          },
        }),
        expect.anything(),
      );
    });

    it('does not render a Custom UI Macro if consent has not been given', async () => {
      const { Renderer } = getNodeRenderer({
        extensionKey: parse(hostedResourcesExtensionId).resourceId!,
        extensionProvider: getExtensionProviderNextPromise({
          shouldRenderHostedResources: true,
          egressConsentFlowEnabled: true,
        }),
      });
      const { findByTestId, getByTestId } = render(
        <Renderer
          node={{
            extensionKey: parse(hostedResourcesExtensionId).resourceId!,
            extensionType: EXTENSION_NAMESPACE,
            parameters: hostedResourcesExtensionParameters,
            localId: 'c145e554-f571-4208-a0f1-2170e1987722',
          }}
        />,
      );

      await findByTestId('three-lo-prompt');

      expect(() => getByTestId('hosted-resources-iframe')).toThrow();
    });
  });

  it('renders extension with config from ADF node', async () => {
    const testConfigContent = 'test-config-content';
    const { Renderer } = getNodeRenderer({
      extensionProvider: getExtensionProviderNextPromise(),
    });
    const renderResult = render(
      <Renderer
        node={{
          extensionKey: 'xen:macro',
          extensionType: EXTENSION_NAMESPACE,
          parameters: {
            ...defaultExtensionParameters,
            config: { testConfigProperty: testConfigContent },
          },
          localId: 'c145e554-f571-4208-a0f1-2170e1987722',
        }}
      />,
    );

    await expect(renderResult.findByText(mockContent)).resolves.toBeDefined();
    await expect(
      renderResult.findByText(testConfigContent),
    ).resolves.toBeDefined();
  });

  const createADFNodeUsingManifestAPI = (extensionId: string) => {
    return {
      type: 'extension',
      attrs: {
        extensionType: EXTENSION_NAMESPACE,
        extensionKey: parse(extensionId).resourceId!,
        parameters: {
          localId: defaultExtensionParameters.localId,
          extensionId,
          extensionTitle: extensionsByType[extensionId].properties.title,
        },
      },
    };
  };

  test.each([
    [defaultExtensionId, createADFNodeUsingManifestAPI(defaultExtensionId)],
    [secondExtensionId, createADFNodeUsingManifestAPI(secondExtensionId)],
  ])(
    'renders an ADF node created using the manifest API: %s',
    async (_, { attrs: { extensionType, extensionKey, parameters } }) => {
      const [extKey, nodeKey] = getExtensionKeyAndNodeKey(
        extensionKey,
        extensionType,
      );
      const { Renderer } = getNodeRenderer({
        extensionType,
        extensionKey: extKey,
        nodeKey,
        extensionProvider: getExtensionProviderNextPromise(),
      });
      const renderResult = render(
        <Renderer
          node={{
            extensionKey: extensionKey,
            extensionType: extensionType,
            parameters,
            localId: 'c145e554-f571-4208-a0f1-2170e1987722',
          }}
        />,
      );
      await expect(
        renderResult.findByText(parameters.extensionId),
      ).resolves.toBeDefined();
    },
  );

  describe('analytics events', () => {
    it('fires the forgeUIExtension viewed event', async () => {
      const testConfigContent = 'test-config-content';
      const { Renderer } = getNodeRenderer({
        extensionProvider: getExtensionProviderNextPromise(),
      });
      const renderResult = render(
        <Renderer
          node={{
            extensionKey: 'xen:macro',
            extensionType: EXTENSION_NAMESPACE,
            parameters: {
              ...defaultExtensionParameters,
              config: { testConfigProperty: testConfigContent },
            },
            localId: 'c145e554-f571-4208-a0f1-2170e1987722',
          }}
        />,
      );

      await expect(
        renderResult.findByText(testConfigContent),
      ).resolves.toBeDefined();

      expect(mockAnalyticsWebClient.sendUIEvent).toHaveBeenCalledWith({
        action: 'viewed',
        actionSubject: 'forgeUIExtension',
        actionSubjectId: 'editorMacro',
        attributes: {
          localId: defaultExtensionParameters.localId,
          appId: 'app-id',
          environmentId: 'environment-id',
          extensionKey: testExtensionKey,
          groupId: 'static',
          moduleType: 'viewPageScreen',
        },
        source: 'unknown',
        eventType: 'ui',
      });
    });
  });

  test.each([false, true])(
    'glass pane to prevent interaction when isEditing is %s',
    async (isEditing) => {
      const {
        attrs: { extensionType, extensionKey, parameters },
      } = createADFNodeUsingManifestAPI(defaultExtensionId);
      const [extKey, nodeKey] = getExtensionKeyAndNodeKey(
        extensionKey,
        extensionType,
      );
      const extensionProviderPromise = getForgeExtensionProviderNext({
        ...defaultArgsNext,
        isEditing,
      });
      const { Renderer } = getNodeRenderer({
        extensionType,
        extensionKey: extKey,
        nodeKey,
        extensionProvider: extensionProviderPromise,
      });
      const { findByText, queryByTestId } = render(
        <Renderer
          node={{
            extensionKey: extensionKey,
            extensionType: extensionType,
            parameters,
            localId: 'c145e554-f571-4208-a0f1-2170e1987722',
          }}
        />,
      );
      await expect(findByText(parameters.extensionId)).resolves.toBeDefined();
      expect(!!queryByTestId('GlassPane')).toEqual(isEditing);
    },
  );

  it('mounts the extension once when rendered multiple times', async () => {
    const mockApolloClientMutate = jest.spyOn(mockClient, 'mutate');
    /**
     * An 'initialize' effect is dispatched each time the extension is mounted.
     * Knowing this, we will use the number of times the ApolloClient's mutate method
     * is called to count how many times it mounts.
     */
    const {
      attrs: { extensionType, extensionKey, parameters },
    } = createADFNodeUsingManifestAPI(defaultExtensionId);
    const [extKey, nodeKey] = getExtensionKeyAndNodeKey(
      extensionKey,
      extensionType,
    );

    const extensionProviderPromise = getForgeExtensionProviderNext(
      defaultArgsNext,
    );
    const { Renderer } = getNodeRenderer({
      extensionType,
      extensionKey: extKey,
      nodeKey,
      extensionProvider: extensionProviderPromise,
    });
    const { findByText, rerender } = render(
      <Renderer
        node={{
          extensionKey: extensionKey,
          extensionType: extensionType,
          parameters,
          localId: 'c145e554-f571-4208-a0f1-2170e1987722',
        }}
      />,
    );
    await expect(findByText(mockContent)).resolves.toBeDefined();
    rerender(
      <Renderer
        node={{
          extensionKey: extensionKey,
          extensionType: extensionType,
          parameters,
          localId: 'c145e554-f571-4208-a0f1-2170e1987722',
        }}
      />,
    );
    await expect(findByText(mockContent)).resolves.toBeDefined();
    expect(mockApolloClientMutate).toHaveBeenCalledTimes(1);
  });

  it('correctly creates quickinsert items from manifest', async () => {
    const extensionProvider = await getForgeExtensionProviderNext(
      defaultArgsNext,
    );
    const extensions = await extensionProvider.getExtensions();

    const quickInsertItems = getQuickInsertItemsFromModule<MenuItem>(
      extensions,
      (item) => {
        return item;
      },
    );

    for (const [i, quickInsertItem] of quickInsertItems.entries()) {
      const currentExtension = Object.values(extensionsByType)[i];
      const extensionKey = parse(currentExtension.id).resourceId!;
      expect(quickInsertItem).toStrictEqual({
        key: `${extensionKey}:forge-macro`,
        title: createTitleWithEnvironmentInfo(
          currentExtension.properties.title,
          currentExtension.environmentType,
        ),
        extensionType: EXTENSION_NAMESPACE,
        description: createDescriptionWithAppOwner(
          currentExtension.properties.description,
          currentExtension.appOwner,
        ),
        summary: undefined,
        documentationUrl: undefined,
        featured: false,
        keywords: [],
        categories: [],
        icon: expect.any(Function),
        node: expect.any(Function),
      });
      if (typeof quickInsertItem.node !== 'function') {
        throw Error('Quick insert item should be a function');
      }
      const node = await quickInsertItem.node();
      expect(node).toStrictEqual({
        attrs: {
          extensionKey,
          extensionType: EXTENSION_NAMESPACE,
          parameters: {
            extensionId: currentExtension.id,
            extensionTitle: createTitleWithEnvironmentInfo(
              currentExtension.properties.title,
              currentExtension.environmentType,
            ),
            localId: i.toString(),
          },
          text: createTitleWithEnvironmentInfo(
            currentExtension.properties.title,
            currentExtension.environmentType,
          ),
        },
        type: 'extension',
      });
      expect(mockAnalyticsWebClient.sendUIEvent).toHaveBeenNthCalledWith(
        i + 1,
        {
          action: 'inserted',
          actionSubject: 'forgeUIExtension',
          actionSubjectId: 'editorMacro',
          attributes: {
            ...extensionIdToAnalyticsAttributes(currentExtension.id),
            localId: i.toString(),
          },
          eventType: 'ui',
          source: 'editPageScreen',
        },
      );
    }
  });

  it('passes coreData, extensionData and temporaryContext correctly to lambda', async () => {
    const { Renderer } = getNodeRenderer({
      extensionProvider: getExtensionProviderNextPromise(),
    });
    const sampleReference = {
      type: 'paragraph',
      content: [
        {
          text: 'test',
          type: 'text',
        },
      ],
    };

    const renderResult = render(
      <Renderer
        node={{
          extensionKey: 'xen:macro',
          extensionType: EXTENSION_NAMESPACE,
          parameters: defaultExtensionParameters,
          localId: 'c145e554-f571-4208-a0f1-2170e1987722',
        }}
        references={[sampleReference]}
      />,
    );

    const { cloudId, ...temporaryContextWithoutCloudId } = temporaryContext;

    await expect(
      renderResult.findByText(
        JSON.stringify({
          localId: defaultExtensionParameters.localId,
          cloudId: defaultArgsNext.cloudId,
          moduleKey: testExtensionKey,
          ...temporaryContextWithoutCloudId,
          extensionContext: {
            type: 'macro',
            references: [sampleReference],
          },
          isConfig: false,
          extensionData: {
            ...extensionData,
            references: [sampleReference],
            isConfig: false,
          },
        }),
      ),
    ).resolves.toBeDefined();
  });

  describe('config panel', () => {
    const renderConfigPanel = async (extensionData: Extension) => {
      const getProviderFactory = (
        extensionProvider: Promise<ExtensionProvider>,
      ) =>
        ProviderFactory.create({
          extensionProvider: Promise.resolve(
            combineExtensionProviders([extensionProvider]),
          ),
        });
      const {
        attrs: { extensionType, extensionKey, parameters },
      } = createADFNodeUsingManifestAPI(extensionData.id);
      const [extKey, nodeKey] = getExtensionKeyAndNodeKey(
        extensionKey,
        extensionType,
      );
      const extensionProvider = getForgeExtensionProviderNext(defaultArgsNext);
      const providerFactory = getProviderFactory(extensionProvider);

      const { editorView, actions } = await createEditorView(
        providerFactory,
        extensionType,
        extensionKey,
        {
          extensionId: extensionData.id,
          extensionTitle: extensionData.properties.title,
          localId: parameters.localId,
          extension: {
            id: 'default-extension-id',
            appOwner: {
              name: 'App Owner',
              accountId: '123',
              picture: 'path/to/img',
            },
            environmentType: ProductEnvironment.DEVELOPMENT,
            environmentId: '123',
            installationId: '234',
            appVersion: '1.0.0',
            properties: {},
            type: 'xen:macro',
          },
        },
      );

      await updateExtensionNode(
        extensionProvider,
        extensionType,
        extKey,
        nodeKey,
        parameters.localId,
        parameters.extensionId,
        actions,
      );

      const contextPanel = getContextPanel(true)(editorView.state);
      expect(contextPanel).toBeTruthy();
      const editorActions = new EditorActions();
      const eventDispatcher = new EventDispatcher();
      editorActions._privateRegisterEditor(editorView, eventDispatcher);

      return render(
        <IntlProvider locale="en">
          <EditorContext editorActions={editorActions}>
            {contextPanel!}
          </EditorContext>
        </IntlProvider>,
      );
    };

    it('opens the config panel and renders with the correct schema', async () => {
      const { findByText } = await renderConfigPanel(
        extensionsByType[newConfigExtensionId],
      );

      await expect(findByText(configTextFieldLabel)).resolves.toBeDefined();
    });

    it('fires metal and analytics events and renders error message when an error occurs', async () => {
      const metalClientErrorSubmitHasBeenCalled = getHasBeenCalledPromise(
        metalErrorSubmitSpy,
      );

      const { findByText } = await renderConfigPanel(
        extensionsByType[newConfigErrorExtensionId],
      );

      const expectedErrorMessage =
        'There was an error invoking the function - x is not defined';

      await expect(findByText(expectedErrorMessage)).resolves.toBeDefined();
      expect(mockAnalyticsWebClient.sendUIEvent).toHaveBeenCalledWith({
        action: 'errored',
        actionSubject: 'forgeUIExtension',
        actionSubjectId: 'editorMacro',
        attributes: {
          errorName: 'Error',
          errorMessage: expectedErrorMessage,
        },
        source: 'editPageScreen',
        eventType: 'ui',
      });
      await metalClientErrorSubmitHasBeenCalled;
      expect(metalErrorSubmitSpy).toHaveBeenCalledTimes(1);
      expect(metalErrorSubmitSpy).toHaveBeenCalledWith({
        component: 'getForgeExtensionProvider',
        page,
        name: catalog.error.COMPONENT_API,
      });
    });

    it('passes coreData, extensionData and temporaryContext correctly to config lambda function', async () => {
      const { findByText } = await renderConfigPanel(
        extensionsByType[newConfigExtensionId],
      );

      const { cloudId, ...temporaryContextWithoutCloudId } = temporaryContext;

      await expect(
        findByText(
          JSON.stringify({
            isConfig: true,
            cloudId: defaultArgsNext.cloudId,
            ...temporaryContextWithoutCloudId,
            extensionData: {
              ...extensionData,
              isConfig: true,
            },
            localId: defaultExtensionParameters.localId,
          }),
        ),
      ).resolves.toBeDefined();
    });
  });

  describe('metrics', () => {
    it('submits a latency metric event to metal after the extension list is retrieved', async () => {
      const metalClientMetricSubmitHasBeenCalled = getHasBeenCalledPromise(
        metalMetricSubmitSpy,
      );

      await getForgeExtensionProviderNext(defaultArgsNext);
      await metalClientMetricSubmitHasBeenCalled;
      expect(metalMetricSubmitSpy).toHaveBeenCalledWith({
        component: 'getForgeExtensionProvider',
        page,
        name: catalog.performance.COMPONENT_READY,
        value: expect.any(Number),
      });
    });

    it('does not submit a latency metric event to metal if there is a GraphQL error', async () => {
      const metalClientErrorSubmitHasBeenCalled = getHasBeenCalledPromise(
        metalErrorSubmitSpy,
      );

      const nullDataMockClient = createMockClient();
      nullDataMockClient.setRequestHandler(
        getExtensionListQuery(true),
        async () => ({
          data: null,
          errors: [{ extensions: { errorSource: 'UNDERLYING_SERVICE' } }],
        }),
      );
      await getForgeExtensionProviderNext({
        ...defaultArgsNext,
        apolloClient: nullDataMockClient,
      });

      await metalClientErrorSubmitHasBeenCalled;

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
          component: 'getForgeExtensionProvider',
          page,
          name: catalog.error.COMPONENT_GRAPHQL,
        },
      ],
      [
        'an underlying service error',
        [{ extensions: { errorSource: 'UNDERLYING_SERVICE' } }],
        {
          component: 'getForgeExtensionProvider',
          page,
          name: catalog.error.COMPONENT_API,
        },
      ],
      [
        'an unknown error',
        [{ extensions: { errorSource: 'UNKNOWN' } }],
        {
          component: 'getForgeExtensionProvider',
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
          component: 'getForgeExtensionProvider',
          page,
          name: catalog.error.COMPONENT_API,
        },
      ],
    ];
    test.each(testCases)(
      'correctly handles reporting of %s',
      async (_, responseErrors, expectedMetalErrorPayload) => {
        const metalClientErrorSubmitHasBeenCalled = getHasBeenCalledPromise(
          metalErrorSubmitSpy,
        );
        const errorMockClient = createMockClient();
        errorMockClient.setRequestHandler(
          getExtensionListQuery(true),
          async () => ({
            data: null,
            errors: responseErrors,
          }),
        );
        await getForgeExtensionProviderNext({
          ...defaultArgsNext,
          apolloClient: errorMockClient,
        });
        await metalClientErrorSubmitHasBeenCalled;
        expect(metalErrorSubmitSpy).toHaveBeenCalledTimes(1);
        expect(metalErrorSubmitSpy).toHaveBeenCalledWith(
          expectedMetalErrorPayload,
        );
      },
    );

    it('does not submit an error event to metal if the extension list is retrieved successfully', async () => {
      const metalClientMetricSubmitHasBeenCalled = getHasBeenCalledPromise(
        metalMetricSubmitSpy,
      );

      await getForgeExtensionProviderNext(defaultArgsNext);
      await metalClientMetricSubmitHasBeenCalled;
      expect(metalErrorSubmitSpy).not.toHaveBeenCalled();
    });

    it('destroys the metal client after creating it', async () => {
      const metalClientDestroySpyHasBeenCalled = getHasBeenCalledPromise(
        metalClientDestroySpy,
      );

      await getForgeExtensionProviderNext(defaultArgsNext);
      await metalClientDestroySpyHasBeenCalled;
      expect(metalClientDestroySpy).toHaveBeenCalled();
    });
  });
});
