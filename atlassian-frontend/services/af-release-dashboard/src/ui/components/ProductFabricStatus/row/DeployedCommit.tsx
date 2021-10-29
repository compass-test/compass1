import React from 'react';
import { ResponseValues } from 'axios-hooks';
import moment from 'moment-timezone';
import styled from 'styled-components';
import Tooltip from '@atlaskit/tooltip';
import { N400 } from '@atlaskit/theme/colors';
import { DeploymentResponse } from '../../../interfaces';
import { PAGINATION_THRESHOLD_IN_HOURS } from '../../../../server/constants';
import { Commit } from '../../Commit';

const BehindMessage = styled.span`
  padding-top: 0.3em;
  display: block;
  color: ${N400};
`;

export const DeployedCommit: React.FunctionComponent<{
  result: ResponseValues<DeploymentResponse, any>;
}> = ({ result }) => {
  const { error, data, loading } = result;
  if (error) {
    return (
      <tr>
        <td>Error getting data</td>
      </tr>
    );
  }
  if (loading) {
    return (
      <tr>
        <td>Loading ...</td>
      </tr>
    );
  }
  if (data) {
    if (Object.keys(data.payload).length === 0) {
      return (
        <tr>
          <td>No data</td>
        </tr>
      );
    } else {
      const {
        numberOfPullRequestsBehind,
        latestCommitTimestamp,
        lastDeploymentTimestamp,
        lastDeploymentCommitHash,
        confluenceBuildUrl,
      } = data.payload;

      let prsMessage = '';
      if (numberOfPullRequestsBehind > 0) {
        const momentObjectOfLatestCommit = moment(latestCommitTimestamp);
        const timeDiffInHours = momentObjectOfLatestCommit.diff(
          moment(lastDeploymentTimestamp),
          'hours',
        );
        prsMessage = `Behind by ${numberOfPullRequestsBehind}${
          timeDiffInHours >= PAGINATION_THRESHOLD_IN_HOURS ? '+' : ''
        } merged pull request${numberOfPullRequestsBehind > 1 ? 's' : ''}.`;
      }

      return (
        <tr>
          <td>Deployed commit:</td>
          <td>
            <Commit
              timestamp={lastDeploymentTimestamp}
              commit={lastDeploymentCommitHash}
              buildUrl={confluenceBuildUrl}
            />
            <Tooltip
              content="The number of merged pull requests which are yet to be deployed to product-fabric"
              position="bottom"
              tag="span"
            >
              {prsMessage && <BehindMessage>{prsMessage}</BehindMessage>}
            </Tooltip>
          </td>
        </tr>
      );
    }
  }
  return null;
};
