import React, { FunctionComponent, useState } from 'react';

import deepEqual from 'deep-equal';
import debounce from 'lodash/debounce';
import uniqBy from 'lodash/uniqBy';
import {
  LinkComponent,
  ResultContainer,
  SearchDialogContent,
  SidebarContainer,
  SearchFooter,
} from '@atlassian/search-dialog';

import CancellablePromise from '../utils/cancellable-promise';
import { useSearchSessionId } from '../common/search-session-provider';
import { useProducts } from '../common/product-context';
import { ResultState } from '../common/shared/types';
import { SearchError } from '../common/search-error';
import { NoPreQueryResults } from '../common/no-results';

import {
  useJiraSearchClientContext,
  JiraSearchClient,
  Result,
  Results,
  Scope,
} from './clients';
import { Filter } from './clients/jira-search-client';
import { SiteFilterOption, useFilterContext } from './filter-context';
import { SearchResults } from './jira-search-results';
import {
  AnalyticsContextAction,
  DialogDismissedHandler,
  useAnalytics,
} from '../common/analytics';
import { onRequestMade, onPreQueryEmpty } from '../common/analytics/events';
import { JiraAdvancedSearch } from './jira-advanced-search';
import { JiraFilterPane } from './jira-search-results/jira-filters-pane';
import { useFeatures } from './features';
import { doesJiraIssueMatchQuery } from './utils/jira-search-dialog-functions';
import { limitToMaxSiteUsage } from '../common/clients/multi-site-utils';

// Types
// ------------------------------
type IssueResults = Results<Scope.JiraIssue>;
type BoardProjectFilterResults = Results<Scope.JiraBoardProjectFilter>;
type BoardProjectFilterPlanResults = Results<Scope.JiraBoardProjectFilterPlan>;

export interface Props {
  onNavigate: (href: string, event: React.MouseEvent | KeyboardEvent) => void;
  isExpanded: boolean;
  debounceTime: number;
  linkComponent?: LinkComponent;
  query: string;
  onRetry: () => void;
  setAdditionalAnalyticsContext: (action: AnalyticsContextAction) => void;
  formatDate?: (lastModified: string) => JSX.Element;
  queryVersion: number;
  // optional as is only supplied in cross-product
  setDialogHeight?: (height: number) => void;
  // optional as is only supplied in cross-product
  dialogHeight?: number;
}

interface ContextProps {
  searchSessionId: string;
  enabledFilters: Filter[];
  searchClient: JiraSearchClient;
  requestComplete: (timings: number) => void;
  hasAdvancedRoadmapsAccess?: boolean;
  isMultiProduct: boolean;
  fireAnalyticsOnShownPreQueryEmpty: () => void;
  allSiteFilters: SiteFilterOption[];
}

export interface State {
  isPreQuery: boolean;
  isError: boolean;
  resultIssues: ResultState<IssueResults>;
  resultBoardsProjectsFiltersPlans: ResultState<
    BoardProjectFilterResults | BoardProjectFilterPlanResults
  >;
  isBelowTakeoverWidth?: boolean;
}

// Variables
// ------------------------------
const EmptyResultState = Object.freeze({
  isLoading: false,
  results: null,
});

const LoadingResultState = Object.freeze({
  isLoading: true,
  results: null,
});

// Component
// ------------------------------
export class SearchDialog extends React.Component<Props & ContextProps, State> {
  static defaultProps = {
    enabledFilters: [],
  };

  state = {
    isPreQuery: !this.props.query,
    isError: false,
    resultIssues: LoadingResultState as ResultState<IssueResults>,
    resultBoardsProjectsFiltersPlans: LoadingResultState as ResultState<
      BoardProjectFilterResults | BoardProjectFilterPlanResults
    >,
    isBelowTakeoverWidth: false,
  };

  private currentSearches: CancellablePromise<any>[] = [];

  private previousFilters: Filter[] = this.props.enabledFilters;
  private previousSites: SiteFilterOption[] | undefined = this.props
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
  private recentResultItems: Result<Scope.JiraIssue>[] = [];

  private isAnyResultLoading(state: State) {
    const { resultIssues, resultBoardsProjectsFiltersPlans } = state;
    return resultIssues.isLoading || resultBoardsProjectsFiltersPlans.isLoading;
  }

  private isPreQueryEmpty(state: State, isLoading: boolean) {
    const { resultIssues, resultBoardsProjectsFiltersPlans } = state;
    const totalResultLength =
      ((resultIssues.results && resultIssues.results.items.length) || 0) +
      ((resultBoardsProjectsFiltersPlans.results &&
        resultBoardsProjectsFiltersPlans.results.items.length) ||
        0);

    // This is a special state that represents a pre - query with NO results
    return totalResultLength === 0 && !isLoading;
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return !(
      deepEqual(this.state, nextState) && deepEqual(this.props, nextProps)
    );
  }

  componentDidMount() {
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

    if (!deepEqual(this.props.allSiteFilters, this.previousSites)) {
      this.previousSites = this.props.allSiteFilters;
      this.onFilterChange();
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
      resultIssues: LoadingResultState,
      resultBoardsProjectsFiltersPlans: LoadingResultState,
    });
  };

  bootstrapSearch = () => {
    const {
      searchSessionId,
      hasAdvancedRoadmapsAccess,
      allSiteFilters,
    } = this.props;

    const issues = this.props.searchClient.getRecentIssues(
      {
        sessionId: searchSessionId,
        referrerId: null,
      },
      allSiteFilters,
    );
    const projectFiltersBoardsPlans = hasAdvancedRoadmapsAccess
      ? this.props.searchClient.getRecentBoardsProjectsFiltersPlans(
          {
            sessionId: searchSessionId,
            referrerId: null,
          },
          allSiteFilters,
        )
      : this.props.searchClient.getRecentBoardsProjectsFilters(
          {
            sessionId: searchSessionId,
            referrerId: null,
          },
          allSiteFilters,
        );

    // Cache the recent item results to be used for faster search
    this.cacheRecentItems(issues);

    if (!this.props.query) {
      this.waitAndSetIssues(issues);
      this.waitAndSetProjectFiltersBoardsPlans(projectFiltersBoardsPlans);
    }
  };

  onInput = (query: string, useDebouncedSearch: boolean = true) => {
    this.setState({
      isPreQuery: !query,
    });

    this.resetSearches();

    if (query) {
      if (useDebouncedSearch) {
        this.debouncedSearch();
      } else {
        this.doSearch();
      }

      // Faster search
      this.setState({
        resultIssues: {
          isLoading: true, // This is true because we're still waiting for the actual search to load
          results: {
            items: this.getIntermidateSearchItems(query),
            timings: 0,
            totalSize: 0,
          },
        },
      });
    } else {
      this.bootstrapSearch();
    }
  };

  onRetry = () => {
    this.resetSearches();
    this.doSearch();
    this.props.onRetry();
  };

  onNavigate = (href: string, event: React.MouseEvent | KeyboardEvent) => {
    const { onNavigate } = this.props;
    onNavigate(href, event);
  };

  doSearch = () => {
    const {
      searchClient,
      searchSessionId,
      setAdditionalAnalyticsContext,
      queryVersion,
      hasAdvancedRoadmapsAccess,
      query,
      enabledFilters,
      allSiteFilters,
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
      hasAdvancedRoadmapsAccess,
      sitesToSearch,
    );

    setAdditionalAnalyticsContext({
      type: 'queryVersion',
      value: queryVersion + 1,
    });

    const issues = resultsWithTimings[Scope.JiraIssue];

    this.waitAndSetIssues(issues);

    if (hasAdvancedRoadmapsAccess) {
      const projectFiltersBoardsPlans =
        resultsWithTimings[Scope.JiraBoardProjectFilterPlan];
      this.waitAndSetProjectFiltersBoardsPlans(projectFiltersBoardsPlans);
    } else {
      const projectFiltersBoards =
        resultsWithTimings[Scope.JiraBoardProjectFilter];
      this.waitAndSetProjectFiltersBoardsPlans(projectFiltersBoards);
    }

    issues
      ?.promise()
      .then(({ timings }) => this.props.requestComplete(timings))
      .catch(() => {});
  };

  debouncedSearch = debounce(this.doSearch, this.props.debounceTime);

  resetQueryState = () => {
    this.setState({
      isPreQuery: true,
    });
    this.props.setAdditionalAnalyticsContext({ type: 'reset' });
  };

  onOpen = () => {
    if (!this.props.isExpanded) {
      // Required because the input is deleted when closing from post query but isn't propagated back here.
      // This can be removed when we retain the query between searches
      this.resetQueryState();
      this.bootstrapSearch();
    }
  };

  onFilterChange = () => {
    this.resetSearches();
    this.doSearch();
  };

  render() {
    const {
      isExpanded,
      linkComponent,
      formatDate,
      fireAnalyticsOnShownPreQueryEmpty,
      query,
    } = this.props;
    const {
      resultIssues,
      resultBoardsProjectsFiltersPlans,
      isPreQuery,
      isError,
      isBelowTakeoverWidth,
    } = this.state;
    const isLoading = this.isAnyResultLoading(this.state);
    const isPreQueryEmpty = this.isPreQueryEmpty(this.state, isLoading);

    if (!isExpanded) {
      return null;
    }

    if (isPreQuery && isPreQueryEmpty) {
      if (isError) {
        // NOOP
      }
      fireAnalyticsOnShownPreQueryEmpty();
      return (
        <>
          <NoPreQueryResults />
          <SearchFooter>
            <JiraAdvancedSearch
              query={query}
              onClick={this.onNavigate}
              isLoading={isLoading}
            />
          </SearchFooter>
        </>
      );
    }

    const showFilters = !isBelowTakeoverWidth && !isPreQuery;

    return (
      <>
        <SearchDialogContent
          ref={this.wrapperRef}
          minHeight={isLoading ? this.height : undefined}
        >
          <DialogDismissedHandler isExpanded={isExpanded} />
          <ResultContainer>
            {isError ? (
              <div style={{ width: '100%' }}>
                <SearchError onRetry={this.onRetry} />
              </div>
            ) : (
              <SearchResults
                query={query}
                isPreQuery={isPreQuery}
                results={{
                  issues: resultIssues,
                  boardsProjectsFiltersPlans: resultBoardsProjectsFiltersPlans,
                }}
                linkComponent={linkComponent}
                onNavigate={this.onNavigate}
                formatDate={formatDate}
                isBelowTakeoverWidth={isBelowTakeoverWidth}
              />
            )}
          </ResultContainer>
          {showFilters && (
            <SidebarContainer>
              <JiraFilterPane
                isLoading={false}
                query={query}
                linkComponent={linkComponent}
              />
            </SidebarContainer>
          )}
        </SearchDialogContent>
        <SearchFooter>
          <JiraAdvancedSearch
            query={query}
            onClick={this.onNavigate}
            isLoading={isLoading}
          />
        </SearchFooter>
      </>
    );
  }

  private cacheRecentItems(
    recentItemPromise: CancellablePromise<IssueResults>,
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

    const anySiteSelected = !!allSiteFilters?.find((f) => f.isChecked);
    const hideIntermediateResults =
      enabledFilters.length > 0 || anySiteSelected;

    if (hideIntermediateResults) {
      return [];
    }

    return this.recentResultItems
      .filter((item) => doesJiraIssueMatchQuery(item, query))
      .slice(0, 3);
  }

  private mergeRecentWithResultItemResults(
    recentResults: Result<Scope.JiraIssue>[],
    searchResults: IssueResults,
  ): IssueResults {
    const fullMergedList = [...recentResults, ...searchResults.items];
    const deduplicatedList = uniqBy(fullMergedList, (item) => item.resultId);

    return {
      items: deduplicatedList,
      timings: searchResults.timings,
      totalSize: searchResults.totalSize
        ? Math.max(deduplicatedList.length, searchResults.totalSize)
        : searchResults.totalSize,
    };
  }

  //#region WaitAndSet Helpers
  private waitAndSetIssues(
    results: CancellablePromise<IssueResults> | undefined,
  ) {
    if (!results) {
      // Don't show issues if we don't get an issue response.
      this.setState({
        isError: false,
        resultIssues: EmptyResultState,
      });

      return;
    }

    this.currentSearches.push(results);

    results
      .promise()
      .then((itemResults) => {
        this.setState({
          isError: false,
          resultIssues: {
            isLoading: false,
            results: this.mergeRecentWithResultItemResults(
              this.getIntermidateSearchItems(this.props.query),
              itemResults,
            ),
          },
        });
      })
      .catch((e: any) =>
        e.isCancelled
          ? e
          : this.setState({
              isError: true,
              resultIssues: EmptyResultState,
            }),
      );
  }

  private waitAndSetProjectFiltersBoardsPlans(
    results:
      | CancellablePromise<
          BoardProjectFilterPlanResults | BoardProjectFilterResults
        >
      | undefined,
  ) {
    const setProjectFiltersBoardsPlansResults = (
      projectFiltersBoardsPlanResults:
        | BoardProjectFilterPlanResults
        | BoardProjectFilterResults,
    ) => {
      this.setState({
        resultBoardsProjectsFiltersPlans: {
          isLoading: false,
          results: projectFiltersBoardsPlanResults,
        },
      });
    };

    if (!results) {
      // Don't show projects, filters, boards or plans if we don't get an appropriate response.
      setProjectFiltersBoardsPlansResults({
        items: [],
        timings: 0,
        totalSize: 0,
      });
      return;
    }

    this.currentSearches.push(results);

    results
      .promise()
      .then(setProjectFiltersBoardsPlansResults)
      .catch((e) =>
        e.isCancelled
          ? e
          : setProjectFiltersBoardsPlansResults({
              items: [],
              timings: 0,
              totalSize: 0,
            }),
      );
  }
  //#endregion
}

// With context
// -------------------------------
const SearchDialogWithContext: FunctionComponent<Props> = (props) => {
  const {
    projectFilters: { availableFilters: availableProjectFilters },
    assigneeFilters: { availableFilters: availableAssigneeFilters },
    siteFilters: { availableFilters: availableSiteFilters },
    binaryStatusCategoryFilters: {
      availableFilters: availableBinaryStatusCategoryFilters,
    },
  } = useFilterContext();

  const [isMounted, setIsMounted] = useState(false);

  const { hasAdvancedRoadmapsAccess } = useFeatures();
  const isMultiProduct = useProducts().length > 1;

  const enabledProjects: Filter[] = availableProjectFilters
    .filter((f) => f.isChecked)
    .map((f) => ({
      id: f.id,
      type: 'project',
    }));

  const enabledAssignees: Filter[] = availableAssigneeFilters
    .filter((f) => f.isChecked)
    .map((f) => ({
      id: f.id,
      type: 'assignee',
    }));

  const enabledStatusCategories: Filter[] = availableBinaryStatusCategoryFilters
    .filter((f) => f.isChecked)
    .map((f) => ({
      id: f.id,
      type: 'binary_status_category',
    }));

  const searchSessionId = useSearchSessionId();
  const { searchClient } = useJiraSearchClientContext();

  const { fireAnalyticsEvent } = useAnalytics();

  const requestComplete = (timings: number) => {
    fireAnalyticsEvent(
      onRequestMade({
        actionSubjectId: 'postQuerySearchResults',
        timings: { postQueryRequestDurationMs: timings },
      }),
    );
  };

  const fireAnalyticsOnShownPreQueryEmpty = () => {
    // defend against component re-rendering
    if (!isMounted) {
      fireAnalyticsEvent(onPreQueryEmpty());
    }
    setIsMounted(true);
  };

  return (
    <SearchDialog
      {...props}
      hasAdvancedRoadmapsAccess={hasAdvancedRoadmapsAccess}
      isMultiProduct={isMultiProduct}
      enabledFilters={[
        ...enabledProjects,
        ...enabledAssignees,
        ...enabledStatusCategories,
      ]}
      allSiteFilters={availableSiteFilters}
      searchSessionId={searchSessionId}
      searchClient={searchClient}
      requestComplete={requestComplete}
      fireAnalyticsOnShownPreQueryEmpty={fireAnalyticsOnShownPreQueryEmpty}
    />
  );
};

export default SearchDialogWithContext;
