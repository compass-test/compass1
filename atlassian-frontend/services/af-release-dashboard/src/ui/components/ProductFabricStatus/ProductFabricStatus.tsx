import React from 'react';
import useAxios, { ResponseValues } from 'axios-hooks';
import moment from 'moment-timezone';
import Panel from '@atlaskit/panel';
import Tooltip from '@atlaskit/tooltip';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import { serviceUrl } from '../../../server/constants';
import { DeploymentResponse } from '../../interfaces';
import type { ReleasesProps } from '../../pages/HomePage';
import { ProductIntegratorPipeline } from './row/ProductIntegratorPipeline';
import styled from 'styled-components';
import { G300, R300, N200, N300 } from '@atlaskit/theme/colors';
import { DeployedRelease } from './row/DeployedRelease';
import { DeployedCommit } from './row/DeployedCommit';
import { LatestCommit } from './row/LatestCommit';
import { WhiteBox } from '../Box';

const BuildStatusWrapper = styled.div`
  text-align: center;
  margin: 0.5rem;
`;

const IconWrapper = styled.span`
  position: relative;
  > span {
    position: relative;
    top: 4px;
    right: 1px;
  }
`;
const PanelWrapper = styled(WhiteBox)`
  padding-left: 2rem;
  > div {
    margin-bottom: 0;
    > div:first-child {
      margin-top: 0.5rem;
    }
  }
  a {
    color: black;
  }
`;

const TestingStatus = styled.p`
  padding-bottom: 12px;
  > span {
    display: block;
    padding-top: 6px;
    font-size: 0.75rem;
    font-style: italic;
  }
`;

const SyncText = styled.em`
  color: ${N200};
  font-size: 0.9em;
`;

const TableBody = styled.tbody`
  border-bottom: none;
  > tr > td {
    vertical-align: top;
  }
`;

const SyncTime = (props: { lastSyncTimestamp: string }) => {
  const momentTimestamp = moment(props.lastSyncTimestamp);
  return (
    <SyncText>
      Last checked {momentTimestamp.fromNow()}{' '}
      <Tooltip
        content={`Data is accurate within a 20 minute window. It takes roughly an hour for a merged pull request to be deployed on product-fabric.`}
        position="bottom"
        tag="span"
      >
        <QuestionCircleIcon size="small" primaryColor={N300} />
      </Tooltip>
    </SyncText>
  );
};

const ProductFabricBuildStatus: React.FunctionComponent<{
  result: ResponseValues<DeploymentResponse, any>;
}> = ({ result }) => {
  const { loading, data, error } = result;
  if (loading) {
    return (
      <BuildStatusWrapper>
        <h4>Loading Product Fabric status...</h4>
      </BuildStatusWrapper>
    );
  }
  if (error || !data || !data.payload) {
    return <p>Error</p>;
  }
  const { isStale, lastSyncTimestamp } = data.payload;
  if (isStale) {
    return (
      <BuildStatusWrapper>
        <h4 data-testid="build-status">
          <IconWrapper>
            <CrossCircleIcon primaryColor={R300} />
          </IconWrapper>
          Product Fabric is <u>not</u> up to date with <code>develop</code>
        </h4>
        <TestingStatus data-testid="testing-status">
          Blitz testing is <em>discouraged</em> at this time.
          <span>
            Visit{' '}
            <a
              target={'_blank'}
              href={'https://atlassian.slack.com/archives/C012AG16T1A'}
            >
              #twp-release-managers
            </a>{' '}
            for updates.
          </span>
        </TestingStatus>
        <SyncTime lastSyncTimestamp={lastSyncTimestamp} />
      </BuildStatusWrapper>
    );
  } else {
    return (
      <BuildStatusWrapper>
        <h4 data-testid="build-status">
          <IconWrapper>
            <CheckCircleIcon primaryColor={G300} />
          </IconWrapper>
          Product Fabric is up to date with <code>develop</code>
        </h4>
        <TestingStatus data-testid="testing-status">
          Blitz testing is <em>safe</em> at this time
        </TestingStatus>
        <SyncTime lastSyncTimestamp={lastSyncTimestamp} />
      </BuildStatusWrapper>
    );
  }
};

export const ProductFabricStatus = (props: ReleasesProps) => {
  const [deploymentStatusResult] = useAxios<DeploymentResponse>(
    `${serviceUrl()}/api/v1/deployment`,
  );

  return (
    <>
      <ProductFabricBuildStatus result={deploymentStatusResult} />
      <PanelWrapper>
        <Panel header={<strong>More information</strong>}>
          <table>
            <TableBody>
              <DeployedRelease props={props} result={deploymentStatusResult} />
              <DeployedCommit result={deploymentStatusResult} />
              <LatestCommit result={deploymentStatusResult} />
              <ProductIntegratorPipeline />
            </TableBody>
          </table>
        </Panel>
      </PanelWrapper>
    </>
  );
};
