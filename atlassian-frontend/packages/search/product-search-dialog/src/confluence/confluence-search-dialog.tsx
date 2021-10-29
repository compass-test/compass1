import React, { FunctionComponent } from 'react';
import deepEqual from 'deep-equal';
import debounce from 'lodash/debounce';
import uniqBy from 'lodash/uniqBy';
import {
  LinkComponent,
  ResultContainer,
  SidebarContainer,
  SearchDialogContent,
  SearchFooter,
} from '@atlassian/search-dialog';
import { useSearchSessionId } from '../common/search-session-provider';
import CancellablePromise from '../utils/cancellable-promise';
import { SearchError } from '../common/search-error';
import { ResultState } from '../common/shared/types';
import {
  ConfItemResults,
  ConfluenceSearchClient,
  ConfPeopleResults,
  ConfSpaceResults,
  Scope,
  useClients,
} from './clients';
import { ConfluenceRecentsClient } from './clients/confluence-recents-client';
import { ConfItemResult } from './clients/response-types';
import { SearchResults } from './confluence-search-results';
import { useFilterContext, SiteFilterOption } from './filter-context';
import { Filter } from './clients/confluence-search-client';
import { AnalyticsContextAction, useAnalytics } from '../common/analytics';
import { onRequestMade } from '../common/analytics/events';
import { ConfluenceAdvancedSearch } from './advanced-search';
import { FilterPane } from './filter';
import { limitToMaxSiteUsage } from '../common/clients/multi-site-utils';
import { NoPreQueryResults } from '../common/no-results';
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
  recentClient: ConfluenceRecentsClient;
  searchClient: ConfluenceSearchClient;
  requestComplete: (timings: number) => void;
  allSiteFilters: SiteFilterOption[];
}

const EmptyResultState = Object.freeze({
  isLoading: false,
  results: null,
});

const LoadingResultState = Object.freeze({
  isLoading: true,
  results: null,
});

export interface State {
  isPreQuery: boolean;
  isError: boolean;
  resultItems: ResultState<ConfItemResults>;
  resultSpaces: ResultState<ConfSpaceResults>;
  resultPeople: ResultState<ConfPeopleResults>;
  isBelowTakeoverWidth?: boolean;
}

export class ConfluenceSearchDialog extends React.Component<
  Props & ContextProps,
  State
> {
  state = {
    isPreQuery: !this.props.query,
    isError: false,
    resultItems: LoadingResultState as ResultState<ConfItemResults>,
    resultSpaces: LoadingResultState as ResultState<ConfSpaceResults>,
    resultPeople: LoadingResultState as ResultState<ConfPeopleResults>,
    isBelowTakeoverWidth: false,
  };

  private currentSearches: CancellablePromise<any>[] = [];

  private previousFilters: Filter[] = this.props.enabledFilters;
  private previousSelectedSites: SiteFilterOption[] | undefined = this.props
    .allSiteFilters;

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
    const { resultItems, resultSpaces, resultPeople } = state;
    return (
      resultItems.isLoading || resultSpaces.isLoading || resultPeople.isLoading
    );
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return !(
      deepEqual(this.state, nextState) && deepEqual(this.props, nextProps)
    );
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    // If the search dialog is closed we will terminate all existing searches and reset state
    if (prevProps.isExpanded && !this.props.isExpanded) {
      this.resetQueryState();
      this.resetSearches();
    }

    if (!this.props.isExpanded) {
      return;
    }

    if (prevProps.query !== this.props.query) {
      this.onInput(this.props.query);
    }

    // If the filter is changed we need to kick off a search
    if (!deepEqual(this.props.enabledFilters, this.previousFilters)) {
      this.previousFilters = this.props.enabledFilters;
      this.onFilterChange();
    }

    // If the selected site has changed we need to kick off a search
    if (!deepEqual(this.props.allSiteFilters, this.previousSelectedSites)) {
      this.previousSelectedSites = this.props.allSiteFilters;
      this.onFilterChange();
    }

    if (!prevProps.isExpanded && this.props.isExpanded) {
      this.bootstrapSearch();
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

    this.props.setAdditionalAnalyticsContext({
      type: 'isLoading',
      value: this.isAnyResultLoading(this.state),
    });
  }

  componentWillUnmount() {
    this.cancelCurrentSearches();
  }

  cancelCurrentSearches = () => {
    this.currentSearches.forEach((search) => search.cancel());
    this.currentSearches = [];
  };

  // Starts the loading state by clearing all existing error state and cancelling all promises.
  resetSearches = () => {
    this.debouncedSearch.cancel();
    this.cancelCurrentSearches();

    this.setState({
      isError: false,
      resultItems: LoadingResultState,
      resultSpaces: LoadingResultState,
      resultPeople: LoadingResultState,
    });
  };

  resetQueryState = () => {
    this.props.setAdditionalAnalyticsContext({ type: 'reset' });
    this.setState({
      isPreQuery: true,
    });
  };

  bootstrapSearch = () => {
    const {
      recentClient,
      searchClient,
      searchSessionId,
      allSiteFilters,
    } = this.props;

    this.resetSearches();
    const items = recentClient.getRecentItems();

    // Cache the recent item results to be used for faster search
    this.cacheRecentItems(items);

    const spaces = recentClient.getRecentSpaces();

    if (!this.props.query) {
      this.waitAndSetItems(items);
      this.waitAndSetSpaces(spaces);

      if (this.props.isExpanded) {
        const people = searchClient.getRecentPeople(
          {
            sessionId: searchSessionId,
            referrerId: null,
          },
          allSiteFilters,
        );

        this.waitAndSetPeople(people);
      }
    }
  };

  onInput = (query: string, useDebouncedSearch: boolean = true) => {
    this.setState({
      isPreQuery: !query,
    });

    this.resetSearches();

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
    const {
      searchClient,
      searchSessionId,
      setAdditionalAnalyticsContext,
      queryVersion,
      allSiteFilters,
      enabledFilters,
    } = this.props;

    const selectedSites = allSiteFilters?.filter((f) => f.isChecked);

    const sitesToSearch =
      selectedSites && selectedSites.length > 0
        ? selectedSites
        : limitToMaxSiteUsage(allSiteFilters);

    const resultsWithTimings = searchClient.search(
      query,
      enabledFilters,
      {
        sessionId: searchSessionId,
        referrerId: null,
      },
      queryVersion + 1,
      sitesToSearch,
    );

    setAdditionalAnalyticsContext({
      type: 'queryVersion',
      value: queryVersion + 1,
    });

    const items = resultsWithTimings[Scope.ConfluencePageBlogAttachment];
    const spaces = resultsWithTimings[Scope.ConfluenceSpace];
    const people = resultsWithTimings[Scope.People];

    this.waitAndSetItems(items);
    this.waitAndSetSpaces(spaces);
    this.waitAndSetPeople(people);

    resultsWithTimings[Scope.ConfluencePageBlogAttachment]
      .promise()
      .then((response) => {
        this.props.requestComplete(response.timings);
      })
      .catch(() => {});
  };

  debouncedSearch = debounce(this.doSearch, this.props.debounceTime);

  onRetry = () => {
    this.resetSearches();
    this.doSearch(this.props.query);

    this.props.onRetry();
  };

  onFilterChange = () => {
    this.resetSearches();
    this.doSearch(this.props.query);
  };

  render() {
    const { isExpanded, linkComponent, formatDate, query } = this.props;
    const {
      resultItems,
      resultSpaces,
      resultPeople,
      isPreQuery,
      isError,
      isBelowTakeoverWidth,
    } = this.state;
    const isLoading = this.isAnyResultLoading(this.state);

    const showFilters = !isPreQuery;

    const errorContent = isPreQuery ? (
      <NoPreQueryResults />
    ) : (
      <div style={{ width: '100%' }}>
        <SearchError onRetry={this.onRetry} />
      </div>
    );

    return isExpanded ? (
      <>
        <SearchDialogContent
          ref={this.wrapperRef}
          minHeight={isLoading ? this.height : undefined}
        >
          <ResultContainer>
            {isError ? (
              errorContent
            ) : (
              <SearchResults
                items={resultItems}
                spaces={resultSpaces}
                people={resultPeople}
                isPreQuery={isPreQuery}
                query={query}
                linkComponent={linkComponent}
                formatDate={formatDate}
                isBelowTakeoverWidth={isBelowTakeoverWidth}
                showFilters={showFilters}
              />
            )}
          </ResultContainer>
          {showFilters && (
            <SidebarContainer>
              <FilterPane
                isLoading={false}
                linkComponent={linkComponent}
                query={query}
              />
            </SidebarContainer>
          )}
        </SearchDialogContent>
        <SearchFooter>
          <ConfluenceAdvancedSearch
            linkComponent={linkComponent}
            query={query}
            isLoading={isLoading}
          />
        </SearchFooter>
      </>
    ) : null;
  }

  private cacheRecentItems(
    recentItemPromise: CancellablePromise<ConfItemResults>,
  ) {
    recentItemPromise
      .promise()
      .then((recentItemResults) => {
        this.recentResultItems = recentItemResults.items;
      })
      .catch(() => {
        // Swallow errors
      });
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

  private mergeRecentWithResultItemResults(
    recentResults: ConfItemResult[],
    searchResults: ConfItemResults,
  ): ConfItemResults {
    const fullMergedList = [...recentResults, ...searchResults.items];
    const deduplicatedList = uniqBy(fullMergedList, (item) => item.resultId);

    return {
      items: deduplicatedList,
      totalSize: searchResults.totalSize
        ? Math.max(deduplicatedList.length, searchResults.totalSize)
        : searchResults.totalSize,
      timings: searchResults.timings,
    };
  }

  //#region WaitAndSet Helpers
  private waitAndSetItems(results: CancellablePromise<ConfItemResults>) {
    this.currentSearches.push(results);

    results
      .promise()
      .then((itemResults) => {
        this.setState({
          isError: false,
          resultItems: {
            isLoading: false,
            results: this.mergeRecentWithResultItemResults(
              this.getIntermidateSearchItems(this.props.query),
              itemResults,
            ),
          },
        });
      })
      .catch((e: any) => {
        return e.isCancelled
          ? e
          : this.setState({
              isError: true,
              resultItems: EmptyResultState,
            });
      });
  }

  private waitAndSetSpaces(results: CancellablePromise<ConfSpaceResults>) {
    this.currentSearches.push(results);

    const setSpacesResults = (spaceResults: ConfSpaceResults) => {
      this.setState({
        resultSpaces: {
          isLoading: false,
          results: spaceResults,
        },
      });
    };

    results
      .promise()
      .then(setSpacesResults)
      .catch((e) =>
        e.isCancelled ? e : setSpacesResults({ items: [], timings: 0 }),
      );
  }

  private waitAndSetPeople(results: CancellablePromise<ConfPeopleResults>) {
    this.currentSearches.push(results);

    const setPeopleResult = (peopleResults: ConfPeopleResults) =>
      this.setState({
        resultPeople: {
          isLoading: false,
          results: peopleResults,
        },
      });

    results
      .promise()
      .then(setPeopleResult)
      .catch((e) =>
        e.isCancelled ? e : setPeopleResult({ items: [], timings: 0 }),
      );
  }
  //#endregion
}

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
  const clients = useClients();
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
    <ConfluenceSearchDialog
      {...props}
      enabledFilters={[...enabledSpaces, ...enabledContributors]}
      searchSessionId={searchSessionId}
      searchClient={clients.searchClient}
      recentClient={clients.recentClient}
      requestComplete={requestComplete}
      allSiteFilters={availableSiteFilters}
    />
  );
};

export default ConfluenceSearchDialogWithContext;
