import React from 'react';
import { ApolloClient } from 'apollo-client';
import memoize from 'memoize-one';
import deepEqual from 'fast-deep-equal';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { AnalyticsWebClient } from '@atlassian/forge-ui';
import {
  ContextId,
  ProductEnvironment,
  ForgeUIExtensionType,
  LegacyForgeContext,
} from '@atlassian/forge-ui-types';
import { ExtensionHandlerWithReferenceFn } from '@atlassian/editor-referentiality';

import ForgeEditorExtensionNext, {
  ForgeExtensionParameters,
  ForgeExtension,
} from './ForgeEditorExtensionNext';
import { ReferenceEntity } from '@atlaskit/editor-common';

interface GetExtensionParams {
  node: ForgeExtension;
  references?: Array<ReferenceEntity>;
}
interface RenderExtensionNext {
  accountId?: string;
  apolloClient: ApolloClient<object>;
  analyticsWebClient: AnalyticsWebClient | Promise<AnalyticsWebClient>;
  cloudId: string;
  contextIds: ContextId[];
  environment: ProductEnvironment;
  extension?: ForgeUIExtensionType;
  extensionData: Record<string, any>;
  extensionHandlerWithReference?: ExtensionHandlerWithReferenceFn<
    ForgeExtensionParameters
  >;
  temporaryContext?: LegacyForgeContext;
  isEditing: boolean;
  page: string;
  product: string;
  dataProviders: ProviderFactory;
  egressConsentFlowEnabled: boolean;
}

export const renderExtensionNext = ({
  accountId,
  apolloClient,
  analyticsWebClient,
  cloudId,
  contextIds,
  environment,
  extension,
  extensionData,
  extensionHandlerWithReference,
  temporaryContext,
  isEditing,
  page,
  product,
  dataProviders,
  egressConsentFlowEnabled,
}: RenderExtensionNext) =>
  memoize(({ node, references }: GetExtensionParams) => {
    const getForgeEditorExtensionNextComponent = ({
      node,
      references,
    }: GetExtensionParams) => (
      <ForgeEditorExtensionNext
        analyticsWebClient={analyticsWebClient}
        accountId={accountId || ''}
        apolloClient={apolloClient}
        cloudId={cloudId}
        contextIds={contextIds}
        environment={environment}
        extension={{
          ...node,
          parameters: {
            // we always insert with parameters
            ...node.parameters!,
            extensionTitle: extension?.properties.title,
            extension,
          },
        }}
        extensionData={{
          ...extensionData,
          references,
        }}
        temporaryContext={{
          ...temporaryContext,
          extensionContext: {
            type: 'macro',
            references,
          },
        }}
        isEditing={isEditing}
        product={product}
        dataProviders={dataProviders}
        page={page}
        egressConsentFlowEnabled={egressConsentFlowEnabled}
      />
    );

    if (extensionHandlerWithReference) {
      return extensionHandlerWithReference(
        node,
        ({ references: referencesFromHandler }) =>
          getForgeEditorExtensionNextComponent({
            node,
            references: referencesFromHandler,
          }),
      );
    }

    return getForgeEditorExtensionNextComponent({ node, references });
  }, deepEqual);
