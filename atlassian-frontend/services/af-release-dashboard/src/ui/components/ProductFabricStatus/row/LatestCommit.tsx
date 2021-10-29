import React from 'react';
import { ResponseValues } from 'axios-hooks';
import { DeploymentResponse } from '../../../interfaces';
import { Commit } from '../../Commit';

export const LatestCommit: React.FunctionComponent<{
  result: ResponseValues<DeploymentResponse, any>;
}> = ({ result }) => {
  const data = result.data;
  if (!data || Object.keys(data.payload).length === 0) {
    return null;
  }
  const {
    latestCommitHash,
    latestCommitTimestamp,
    lastDeploymentCommitHash,
    numberOfPullRequestsBehind,
  } = data.payload;

  if (
    numberOfPullRequestsBehind < 1 ||
    latestCommitHash === lastDeploymentCommitHash
  ) {
    return null;
  }

  return (
    <>
      <tr>
        <td>Latest commit:</td>
        <td>
          <Commit timestamp={latestCommitTimestamp} commit={latestCommitHash} />
        </td>
      </tr>
    </>
  );
};
