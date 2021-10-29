import React, { useState } from 'react';

import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { useRouterActions } from 'react-resource-router';

import { LoadingButton } from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import CheckIcon from '@atlaskit/icon/glyph/check';
import { Card, CardBody } from '@atlassian/dragonfruit-common-ui';
import { useInstallForgeApp } from '@atlassian/dragonfruit-graphql';
import { routes } from '@atlassian/dragonfruit-routes';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { compassAriFor } from '../../utils';
import messages from '../messages';

import {
  AppInfoGroup,
  AppLogo,
  AppLogoPlaceholder,
  AppName,
  AppVendor,
  BodyWrapper,
  CardGroup,
  InfoGroup,
  InstalledLabel,
  NotInstalledLabel,
} from './styled';

interface Props {
  name: string;
  vendor?: string | null;
  description?: string;
  appId: string;
  imageUrl?: string;
  extensionId?: string;
  isInstalled?: boolean;
  postInstallCallback?: (
    success: boolean,
    name: string,
    installationData?: string | null,
  ) => void;
  documentationUrl?: string;
  learnMoreDescription?: string;
  intlKey: string;
}

export default function AppCard({
  name,
  vendor,
  description,
  appId,
  imageUrl,
  extensionId,
  isInstalled = true,
  postInstallCallback,
  documentationUrl,
  learnMoreDescription,
  intlKey,
}: Props) {
  const [isAppInstalling, setIsAppInstalling] = useState(false);

  const { formatMessage } = useIntl();
  const [installAppMutation] = useInstallForgeApp();
  const { cloudId, isAdmin: isAdministrator } = useTenantInfo();
  const isAdmin = isAdministrator();
  const compassResourceAri = compassAriFor(cloudId);
  const { push } = useRouterActions();

  // COMPASS-1381 Improve the UX here so it doesn't just do a full page reload
  const installApp = async () => {
    setIsAppInstalling(true);

    const installResp = await installAppMutation({
      appId: appId,
      environmentKey: 'production',
      installationContext: compassResourceAri,
    });

    setIsAppInstalling(false);

    if (!postInstallCallback) {
      return;
    }

    if (installResp.data?.installApp?.success) {
      postInstallCallback(
        true,
        name,
        installResp.data?.installApp?.installationId,
      );
    } else {
      postInstallCallback(false, name);
    }
  };

  const installedAppButtons = () => {
    if (isAdmin) {
      return (
        <ButtonGroup>
          {!!extensionId && (
            <Button
              onClick={() => push(routes.APP_CONFIGURATION(extensionId))}
              testId={`dragonfruit-page-apps.app-card.configure-app-btn.${name}`}
            >
              {formatMessage(messages.configureApp)}
            </Button>
          )}
        </ButtonGroup>
      );
    }

    return (
      <InstalledLabel>
        <CheckIcon
          label="check"
          size="medium"
          testId="dragonfruit-page-apps.app-card.installed-check-icon"
        />
        {formatMessage(messages.installedApp)}
      </InstalledLabel>
    );
  };

  const notInstalledAppButtons = () => {
    const canInstallApp = isAdmin && !isInstalled;

    if (canInstallApp) {
      return (
        <LoadingButton
          onClick={installApp}
          isLoading={isAppInstalling}
          testId={`dragonfruit-page-apps.app-card.install-app-btn.${name}`}
        >
          {formatMessage(messages.installApp)}
        </LoadingButton>
      );
    }

    return (
      <NotInstalledLabel>
        {formatMessage(messages.notInstalledApp)}
      </NotInstalledLabel>
    );
  };

  const replaceSpacesWithDashes = (appName: string) => {
    return appName.replace(new RegExp(' ', 'g'), '-');
  };

  return (
    <Card
      data-testid={`dragonfruit-page-apps.app-card.${replaceSpacesWithDashes(
        name,
      )}`}
    >
      <CardBody>
        <BodyWrapper>
          <CardGroup>
            {imageUrl ? (
              <AppLogo src={imageUrl} alt={''} />
            ) : (
              <AppLogoPlaceholder />
            )}
            <AppInfoGroup>
              <InfoGroup>
                <AppName>{name}</AppName>
                <AppVendor>
                  {vendor && (
                    <FormattedHTMLMessage
                      {...messages.byVendor}
                      values={{
                        vendor: vendor,
                      }}
                    />
                  )}
                </AppVendor>
              </InfoGroup>
              <InfoGroup data-testid="dragonfruit-page-apps.app-card.app-description">
                {documentationUrl && learnMoreDescription && (
                  <FormattedMessage
                    id={`dragonfruit-apps.app-card.${intlKey}-app-description`}
                    defaultMessage={description}
                    values={{
                      LearnMore: (
                        <a href={documentationUrl}>
                          <FormattedMessage
                            id={`dragonfruit-apps.app-card.${intlKey}-learn-more-app-description`}
                            defaultMessage={learnMoreDescription}
                          />
                        </a>
                      ),
                    }}
                  />
                )}
                {description &&
                  (!documentationUrl || !learnMoreDescription) && (
                    <FormattedMessage
                      id={`dragonfruit-apps.app-card.${intlKey}-app-description`}
                      defaultMessage={description}
                    />
                  )}
              </InfoGroup>
            </AppInfoGroup>
          </CardGroup>
          <CardGroup>
            {isInstalled ? installedAppButtons() : notInstalledAppButtons()}
          </CardGroup>
        </BodyWrapper>
      </CardBody>
    </Card>
  );
}
