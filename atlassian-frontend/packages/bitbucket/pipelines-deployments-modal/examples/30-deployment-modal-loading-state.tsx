/* eslint-disable import/no-unresolved */
import React from 'react';

import { Deployment } from '@atlassian/pipelines-models';

import PipelinesDeploymentsModal from '../src';
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
        deployment={new Deployment()}
      />
    </div>
  );
};
