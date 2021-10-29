import React, { useCallback, useMemo } from 'react';

import EditorPanelIcon from '@atlaskit/icon/glyph/editor/panel';
import { Environment } from '@atlassian/pipelines-models';

import { CardTransitionContext } from '../const';

import {
  EnvironmentHeaderCardWrapper,
  EnvironmentHeaderEmptyMessage,
  EnvironmentHeaderEmptyState,
  EnvironmentHeaderIcon,
  EnvironmentHeaderName,
  EnvironmentHeaderTitle,
  EnvironmentHeaderWrapper,
  EnvrionmentHeaderStatus,
} from './styled';

export type Props = {
  environment: Environment;
  selectedEnvironmentUuid?: string;
  toggleHistory: (environmentUuid: string) => void;
  children: React.ReactNode;
};

const EnvironmentHeader: React.FC<Props> = ({
  environment,
  selectedEnvironmentUuid,
  toggleHistory,
  children,
}) => {
  const isSelected = useMemo(
    () =>
      selectedEnvironmentUuid
        ? selectedEnvironmentUuid === environment.uuid
        : false,
    [selectedEnvironmentUuid, environment],
  );

  const deploymentState = useMemo(() => {
    const { latest_deployment, latest_successful_deployment } = environment;
    const deployment = latest_deployment || latest_successful_deployment;
    return deployment && deployment.state;
  }, [environment]);

  const onHeaderClick = useCallback(() => toggleHistory(environment.uuid), [
    environment,
    toggleHistory,
  ]);

  if (!deploymentState) {
    return (
      <EnvironmentHeaderEmptyState>
        <EnvironmentHeaderTitle>
          <EnvironmentHeaderName>{environment.name}</EnvironmentHeaderName>
        </EnvironmentHeaderTitle>
        <EnvironmentHeaderCardWrapper>
          <EnvironmentHeaderEmptyMessage>
            Nothing deployed
          </EnvironmentHeaderEmptyMessage>
        </EnvironmentHeaderCardWrapper>
      </EnvironmentHeaderEmptyState>
    );
  }

  return (
    <EnvironmentHeaderWrapper isSelected={isSelected}>
      <EnvironmentHeaderTitle
        onClick={onHeaderClick}
        isSelected={isSelected}
        state={deploymentState.statusIcon}
        data-test="environment-history-launcher"
      >
        <EnvrionmentHeaderStatus
          status={deploymentState.parsedStatus}
          tooltipContent={deploymentState.statusText}
          isLabelHidden
        />
        <EnvironmentHeaderName title={environment.name}>
          {environment.name}
        </EnvironmentHeaderName>
        <EnvironmentHeaderIcon>
          <EditorPanelIcon label="Environment history" size="large" />
        </EnvironmentHeaderIcon>
      </EnvironmentHeaderTitle>
      <CardTransitionContext.Consumer>
        {(transition) => (
          <EnvironmentHeaderCardWrapper
            transition={transition}
            isSelected={isSelected}
          >
            {children}
          </EnvironmentHeaderCardWrapper>
        )}
      </CardTransitionContext.Consumer>
    </EnvironmentHeaderWrapper>
  );
};

export default React.memo(EnvironmentHeader);
