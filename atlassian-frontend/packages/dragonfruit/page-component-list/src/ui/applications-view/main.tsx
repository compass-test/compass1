import React, { useRef, useState } from 'react';

import { NetworkStatus } from '@apollo/client';

import EmptyState from '@atlaskit/empty-state';
import { ApplicationsEmptyState } from '@atlassian/dragonfruit-common-ui/assets';
import {
  getSearchQuery,
  injectOwnerNameIntoComponents,
  LoadMoreContainer,
} from '@atlassian/dragonfruit-components';
import { ComponentsTable } from '@atlassian/dragonfruit-components-table';
import {
  CompassComponentType,
  CompassQuerySort,
  useSearchComponentsQuery,
} from '@atlassian/dragonfruit-graphql';
import { SubmitPageLoadMetrics } from '@atlassian/dragonfruit-performance';
import { useGetTeams } from '@atlassian/dragonfruit-rest';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import {
  parseSearchComponentsResponse,
  useIntl,
  withErrorBoundary,
} from '@atlassian/dragonfruit-utils';

import { ListFilter } from '../../common/ui/component-list-filters';
import { CreateComponentButton } from '../../common/ui/create-component-button/main';
import { ListViewErrorBoundaryFallback } from '../../common/ui/error-boundary-fallback/main';
import {
  SelectedFiltersProvider,
  TeamFilter,
  useSelectedFilters,
} from '../../controllers/components-use-selected-filters';
import { ListFilterWrapper } from '../../styled';
import { ApplicationsPageLoad } from '../../utils/performance-analytics';

import messages from './messages';

const DEFAULT_FILTERS: Array<TeamFilter> = [
  { name: 'type', filter: { eq: CompassComponentType.APPLICATION } },
];

const ApplicationsView: React.FC = () => {
  const [fetchMoreError, setFetchMoreError] = useState(undefined);
  const { formatMessage } = useIntl();
  const { cloudId } = useTenantInfo();
  const curSorts = useRef<CompassQuerySort[] | undefined>(undefined);

  const [{ filters: customFilters }] = useSelectedFilters();

  const {
    data,
    loading,
    error,
    networkStatus,
    fetchMore,
    refetch,
  } = useSearchComponentsQuery(
    getSearchQuery(cloudId, [...DEFAULT_FILTERS, ...customFilters]),
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

  const emptyState = (
    <EmptyState
      header={formatMessage(messages.emptyStateHeading)}
      description={formatMessage(messages.emptyStateDescription)}
      imageUrl={ApplicationsEmptyState}
      primaryAction={
        <CreateComponentButton type={CompassComponentType.APPLICATION} />
      }
    />
  );

  const sortHandler = (sorts: CompassQuerySort[]) => {
    curSorts.current = sorts;
    const query = getSearchQuery(
      cloudId,
      [...DEFAULT_FILTERS, ...customFilters],
      undefined,
      curSorts.current,
    );
    refetch(query.variables);
  };

  return (
    <>
      <ListFilterWrapper>
        <ListFilter
          testId={'dragonfruit-page-component-list.ui.list-filter'}
          componentType={CompassComponentType.APPLICATION}
        />
      </ListFilterWrapper>
      <ComponentsTable
        componentType={CompassComponentType.APPLICATION}
        results={results}
        // Show table loading state whenever the list is loading (e.g. on initial render, on sort order change, etc.),
        // except when fetching more components (i.e. pagination)
        loading={networkStatus !== NetworkStatus.fetchMore && loading}
        error={
          error || fetchMoreError
            ? formatMessage(messages.defaultErrorDescription)
            : ''
        }
        emptyState={emptyState}
        onSort={sortHandler}
        queryError={queryError}
        showInlineCreate={!endCursor}
      />
      {!error && !fetchMoreError && endCursor && (
        <LoadMoreContainer
          loading={loading}
          onLoadMore={() => {
            setFetchMoreError(undefined);
            fetchMore(
              getSearchQuery(
                cloudId,
                [...DEFAULT_FILTERS, ...customFilters],
                endCursor,
                curSorts.current,
              ),
            ).catch((e) => setFetchMoreError(e));
          }}
        />
      )}
      {!loading && <SubmitPageLoadMetrics metric={ApplicationsPageLoad} />}
    </>
  );
};

const ApplicationsViewWithContext: React.FC = () => {
  return (
    <SelectedFiltersProvider>
      <ApplicationsView />
    </SelectedFiltersProvider>
  );
};

export default withErrorBoundary(ApplicationsViewWithContext, {
  Fallback: ListViewErrorBoundaryFallback,
  componentName: 'applicationsList',
});
