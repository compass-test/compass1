import React from 'react';

import { FormattedMessage } from 'react-intl';

import Button from '@atlaskit/button';
import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';
import {
  CONFIG_AS_CODE_DAC_LINK,
  CONFIG_AS_CODE_FILE_NAME,
} from '@atlassian/dragonfruit-external-component-management/constants';
import { AppListViewInfo } from '@atlassian/dragonfruit-forge';
import { CompassComponentDataManager } from '@atlassian/dragonfruit-graphql';
import { openInNewTab, useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { HeadingContainer, MainWrapper, SectionWrapper } from './styled';
import { SyncInformation } from './sync-information';

type ManagedSettingsProps = {
  dataManager: CompassComponentDataManager;
  installedApps: AppListViewInfo[];
};

export function ManagedSettings({
  dataManager,
  installedApps,
}: ManagedSettingsProps) {
  const { formatMessage } = useIntl();
  const appName = installedApps.find(
    (app) => app.metadata.id === dataManager.ecosystemAppId,
  )?.metadata.name;

  const linkButton = (
    <div>
      <Button
        onClick={() => openInNewTab(dataManager.externalSourceURL)}
        iconAfter={
          <ShortcutIcon
            label={`visit ${CONFIG_AS_CODE_FILE_NAME}`}
            size="small"
          />
        }
      >
        {formatMessage(messages.linkText)}
      </Button>
    </div>
  );

  const componentManagerInformation = () => {
    if (appName) {
      return (
        <div>
          <HeadingContainer>
            {formatMessage(messages.componentManagerHeading)}
          </HeadingContainer>
          <SectionWrapper>
            <FormattedMessage
              {...messages.managerDescription}
              values={{
                configFileName: CONFIG_AS_CODE_FILE_NAME,
                forgeAppName: appName,
              }}
            />
          </SectionWrapper>
        </div>
      );
    }
  };

  const getSyncInformation = () => {
    if (dataManager?.lastSyncEvent) {
      return (
        <div>
          <HeadingContainer>
            {formatMessage(messages.syncHeading)}
          </HeadingContainer>
          <SectionWrapper>
            <SyncInformation syncEvent={dataManager.lastSyncEvent} />
          </SectionWrapper>
        </div>
      );
    }
  };

  return (
    <MainWrapper data-testid="dragonfruit-page-component-details.managed-settings.overview">
      <div>
        {formatMessage(messages.description)}{' '}
        <a href={CONFIG_AS_CODE_DAC_LINK} target="_blank" rel="noopener">
          {formatMessage(messages.learnMore)}
        </a>
      </div>
      {componentManagerInformation()}
      {getSyncInformation()}
      {linkButton}
    </MainWrapper>
  );
}
