import React from 'react';

import PageHeader from '@atlaskit/page-header';
import { LoadingView } from '@atlassian/dragonfruit-common-ui';
import { CONFIG_AS_CODE_APP_IDS } from '@atlassian/dragonfruit-external-component-management/constants';
import { useGetInstalledApps } from '@atlassian/dragonfruit-forge';
import { CompassComponentDetailViewFragment } from '@atlassian/dragonfruit-graphql';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { ComponentBreadcrumbs } from '../../../common/ui/breadcrumbs';

import ConfigAsCodeSetup from './config-as-code-setup';
import { ComponentSettingsEmptyState } from './empty-state';
import { ManagedSettings } from './managed-settings';
import messages from './messages';
import { WideContainer } from './styled';

type ComponentSettingsProps = {
  currentComponent: CompassComponentDetailViewFragment;
};

export function ComponentSettings(props: ComponentSettingsProps) {
  const { currentComponent } = props;

  const { formatMessage } = useIntl();
  const { cloudId } = useTenantInfo();
  const { data: installedApps, loading } = useGetInstalledApps(cloudId);

  if (loading) {
    return <LoadingView />;
  }

  const configAsCodeApps = installedApps.filter((app) =>
    CONFIG_AS_CODE_APP_IDS.includes(app.metadata.id),
  );

  const breadcrumbs = (
    <ComponentBreadcrumbs
      componentId={currentComponent.id}
      componentName={currentComponent.name}
      componentType={currentComponent.type}
    />
  );

  const configAsCodeInformation = (
    <>
      <h2>{formatMessage(messages.componentManagementHeader)}</h2>
      {currentComponent.dataManager == null ? (
        <ConfigAsCodeSetup component={currentComponent} />
      ) : (
        <ManagedSettings
          dataManager={currentComponent.dataManager}
          installedApps={configAsCodeApps}
        />
      )}
    </>
  );

  return (
    <WideContainer>
      <PageHeader breadcrumbs={breadcrumbs}>
        {formatMessage(messages.pageHeader)}
      </PageHeader>
      {configAsCodeApps.length > 0 ? (
        configAsCodeInformation
      ) : (
        <ComponentSettingsEmptyState />
      )}
    </WideContainer>
  );
}
