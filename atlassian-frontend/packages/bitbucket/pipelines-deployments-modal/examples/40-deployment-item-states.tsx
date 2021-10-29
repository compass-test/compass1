/* eslint-disable import/no-unresolved */
import React from 'react';

import DeploymentItem from '../src/components/DeploymentSummary/DeploymentItem';
import { createDeployment, emptyDeployment } from '../src/mocks';

export default () => {
  return (
    <div data-testid="deployment-item-statuses">
      <div style={{ height: '150px' }}>
        <DeploymentItem
          deployment={emptyDeployment}
          environmentName="Production"
          showDate={true}
        />
      </div>
      <div style={{ height: '150px' }}>
        <DeploymentItem
          deployment={createDeployment('FAILED', 'failed')}
          environmentName="Production"
          showDate={true}
        />
      </div>
      <div style={{ height: '150px' }}>
        <DeploymentItem
          deployment={createDeployment('IN_PROGRESS', 'building')}
          environmentName="Production"
          showDate={true}
        />
      </div>
      <div style={{ height: '150px' }}>
        <DeploymentItem
          deployment={createDeployment('STOPPED', 'stopped')}
          environmentName="Production"
          showDate={true}
        />
      </div>
      <div style={{ height: '150px' }}>
        <DeploymentItem
          deployment={createDeployment('SUCCESSFUL', 'success')}
          environmentName="Production"
          showDate={true}
        />
      </div>
      <div style={{ height: '150px' }}>
        <DeploymentItem
          deployment={createDeployment('REDEPLOY', 'redeploy')}
          environmentName="Production"
          showDate={true}
        />
      </div>
      <div style={{ height: '150px' }}>
        <DeploymentItem
          deployment={createDeployment('FAILED_REDEPLOY', 'failedRedeploy')}
          environmentName="Production"
          showDate={true}
        />
      </div>
      <div style={{ height: '150px' }}>
        <DeploymentItem
          deployment={createDeployment('RERUN', 'rerun')}
          environmentName="Production"
          showDate={true}
        />
      </div>
    </div>
  );
};
