/* eslint-disable import/no-unresolved */
import React from 'react';

import { Environment } from '@atlassian/pipelines-models';

import PipelinesDeploymentsModal from '../src';
import { createDeployment } from '../src/mocks';
import { ModalType } from '../src/types';

export default () => {
  return (
    <div
      style={{ width: '1100px', height: '600px' }}
      data-testid="deployment-modal"
    >
      <PipelinesDeploymentsModal
        onCloseModal={() => console.log('close modal')}
        onDeploy={() => console.log('deploy!')}
        modalType={ModalType.SUMMARY}
        deployment={createDeployment('SUCCESSFUL', 'success')}
        environment={new Environment({ name: 'Production' })}
      />
    </div>
  );
};
