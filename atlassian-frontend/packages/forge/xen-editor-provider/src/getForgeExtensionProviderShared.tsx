import { UI_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import {
  DefaultExtensionProvider,
  ExtensionManifest,
} from '@atlaskit/editor-common';
import {
  ExtensionAPI,
  FieldDefinition,
} from '@atlaskit/editor-common/extensions';
import { parse } from '@atlassian/cs-ari';
import { ui } from '@atlassian/forge-ui';
import {
  AnalyticsWebClient,
  ForgeUIAnalyticsContext,
  isGQLGatewayError,
  isGQLUnderlyingServiceError,
  sendEvent,
  extensionIdToAnalyticsAttributes,
} from '@atlassian/forge-ui';
import { ForgeUIExtensionType } from '@atlassian/forge-ui-types';
import MetalClient, { catalog } from '@atlassiansox/metal-client';
import ApolloClient from 'apollo-client';
import { EXTENSION_NAMESPACE, MODULE_NAME } from './constants';
import { CONFIG_USER_PICKER_PROVIDER } from './createConfigSchema';
import {
  ForgeExtension,
  ForgeExtensionParameters,
} from './ForgeEditorExtensionNext';
import {
  createDescriptionWithAppOwner,
  createTitleWithEnvironmentInfo,
} from './getForgeExtensionProviderNext';
import { createLocalId } from './createLocalId';

const { getForgeUIExtensionsAsync } = ui;

const manifestIcons = {
  '16': () => import('./icon'),
  '24': () => import('./icon'),
  '48': () => import('./icon'),
};

const transformBefore = (parameters: ForgeExtensionParameters) =>
  getConfig(parameters);
const transformAfter = async (parameters: any) => ({ guestParams: parameters });

const getConfig = ({ config, guestParams }: ForgeExtensionParameters) =>
  guestParams || config;

interface ForgeExtensionProviderSharedParams {
  accountId?: string;
  apolloClient: ApolloClient<object>;
  cloudId: string;
  contextIds: string[];
  forgeUIAnalyticsContext: ForgeUIAnalyticsContext;
  metalClientPromise: Promise<MetalClient>;
  page: string;
  product: string;
  analyticsWebClient:
    | AnalyticsWebClient
    | Promise<AnalyticsWebClient>
    | undefined;
  createRenderFunction: (
    extension?: ForgeUIExtensionType,
  ) => Promise<({ node }: { node: ForgeExtension }) => JSX.Element>;
  startTimeMs: number;
  destroyMetalClient: () => void;
  shouldRenderHostedResources: boolean;
  egressConsentFlowEnabled: boolean;
  getFieldsDefinitionFunction: (
    data: ForgeExtensionParameters,
  ) => Promise<FieldDefinition[]>;
}

export async function getForgeExtensionProviderShared({
  accountId,
  apolloClient,
  cloudId,
  contextIds,
  forgeUIAnalyticsContext,
  metalClientPromise,
  page,
  product,
  analyticsWebClient,
  createRenderFunction,
  startTimeMs,
  destroyMetalClient,
  shouldRenderHostedResources,
  getFieldsDefinitionFunction,
  egressConsentFlowEnabled,
}: ForgeExtensionProviderSharedParams) {
  const {
    extensions: maybeExtensions,
    errors,
  } = await getForgeUIExtensionsAsync({
    client: apolloClient,
    contextIds,
    moduleType: MODULE_NAME,
    expandAppOwner: true,
    egressConsentFlowEnabled,
  });

  const extensionToFilter = maybeExtensions || [];
  const extensions = shouldRenderHostedResources
    ? extensionToFilter
    : extensionToFilter.filter((ext) => !ext.properties.resource);

  const updateFunction = async (
    _: ForgeExtensionParameters,
    actions?: ExtensionAPI<ForgeExtensionParameters>,
  ): Promise<ForgeExtensionParameters | void> => {
    return actions!.editInContextPanel(transformBefore, transformAfter);
  };

  const fieldsModules: ExtensionManifest<
    ForgeExtensionParameters
  >['modules']['fields'] = {
    user: {
      [CONFIG_USER_PICKER_PROVIDER]: {
        provider: async () => ({
          siteId: cloudId,
          // If principalId === 'Context', upstream attempts to use other context to discover the principal ID
          principalId: accountId || 'Context',
          fieldId: 'forgeConfigUserPicker',
          productKey: product as 'confluence',
        }),
      },
    },
  };

  const extensionManifests: ExtensionManifest<
    ForgeExtensionParameters
  >[] = extensions
    .filter(({ id }) => parse(id).resourceId !== undefined)
    .map((extension) => {
      const { id, properties, environmentType, appOwner } = extension;
      const title = createTitleWithEnvironmentInfo(
        properties.title || 'Forge UI Macro',
        environmentType,
      );
      const description = createDescriptionWithAppOwner(
        properties.description || '',
        appOwner,
      );

      const extensionIdWithoutPrefix = parse(id).resourceId!;

      const hasConfig = !!properties.config && !!properties.config.function;
      return {
        title,
        description,
        type: EXTENSION_NAMESPACE,
        key: extensionIdWithoutPrefix,
        icons: manifestIcons,
        modules: {
          quickInsert: [
            {
              key: 'forge-macro',
              action: async () => {
                const localId = createLocalId();
                const extensionId = id;

                if (analyticsWebClient) {
                  sendEvent(analyticsWebClient)({
                    eventType: UI_EVENT_TYPE,
                    action: 'inserted',
                    actionSubject: 'forgeUIExtension',
                    actionSubjectId: 'editorMacro',
                    source: 'editPageScreen',
                    ...forgeUIAnalyticsContext,
                    attributes: {
                      localId,
                      ...extensionIdToAnalyticsAttributes(extensionId),
                    },
                  });
                }

                return {
                  type: 'extension',
                  attrs: {
                    extensionKey: extensionIdWithoutPrefix,
                    extensionType: EXTENSION_NAMESPACE,
                    parameters: {
                      localId,
                      extensionId,
                      extensionTitle: title,
                    },
                    text: title,
                  },
                };
              },
            },
          ],
          nodes: {
            default: {
              type: 'extension',
              render: () => createRenderFunction(extension),
              update: hasConfig ? updateFunction : undefined,
              getFieldsDefinition: getFieldsDefinitionFunction,
            },
          },
          fields: fieldsModules,
        },
      };
    });

  const legacyMacroManifest: ExtensionManifest<ForgeExtensionParameters> = {
    /**
     * title, description and icons are required but will not be used anywhere,
     * since this manifest is used solely for rendering legacy nodes
     **/
    title: 'Forge UI Macro',
    description: 'Supports existing Forge UI Macro nodes',
    type: EXTENSION_NAMESPACE,
    key: 'xen:macro',
    icons: manifestIcons,
    modules: {
      nodes: {
        default: {
          type: 'extension',
          render: createRenderFunction,
          update: updateFunction,
          getFieldsDefinition: getFieldsDefinitionFunction,
        },
      },
      fields: fieldsModules,
    },
  };

  const endTimeMs = performance.now();
  Promise.resolve(metalClientPromise).then((metalClient) => {
    if (maybeExtensions) {
      metalClient.metric.submit({
        component: 'getForgeExtensionProvider',
        page,
        name: catalog.performance.COMPONENT_READY,
        value: endTimeMs - startTimeMs,
      });
    }
    // Even if there is something wrong, `errors` will be undefined when
    // `getForgeUIExtensionsAsync` is called a second time. Seems like
    // the data gets cached while the errors do not. This means that
    // this error metric will only be sent at most once per page reload,
    // as opposed to each time `getForgeExtensionProvider` is called.
    if (!maybeExtensions && errors) {
      const err = errors.find(
        (err) => isGQLUnderlyingServiceError(err) || isGQLGatewayError(err),
      );
      metalClient.error.submit({
        component: 'getForgeExtensionProvider',
        page,
        name: err
          ? isGQLUnderlyingServiceError(err)
            ? catalog.error.COMPONENT_API
            : catalog.error.COMPONENT_GRAPHQL
          : catalog.error.UNCAUGHT,
      });
    }
    destroyMetalClient();
  });

  return new DefaultExtensionProvider<ForgeExtensionParameters>([
    legacyMacroManifest,
    ...extensionManifests,
  ]);
}
