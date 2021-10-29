import React, { useMemo } from 'react';

import Media from 'react-media';
import { Transition } from 'react-transition-group';

import Button from '@atlaskit/button';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import Spinner from '@atlaskit/spinner';
import { Deployment, Environment } from '@atlassian/pipelines-models';

import EnvironmentHistory from './EnvironmentHistory';
import EnvironmentItem from './EnvironmentItem';
import { Dashboard, History, Loading, SettingsButton, Wrapper } from './styled';

export type Props = {
  deploymentDashboard: Environment[][];
  environmentHistory: { [key: string]: Deployment[] };
  fetchingDashboard: boolean;
  fetchingHistory: boolean | string;
  selectedEnvironmentUuid: string;
  deploymentSettingsPageUrl: string;
  userIsAdmin: boolean;
  isPremiumAccount: boolean;
  getEnvironmentHistory: (environmentUuid: string, currentPage: number) => void;
  toggleHistory: (environmentUuid?: string) => void;
  openDeploymentPreview: (promotion: any) => void;
  openDeploymentSummary: (
    deploymentUuid: string,
    environmentUuid?: string,
  ) => void;
  openRedeployPreview: (deployment: Deployment) => void;
};

const DeploymentGroup: React.FC<{
  deploymentGroup: Environment[];
  environments: Environment[];
  groupIndex: number;
  selectedEnvironmentUuid: string;
  userIsAdmin: boolean;
  isPremiumAccount: boolean;
  toggleHistory: (environmentUuid: string) => void;
  openDeploymentPreview: (promotion: any) => void;
  openDeploymentSummary: (
    deploymentUuid: string,
    environmentUuid?: string,
  ) => void;
}> = React.memo(
  ({
    deploymentGroup,
    environments,
    groupIndex,
    selectedEnvironmentUuid,
    userIsAdmin,
    isPremiumAccount,
    toggleHistory,
    openDeploymentPreview,
    openDeploymentSummary,
  }) => {
    if (deploymentGroup.length === 0) {
      return null;
    }
    return (
      <Media query="(max-width: 600px)" key={`group_${groupIndex}`}>
        {(matchesSmallScreen) => (
          <Media query="(max-width: 1000px)">
            {(matchesMediumScreen) => (
              <GridColumn
                medium={
                  matchesSmallScreen ||
                  (matchesMediumScreen && selectedEnvironmentUuid)
                    ? 12
                    : 4
                }
              >
                {deploymentGroup.map((environment: Environment, envIndex) => (
                  <EnvironmentItem
                    environment={environment}
                    environments={environments}
                    selectedEnvironmentUuid={selectedEnvironmentUuid}
                    key={`environment_${envIndex}`}
                    isPremiumAccount={isPremiumAccount}
                    userIsAdmin={userIsAdmin}
                    toggleHistory={toggleHistory}
                    openDeploymentPreview={openDeploymentPreview}
                    openDeploymentSummary={openDeploymentSummary}
                  />
                ))}
              </GridColumn>
            )}
          </Media>
        )}
      </Media>
    );
  },
);

const DeploymentDashboard: React.FC<Props> = ({
  deploymentDashboard,
  environmentHistory,
  fetchingDashboard,
  fetchingHistory,
  selectedEnvironmentUuid,
  deploymentSettingsPageUrl,
  isPremiumAccount,
  userIsAdmin,
  getEnvironmentHistory,
  toggleHistory,
  openDeploymentPreview,
  openDeploymentSummary,
  openRedeployPreview,
}) => {
  const environments = useMemo(() => deploymentDashboard.flat(), [
    deploymentDashboard,
  ]);

  const selectedEnvironment = useMemo(
    () =>
      environments.find(
        (environment) =>
          selectedEnvironmentUuid &&
          environment.uuid === selectedEnvironmentUuid,
      ),
    [selectedEnvironmentUuid, environments],
  );

  const isLoading = useMemo(
    () => fetchingDashboard && environments.length === 0,
    [fetchingDashboard, environments],
  );

  if (isLoading) {
    return (
      <Loading>
        <Spinner size="large" />
      </Loading>
    );
  }

  return (
    <Wrapper>
      <Transition in={!!selectedEnvironment} timeout={0}>
        {(state) => (
          <>
            <Dashboard state={state} data-test="environment-list">
              {userIsAdmin && (
                <SettingsButton>
                  <Button
                    label="Deployment settings"
                    iconBefore={<SettingsIcon label="Configuration" />}
                    href={deploymentSettingsPageUrl}
                    target="_top"
                  />
                </SettingsButton>
              )}
              <Page>
                <Grid spacing="cosy" layout="fluid">
                  {deploymentDashboard.map((deploymentGroup, index) => (
                    <DeploymentGroup
                      key={`deploymentGroup_${index}`}
                      deploymentGroup={deploymentGroup}
                      groupIndex={index}
                      selectedEnvironmentUuid={selectedEnvironmentUuid}
                      isPremiumAccount={isPremiumAccount}
                      userIsAdmin={userIsAdmin}
                      environments={environments}
                      toggleHistory={toggleHistory}
                      openDeploymentPreview={openDeploymentPreview}
                      openDeploymentSummary={openDeploymentSummary}
                    />
                  ))}
                </Grid>
              </Page>
            </Dashboard>
            <History state={state}>
              {selectedEnvironment && (
                <EnvironmentHistory
                  key={`environment_history_${selectedEnvironmentUuid}`}
                  environment={selectedEnvironment}
                  environmentHistory={
                    environmentHistory[selectedEnvironmentUuid] || []
                  }
                  getEnvironmentHistory={getEnvironmentHistory}
                  isFetching={fetchingHistory === selectedEnvironmentUuid}
                  toggleHistory={toggleHistory}
                  openRedeployPreview={openRedeployPreview}
                  openDeploymentSummary={openDeploymentSummary}
                />
              )}
            </History>
          </>
        )}
      </Transition>
    </Wrapper>
  );
};

export default React.memo(DeploymentDashboard);
