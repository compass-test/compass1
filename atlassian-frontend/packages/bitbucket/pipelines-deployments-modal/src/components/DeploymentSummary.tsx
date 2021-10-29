import React from 'react';

import { Deployment, Environment } from '@atlassian/pipelines-models';

import DeploymentItem from './DeploymentSummary/DeploymentItem';
import { DeploymentOverviewWrapper, Deployments } from './styled';

type Props = {
  environment?: Environment | any;
  deployment?: Deployment | any;
  lastSuccessfulDeployment?: Deployment;
  previousDeployment?: Deployment;
};

const DeploymentSummary: React.FC<Props> = ({
  environment,
  deployment,
  lastSuccessfulDeployment,
  previousDeployment,
}) => {
  return (
    <DeploymentOverviewWrapper>
      <Deployments>
        {!previousDeployment && <DeploymentItem hasEmptyCard showDate />}
        <DeploymentItem
          deployment={deployment}
          lastSuccessfulDeployment={lastSuccessfulDeployment}
          showDate={
            !!(deployment && deployment.state && deployment.state.started_on)
          }
          environmentName={previousDeployment ? '' : environment.name}
        />
        {previousDeployment && (
          <DeploymentItem
            deployment={previousDeployment}
            environmentName={
              (environment.nextPromotion || deployment).environmentName
            }
            hasEmptyCard
            showDate
          />
        )}
      </Deployments>
    </DeploymentOverviewWrapper>
  );
};

export default React.memo(DeploymentSummary);
