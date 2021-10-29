import React, { useCallback, useMemo } from 'react';

import {
  FormattedDate,
  FormattedRelative,
  InjectedIntlProps,
  injectIntl,
} from 'react-intl';

import Avatar from '@atlaskit/avatar';
import Tooltip from '@atlaskit/tooltip';
import { Deployment } from '@atlassian/pipelines-models';
import StatusIcon from '@atlassian/pipelines-status-icon';

import { CardTransition, CardTransitionContext, CardType } from '../const';
import shouldStopClick from '../utils/shouldStopClick';

import EnvironmentCardActions from './EnvironmentCardActions';
import {
  BuildNumber,
  CardWrapper,
  CommitLink,
  CommitMessage,
  DeployerAvatar,
  DisabledPipeline,
  PipelineLink,
  Status,
  StyledDeploymentDate,
} from './styled';

export type Props = {
  deployment: Deployment;
  openDeploymentSummary: (
    deploymentUuid: string,
    environmentUuid?: string,
  ) => void;
  openRedeployPreview?: (deployment: Deployment) => void;
  promotionButton?: React.ReactNode | null;
  cardType?: CardType;
  isDisabled?: boolean;
} & InjectedIntlProps;

const EnvironmentCard = injectIntl(
  ({
    deployment,
    openDeploymentSummary,
    promotionButton = null,
    cardType = CardType.Dashboard,
    isDisabled = false,
    openRedeployPreview,
  }: Props) => {
    const isOverlayCard = useMemo(() => cardType === CardType.Overlay, [
      cardType,
    ]);

    const triggererTooltip = useMemo(() => {
      if (!deployment.step.triggerer) {
        return '';
      }
      return `${deployment.step.isRedeploy ? 'Redeployed by' : 'Deployed by'} ${
        deployment.step.triggerer.display_name
      }`;
    }, [deployment.step]);

    const clampValue = useMemo(
      () =>
        ({
          [CardType.Overlay]: 1,
          [CardType.History]: 2,
          [CardType.Dashboard]: 3,
        }[cardType]),
      [cardType],
    );

    const onCardClick = useCallback(
      (e) => {
        if (shouldStopClick(e.target)) {
          return;
        }
        openDeploymentSummary(deployment.uuid);
      },
      [deployment, openDeploymentSummary],
    );

    const onRedeployClick = useCallback(
      () => (openRedeployPreview ? openRedeployPreview(deployment) : null),
      [deployment, openRedeployPreview],
    );

    return (
      <CardTransitionContext.Consumer>
        {(transition) => (
          <CardWrapper
            onClick={onCardClick}
            transition={transition}
            isOverlayCard={isOverlayCard}
            data-test="environment-card"
          >
            <BuildNumber>
              <Status>
                <StatusIcon
                  status={deployment.state.parsedStatus || ''}
                  tooltipContent={deployment.state.statusText}
                  isLabelHidden
                />
              </Status>
              {isDisabled ? (
                <DisabledPipeline>
                  {deployment.deployable.name}
                </DisabledPipeline>
              ) : (
                <PipelineLink
                  href={deployment.deployable.url}
                  target="_top"
                  data-stop-click
                >
                  {deployment.deployable.name}
                </PipelineLink>
              )}
            </BuildNumber>
            {promotionButton}
            {cardType === CardType.History && (
              <EnvironmentCardActions
                openRedeployPreview={onRedeployClick}
                isDisabled={isDisabled}
              />
            )}
            <CommitMessage
              clamp={clampValue}
              shouldTransition={transition === CardTransition.SwapCards}
            >
              <CommitLink>
                {deployment.deployable?.commit?.shortHash}
              </CommitLink>
              {deployment.deployable?.commit?.message}
            </CommitMessage>
            <StyledDeploymentDate>
              <Tooltip
                content={
                  <FormattedDate value={deployment.state.started_on || ''} />
                }
              >
                <FormattedRelative value={deployment.state.started_on || ''} />
              </Tooltip>
            </StyledDeploymentDate>
            <DeployerAvatar>
              {deployment.step.triggerer ? (
                <Tooltip content={triggererTooltip}>
                  <Avatar
                    src={deployment.step.triggerer.avatarUrl}
                    target="_top"
                    size="small"
                    borderColor="transparent"
                    name={deployment.step.triggerer.displayName}
                  />
                </Tooltip>
              ) : null}
            </DeployerAvatar>
          </CardWrapper>
        )}
      </CardTransitionContext.Consumer>
    );
  },
);

export default React.memo(EnvironmentCard);
