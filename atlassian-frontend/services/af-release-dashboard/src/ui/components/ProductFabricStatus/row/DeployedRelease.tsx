import React from 'react';
import Lozenge from '@atlaskit/lozenge';
import Tooltip from '@atlaskit/tooltip';
import { ReleasesProps } from '../../../pages/HomePage';
import { ResponseValues } from 'axios-hooks';
import { DeploymentResponse } from '../../../interfaces';

export const DeployedRelease: React.FunctionComponent<{
  props: ReleasesProps;
  result: ResponseValues<DeploymentResponse, any>;
}> = ({ props, result }) => {
  const deployedReleaseName = getDeployedReleaseName(props, result);
  const activelyDevelopedReleaseName = getInDevelopmentReleaseName(props);

  if (!deployedReleaseName) {
    return null;
  }
  const isStale = activelyDevelopedReleaseName !== deployedReleaseName;

  const msg = `This is ${
    isStale ? 'NOT ' : ''
  } the actively developed release.`;
  const tooltipMessage = `${msg}${
    isStale
      ? `\n\nProduct fabric should be running ${activelyDevelopedReleaseName}`
      : ''
  }`;
  return (
    <tr>
      <td>Deployed Release:</td>
      <td style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
        <Tooltip content={tooltipMessage} position="left" tag="span">
          <Lozenge appearance={'new'} isBold>
            {deployedReleaseName}
          </Lozenge>
        </Tooltip>
      </td>
    </tr>
  );
};

/**
 * Get the name of release which has been deployed on product-fabric.
 *
 * Typically this will be the name of the in-development build.
 * However, it could be a previous release if the branch deploy is stale.
 */
const getDeployedReleaseName = (
  { releases }: ReleasesProps,
  { data: deployment }: ResponseValues<DeploymentResponse, any>,
) => {
  if (!releases || !deployment || !deployment.payload) {
    return;
  }
  const lastDeploymentDate = new Date(
    deployment.payload.lastDeploymentTimestamp,
  );
  // Determine which release the deployment date sits within
  const deployedRelease = releases.find((release) => {
    const { createdDate, stabilizingDate, status } = release;
    if (!createdDate || (!stabilizingDate && status !== 'development')) {
      return false;
    }

    // When active development started
    const releaseStartDate = new Date(createdDate);
    if (status === 'development') {
      return lastDeploymentDate >= releaseStartDate;
    }
    if (stabilizingDate) {
      // When the release candidate was cut from the develop branch
      const releaseCandidateDate = new Date(stabilizingDate);
      if (
        lastDeploymentDate >= releaseStartDate &&
        lastDeploymentDate <= releaseCandidateDate
      ) {
        return true;
      }
    }
    return false;
  });

  return (deployedRelease && deployedRelease.name) || 'Unknown';
};

export function getInDevelopmentReleaseName({ releases }: ReleasesProps) {
  const release = releases?.find((release) => release.status === 'development');
  return (release && release.name) || 'Unknown';
}
