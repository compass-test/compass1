import React, { useEffect, useState } from 'react';

import { useRouterActions } from 'react-resource-router';

import { useFlags } from '@atlaskit/flag';
import { Content } from '@atlaskit/page-layout';
import {
  BaseErrorFlagProps,
  BaseSuccessFlagProps,
  LoadingView,
} from '@atlassian/dragonfruit-common-ui';
import {
  useShowNewRelicApp,
  useShowSwaggerUIApp,
} from '@atlassian/dragonfruit-feature-flags';
import {
  AppListViewInfo,
  useGetInstalledApps,
} from '@atlassian/dragonfruit-forge';
import { routes } from '@atlassian/dragonfruit-routes';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { useIntl } from '@atlassian/dragonfruit-utils';

import {
  getPublishedAppByAri,
  PUBLISHED_APPS,
} from '../../../common/constants';
import AppCard from '../../../common/ui/app-card/main';
import messages from '../../../common/ui/messages';

class ForgeInstallError extends Error {
  constructor() {
    super();
  }
}

function isAppInstalled(appId: String, installedApps: Array<AppListViewInfo>) {
  const matchesInputApp = (app: AppListViewInfo) => app.metadata.id === appId;
  return installedApps.some(matchesInputApp);
}

export default function AppList() {
  const { formatMessage } = useIntl();
  const { cloudId } = useTenantInfo();
  const { data: installedAppData, loading } = useGetInstalledApps(cloudId);
  const showNewRelicApp = useShowNewRelicApp();
  const showSwaggerUIApp = useShowSwaggerUIApp();
  const { showFlag } = useFlags();
  const { push } = useRouterActions();

  const [newInstallationId, setNewInstallationId] = useState(null);

  let dismissInstallFlag: () => void;

  const postInstallCallback = (
    success: boolean,
    name: string,
    installationId?: any,
  ) => {
    if (success) {
      setNewInstallationId(installationId);
    } else {
      showAppInstallErrorFlag(name);
      throw new ForgeInstallError();
    }
  };

  const showInstallSuccessFlag = (name: string, extensionId?: string) => {
    let actions;
    if (!!extensionId) {
      actions = [
        {
          content: formatMessage(messages.flagInstallAppConfigureLink),
          onClick: () => {
            push(routes.APP_CONFIGURATION(extensionId));
            dismissInstallFlag();
          },
        },
      ];
    }

    dismissInstallFlag = showFlag({
      ...BaseSuccessFlagProps,
      id: 'dragonfruit-page-apps.ui.app-config-page.flags.app-install',
      title: formatMessage(messages.flagInstallAppTitle, { name: name }),
      actions: actions,
      isAutoDismiss: false,
      testId: 'dragonfruit-page-apps.ui.app-config-page.flags.app-install',
    });
  };

  const showAppInstallErrorFlag = (name: string) => {
    showFlag({
      ...BaseErrorFlagProps,
      id: 'dragonfruit-page-apps.ui.app-config-page.flags.app-install.error',
      title: formatMessage(messages.flagInstallErrorAppTitle, { name: name }),
      description: formatMessage(messages.flagInstallErrorAppDesc),
      testId:
        'dragonfruit-page-apps.ui.app-config-page.flags.app-install.error',
    });
  };

  const renderInstalledAppsList = (
    installedAppData: Array<AppListViewInfo>,
  ) => {
    return installedAppData.map((app) => {
      const publishedAppData = getPublishedAppByAri(app.metadata.id);

      return (
        <AppCard
          name={app.metadata.name}
          appId={app.metadata.id}
          vendor={app.metadata.vendorName}
          description={publishedAppData?.description}
          imageUrl={app.adminPageExtension?.icon} // TODO: (COMPASS-719) Use avatarFileId instead
          extensionId={app.adminPageExtension?.id}
          isInstalled={true}
          postInstallCallback={postInstallCallback}
          documentationUrl={publishedAppData?.documentationUrl}
          learnMoreDescription={publishedAppData?.learnMoreDescription}
          intlKey={
            publishedAppData?.intlDescriptionKey
              ? publishedAppData.intlDescriptionKey
              : ''
          }
        />
      );
    });
  };

  let uninstalledApps = PUBLISHED_APPS.filter(
    (app) => !isAppInstalled(app.ari, installedAppData),
  );

  if (!showNewRelicApp) {
    uninstalledApps = uninstalledApps.filter((app) => app.name !== 'New Relic');
  }

  if (!showSwaggerUIApp) {
    uninstalledApps = uninstalledApps.filter((app) => app.key !== 'swaggerUI');
  }

  useEffect(() => {
    if (!newInstallationId) {
      return;
    }

    // look over our installed apps and determine if one has just been installed
    const newlyInstalledApp = installedAppData.find(
      (app) => app.installation.id === newInstallationId,
    );
    if (!newlyInstalledApp) {
      return;
    }

    showInstallSuccessFlag(
      newlyInstalledApp.metadata.name,
      newlyInstalledApp.adminPageExtension?.id,
    );
    setNewInstallationId(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [installedAppData, newInstallationId]);

  if (loading) {
    return (
      <Content>
        <LoadingView />
      </Content>
    );
  }

  return (
    <>
      {uninstalledApps.map((app) => (
        <AppCard
          name={app.name}
          vendor={app.vendor}
          description={app.description}
          documentationUrl={app.documentationUrl}
          appId={app.ari}
          imageUrl={app.imageUrl}
          isInstalled={false}
          postInstallCallback={postInstallCallback}
          learnMoreDescription={app.learnMoreDescription}
          intlKey={app.intlDescriptionKey}
        />
      ))}

      {renderInstalledAppsList(installedAppData)}
    </>
  );
}
