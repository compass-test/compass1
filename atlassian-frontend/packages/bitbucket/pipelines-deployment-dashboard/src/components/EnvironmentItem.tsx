import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Deployment, Environment } from '@atlassian/pipelines-models';

import { CardTransition, CardTransitionContext, CardType } from '../const';

import EnvironmentCard from './EnvironmentCard';
import EnvironmentHeader from './EnvironmentHeader';
import PromotionButton from './PromotionButton';
import { ItemWrapper } from './styled';

export type Props = {
  environment: Environment;
  environments: Environment[];
  toggleHistory: (environmentUuid: string) => void;
  openDeploymentPreview: (promotion: any) => void;
  openDeploymentSummary: (
    deploymentUuid: string,
    environmentUuid?: string,
  ) => void;
  selectedEnvironmentUuid?: string;
  isPremiumAccount: boolean;
  userIsAdmin: boolean;
};

const EnvironmentItem: React.FC<Props> = ({
  environment,
  environments,
  toggleHistory,
  openDeploymentPreview,
  selectedEnvironmentUuid,
  isPremiumAccount,
  userIsAdmin,
  openDeploymentSummary,
}) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [
    deploymentBeforeTransition,
    setDeploymentBeforeTransition,
  ] = useState<Deployment | null>(null);

  const hasOverlayCard = useMemo(() => {
    const deployment = environment.latest_deployment;
    const latest_successful_deployment =
      environment.latest_successful_deployment;
    return latest_successful_deployment && deployment && !!deployment.uuid;
  }, [environment]);

  const currentTransition = useMemo(() => {
    let transition = CardTransition.None;
    if (isTransitioning) {
      transition = hasOverlayCard
        ? CardTransition.ShowOverlayCard
        : CardTransition.SwapCards;
    }
    if (isCardHovered) {
      transition = CardTransition.HideOverlayCard;
    }
    return transition;
  }, [isCardHovered, isTransitioning, hasOverlayCard]);

  const deployment = useMemo(() => {
    const { latest_deployment, latest_successful_deployment } = environment;
    let deployment: any = latest_successful_deployment || latest_deployment;
    if (
      currentTransition === CardTransition.SwapCards &&
      deploymentBeforeTransition
    ) {
      deployment = deploymentBeforeTransition;
    }
    return deployment;
  }, [environment, currentTransition, deploymentBeforeTransition]);

  const shouldShowOverlayCard = useMemo(
    () => hasOverlayCard || deploymentBeforeTransition,
    [hasOverlayCard, deploymentBeforeTransition],
  );

  const overlayCardDeployment = useMemo(() => {
    const { latest_deployment, latest_successful_deployment } = environment;
    return (latest_deployment || latest_successful_deployment) as Deployment;
  }, [environment]);

  const hideOverlayCard = useCallback(
    () => !isCardHovered && hasOverlayCard && setIsCardHovered(true),
    [setIsCardHovered, isCardHovered, hasOverlayCard],
  );

  const showOverlayCard = useCallback(
    () => isCardHovered && setIsCardHovered(false),
    [isCardHovered, setIsCardHovered],
  );

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const deploymentBeforeTransition = environment.latest_successful_deployment as Deployment;
    if (deploymentBeforeTransition && deploymentBeforeTransition.uuid) {
      setIsTransitioning(true);
      setDeploymentBeforeTransition(deploymentBeforeTransition);
    } else if (isTransitioning) {
      setIsTransitioning(false);
      setDeploymentBeforeTransition(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasOverlayCard]);

  return (
    <ItemWrapper data-test="environment-item">
      <CardTransitionContext.Provider value={currentTransition}>
        <EnvironmentHeader
          environment={environment}
          selectedEnvironmentUuid={selectedEnvironmentUuid}
          toggleHistory={toggleHistory}
        >
          {deployment && (
            <>
              <div
                onMouseEnter={hideOverlayCard}
                onMouseLeave={showOverlayCard}
              >
                <EnvironmentCard
                  deployment={deployment}
                  promotionButton={
                    <PromotionButton
                      environment={environment}
                      environments={environments}
                      openDeploymentPreview={openDeploymentPreview}
                      isPremiumAccount={isPremiumAccount}
                      userIsAdmin={userIsAdmin}
                    />
                  }
                  openDeploymentSummary={openDeploymentSummary}
                />
              </div>
              {shouldShowOverlayCard && (
                <EnvironmentCard
                  deployment={overlayCardDeployment}
                  cardType={CardType.Overlay}
                  openDeploymentSummary={openDeploymentSummary}
                />
              )}
            </>
          )}
        </EnvironmentHeader>
      </CardTransitionContext.Provider>
    </ItemWrapper>
  );
};

export default React.memo(EnvironmentItem);
