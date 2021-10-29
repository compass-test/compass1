import React from 'react';

import { Deployment } from '@atlassian/pipelines-models';

import {
  DeploymentArrowFrom,
  DeploymentArrowTo,
  DeploymentItemHeader,
  DeploymentItemStatus,
  DeploymentItemWrapper,
  EmptyCard,
  Title,
} from '../styled';

import DeploymentItemCard from './DeploymentItemCard';

type Props = {
  deployment?: Deployment;
  lastSuccessfulDeployment?: Deployment | any;
  environmentName?: string;
  hasEmptyCard?: boolean | any;
  showDate?: boolean | any;
};

const DeploymentItem: React.FC<Props> = ({
  deployment,
  lastSuccessfulDeployment,
  environmentName,
  hasEmptyCard = false,
  showDate = false,
}) => {
  const hasDeploymentCard = !!deployment?.uuid;
  const hasPreviousDeploymentCard = !!lastSuccessfulDeployment;
  const hasTwoCards =
    (hasEmptyCard && (hasDeploymentCard || hasPreviousDeploymentCard)) ||
    (hasDeploymentCard && hasPreviousDeploymentCard);

  const renderEmptyCard = () => {
    if (!hasEmptyCard) {
      return null;
    }
    return environmentName ? (
      <>
        <DeploymentArrowFrom />
        <EmptyCard />
      </>
    ) : (
      <>
        <DeploymentArrowTo />
        <EmptyCard />
      </>
    );
  };

  return (
    <DeploymentItemWrapper
      hasTwoCards={hasTwoCards}
      hasEnvironment={!!environmentName}
    >
      {environmentName && deployment && (
        <DeploymentItemHeader iconType={deployment.state.statusIcon}>
          <DeploymentItemStatus
            status={deployment.state.parsedStatus}
            tooltipContent={deployment.state.statusText}
            isLabelHidden
          />
          <Title title={environmentName}>{environmentName}</Title>
        </DeploymentItemHeader>
      )}
      {renderEmptyCard()}
      {hasDeploymentCard && deployment && (
        <DeploymentItemCard
          deployment={deployment}
          isTopCard={!hasEmptyCard || hasPreviousDeploymentCard}
          showDate={showDate}
          isElevated={!hasTwoCards && !environmentName}
        />
      )}
      {hasPreviousDeploymentCard && (
        <DeploymentItemCard
          deployment={lastSuccessfulDeployment}
          isTopCard={false}
          showDate={showDate}
        />
      )}
    </DeploymentItemWrapper>
  );
};

export default React.memo(DeploymentItem);
