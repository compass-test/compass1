import React, { useCallback, useMemo } from 'react';

import Button from '@atlaskit/button';
import Tooltip from '@atlaskit/tooltip';
import { Environment } from '@atlassian/pipelines-models';

import { ButtonWrapper } from './styled';

export type Props = {
  environment: Environment;
  environments: Environment[];
  isPremiumAccount: boolean;
  userIsAdmin: boolean;
  openDeploymentPreview: (promotion: any) => void;
};

const PromotionButton: React.FC<Props> = ({
  environment,
  environments,
  openDeploymentPreview,
  isPremiumAccount,
  userIsAdmin,
}) => {
  const deployment = useMemo(() => {
    return environments.find(
      (env: Environment) =>
        env.uuid === environment.nextPromotion?.environmentUuid,
    )?.latest_successful_deployment;
  }, [environments, environment]);

  const promotionEnvironment = useMemo(
    () =>
      environments.filter(
        (env) =>
          environment.nextPromotion &&
          environment.nextPromotion.environmentUuid === env.uuid,
      )[0] || new Environment(),
    [environment.nextPromotion, environments],
  );

  const isAdminRestricted = useMemo(() => {
    return (
      promotionEnvironment.hasAdminOnlyRestriction &&
      isPremiumAccount &&
      !userIsAdmin
    );
  }, [promotionEnvironment, isPremiumAccount, userIsAdmin]);

  const isDisabled = useMemo(
    () => promotionEnvironment.isLocked || isAdminRestricted,
    [isAdminRestricted, promotionEnvironment],
  );

  const tooltipText = useMemo(() => {
    if (promotionEnvironment.isLocked) {
      return `We're currently deploying to ${promotionEnvironment.name}`;
    }

    if (isAdminRestricted) {
      return `Only repository admins are allowed to deploy to the ${promotionEnvironment.name} environment`;
    }

    return `Promote to ${promotionEnvironment.name} environment`;
  }, [isAdminRestricted, promotionEnvironment]);

  const onPromoteClick = useCallback(
    () =>
      openDeploymentPreview({
        deployment: deployment,
        environment: environment,
      }),
    [environment, deployment, openDeploymentPreview],
  );

  return deployment ? (
    <ButtonWrapper data-stop-click>
      <Tooltip content={tooltipText}>
        <Button
          isDisabled={isDisabled}
          onClick={onPromoteClick}
          spacing="compact"
        >
          Promote
        </Button>
      </Tooltip>
    </ButtonWrapper>
  ) : null;
};

export default React.memo(PromotionButton);
