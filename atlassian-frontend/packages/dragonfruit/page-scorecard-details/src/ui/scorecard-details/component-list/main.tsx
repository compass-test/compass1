import React from 'react';

import { NetworkStatus } from '@apollo/client';
import { Link } from 'react-resource-router';

import Button from '@atlaskit/button';
import DynamicTable from '@atlaskit/dynamic-table';
import EmptyState from '@atlaskit/empty-state';
import { useFlags } from '@atlaskit/flag';
import Tooltip from '@atlaskit/tooltip';
import { parse as parseAri } from '@atlassian/cs-ari';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { BaseErrorFlagProps } from '@atlassian/dragonfruit-common-ui';
import { ErrorIcon } from '@atlassian/dragonfruit-common-ui/assets';
import {
  ComponentName,
  LoadMoreContainer,
} from '@atlassian/dragonfruit-components';
import {
  CompassComponent,
  CompassComponentType,
  CompassScorecard,
  CompassScorecardAppliedToComponentsConnection,
} from '@atlassian/dragonfruit-graphql';
import { TeamDetails, useGetTeams } from '@atlassian/dragonfruit-rest';
import { routes } from '@atlassian/dragonfruit-routes';
import {
  ScorecardHealthIcon,
  useGetScorecardAppliedToComponentsWithScores,
} from '@atlassian/dragonfruit-scorecards';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { NoComponentTypeIcon } from './assets';
import messages from './messages';
import {
  DescriptionStyled,
  IconWithPercentage,
  LinkContainer,
  PercentageWrapper,
  TeamStyled,
} from './styled';
import { GetComponentTypeMessage } from './utils';

type ComponentListProps = {
  testId?: string;
  componentType: CompassComponentType;
  scorecardARI: string;
};

type TeamLinkProps = {
  teamName: string;
  ownerId: string;
};

const DEFAULT_LOAD_MORE = 25;

const TeamLink = ({ teamName, ownerId }: TeamLinkProps) => {
  return (
    <LinkContainer>
      <TeamStyled>
        <Link
          href={`/compass/people/team/${encodeURIComponent(
            ownerId.replace('ari:cloud:teams::team/', ''),
          )}`}
        >
          {teamName}
        </Link>
      </TeamStyled>
    </LinkContainer>
  );
};

const TableHeaders = () => {
  const { formatMessage } = useIntl();

  const headerCells = [
    {
      key: 'title',
      content: formatMessage(CommonMessages.name),
      width: 30,
      isSortable: false,
    },
    {
      key: 'description',
      content: formatMessage(CommonMessages.description),
      width: 30,
      isSortable: false,
    },
    {
      key: 'owner',
      content: formatMessage(CommonMessages.owner),
      width: 20,
      isSortableFalse: false,
    },
    {
      key: 'score',
      content: formatMessage(messages.score),
      width: 20,
      isSortable: false,
    },
  ];

  return {
    cells: headerCells,
  };
};

export const ComponentList = ({
  componentType,
  scorecardARI,
  testId,
}: ComponentListProps) => {
  const { formatMessage } = useIntl();
  const { showFlag } = useFlags();
  const dataTestId =
    testId || 'dragonfruit-page-scorecard-details.ui.component-list';

  const {
    data,
    loading,
    error,
    networkStatus,
    fetchMore,
  } = useGetScorecardAppliedToComponentsWithScores(
    scorecardARI,
    DEFAULT_LOAD_MORE,
  );

  const scorecardId = parseAri(scorecardARI).resourceId?.split('/')[1];

  const showErrorFlag = () => {
    showFlag({
      ...BaseErrorFlagProps,
      title: formatMessage(messages.errorMessage),
      description: formatMessage(messages.errorMessageDescription),
    });
  };

  const handleOnLoadMore = () => {
    fetchMore({
      variables: {
        scorecardId: scorecardARI,
        first: DEFAULT_LOAD_MORE,
        after: endCursor,
      },
    })
      .then(result => {
        const errors = result.errors;
        if (errors) {
          showErrorFlag();
        }
      })
      .catch(e => {
        showErrorFlag();
      });
  };

  const errorState = (
    <EmptyState
      header={formatMessage(messages.errorMessage)}
      description={formatMessage(messages.errorMessageDescription)}
      imageUrl={ErrorIcon}
      testId={`${dataTestId}.error-state`}
      primaryAction={
        <Button
          appearance="primary"
          href={routes.SCORECARD_DETAILS(scorecardId || '')}
        >
          {formatMessage(CommonMessages.retry)}
        </Button>
      }
    />
  );

  const componentTypeMessage = GetComponentTypeMessage(componentType);

  const emptyState = (
    <EmptyState
      testId={`${dataTestId}.empty-state`}
      header={formatMessage(messages.emptyStateHeader, {
        componentTypeMessage,
      })}
      description={formatMessage(messages.emptyStateBody, {
        componentTypeMessage,
      })}
      imageUrl={NoComponentTypeIcon}
    />
  );

  const scorecard = data?.compass?.scorecard as CompassScorecard;
  const appliedToComponents = scorecard?.appliedToComponents as CompassScorecardAppliedToComponentsConnection;
  const endCursor = appliedToComponents?.pageInfo.endCursor;
  const components = appliedToComponents?.nodes;

  const teamIds = components
    ?.map((component: CompassComponent) => component?.ownerId)
    .filter((id): id is string => !!id);

  const { teams } = useGetTeams(teamIds || []);

  const rows = (components ?? []).map(component => {
    const teamData = component.ownerId ? teams[component.ownerId] : null;

    const teamName = teamData ? (teamData as TeamDetails).displayName : '';
    const totalScore = component?.scorecardScore?.totalScore ?? 0;

    const cells = [
      {
        key: `${component.name}-${component.id}`,
        content: (
          <LinkContainer>
            <ComponentName
              component={component}
              componentDetailsUrl={routes.COMPONENT_DETAILS(component.id)}
            />
          </LinkContainer>
        ),
      },
      {
        key: `${component.id}-description`,
        content: (
          <Tooltip content={component.description}>
            <DescriptionStyled>{component.description}</DescriptionStyled>
          </Tooltip>
        ),
      },
      {
        key: `${component.id}-owner`,
        content: component.ownerId ? (
          <TeamLink ownerId={component.ownerId} teamName={teamName} />
        ) : (
          formatMessage(messages.unowned)
        ),
      },
      {
        key: `${component.id}-score`,
        content: (
          <IconWithPercentage>
            <ScorecardHealthIcon progress={totalScore} />
            <PercentageWrapper>{totalScore}%</PercentageWrapper>
          </IconWithPercentage>
        ),
      },
    ];

    return {
      key: `component-row.${component.id}`,
      testId: `${dataTestId}.row.${component.id}`,
      cells: cells,
    };
  });

  return (
    <>
      <DynamicTable
        head={TableHeaders()}
        // Don't want to show loading state when loading next page
        isLoading={loading && networkStatus !== NetworkStatus.fetchMore}
        rows={rows}
        emptyView={error ? errorState : emptyState}
        isFixedSize
        testId={`${dataTestId}.table`}
      />
      {!error && endCursor && (
        <LoadMoreContainer
          loading={loading}
          onLoadMore={handleOnLoadMore}
          testId={`${dataTestId}.load-more`}
        />
      )}
    </>
  );
};
