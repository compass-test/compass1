import React, { FunctionComponent } from 'react';
import deepEqual from 'deep-equal';
import debounce from 'lodash/debounce';
import {
  LinkComponent,
  ResultContainer,
  SearchDialogContent,
} from '@atlassian/search-dialog';
import { useSearchSessionId } from '../common/search-session-provider';
import CancellablePromise from '../utils/cancellable-promise';
import { SearchError } from '../common/search-error';
import { ResultState } from '../common/shared/types';
import {
  ConfItemResults,
  ConfluenceSearchClient,
  ConfPeopleResults,
  SearchClientContext,
} from './clients';
import { ConfItemResult } from './clients/response-types';
import { SearchResults } from './confluence-search-results';
import { useFilterContext, SiteFilterOption } from './filter-context';
import { Filter } from './clients/confluence-search-client';
import { AnalyticsContextAction, useAnalytics } from '../common/analytics';
import { onRequestMade } from '../common/analytics/events';
import {
  CompassComponentType,
  useSearchComponentsLazyQuery,
} from '@atlassian/dragonfruit-graphql';
import { SearchComponentsQuery } from '@atlassian/dragonfruit-graphql';
import { parseSearchComponentsResponse } from '@atlassian/dragonfruit-utils';
import { useSearchUsers } from '@atlassian/dragonfruit-teams';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { User } from '@atlaskit/user-picker';
import {
  TeamDetails,
  useSearchTeams,
  useGetTeams,
} from '@atlassian/dragonfruit-rest';

import {
  useAnalyticsEvents,
  CreateUIAnalyticsEvent,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import {
  fireTrackAnalytics,
  fireUIAnalytics,
} from '@atlassian/analytics-bridge';

import {
  useCompassRecents,
  RecentComponentsState,
  RecentTeamsState,
} from '@atlassian/compass-search-cache';

const triggerShowMoreAnalyticsSearch = (
  type: string,
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  fireUIAnalytics(
    createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'showMoreButton',
    }),
    type === TypeResults.SERVICES ? 'compass-services' : 'compass-libsApps',
  );
};

export interface Props {
  isExpanded: boolean;
  debounceTime: number;
  linkComponent?: LinkComponent;
  formatDate?: (lastModified: string) => JSX.Element;
  query: string;
  onRetry: () => void;
  setAdditionalAnalyticsContext: (action: AnalyticsContextAction) => void;
  queryVersion: number;
  // optional as is only supplied in cross-product
  setDialogHeight?: (height: number) => void;
  // optional as is only supplied in cross-product
  dialogHeight?: number;
}

interface ContextProps {
  searchSessionId: string;
  enabledFilters: Filter[];
  searchClient: ConfluenceSearchClient;
  requestComplete: (timings: number) => void;
  allSiteFilters: SiteFilterOption[];
  servicesQuery: {
    searchServices: (query: string, after: string | null) => void;
    loading: boolean;
    error: any;
    data: SearchComponentsQuery | undefined;
    fetchMore: Function;
    teamNames: { [key: string]: TeamDetails | null };
  };
  libsAppsMoreQuery: {
    searchLibsAppsMore: Function;
    loading: boolean;
    error: any;
    data: SearchComponentsQuery | undefined;
    fetchMore: Function;
    teamNames: { [key: string]: TeamDetails | null };
  };
  teamsAndUsersQuery: {
    searchTeamsAndUsers: () => void;
    loading: boolean;
    error: any;
    data: (TeamDetails | User)[];
  };
  recentlyViewedComponents: RecentComponentsState;
  recentlyViewedTeams: RecentTeamsState;
}

const LoadingResultState = Object.freeze({
  isLoading: true,
  results: null,
});

export interface State {
  isPreQuery: boolean;
  isError: boolean;
  resultItems: ResultState<ConfItemResults>;
  resultPeople: ResultState<ConfPeopleResults>;
  isBelowTakeoverWidth?: boolean;
  cursorServices: string | null;
  cursorLibsAppsMore: string | null;
}

enum TypeResults {
  SERVICES = 'SERVICES',
  LIBS_APPS_MORE = 'LIBS_APPS_MORE',
}

const SERVICES_MORE_LIMIT = 20; // showing this many more when "show more" is pressed
const LIBS_APPS_MORE_LIMIT = 10;

export class ConfluenceSearchDialog extends React.Component<
  Props & ContextProps & WithAnalyticsEventsProps,
  State
> {
  state = {
    isPreQuery: !this.props.query,
    isError: false,
    resultItems: LoadingResultState as ResultState<ConfItemResults>,
    resultPeople: LoadingResultState as ResultState<ConfPeopleResults>,
    isBelowTakeoverWidth: false,
    cursorServices: null,
    cursorLibsAppsMore: null,
  };

  fetchMoreFn = (typeResult: string, after: string | null) => {
    if (typeResult === TypeResults.SERVICES) {
      this.props.servicesQuery.fetchMore!({
        variables: {
          query: {
            query: this.props.query,
            first: SERVICES_MORE_LIMIT,
            after,
            fieldFilters: [
              {
                name: 'type',
                filter: {
                  eq: CompassComponentType.SERVICE,
                },
              },
            ],
            sort: [],
          },
        },
      });
    } else if (typeResult === TypeResults.LIBS_APPS_MORE) {
      this.props.libsAppsMoreQuery.fetchMore!({
        variables: {
          query: {
            query: this.props.query,
            first: LIBS_APPS_MORE_LIMIT,
            after,
            fieldFilters: [
              {
                name: 'type',
                filter: {
                  neq: CompassComponentType.SERVICE,
                },
              },
            ],
            sort: [],
          },
        },
      });
    }
    if (this.props.createAnalyticsEvent) {
      triggerShowMoreAnalyticsSearch(
        typeResult,
        this.props.createAnalyticsEvent,
      );
    }
  };

  private currentSearches: CancellablePromise<any>[] = [];

  private previousFilters: Filter[] = this.props.enabledFilters;
  private previousSelecteSites: SiteFilterOption[] | undefined = this.props
    .allSiteFilters;

  private previousEnabledState = false;

  private wrapperRef = React.createRef<HTMLDivElement>();

  private height = this.props.dialogHeight;

  /**
   * A cache of the recent result items.
   * This is used for faster search, we keep it around and will show client side
   * filtered results from this list if it's available.
   *
   * This is NOT a state as we DO NOT re-render when this is filled, if it's not
   * available it's not available.
   *
   * We attempt to refresh this list whenever we load the pre-query screen, this
   * does not make any assumptions on whether the results from the clients are
   * cached or not.
   */
  private recentResultItems: ConfItemResult[] = [];

  private isAnyResultLoading(state: State) {
    const { resultItems, resultPeople } = state;
    return (
      resultItems.isLoading ||
      resultPeople.isLoading ||
      this.props.servicesQuery.loading ||
      this.props.libsAppsMoreQuery.loading ||
      this.props.teamsAndUsersQuery.loading
    );
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return !(
      deepEqual(this.state, nextState) && deepEqual(this.props, nextProps)
    );
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    // If the filter is changed we need to kick off a search
    if (!deepEqual(this.props.enabledFilters, this.previousFilters)) {
      this.previousFilters = this.props.enabledFilters;
      this.onFilterChange();
    }

    // If the selected site has changed we need to kick off a search
    if (!deepEqual(this.props.allSiteFilters, this.previousSelecteSites)) {
      this.previousSelecteSites = this.props.allSiteFilters;
      this.onFilterChange();
    }

    if (!prevProps.isExpanded && this.props.isExpanded) {
      this.bootstrapSearch();
    }

    if (prevProps.query !== this.props.query) {
      this.onInput(this.props.query);
    }

    const previousLoading = this.isAnyResultLoading(prevState);
    const currentLoading = this.isAnyResultLoading(this.state);

    if (previousLoading !== currentLoading) {
      this.props.setAdditionalAnalyticsContext({
        type: 'isLoading',
        value: currentLoading,
      });
      this.setDialogHeight();
    }

    // If the search dialog is closed we will terminate all existing searches and reset state
    if (this.previousEnabledState && !this.props.isExpanded) {
      this.resetState();
      this.startLoading();
    }

    this.previousEnabledState = this.props.isExpanded;
  }

  setDialogHeight = () => {
    const height = this.wrapperRef?.current?.getBoundingClientRect()?.height;
    if (height && height !== this.height) {
      // store the height internally, we need this if cross product is not present
      this.height = height;
      // set for cross product if present
      this.props.setDialogHeight?.(height);
    }
  };

  componentDidMount() {
    this.setDialogHeight();
    this.bootstrapSearch();

    if (this.props.query) {
      setTimeout(() => {
        // For cross prod while switching tabs.
        // We want this to execute in the next tick so that user can see faster
        // search results when the current search's results are being fetched.
        this.onInput(this.props.query, false);
      });
    }
  }

  componentWillUnmount() {
    this.cancelCurrentSearches();
  }

  cancelCurrentSearches = () => {
    this.currentSearches.forEach((search) => search.cancel());
    this.currentSearches = [];
  };

  // Starts the loading state by clearing all existing error state and cancelling all promises.
  startLoading = () => {
    this.debouncedSearch.cancel();
    this.cancelCurrentSearches();

    this.setState({
      isError: false,
      resultItems: LoadingResultState,
      resultPeople: LoadingResultState,
    });
  };

  resetState = () => {
    this.props.setAdditionalAnalyticsContext({ type: 'reset' });
    this.setState({
      isPreQuery: true,
    });
  };

  bootstrapSearch = () => {
    this.startLoading();
  };

  onInput = (query: string, useDebouncedSearch: boolean = true) => {
    this.setState({
      isPreQuery: !query,
    });

    this.startLoading();

    if (query) {
      if (useDebouncedSearch) {
        this.debouncedSearch(query);
      } else {
        this.doSearch(query);
      }

      // Faster search
      this.setState({
        resultItems: {
          isLoading: true, // This is true because we're still waiting for the actual search to load
          results: {
            items: this.getIntermidateSearchItems(query),
            totalSize: 0,
            timings: 0,
          },
        },
      });
    } else {
      this.bootstrapSearch();
    }
  };

  doSearch = (query: string) => {
    const { servicesQuery, libsAppsMoreQuery, teamsAndUsersQuery } = this.props;
    servicesQuery.searchServices(query, null);
    libsAppsMoreQuery.searchLibsAppsMore(query);
    teamsAndUsersQuery.searchTeamsAndUsers();
  };

  debouncedSearch = debounce(this.doSearch, this.props.debounceTime);

  onRetry = () => {
    this.startLoading();
    this.doSearch(this.props.query);

    this.props.onRetry();
  };

  onFilterChange = () => {
    this.startLoading();
    this.doSearch(this.props.query);
  };

  render() {
    const {
      isExpanded,
      linkComponent,
      formatDate,
      query,
      libsAppsMoreQuery,
      servicesQuery,
      teamsAndUsersQuery,
    } = this.props;
    const {
      resultPeople,
      isPreQuery,
      isError,
      isBelowTakeoverWidth,
    } = this.state;

    // need to handle queryError
    const results = libsAppsMoreQuery.loading
      ? null
      : parseSearchComponentsResponse(
          libsAppsMoreQuery.data?.compass?.searchComponents,
        );

    // need to handle queryError
    const serviceResults = servicesQuery.loading
      ? null
      : parseSearchComponentsResponse(
          servicesQuery.data?.compass?.searchComponents,
        );

    // Filter out error components.
    const libsAppsMoreNodes =
      results?.connection?.nodes?.filter((node) => node.component) ?? [];
    const serviceNodes =
      serviceResults?.connection?.nodes?.filter((node) => node.component) ?? [];

    const isLoading = this.isAnyResultLoading(this.state);

    const showFilters = !isPreQuery;

    const everythingFailedWithError = !!(
      servicesQuery.error &&
      libsAppsMoreQuery.error &&
      teamsAndUsersQuery.error
    );

    const expanded = isPreQuery
      ? this.props.recentlyViewedComponents.components.length ||
        this.props.recentlyViewedTeams.teams.length
      : isExpanded;

    return expanded ? (
      <SearchDialogContent
        ref={this.wrapperRef}
        minHeight={isLoading ? this.height : undefined}
      >
        <ResultContainer>
          {isError || everythingFailedWithError ? (
            <div style={{ width: '100%' }}>
              <SearchError onRetry={this.onRetry} />
            </div>
          ) : (
            <SearchResults
              services={{
                isLoading: servicesQuery.loading,
                cursor: serviceResults?.endCursor ?? null,
                results: serviceNodes,
              }}
              libsAppsMore={{
                isLoading: libsAppsMoreQuery.loading,
                cursor: results?.endCursor ?? null,
                results: libsAppsMoreNodes,
              }}
              peopleTeams={{
                isLoading: teamsAndUsersQuery.loading,
                results: this.props.teamsAndUsersQuery.data ?? [],
              }}
              recentlyViewedComponents={this.props.recentlyViewedComponents}
              recentlyViewedTeams={this.props.recentlyViewedTeams}
              people={resultPeople}
              isPreQuery={isPreQuery}
              query={query}
              linkComponent={linkComponent}
              formatDate={formatDate}
              isBelowTakeoverWidth={isBelowTakeoverWidth}
              showFilters={showFilters}
              teamNames={servicesQuery.teamNames}
              fetchMoreFn={this.fetchMoreFn.bind(this)}
            />
          )}
        </ResultContainer>
      </SearchDialogContent>
    ) : null;
  }

  /**
   * Searches the recent items list for a set of results that is shown while the actual
   * results are loading.
   *
   * This is also known as 'faster search'
   */
  private getIntermidateSearchItems(query: string) {
    const { enabledFilters, allSiteFilters } = this.props;

    const anySelected = !!allSiteFilters?.find((f) => f.isChecked);

    const hideIntermediateResults = enabledFilters.length > 0 || anySelected;

    if (hideIntermediateResults) {
      return [];
    }

    return this.recentResultItems
      .filter((item) => {
        return item.name.toLowerCase().includes(query.toLowerCase());
      })
      .slice(0, 3);
  }
}

// HOC to inject hooks into ConfluenceSearchDialog.
const withSearchQuery = <T extends Partial<SearchClientContext>>(
  Component: React.ComponentType<T>,
) => {
  const COMPONENT_QUERY_LIMIT = 10;
  const LIBS_APPS_MORE_QUERY_LIMIT = 3;
  const PEOPLE_AND_TEAMS_QUERY_LIMIT = 3;

  return function WrappedComponent(props: any) {
    const { cloudId, orgId } = useTenantInfo();
    const { createAnalyticsEvent } = useAnalyticsEvents();
    const searchAnalyticsMessage = 'searchRequest completed';

    const [servicesQuery, servicesQueryDetails] = useSearchComponentsLazyQuery({
      onCompleted: (data) => {
        fireTrackAnalytics(createAnalyticsEvent({}), searchAnalyticsMessage, {
          actionSubjectId: 'compass-services',
          resultCount:
            data.compass?.searchComponents?.__typename ===
            'CompassSearchComponentConnection'
              ? data.compass?.searchComponents?.nodes?.length
              : 0,
        });
      },
    });

    const [
      libsAppsMoreQuery,
      searchLibsAppsMoreDetails,
    ] = useSearchComponentsLazyQuery({
      onCompleted: (data) => {
        fireTrackAnalytics(createAnalyticsEvent({}), searchAnalyticsMessage, {
          actionSubjectId: 'compass-libsApps',
          resultCount:
            data.compass?.searchComponents?.__typename ===
            'CompassSearchComponentConnection'
              ? data.compass?.searchComponents?.nodes?.length
              : 0,
        });
      },
    });

    const { connection: connectionServices } = parseSearchComponentsResponse(
      servicesQueryDetails.data?.compass?.searchComponents,
    );
    const nodesServices = connectionServices?.nodes ?? [];

    const { connection: connectionMore } = parseSearchComponentsResponse(
      searchLibsAppsMoreDetails.data?.compass?.searchComponents,
    );
    const nodesLibsAppsMore = connectionMore?.nodes ?? [];

    const teamARIs = nodesServices
      .map((n) => n.component?.ownerId)
      .filter((n): n is string => !!n)
      .concat(
        nodesLibsAppsMore
          .map((n) => n.component?.ownerId)
          .filter((n): n is string => !!n),
      );
    const { teams: teamNames } = useGetTeams(teamARIs);

    const {
      data: teams,
      loading: teamsLoading,
      error: searchTeamsError,
      fetchData: searchTeams,
    } = useSearchTeams(
      props.query,
      orgId,
      PEOPLE_AND_TEAMS_QUERY_LIMIT,
      true,
      (data) => {
        fireTrackAnalytics(createAnalyticsEvent({}), searchAnalyticsMessage, {
          actionSubjectId: 'compass-teams',
          resultCount: data.length || 0,
        });
      },
    );
    const {
      loading: usersLoading,
      users,
      error: searchUsersError,
      fetchData: searchUsers,
    } = useSearchUsers({
      query: props.query,
      maxNumberOfResults: PEOPLE_AND_TEAMS_QUERY_LIMIT,
      onCompleted: (data) => {
        fireTrackAnalytics(createAnalyticsEvent({}), searchAnalyticsMessage, {
          actionSubjectId: 'compass-users',
          resultCount: data.length || 0,
        });
      },
    });

    const {
      recentlyViewedComponents,
      recentlyViewedTeams,
    } = useCompassRecents();

    const searchTeamsAndUsers = async () => {
      await searchTeams();
      await searchUsers();
    };

    let teamsAndUsers: (TeamDetails | User)[] = [...(teams || [])];

    if (
      !teamsLoading &&
      !usersLoading &&
      teamsAndUsers.length < PEOPLE_AND_TEAMS_QUERY_LIMIT
    ) {
      // appending users only if there are < 3 teams [from useSearchTeams]
      const usersToAppend =
        users.slice(0, PEOPLE_AND_TEAMS_QUERY_LIMIT - teamsAndUsers.length) ||
        [];

      teamsAndUsers = teamsAndUsers.concat(usersToAppend);
    }

    const teamsOrUsersSearchError: any =
      searchTeamsError || searchUsersError
        ? {
            searchTeamsError,
            searchUsersError,
          }
        : undefined;

    const searchServices = (query: string, after: string | null) => {
      servicesQuery({
        variables: {
          cloudId,
          query: {
            query,
            first: COMPONENT_QUERY_LIMIT,
            after,
            fieldFilters: [
              {
                name: 'type',
                filter: {
                  eq: CompassComponentType.SERVICE,
                },
              },
            ],
            sort: [],
          },
        },
      });
    };

    const searchLibsAppsMore = (query: string, after: string | null) => {
      libsAppsMoreQuery({
        variables: {
          cloudId,
          query: {
            query,
            first: LIBS_APPS_MORE_QUERY_LIMIT,
            after,
            fieldFilters: [
              {
                name: 'type',
                filter: {
                  neq: CompassComponentType.SERVICE,
                },
              },
            ],
            sort: [],
          },
        },
      });
    };

    return (
      <Component
        {...props}
        createAnalyticsEvent={createAnalyticsEvent}
        servicesQuery={{ searchServices, ...servicesQueryDetails, teamNames }}
        libsAppsMoreQuery={{
          searchLibsAppsMore,
          ...searchLibsAppsMoreDetails,
          teamNames,
        }}
        recentlyViewedComponents={recentlyViewedComponents}
        recentlyViewedTeams={recentlyViewedTeams}
        teamsAndUsersQuery={{
          searchTeamsAndUsers,
          data: teamsAndUsers,
          loading: teamsLoading || usersLoading,
          error: teamsOrUsersSearchError,
        }}
      />
    );
  };
};

export const WrappedConfluenceSearchDialog = withSearchQuery(
  ConfluenceSearchDialog,
);

const ConfluenceSearchDialogWithContext: FunctionComponent<Props> = (props) => {
  const {
    spaceFilters: { availableFilters: availableSpaceFilters },
    peopleFilters: { availableFilters: availablePeopleFilters },
    siteFilters: { availableFilters: availableSiteFilters },
  } = useFilterContext();

  const enabledSpaces: Filter[] = availableSpaceFilters
    .filter((f) => f.isChecked)
    .map((f) => ({
      id: f.id,
      type: 'space',
    }));

  const enabledContributors: Filter[] = availablePeopleFilters
    .filter((f) => f.isChecked)
    .map((f) => ({
      id: f.id,
      type: 'contributor',
    }));

  const searchSessionId = useSearchSessionId();
  const { fireAnalyticsEvent } = useAnalytics();

  const requestComplete = (timings: number) => {
    fireAnalyticsEvent(
      onRequestMade({
        actionSubjectId: 'postQuerySearchResults',
        timings: { postQueryRequestDurationMs: timings },
      }),
    );
  };

  return (
    <WrappedConfluenceSearchDialog
      {...props}
      enabledFilters={[...enabledSpaces, ...enabledContributors]}
      searchSessionId={searchSessionId}
      requestComplete={requestComplete}
      allSiteFilters={availableSiteFilters}
    />
  );
};

export default ConfluenceSearchDialogWithContext;
