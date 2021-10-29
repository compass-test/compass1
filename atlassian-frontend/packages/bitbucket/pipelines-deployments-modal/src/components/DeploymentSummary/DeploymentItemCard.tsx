import React, { useMemo } from 'react';

import Avatar from '@atlaskit/avatar';
import Tooltip from '@atlaskit/tooltip';
import { Deployment } from '@atlassian/pipelines-models';
import StatusIcon from '@atlassian/pipelines-status-icon';

import {
  Card,
  CommitMessage,
  DeploymentAvatar,
  DeploymentDateWrapper,
  DeploymentItemCardHeader,
  StatusLink,
} from '../styled';

import CommitLink from './CommitLink';
import DeploymentDate from './DeploymentDate';

type Props = {
  deployment: Deployment;
  showDate: boolean;
  isTopCard: boolean;
  isElevated?: boolean;
};

const DeploymentItemCard: React.FC<Props> = ({
  deployment,
  showDate,
  isTopCard,
  isElevated,
}) => {
  const triggererTooltip = useMemo(() => {
    const { triggerer, isRedeploy } = deployment.step;
    if (!triggerer) {
      return '';
    }
    return `${isRedeploy ? 'Redeployed by' : 'Deployed by'} ${
      triggerer.displayName
    }`;
  }, [deployment.step]);

  return (
    <Card isTopCard={isTopCard} isElevated={!!isElevated}>
      <DeploymentItemCardHeader>
        <StatusLink href={deployment.deployable.url} target="_top">
          <StatusIcon
            status={deployment.state.parsedStatus || ''}
            tooltipContent={deployment.state.statusText}
            isLabelHidden
          />
          {deployment.deployable.name}
        </StatusLink>
        {showDate && (
          <DeploymentDateWrapper>
            <DeploymentDate date={deployment.state.started_on || ''} />
          </DeploymentDateWrapper>
        )}
      </DeploymentItemCardHeader>
      {deployment.deployable.commit && (
        <CommitMessage>
          {deployment.deployable.commit.shortHash &&
            deployment.deployable.commit.url && (
              <CommitLink
                commitShortHash={deployment.deployable.commit.shortHash}
                commitUrl={deployment.deployable.commit.url}
              />
            )}
          {deployment.deployable.commit.message}
        </CommitMessage>
      )}
      {deployment.step.triggerer ? (
        <Tooltip content={triggererTooltip}>
          <DeploymentAvatar>
            <Avatar
              appearance="circle"
              size="small"
              name={deployment.step.triggerer.displayName}
              src={deployment.step.triggerer.avatarUrl}
            />
          </DeploymentAvatar>
        </Tooltip>
      ) : null}
    </Card>
  );
};

export default React.memo(DeploymentItemCard);
