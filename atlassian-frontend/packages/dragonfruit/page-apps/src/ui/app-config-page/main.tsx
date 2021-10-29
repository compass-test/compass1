import React, { useEffect, useState } from 'react';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { useRouterActions } from 'react-resource-router';

import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import { LoadingButton } from '@atlaskit/button';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import InlineDialog from '@atlaskit/inline-dialog';
import { Content, Main } from '@atlaskit/page-layout';
import { useGetAnalyticsClient } from '@atlassian/dragonfruit-analytics';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { LoadingView, MainContainer } from '@atlassian/dragonfruit-common-ui';
import { getBitbucketWorkspaceConnection } from '@atlassian/dragonfruit-external-component-management';
import {
  AdminPageExtensionPoint,
  AppListViewInfo,
  COMPASS_SITE_ARI,
  convertToForgeEnvironment,
} from '@atlassian/dragonfruit-forge';
import { useUninstallForgeApp } from '@atlassian/dragonfruit-graphql';
import { routes } from '@atlassian/dragonfruit-routes';
import {
  getEnvironmentFromOrigin,
  useTenantInfo,
} from '@atlassian/dragonfruit-tenant-context';
import { useIntl } from '@atlassian/dragonfruit-utils';
import {
  Extension,
  ForgeUIExtensionAnalyticsContext,
  ForgeUIExtensionPointProvider,
} from '@atlassian/forge-ui';
import { Iframe } from '@atlassian/forge-ui/iframe';

import { APP_KEY, getPublishedApp } from '../../common/constants';
import { AppLogo, AppLogoPlaceholder } from '../../common/ui/app-card';
import CommonAppsMessages from '../../common/ui/messages';
import { compassAriFor } from '../../common/utils';
import { useAppFlags } from '../../services/flags';
import useGetApp from '../../services/get-app';

import messages from './messages';
import {
  AppName,
  BreadcrumbsContainer,
  ConfigPageHeader,
  CustomExtensionPointWrapper,
  ExtensionPointWrapper,
  PlainBreadcrumbsItem,
  TitleGroup,
  UninstallDisabledDialogWrapper,
} from './styled';

type Props = {
  extensionId: string;
  pageUrl: string;
};

class ForgeUninstallError extends Error {
  constructor() {
    super();
  }
}

function getAppName(app: AppListViewInfo) {
  return app.adminPageExtension?.title || app.metadata.name;
}

async function shouldAllowUninstalling(appId: string, cloudId: string) {
  const bitbucketAppAri = getPublishedApp(APP_KEY.BITBUCKET).ari;

  if (appId !== bitbucketAppAri) {
    return true;
  }

  try {
    const workspaceConnection = await getBitbucketWorkspaceConnection(cloudId);
    return !workspaceConnection.connected;
  } catch (e) {
    return false;
  }
}

export default function AppConfigPage({ extensionId, pageUrl }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [canUninstall, setCanUninstall] = useState(false);
  const [
    isUninstallDisabledDialogOpen,
    setIsUninstallDisabledDialogOpen,
  ] = useState(false);
  const [isUninstallInProgress, setIsUninstallInProgress] = useState(false);

  const { formatMessage } = useIntl();
  const { push } = useRouterActions();
  const { cloudId, accountId } = useTenantInfo();
  const environment = getEnvironmentFromOrigin();
  const { app, loading: appDataLoading } = useGetApp(extensionId);

  const [uninstallAppMutation] = useUninstallForgeApp();
  const {
    showAppUninstallSuccessFlag,
    showAppUninstallErrorFlag,
  } = useAppFlags();
  const analyticClient = useGetAnalyticsClient(environment, cloudId, accountId);

  function CustomUIExtensionPoint(
    cloudId: string,
    contextId: string,
    customUIData: Extension,
  ) {
    const link = createHttpLink({
      uri: '/gateway/api/graphql',
      credentials: 'same-origin',
    });
    const client = new ApolloClient({
      link: link,
      cache: new InMemoryCache(),
    });

    if (!environment || !cloudId || !accountId) {
      return null;
    }

    return (
      <ForgeUIExtensionPointProvider
        analyticsWebClient={analyticClient}
        environment={convertToForgeEnvironment(environment)}
        page={'adminPage'}
        product={'compass'}
      >
        <ForgeUIExtensionAnalyticsContext
          extensionId={customUIData.id}
          localId={customUIData.id}
        >
          <Iframe
            apolloClient={client}
            contextIds={[contextId]}
            extension={customUIData}
            coreData={{
              cloudId,
              localId: customUIData.id,
            }}
            extensionData={{
              type: 'compass:adminPage',
              url: pageUrl,
            }}
            accountId={accountId}
            egressConsentFlowEnabled={true}
          />
        </ForgeUIExtensionAnalyticsContext>
      </ForgeUIExtensionPointProvider>
    );
  }

  useEffect(() => {
    if (!app) {
      return;
    }

    const maybeEnableUninstall = async () => {
      const shouldEnable = await shouldAllowUninstalling(
        app.metadata.id,
        cloudId,
      );
      setCanUninstall(shouldEnable);
      setIsLoading(false);
    };

    maybeEnableUninstall();
  }, [app, cloudId]);

  if (isLoading || appDataLoading || !environment || !cloudId || !accountId) {
    return (
      <div style={{ flexGrow: 1 }}>
        <Content>
          <LoadingView />
        </Content>
      </div>
    );
  }

  if (!app) {
    // This means the app was uninstalled on the site
    push(routes.APPS());
    return <></>;
  }

  const UninstallDisabledDialogContent = (
    <UninstallDisabledDialogWrapper>
      <WarningIcon label="" />
      {formatMessage(messages.uninstallDisabledExplanation)}
    </UninstallDisabledDialogWrapper>
  );

  const onUninstallClick = async () => {
    if (!canUninstall) {
      return setIsUninstallDisabledDialogOpen(true);
    }

    setIsUninstallInProgress(true);
    const uninstallResp = await uninstallAppMutation({
      appId: app.metadata.id,
      environmentKey: app.installation.environmentKey,
      installationContext: compassAriFor(cloudId),
    });
    setIsUninstallInProgress(false);

    if (uninstallResp.data?.uninstallApp?.success === true) {
      showAppUninstallSuccessFlag(app.metadata.name);
      push(routes.APPS());
    } else {
      showAppUninstallErrorFlag(app.metadata.name);
      throw new ForgeUninstallError();
    }
  };

  const customUIData =
    app.adminPageExtension && 'customUIExtension' in app.adminPageExtension
      ? app.adminPageExtension.customUIExtension
      : undefined;

  return (
    <Content testId="dragonfruit-page-app-config.ui.content">
      <Main
        testId="dragonfruit-page-app-config.ui.main"
        id="main"
        skipLinkTitle={formatMessage(messages.mainSkipLinkTitle)}
      >
        <MainContainer>
          <BreadcrumbsContainer>
            <Breadcrumbs>
              <BreadcrumbsItem
                testId="dragonfruit-page-apps.app-config-page.app-breadcrumb"
                onClick={() => push(routes.APPS())}
                text={formatMessage(CommonMessages.apps)}
              />
              <PlainBreadcrumbsItem>{getAppName(app)}</PlainBreadcrumbsItem>
            </Breadcrumbs>
          </BreadcrumbsContainer>
          <ConfigPageHeader>
            <TitleGroup>
              {app.adminPageExtension?.icon ? (
                <AppLogo src={app.adminPageExtension.icon} alt=""></AppLogo>
              ) : (
                <AppLogoPlaceholder></AppLogoPlaceholder>
              )}
              <AppName>{getAppName(app)}</AppName>
            </TitleGroup>
            <InlineDialog
              content={UninstallDisabledDialogContent}
              isOpen={isUninstallDisabledDialogOpen}
              onClose={() => setIsUninstallDisabledDialogOpen(false)}
              placement="bottom-end"
            >
              <LoadingButton
                onClick={onUninstallClick}
                isLoading={isUninstallInProgress}
                testId="dragonfruit-page-apps.app-config-page.uninstall-app-btn"
              >
                {formatMessage(CommonAppsMessages.uninstallApp)}
              </LoadingButton>
            </InlineDialog>
          </ConfigPageHeader>
          {customUIData ? (
            <CustomExtensionPointWrapper>
              {CustomUIExtensionPoint(
                cloudId,
                `${COMPASS_SITE_ARI}/${cloudId}`,
                customUIData,
              )}
            </CustomExtensionPointWrapper>
          ) : (
            <ExtensionPointWrapper>
              <ForgeUIExtensionPointProvider
                analyticsWebClient={analyticClient}
                environment={convertToForgeEnvironment(environment)}
                product="compass"
                page="adminPage"
              >
                <AdminPageExtensionPoint
                  extensionId={extensionId}
                  url={pageUrl}
                />
              </ForgeUIExtensionPointProvider>
            </ExtensionPointWrapper>
          )}
        </MainContainer>
      </Main>
    </Content>
  );
}
