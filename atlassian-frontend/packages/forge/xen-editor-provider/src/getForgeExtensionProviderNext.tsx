import { ExtensionProvider } from '@atlaskit/editor-common';
import {
  AnalyticsWebClient,
  createMetalClient,
  ForgeUIAnalyticsContext,
  APIError,
  createLegacyInvokeAuxEffectsInput,
  handleInvokeAuxEffectsResponse,
  invokeAuxEffectsMutation,
  sendEvent,
  Extension,
} from '@atlassian/forge-ui';
import {
  ContextId,
  ProductEnvironment,
  ForgeUIExtensionType,
  LegacyForgeContext,
  EnvironmentType,
} from '@atlassian/forge-ui-types';
import { ExtensionHandlerWithReferenceFn } from '@atlassian/editor-referentiality';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { UI_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { catalog } from '@atlassiansox/metal-client';
import ApolloClient from 'apollo-client';
import { createSchemaFromAux, ValidationError } from './createConfigSchema';
import { ForgeExtensionParameters } from './ForgeEditorExtensionNext';
import { getForgeExtensionProviderShared } from './getForgeExtensionProviderShared';
import { renderExtensionNext } from './renderExtensionNext';

const humanReadableEnvironmentType: Record<EnvironmentType, string> = {
  DEVELOPMENT: 'Development',
  STAGING: 'Staging',
  PRODUCTION: 'Production',
};

export const createDescriptionWithAppOwner = (
  description: string,
  appOwner?: Extension['appOwner'],
): string =>
  `${appOwner && appOwner.name ? `By ${appOwner.name} · ` : ''}${description}`;

export const createTitleWithEnvironmentInfo = (
  title: string,
  environmentType: EnvironmentType = 'PRODUCTION',
): string => {
  if (environmentType !== 'PRODUCTION') {
    const text = humanReadableEnvironmentType[environmentType];
    if (text) {
      return `${title} (${text})`;
    }
  }
  return title;
};

export const getConfig = ({ config, guestParams }: ForgeExtensionParameters) =>
  guestParams || config;

async function getForgeExtensionProviderNext({
  accountId,
  cloudId,
  apolloClient,
  contextIds,
  dataProviders,
  environment,
  product,
  page,
  isEditing,
  analyticsWebClient,
  forgeUIAnalyticsContext = {},
  extensionData,
  extensionHandlerWithReference,
  temporaryContext,
  shouldRenderHostedResources = false,
  egressConsentFlowEnabled = false,
}: {
  accountId?: string;
  cloudId: string;
  apolloClient: ApolloClient<object>;
  contextIds: ContextId[];
  dataProviders: ProviderFactory;
  environment: ProductEnvironment;
  product: string;
  page: string;
  isEditing?: boolean;
  analyticsWebClient: AnalyticsWebClient | Promise<AnalyticsWebClient>;
  forgeUIAnalyticsContext: ForgeUIAnalyticsContext;
  extensionData: Record<string, any>;
  extensionHandlerWithReference?: ExtensionHandlerWithReferenceFn<
    ForgeExtensionParameters
  >;
  temporaryContext?: LegacyForgeContext;
  shouldRenderHostedResources?: boolean;
  egressConsentFlowEnabled?: boolean;
}): Promise<ExtensionProvider> {
  const startTimeMs = performance.now();
  const [metalClientPromise, destroyMetalClient] = createMetalClient(
    environment,
    product,
  );

  const createRenderFunction = async (extension?: ForgeUIExtensionType) =>
    renderExtensionNext({
      accountId,
      analyticsWebClient,
      cloudId,
      extension,
      extensionData,
      extensionHandlerWithReference,
      temporaryContext,
      apolloClient,
      contextIds,
      isEditing: Boolean(isEditing),
      dataProviders,
      environment,
      product,
      page,
      egressConsentFlowEnabled,
    });

  const getFieldsDefinitionFunction = async (
    data: ForgeExtensionParameters,
  ) => {
    const { extensionId, localId } = data;
    const config = getConfig(data);
    try {
      const input = createLegacyInvokeAuxEffectsInput(
        {
          contextIds,
          extensionId,
          localId,
          functionId: 'config',
        },
        {
          effects: [
            {
              type: 'initialize',
            },
          ],
          state: {},
          config,
          context: {
            isConfig: true,
            cloudId,
            ...temporaryContext,
          },
        },
        {
          ...extensionData,
          config,
          isConfig: true,
        },
      );
      const mutationResult = await apolloClient.mutate({
        mutation: invokeAuxEffectsMutation,
        variables: { input },
      });
      const effect = handleInvokeAuxEffectsResponse(
        mutationResult,
        (message) => {
          throw new APIError(message);
        },
      )[0];
      return createSchemaFromAux(
        effect.type === 'result' ? effect.forgeDoc : effect.aux,
      );
    } catch (error) {
      const { name, message } = error;
      if (!(error instanceof ValidationError)) {
        Promise.resolve(metalClientPromise).then((metalClient) => {
          metalClient.error.submit({
            component: 'getForgeExtensionProvider',
            page,
            name: catalog.error.COMPONENT_API,
          });
        });
        analyticsWebClient &&
          sendEvent(analyticsWebClient)({
            eventType: UI_EVENT_TYPE,
            action: 'errored',
            actionSubject: 'forgeUIExtension',
            actionSubjectId: 'editorMacro',
            source: 'editPageScreen',
            attributes: {
              errorName: name,
              errorMessage: message,
            },
          });
      }
      throw new Error(message || '');
    }
  };

  return await getForgeExtensionProviderShared({
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
  });
}

export default getForgeExtensionProviderNext;
