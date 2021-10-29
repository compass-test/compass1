import {
  ExtensionParams,
  ExtensionProvider,
  ExtensionManifest,
  resolveImport,
} from '@atlaskit/editor-common';
import { createMockClient } from 'mock-apollo-client';
import ApolloClient from 'apollo-client';
import Loadable from 'react-loadable';

import { temporarilySilenceActAndAtlaskitDeprecationWarnings } from '@atlassian/aux-test-utils';
temporarilySilenceActAndAtlaskitDeprecationWarnings();

import {
  getActiveTunnelsQuery,
  getExtensionListQuery,
  invokeAuxEffectsMutation,
  Extension,
} from '@atlassian/forge-ui';
import {
  LegacyRenderEffect,
  LegacyBackendRuntimePayload,
  ProductEnvironment,
  EnvironmentType,
} from '@atlassian/forge-ui-types';

import {
  ExtensionAPI,
  UpdateExtension,
} from '@atlaskit/editor-common/extensions';
import {
  doc,
  extension,
  DocBuilder,
} from '@atlaskit/editor-test-helpers/doc-builder';
import { EditorProps } from '@atlaskit/editor-core';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { createEditorFactory } from '@atlaskit/editor-test-helpers/create-editor';
import { pluginKey } from '@atlaskit/editor-core/src/plugins/extension/plugin-key';
import { setEditingContextToContextPanel } from '@atlaskit/editor-core/src/plugins/extension/commands';
import { waitForProvider } from '@atlaskit/editor-core/src/__tests__/__helpers/utils';
import { errorAux } from '../createConfigSchema';

import getForgeExtensionProviderNext from '../../getForgeExtensionProviderNext';
import { ForgeExtensionParameters } from '../../ForgeEditorExtensionNext';
import { EXTENSION_NAMESPACE } from '../../constants';
import { mockAnalyticsWebClient } from './';
import { ReferenceEntity } from '@atlaskit/editor-common';

export const testExtensionKey = 'test-key';
export const defaultExtensionId = `ari:cloud:ecosystem::extension/app-id/environment-id/static/${testExtensionKey}`;
export const secondExtensionId = `ari:cloud:ecosystem::extension/app-id/environment-id/static/test-key2`;
export const newConfigExtensionId = `ari:cloud:ecosystem::extension/app-id/environment-id/static/test-key3`;
export const newConfigErrorExtensionId = `ari:cloud:ecosystem::extension/app-id/environment-id/static/test-key3-error`;
export const hostedResourcesExtensionId =
  'ari:cloud:ecosystem::extension/app-id/environment-id/static/hosted-resources';

export const mockClient = createMockClient();

export const mockContent = 'Hello test world!';

export const contextIds = ['ari:cloud:confluence::site/1'];

export const configTextFieldName = 'config text name';
export const configTextFieldLabel = 'config text label';
export const configContextTextfieldName = 'config context textfield name';

const createErrorPanelEffect = () => ({
  type: 'render',
  aux: errorAux,
  state: {},
});
const createEffect = ({
  extensionId,
  payload,
}: {
  extensionId: string;
  payload: LegacyBackendRuntimePayload;
}): LegacyRenderEffect => ({
  type: 'render',
  aux: {
    type: 'View',
    children: [
      {
        type: 'Text',
        key: 'Text.0',
        props: {
          content: mockContent,
        },
        children: [],
      },
      {
        type: 'Text',
        key: 'Text.1',
        props: {
          content:
            payload.config && payload.config.testConfigProperty
              ? payload.config.testConfigProperty
              : '',
        },
        children: [],
      },
      {
        type: 'Text',
        key: 'Text.2',
        props: {
          content: extensionId,
        },
        children: [],
      },
      {
        type: 'Text',
        key: 'Text.3',
        props: {
          content: JSON.stringify(payload.context),
        },
        children: [],
      },
      ...(payload.context.isConfig
        ? [
            {
              key:
                extensionId === newConfigExtensionId
                  ? 'MacroConfig.0'
                  : 'ConfigForm.0',
              props: {},
              type:
                extensionId === newConfigExtensionId
                  ? 'MacroConfig'
                  : 'ConfigForm',
              children: [
                {
                  children: [],
                  key: 'TextField.0.0',
                  type: 'TextField',
                  props: {
                    name: configTextFieldName,
                    label: configTextFieldLabel,
                  },
                },
                {
                  children: [],
                  key: 'TextField.1.0',
                  type: 'TextField',
                  props: {
                    name: configContextTextfieldName,
                    label: JSON.stringify(payload.context),
                  },
                },
              ],
            },
          ]
        : []),
    ],
  },
  state: {},
});

export const extensionsByType: { [key: string]: Extension } = {
  [defaultExtensionId]: {
    id: defaultExtensionId,
    appOwner: { name: 'Thomas White' } as Extension['appOwner'],
    appVersion: '1.0.0',
    environmentId: 'envId',
    environmentType: 'DEVELOPMENT' as EnvironmentType,
    properties: {
      description: 'Inserts Hello world!',
      typeId: 'fea6bc13-e530-45bd-b673-91d9cf9cff60',
      title: 'hello-world',
      function: 'main',
    },
    installationId: 'example-installation-id',
    type: 'xen:macro',
  },
  [secondExtensionId]: {
    id: secondExtensionId,
    appOwner: { name: 'Kang Wei Chan' } as Extension['appOwner'],
    appVersion: '1.0.0',
    environmentId: 'envId',
    environmentType: 'DEVELOPMENT' as EnvironmentType,
    properties: {
      description: 'Inserts Hello world!',
      typeId: 'ghd3bc13-d768-45bd-b673-91d9cf28j2d',
      title: 'hello-world',
      function: 'main',
    },
    installationId: 'example-installation-id',
    type: 'xen:macro',
  },
  [newConfigExtensionId]: {
    id: newConfigExtensionId,
    appVersion: '1.0.0',
    appOwner: { name: 'Kang Wei Chan' } as Extension['appOwner'],
    environmentId: 'envId',
    environmentType: 'DEVELOPMENT' as EnvironmentType,
    properties: {
      description: 'Inserts App that uses Config side panel',
      typeId: '41e92807-a826-4042-b281-c38c9e60bcea',
      title: 'hello-world',
      function: 'main',
      config: {
        function: 'config',
      },
    },
    installationId: 'example-installation-id',
    type: 'xen:macro',
  },
  [newConfigErrorExtensionId]: {
    id: newConfigErrorExtensionId,
    appOwner: { name: 'Kang Wei Chan' } as Extension['appOwner'],
    appVersion: '1.0.0',
    environmentId: 'envId',
    environmentType: 'DEVELOPMENT' as EnvironmentType,
    properties: {
      description: 'Inserts App that uses Config side panel',
      typeId: '41e92807-a826-4042-b281-c38c9e60bcea',
      title: 'hello-world',
      function: 'main',
      config: {
        function: 'config',
      },
    },
    installationId: 'example-installation-id',
    type: 'xen:macro',
  },
  [hostedResourcesExtensionId]: {
    id: hostedResourcesExtensionId,
    appOwner: { name: 'App Owner', accountId: '123', picture: 'path/to/img' },
    environmentType: 'DEVELOPMENT' as EnvironmentType,
    environmentId: 'env-id',
    installationId: 'install-id',
    appVersion: '1.3.5',
    properties: {
      resource: 'resource-path',
      title: 'hosres ext',
      description: 'horse',
    },
    type: 'xen:macro',
  },
};

mockClient.setRequestHandler(getExtensionListQuery(true), async () => {
  return {
    data: {
      extensionContexts: [
        {
          id: contextIds[0],
          extensionsByType: Object.values(extensionsByType).map(
            ({
              consentUrl,
              currentUserConsent,
              requiresUserConsent,
              ...extension
            }) => extension,
          ),
        },
      ],
    },
  };
});

mockClient.setRequestHandler(getExtensionListQuery(true, true), async () => {
  return {
    data: {
      extensionContexts: [
        {
          id: contextIds[0],
          extensionsByType: Object.values(extensionsByType).map((ext) => ({
            ...ext,
            consentUrl: 'https://mock.dev',
            currentUserConsent: null,
            requiresUserConsent: true,
          })),
        },
      ],
    },
  };
});

mockClient.setRequestHandler(getActiveTunnelsQuery(), async () => {
  return {
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
  };
});

mockClient.setRequestHandler(invokeAuxEffectsMutation, async ({ input }) => ({
  data: {
    invokeAuxEffects: {
      success: true,
      errors: null,
      result: {
        effects: [
          input.extensionId === newConfigErrorExtensionId
            ? createErrorPanelEffect()
            : createEffect(input),
        ],
      },
    },
  },
}));

// @ts-ignore - no need to implement every required method of ApolloClient for these tests
export const mockApolloClientObject: ApolloClient = {
  query: jest.fn(mockClient.query),
  mutate: jest.fn(mockClient.mutate),
};

const environment = ProductEnvironment.DEVELOPMENT;
export const product = 'tests';
export const page = 'viewPageScreen';

const spaceKey = 'space-key';
const accountId = 'account-id';
const cloudId = 'cloud-id';

export const extensionData = {
  type: 'macro',
  space: {
    key: spaceKey,
  },
};

export const temporaryContext = {
  accountId,
  cloudId,
  contentId: 'content-id',
  spaceKey,
};

export const defaultExtensionParameters: ForgeExtensionParameters = {
  localId: 'test-local-id',
  extensionId: defaultExtensionId,
  extensionTitle: 'cheese',
  extension: {
    id: 'default-extension-id',
    appOwner: { name: 'App Owner', accountId: '123', picture: 'path/to/img' },
    environmentType: ProductEnvironment.DEVELOPMENT,
    environmentId: '123',
    installationId: '234',
    appVersion: '1.0.0',
    properties: {},
    type: 'xen:macro',
  },
};

// simulate what the actual Renderer does when it displays extension nodes
export const getNodeRenderer = ({
  extensionType = EXTENSION_NAMESPACE,
  extensionKey = 'xen:macro',
  nodeKey = 'default',
  extensionProvider,
}: {
  extensionType?: string;
  extensionKey?: string;
  nodeKey?: string;
  extensionProvider: Promise<ExtensionProvider>;
}) => {
  return {
    Renderer: Loadable<
      {
        node: ExtensionParams<ForgeExtensionParameters>;
        references?: Array<ReferenceEntity>;
      },
      any
    >({
      loader: () => {
        return extensionProvider
          .then((extensionProvider: ExtensionProvider) =>
            extensionProvider.getExtension(extensionType, extensionKey),
          )
          .then(
            (extension?: ExtensionManifest) =>
              extension?.modules?.nodes?.[nodeKey]?.render,
          )
          .then((renderFn?: () => any) => {
            if (renderFn) {
              return resolveImport(renderFn());
            }
          });
      },
      loading: () => null,
    }),
    extensionProvider,
  };
};

export const updateExtensionNode: (
  extensionProviderPromise: Promise<ExtensionProvider>,
  extensionType: string,
  extensionKey: string,
  nodeKey: string,
  localId: string,
  extensionId: string,
  actions?: ExtensionAPI,
) => Promise<UpdateExtension> = (
  extensionProviderPromise,
  extensionType = EXTENSION_NAMESPACE,
  extensionKey = 'xen:macro',
  nodeKey = 'default',
  localId = '',
  extensionId = '',
  actions,
) => {
  return extensionProviderPromise
    .then((extensionProvider) =>
      extensionProvider.getExtension(extensionType, extensionKey),
    )
    .then((extension) => extension?.modules?.nodes?.[nodeKey].update)
    .then((updateFn) => {
      if (updateFn) {
        return updateFn(
          {
            localId,
            extensionId,
          },
          actions,
        );
      }
    });
};

export const createEditorView = async (
  providerFactory: ProviderFactory,
  extensionType: string,
  extensionKey: string,
  parameters: ForgeExtensionParameters,
) => {
  const createEditor = createEditorFactory();

  const editor = (
    doc: DocBuilder,
    props: Partial<EditorProps> = {},
    providerFactory?: ProviderFactory,
  ) => {
    return createEditor({
      doc,
      editorProps: {
        appearance: 'full-page',
        allowBreakout: true,
        allowExtension: {
          allowBreakout: true,
          allowAutoSave: true,
        },
        ...props,
      },
      pluginKey,
      providerFactory,
    });
  };

  const { editorView } = editor(
    doc(
      extension({
        extensionType,
        extensionKey,
        parameters,
      })(),
    ),
    {},
    providerFactory,
  );

  await waitForProvider(providerFactory)('extensionProvider');

  const actions: ExtensionAPI<ForgeExtensionParameters> = {
    editInContextPanel: (processParametersBefore, processParametersAfter) => {
      setEditingContextToContextPanel(
        processParametersBefore,
        processParametersAfter,
      )(editorView.state, editorView.dispatch);
    },
    _editInLegacyMacroBrowser: () => {},
    doc: {
      insertAfter: () => {},
      scrollTo: () => {},
    },
  };

  return { editorView, actions };
};

// getForgeExtensionProviderNext specific fixtures

export const defaultArgsNext: Parameters<
  typeof getForgeExtensionProviderNext
>[0] = {
  accountId,
  cloudId,
  apolloClient: mockClient,
  contextIds,
  dataProviders: ProviderFactory.create({
    mentionsProvider: Promise.resolve(jest.fn()),
  }),
  environment,
  product,
  page,
  extensionData,
  temporaryContext,
  analyticsWebClient: mockAnalyticsWebClient,
  forgeUIAnalyticsContext: {},
};

export const getExtensionProviderNextPromise = ({
  shouldRenderHostedResources = false,
  egressConsentFlowEnabled = false,
} = {}) => {
  return getForgeExtensionProviderNext({
    ...defaultArgsNext,
    shouldRenderHostedResources,
    egressConsentFlowEnabled,
  });
};
