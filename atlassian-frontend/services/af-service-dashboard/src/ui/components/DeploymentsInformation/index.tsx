/** @jsx jsx */

import React from 'react';
import { jsx } from '@emotion/core';

import { DeploymentColumn } from './DeploymentColumn';
import { NotFound } from '../NotFound';
import { columnsContainer } from './styles';

// eslint-disable-next-line import/no-unresolved
import rocket from 'images/rocket.svg';

type DeploymentsInformationProps = {
  envs: string[];
};

export const DeploymentsInformation: React.FC<DeploymentsInformationProps> = ({
  envs,
}) => {
  if (!envs.length) {
    return (
      <NotFound
        header="No Deployments Found"
        description="Once the service has deployments, you'll see the details here."
        imageUrl={rocket}
      />
    );
  }

  return (
    <div css={columnsContainer}>
      {envs.map(env => (
        <DeploymentColumn key={env} env={env} />
      ))}
    </div>
  );
};
