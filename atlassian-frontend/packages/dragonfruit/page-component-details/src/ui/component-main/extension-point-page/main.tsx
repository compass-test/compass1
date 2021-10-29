import React from 'react';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';

import PageHeader from '@atlaskit/page-header';
import { useGetAnalyticsClient } from '@atlassian/dragonfruit-analytics';
import { MainContainer } from '@atlassian/dragonfruit-common-ui';
import {
  ComponentPageExtensionPoint,
  convertToForgeEnvironment,
} from '@atlassian/dragonfruit-forge';
import { CompassComponentDetailViewFragment } from '@atlassian/dragonfruit-graphql';
import { decodeURIParam } from '@atlassian/dragonfruit-routes';
import {
  getEnvironmentFromOrigin,
  useTenantInfo,
} from '@atlassian/dragonfruit-tenant-context';
import { useIntl, withErrorBoundary } from '@atlassian/dragonfruit-utils';
import {
  ForgeUIExtensionAnalyticsContext,
  ForgeUIExtensionPointProvider,
} from '@atlassian/forge-ui';
import { Iframe } from '@atlassian/forge-ui/iframe';

import { ComponentBreadcrumbs } from '../../../common/ui/breadcrumbs';
import {
  ComponentDetailsCustomUIExtension,
  ExtensionSideBarInfo,
} from '../../../common/ui/left-sidebar-links/types';

import messages from './messages';

interface ExtensionPointPageProps {
  component: CompassComponentDetailViewFragment;
  extensionId: string;
  componentPageApps: ExtensionSideBarInfo[];
}

function ExtensionPointPage(props: ExtensionPointPageProps) {
  const { component, extensionId, componentPageApps } = props;

  const { formatMessage } = useIntl();
  const tenantInfo = useTenantInfo();
  const environment = getEnvironmentFromOrigin();
  const decodedExtensionId = decodeURIParam(extensionId) || '';
  const extensionInfo = componentPageApps.find(
    (i) => i.id === decodedExtensionId,
  );
  const analyticClient = useGetAnalyticsClient(
    environment,
    tenantInfo.cloudId,
    tenantInfo.accountId,
  );
  const breadcrumbs = (
    <ComponentBreadcrumbs
      componentId={component.id}
      componentName={component.name}
      componentType={component.type}
    />
  );

  function CustomUIExtensionPoint(
    extensionInfo: ExtensionSideBarInfo,
    customUIData: ComponentDetailsCustomUIExtension,
  ) {
    const link = createHttpLink({
      uri: '/gateway/api/graphql',
      credentials: 'same-origin',
    });
    const client = new ApolloClient({
      link: link,
      cache: new InMemoryCache(),
    });

    if (!environment || !tenantInfo.cloudId || !tenantInfo.accountId) {
      return null;
    }

    return (
      <ForgeUIExtensionPointProvider
        analyticsWebClient={analyticClient}
        environment={convertToForgeEnvironment(environment)}
        page={'componentPage'}
        product={'compass'}
      >
        <ForgeUIExtensionAnalyticsContext
          extensionId={customUIData.extension.id}
          localId={customUIData.extension.id}
        >
          <Iframe
            apolloClient={client}
            contextIds={[customUIData.contextId]}
            extension={customUIData.extension}
            coreData={{
              cloudId: customUIData.cloudId,
              localId: extensionInfo.id,
            }}
            extensionData={{
              type: 'compass:componentPage',
              componentId: component.id,
            }}
            accountId={tenantInfo.accountId}
            egressConsentFlowEnabled={true}
          />
        </ForgeUIExtensionAnalyticsContext>
      </ForgeUIExtensionPointProvider>
    );
  }

  function ExtensionPoint(extensionInfo: ExtensionSideBarInfo | undefined) {
    if (!extensionInfo) {
      return (
        <p>{formatMessage(messages.errorRenderingExtensionPointMessage)}</p>
      );
    }

    const customUIData = extensionInfo.customUIExtension;
    if (customUIData) {
      return CustomUIExtensionPoint(extensionInfo, customUIData);
    } else {
      return (
        <ComponentPageExtensionPoint
          extensionId={decodedExtensionId}
          componentId={component.id}
        />
      );
    }
  }

  return (
    <MainContainer>
      <PageHeader breadcrumbs={breadcrumbs}>{extensionInfo?.title}</PageHeader>
      {ExtensionPoint(extensionInfo)}
    </MainContainer>
  );
}

export default withErrorBoundary(ExtensionPointPage, {
  componentName: 'componentDetailsExtensionPointPage',
});
