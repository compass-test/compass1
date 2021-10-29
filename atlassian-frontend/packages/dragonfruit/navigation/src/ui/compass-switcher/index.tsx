import React, { useMemo, useState } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import FabricAnalyticsListeners, {
  FabricChannel,
} from '@atlaskit/analytics-listeners';
import { AppSwitcher } from '@atlaskit/atlassian-navigation';
import { Popup, TriggerProps } from '@atlaskit/popup';
import { useGetAnalyticsClient } from '@atlassian/dragonfruit-analytics';
import {
  useSwitcherRemoteAdminConfig,
  useSwitcherRemoteConfig,
} from '@atlassian/dragonfruit-feature-flags';
import {
  getEnvironmentFromOrigin,
  useTenantInfo,
} from '@atlassian/dragonfruit-tenant-context';
import AtlassianSwitcher from '@atlassian/switcher';

import messages from './messages';
import { SwitcherContainer } from './styled';

const Switcher = () => {
  const environment = useMemo(() => getEnvironmentFromOrigin(), []);
  const { cloudId, accountId } = useTenantInfo();

  const analyticsClient = useGetAnalyticsClient(
    environment,
    cloudId,
    accountId,
  );

  const enableRemoteConfig = useSwitcherRemoteConfig();
  const enableRemoteAdminConfig = useSwitcherRemoteAdminConfig();

  return (
    <SwitcherContainer>
      <FabricAnalyticsListeners
        client={analyticsClient}
        excludedChannels={[
          FabricChannel.atlaskit,
          FabricChannel.elements,
          FabricChannel.editor,
          FabricChannel.media,
        ]}
      >
        <AtlassianSwitcher
          product=""
          disableCustomLinks
          cloudId={cloudId}
          appearance="standalone"
          enableRemoteConfiguration={enableRemoteConfig}
          enableRemoteAdminLinks={enableRemoteAdminConfig}
        />
      </FabricAnalyticsListeners>
    </SwitcherContainer>
  );
};

const CompassSwitcher = (props: InjectedIntlProps) => {
  const { formatMessage } = props.intl;

  const [isSwitcherOpen, setSwitcherOpen] = useState<boolean>(false);

  const toggleDrawer = () => setSwitcherOpen((current) => !current);
  const closeDrawer = () => setSwitcherOpen(false);

  return (
    <Popup
      placement="bottom-start"
      content={() => <Switcher />}
      isOpen={isSwitcherOpen}
      onClose={closeDrawer}
      trigger={(triggerProps: TriggerProps) => (
        <AppSwitcher
          {...triggerProps}
          tooltip={formatMessage(messages.tooltip)}
          onClick={toggleDrawer}
          isSelected={isSwitcherOpen}
          testId={'dragonfruit.navigation.compass-switcher.trigger'}
        />
      )}
    />
  );
};

export default injectIntl(CompassSwitcher);
