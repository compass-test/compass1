import React, { useEffect, useRef, useState } from 'react';

import { NetworkStatus } from '@apollo/client';
import { di } from 'react-magnetic-di';

import Button from '@atlaskit/button/standard-button';
import EmptyState from '@atlaskit/empty-state';
import { useRecentComponents } from '@atlassian/dragonfruit-component-create-modal';
import {
  ComponentTableEmptyStateImage,
  getSearchQuery,
  injectOwnerNameIntoComponents,
} from '@atlassian/dragonfruit-components';
import {
  CompassQuerySort,
  useSearchComponentsQuery,
} from '@atlassian/dragonfruit-graphql';
import { useGetTeams } from '@atlassian/dragonfruit-rest';
import { TeamCreateComponent } from '@atlassian/dragonfruit-teams';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import {
  buildTeamAri,
  parseSearchComponentsResponse,
  useIntl,
} from '@atlassian/dragonfruit-utils';

import { ComponentsTable } from './components-table';
import { LoadMoreContainer } from './load-more-container';
import messages from './messages';
import {
  EmptyStateDescriptionWrapper,
  EmptyStateWrapper,
  TableWrapper,
} from './styled';

type ServicesOwnedByTeamProps = {
  teamId: string;
};

const CLASS_NAME_PREFIX =
  'dragonfruit.page-team-details.team-dashboard.components-list';

const ComponentsList = ({ teamId }: ServicesOwnedByTeamProps) => {
  di(parseSearchComponentsResponse);

  const { formatMessage } = useIntl();
  const [fetchMoreError, setFetchMoreError] = useState(undefined);
  const { cloudId } = useTenantInfo();
  const curSorts = useRef<CompassQuerySort[] | undefined>(undefined);

  const teamARI = buildTeamAri({ teamId });

  const [showForm, setShowForm] = useState<boolean>(false);
  const [isEmptyStateForm, setEmptyStateForm] = useState<boolean>(false);
  const [formKey, setFormKey] = useState(1);

  const [{ localComponents }, { clearComponents }] = useRecentComponents();

  useEffect(() => {
    // Reset and hide component create form when user navigates to a new team
    setShowForm(false);
    setEmptyStateForm(false);
    setFormKey(1);

    // Reset local components controller
    clearComponents();
  }, [teamId, clearComponents]);

  const {
    data,
    loading,
    error,
    networkStatus,
    fetchMore,
    refetch,
  } = useSearchComponentsQuery(
    getSearchQuery(cloudId, [{ name: 'ownerId', filter: { eq: teamARI } }]),
  );

  // need to handle queryError
  const { connection, endCursor, queryError } = parseSearchComponentsResponse(
    data?.compass?.searchComponents,
  );
  const nodes = connection?.nodes?.filter((node) => node.component) ?? [];

  const { teams } = useGetTeams(
    nodes.map((n) => n.component?.ownerId).filter((n): n is string => !!n),
  );

  const results = injectOwnerNameIntoComponents(
    !(error || fetchMoreError) ? nodes : [],
    teams,
  );

  const sortHandler = (sorts: CompassQuerySort[]) => {
    curSorts.current = sorts;
    const query = getSearchQuery(
      cloudId,
      [{ name: 'ownerId', filter: { eq: teamARI } }],
      undefined,
      curSorts.current,
    );
    refetch(query.variables);
  };

  const handleCreateComponentsButtonClick = () => {
    setShowForm(!showForm);
    setEmptyStateForm(true);
  };

  const createComponentsButton = (
    <Button
      appearance="primary"
      onClick={handleCreateComponentsButtonClick}
      testId={CLASS_NAME_PREFIX + '.create-components-button'}
    >
      {formatMessage(messages.emptyStateCreateComponentButton)}
    </Button>
  );

  const emptyState = (
    <EmptyState
      header={formatMessage(messages.emptyStateHeading)}
      description={
        <EmptyStateDescriptionWrapper>
          {formatMessage(messages.emptyStateDescription)}
        </EmptyStateDescriptionWrapper>
      }
      imageUrl={ComponentTableEmptyStateImage}
      size={'wide'}
      primaryAction={createComponentsButton}
    />
  );

  return (
    <TableWrapper data-testid={CLASS_NAME_PREFIX}>
      <ComponentsTable
        results={results}
        // Show table loading state whenever the list is loading (e.g. on initial render, on sort order change, etc.),
        // except when fetching more components (i.e. pagination)
        loading={networkStatus !== NetworkStatus.fetchMore && loading}
        error={
          error || fetchMoreError
            ? formatMessage(messages.errorStateHeader)
            : ''
        }
        emptyState={showForm ? <EmptyStateWrapper /> : emptyState}
        onSort={sortHandler}
        queryError={queryError}
        testId="teams-page"
        teamId={teamARI}
      />
      {!error && !fetchMoreError && endCursor && (
        <LoadMoreContainer
          loading={loading}
          onLoadMore={() => {
            setFetchMoreError(undefined);
            fetchMore(
              getSearchQuery(
                cloudId,
                [{ name: 'ownerId', filter: { eq: teamARI } }],
                endCursor,
                curSorts.current,
              ),
            ).catch((e) => setFetchMoreError(e));
          }}
        />
      )}
      {/* Show Create component button when there are no errors, no load more button, and the table is not empty
      or the empty state CTA has been activated */}
      {!error &&
        !fetchMoreError &&
        !endCursor &&
        (!!results.length || !!localComponents.length || isEmptyStateForm) && (
          <TeamCreateComponent
            teamId={teamARI}
            formShown={showForm}
            setFormShown={setShowForm}
            onSuccess={() => {
              // Clears form/validations, when DSP-948 is complete can transition to restart api
              setFormKey((current) => current + 1);
              setEmptyStateForm(false);
            }}
            onCancel={() => {
              setShowForm(false);
              setEmptyStateForm(false);
            }}
            formKey={formKey}
            emptyState={isEmptyStateForm}
          />
        )}
    </TableWrapper>
  );
};

export default ComponentsList;
