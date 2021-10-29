import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Button, { LoadingButton } from '@atlaskit/button';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Spinner from '@atlaskit/spinner';
import * as colors from '@atlaskit/theme/colors';
import Tooltip from '@atlaskit/tooltip';
import { Deployment, Environment } from '@atlassian/pipelines-models';

import { CardType, DEPLOYMENTS_PAGE_LEN } from '../const';

import EnvironmentCard from './EnvironmentCard';
import {
  EnvironmentName,
  HistoryCloseButton,
  HistoryHeader,
  HistoryList,
  HistoryLoading,
  HistoryShowMoreButton,
  HistoryTitle,
  HistoryWrapper,
} from './styled';

export type Props = {
  environment: Environment;
  environmentHistory: Deployment[];
  getEnvironmentHistory: (environmentUuid: string, currentPage: number) => void;
  openDeploymentSummary: (
    deploymentUuid: string,
    environmentUuid?: string,
  ) => void;
  openRedeployPreview: (deployment: Deployment) => void;
  isFetching: boolean;
  toggleHistory: () => void;
};

const EnvironmentHistoryList: React.FC<
  Omit<Props, 'toggleHistory'> & {
    currentPage: number;
    isLastPage: boolean;
  }
> = React.memo(
  ({
    environment,
    environmentHistory,
    getEnvironmentHistory,
    isFetching,
    isLastPage,
    openRedeployPreview,
    openDeploymentSummary,
    currentPage,
  }) => {
    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);

    useEffect(() => {
      if (environmentHistory.length === 0) {
        getEnvironmentHistory(environment.uuid, 1);
      }
    }, [environment.uuid, getEnvironmentHistory, environmentHistory]);

    const loadedItems = useMemo(() => environmentHistory.length, [
      environmentHistory,
    ]);

    const scrollEl = useRef<any>();
    useEffect(() => {
      if (scrollEl.current && loadedItems > 0 && shouldScrollToBottom) {
        scrollEl.current.scrollTop = scrollEl.current.scrollHeight;
        setShouldScrollToBottom(false);
      }
    }, [loadedItems, shouldScrollToBottom]);

    const showMoreDeployments = useCallback(() => {
      getEnvironmentHistory(environment.uuid, currentPage + 1);
      setShouldScrollToBottom(true);
    }, [getEnvironmentHistory, environment, currentPage]);

    const isFirstDeploymentFromPipeline = useCallback(
      (deployment: Deployment) =>
        !!(
          environmentHistory.find(
            (d: Deployment) => d.deployable.name === deployment.deployable.name,
          )?.uuid === deployment.uuid
        ),
      [environmentHistory],
    );

    return (
      <HistoryList ref={scrollEl}>
        {environmentHistory.map((deployment: Deployment, index) => (
          <EnvironmentCard
            key={`history_card_${deployment.uuid}_${index}`}
            deployment={deployment}
            cardType={CardType.History}
            isDisabled={!isFirstDeploymentFromPipeline(deployment)}
            openDeploymentSummary={openDeploymentSummary}
            openRedeployPreview={openRedeployPreview}
          />
        ))}
        {!isLastPage && (
          <HistoryShowMoreButton>
            <LoadingButton
              appearance="link"
              onClick={showMoreDeployments}
              isLoading={isFetching && currentPage > 0}
            >
              Show more
            </LoadingButton>
          </HistoryShowMoreButton>
        )}
      </HistoryList>
    );
  },
);

const EnvironmentHistory: React.FC<Props> = ({
  environment,
  environmentHistory,
  getEnvironmentHistory,
  isFetching,
  toggleHistory,
  openRedeployPreview,
  openDeploymentSummary,
}) => {
  const currentPage = useMemo(
    () => Math.ceil(environmentHistory.length / DEPLOYMENTS_PAGE_LEN),
    [environmentHistory],
  );

  const isLastPage = useMemo(
    () => environmentHistory.length < currentPage * DEPLOYMENTS_PAGE_LEN,
    [environmentHistory, currentPage],
  );

  const onCloseHistory = useCallback(() => toggleHistory(), [toggleHistory]);

  return (
    <HistoryWrapper>
      <HistoryHeader>
        <EnvironmentName title={`${environment.name} environment`}>
          {environment.name} environment
        </EnvironmentName>
        <HistoryCloseButton>
          <Tooltip content="close">
            <Button
              onClick={onCloseHistory}
              iconBefore={<CrossIcon label="" primaryColor={colors.N800} />}
            />
          </Tooltip>
        </HistoryCloseButton>
      </HistoryHeader>
      <HistoryTitle>Environment History</HistoryTitle>
      {isFetching && currentPage === 0 ? (
        <HistoryLoading>
          <Spinner size="large" />
        </HistoryLoading>
      ) : (
        <EnvironmentHistoryList
          environment={environment}
          environmentHistory={environmentHistory}
          getEnvironmentHistory={getEnvironmentHistory}
          isLastPage={isLastPage}
          isFetching={isFetching}
          currentPage={currentPage}
          openDeploymentSummary={openDeploymentSummary}
          openRedeployPreview={openRedeployPreview}
        />
      )}
    </HistoryWrapper>
  );
};

export default React.memo(EnvironmentHistory);
