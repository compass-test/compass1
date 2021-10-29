/** @jsx jsx */

import React, { useCallback } from 'react';
import { useRouter } from 'react-resource-router';
import { jsx } from '@emotion/core';

import Button from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';

import { useInfiniteQuery } from '../../../utils/request';
import { Deployment, DeploymentCard } from './DeploymentCard';
import { columnContainer, columnHeader, scroll } from './styles';

type DeploymentColumnProps = {
  env: string;
};

export const DeploymentColumn: React.FC<DeploymentColumnProps> = ({ env }) => {
  const [{ match }] = useRouter();
  const {
    params: { service },
  } = match;

  const generatePath = useCallback(
    (cursor?: string) =>
      `/api/deployments?name=${service}&env=${env}` +
      (cursor ? `&cursor=${cursor}` : ''),
    [service, env],
  );

  const { loading, error, fetchNextPage, data } = useInfiniteQuery<Deployment>(
    generatePath,
  );

  return (
    <div css={columnContainer}>
      <p css={columnHeader}>{env}</p>
      <div css={scroll}>
        {data.map(deployment => (
          <DeploymentCard key={deployment.deploymentId} {...deployment} />
        ))}
        {loading && <Spinner />}
        {error && 'Error loading more, try refreshing the page'}
        {fetchNextPage && <Button onClick={fetchNextPage}>Load more</Button>}
      </div>
    </div>
  );
};
