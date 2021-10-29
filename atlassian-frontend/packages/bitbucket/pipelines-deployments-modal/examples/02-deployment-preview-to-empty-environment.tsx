/* eslint-disable import/no-unresolved */
import React from 'react';

import PipelinesDeploymentsModal from '../src';
import { createDeployment, emptyDeployment, environment } from '../src/mocks';
import { ModalType } from '../src/types';

export default () => {
  return (
    <div
      style={{ minWidth: '1100px', height: '600px' }}
      data-testid="deployment-modal"
    >
      <PipelinesDeploymentsModal
        onCloseModal={() => console.log('close modal')}
        onDeploy={() => console.log('deploy!')}
        modalType={ModalType.PREVIEW}
        deployment={createDeployment('SUCCESSFUL', 'success')}
        environment={environment}
        previousDeployment={emptyDeployment}
      />
    </div>
  );
};
