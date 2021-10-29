/* eslint-disable import/no-unresolved */
import React from 'react';

import PipelinesDeploymentsModal from '../src';
import DeploymentChanges from '../src/components/DeploymentChanges/DeploymentChanges';
import {
  commit,
  createDeployment,
  diff,
  environment,
  issue,
  pullRequest,
} from '../src/mocks';
import { ModalType } from '../src/types';

export default () => {
  return (
    <div
      style={{ minWidth: '1100px', height: '1000px' }}
      data-testid="deployment-modal"
    >
      <PipelinesDeploymentsModal
        onCloseModal={() => console.log('close modal')}
        onDeploy={() => console.log('deploy!')}
        modalType={ModalType.PREVIEW}
        deployment={createDeployment('SUCCESSFUL', 'success', '#3')}
        environment={environment}
        previousDeployment={createDeployment('SUCCESSFUL', 'success')}
      >
        <DeploymentChanges
          commits={Array(30).fill(commit)}
          diffs={Array(5).fill(diff)}
          issues={Array(4).fill(issue)}
          pullRequests={Array(3).fill(pullRequest)}
          isJiraConnected={true}
          isFetching={false}
          isRollback={false}
          onShowMoreCommits={(page: number) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
              }, 1000);
            })
          }
        />
      </PipelinesDeploymentsModal>
    </div>
  );
};
