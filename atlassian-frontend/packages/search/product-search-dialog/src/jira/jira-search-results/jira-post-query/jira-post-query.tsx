import {
  LinkComponent,
  SearchResultSection,
  SearchResultSectionLink,
} from '@atlassian/search-dialog';
import React, { useRef, useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  SearchResultsShownHandler,
  useAnalytics,
  ResultSectionAnalyticData,
  onShowAllClicked,
  onShowMoreClicked,
} from '../../../common/analytics';
import { LoadingSpinner } from '../../../common/loading-spinner';
import NoResults from '../jira-search-no-results';
import { ResultState } from '../../../common/shared/types';
import { messages } from '../../../messages';
import { UnreachableError } from '../../../utils/safety';
import {
  AttributeBoardProjectFilterPlan,
  AttributeType,
  Result,
  Results,
  Scope,
} from '../../clients/response-types';
import {
  BoardsProjectFiltersSearchResultsList,
  IssueSearchResultsList,
  SearchResultsListProps,
} from './../jira-search-results-lists';
import { useFeatures } from '../../features';
import { useJiraSearchClientContext } from '../../clients';
import { useFiltersAdvancedSearchUrlFactory } from '../../jira-advanced-search-url-factory';

export const INITIAL_POST_QUERY_ITEM_LIMIT = 10;
export const DISPLAYED_RESULT_LIMIT_BOARDS_PROJECTS_FILTERS = 6;
export const DISPLAYED_RESULT_LIMIT_BOARDS_PROJECTS_FILTERS_PLANS = 8;

const getIssueResultsToDisplay = (
  isShowingMore: boolean,
  issueResults: Results<Scope.JiraIssue> | null,
): Results<Scope.JiraIssue> | null => {
  if (!issueResults) {
    return null;
  }

  const itemResults = isShowingMore
    ? issueResults.items || []
    : issueResults.items?.slice(0, INITIAL_POST_QUERY_ITEM_LIMIT) || [];

  return {
    ...issueResults,
    items: itemResults,
  };
};

export interface Props {
  query: string;
  results: ResultsProp;
  linkComponent?: LinkComponent;
  isCollapsed?: boolean;
  onNavigate: (href: string, event: React.MouseEvent | KeyboardEvent) => void;
  formatDate?: (updated: string) => JSX.Element;
}

interface ResultsProp {
  issues: ResultState<Results<Scope.JiraIssue>>;
  boardsProjectsFiltersPlans: ResultState<
    Results<Scope.JiraBoardProjectFilter | Scope.JiraBoardProjectFilterPlan>
  >;
}

type PossibleResults = keyof Props['results'];

export default function JiraPostQueryResults({
  query,
  results,
  linkComponent,
  onNavigate,
  formatDate,
}: Props) {
  // Determine if loading and whether results (partial or othwerwise) exist
  const resultKeys = Object.keys(results) as PossibleResults[];
  const ref: React.RefObject<HTMLInputElement> = useRef(null);
  const [isShowingMore, setIsShowingMore] = useState(false);
  const { isLoading, hasResults } = resultKeys.reduce(
    (curr, key) => ({
      isLoading: curr.isLoading || results[key].isLoading,
      hasResults: curr.hasResults || !!results[key].results?.items.length,
    }),
    { isLoading: false, hasResults: false },
  );
  const { fireAnalyticsEvent } = useAnalytics();
  const {
    hasAdvancedRoadmapsAccess,
    hasSoftwareAccess,
    isMultiSite,
  } = useFeatures();
  const { siteUrl } = useJiraSearchClientContext();
  const advancedSearchUrl = useFiltersAdvancedSearchUrlFactory()(
    query,
    siteUrl,
  );

  useEffect(() => {
    if (isLoading) {
      setIsShowingMore(false);
    }
  }, [isLoading]);

  if (!isLoading && !hasResults) {
    return (
      <span ref={ref}>
        <NoResults
          linkComponent={linkComponent}
          onClick={onNavigate}
          advancedSearchUrl={advancedSearchUrl}
        />
      </span>
    );
  }

  const onShowAll = (e: React.MouseEvent | KeyboardEvent, href: string) => {
    const displayedIssues = getIssueResultsToDisplay(
      true,
      results.issues.results,
    );

    fireAnalyticsEvent(
      onShowAllClicked({
        total: displayedIssues?.totalSize ?? 0,
        currentSize: displayedIssues?.items?.length ?? 0,
        pageSize: INITIAL_POST_QUERY_ITEM_LIMIT,
      }),
    );

    if (!(e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onNavigate(href, e);
    }
  };

  const onShowMore = () => {
    const displayedIssues = getIssueResultsToDisplay(
      false,
      results.issues.results,
    );

    fireAnalyticsEvent(
      onShowMoreClicked({
        total: displayedIssues?.totalSize ?? 0,
        currentSize: displayedIssues?.items.length ?? 0,
        pageSize: INITIAL_POST_QUERY_ITEM_LIMIT,
      }),
    );

    setIsShowingMore(true);
  };

  const getShowMoreLink = (totalItemCount: number) => {
    if (totalItemCount <= INITIAL_POST_QUERY_ITEM_LIMIT) {
      return null;
    }
    if (isShowingMore) {
      return (
        !isMultiSite && (
          <SearchResultSectionLink
            onClick={(e: React.MouseEvent | KeyboardEvent) =>
              onShowAll(e, advancedSearchUrl)
            }
            linkComponent={linkComponent}
            href={advancedSearchUrl}
            id="show-all-link"
          >
            <FormattedMessage {...messages.common_show_all_results_link} />
          </SearchResultSectionLink>
        )
      );
    } else {
      return (
        <SearchResultSectionLink onClick={onShowMore} id="show-more-button">
          <FormattedMessage {...messages.common_show_more_results_link} />
        </SearchResultSectionLink>
      );
    }
  };

  let totalNumberOfItemsInPreviousSections = 0;
  let sectionIndex = 0;
  const resultsAnalyticsData: ResultSectionAnalyticData[] = [];

  const onSelect = (e: React.MouseEvent | KeyboardEvent, href: string) => {
    if (!(e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onNavigate(href, e);
    }
  };

  return (
    <>
      {resultKeys.map((type) => {
        const section = results[type];
        let sectionResults = section.results?.items;
        if (!sectionResults || !sectionResults.length) {
          return null; // Don't render anything if no results and not loading
        }

        if (type === 'boardsProjectsFiltersPlans' && isLoading) {
          return null; // Don't render secondary section if the primary (issues) is still loading
        }

        if (type === 'issues') {
          sectionResults =
            getIssueResultsToDisplay(isShowingMore, results.issues.results)
              ?.items || [];
          resultsAnalyticsData.push({
            results: sectionResults.map((r) => ({
              containerId: r.attributes.containerId,
              resultContentId: r.resultId,
              isRecentResult: r.isCached,
              resultType: r.contentType,
            })),
            sectionId: 'jira-issue',
          });
        } else if (type === 'boardsProjectsFiltersPlans') {
          sectionResults = sectionResults.slice(
            0,
            hasAdvancedRoadmapsAccess
              ? DISPLAYED_RESULT_LIMIT_BOARDS_PROJECTS_FILTERS_PLANS
              : DISPLAYED_RESULT_LIMIT_BOARDS_PROJECTS_FILTERS,
          ) as Result<AttributeBoardProjectFilterPlan>[];

          resultsAnalyticsData.push({
            results: sectionResults.map((r) => {
              let containerId = 'UNAVAILABLE';

              if (r.attributes['@type'] === AttributeType.board) {
                containerId = r.attributes.containerId;
              }

              return {
                containerId,
                resultContentId: r.resultId,
                isRecentResult: r.isCached,
                resultType: r.contentType,
              };
            }),
            sectionId: 'jira-board-project-filter',
          });
        } else {
          throw new UnreachableError(type);
        }

        const totalResultCount =
          type === 'issues' ? results.issues.results?.totalSize : undefined;

        const content = (
          <SearchResultSection
            key={type}
            totalResults={totalResultCount}
            title={
              <FormattedMessage
                {...getSectionNameFor(
                  type,
                  hasAdvancedRoadmapsAccess,
                  hasSoftwareAccess,
                )}
              />
            }
          >
            <ScopedSearchResultsList
              type={type}
              results={sectionResults as any} // TODO fix this any. This will require moving around a lot of the conditions in this component
              linkComponent={linkComponent}
              screenType={
                isLoading ? 'cachedResults' : 'postQuerySearchResults'
              }
              onSelect={onSelect}
              isCollapsed
              analyticContext={{
                sectionIndex,
                totalNumberOfItemsInPreviousSections,
              }}
              formatDate={formatDate}
            />
            {type === 'issues' &&
              !isLoading &&
              getShowMoreLink(section.results?.totalSize || 0)}
          </SearchResultSection>
        );

        totalNumberOfItemsInPreviousSections += sectionResults.length;
        sectionIndex += 1;

        return content;
      })}
      {isLoading && <LoadingSpinner />}
      <SearchResultsShownHandler
        isLoading={isLoading}
        isPreQuery={false}
        resultCount={totalNumberOfItemsInPreviousSections}
        sectionCount={sectionIndex}
        results={resultsAnalyticsData}
      />
    </>
  );
}

export function getSectionNameFor(
  key: PossibleResults,
  hasAdvancedRoadmapsAccess?: boolean,
  hasSoftwareAccess?: boolean,
) {
  switch (key) {
    case 'issues':
      return messages.jira_issues_section_heading;
    case 'boardsProjectsFiltersPlans':
      if (hasAdvancedRoadmapsAccess) {
        return messages.jira_boards_projects_filters_plans_section_heading;
      } else if (hasSoftwareAccess) {
        return messages.jira_boards_projects_filters_section_heading;
      } else {
        return messages.jira_boards_projects_filters_section_heading;
      }
    default:
      throw new UnreachableError(key);
  }
}

type ScopedSearchResultListProps =
  | ({
      type: 'issues';
    } & SearchResultsListProps<Scope.JiraIssue>)
  | ({
      type: 'boardsProjectsFiltersPlans';
    } & SearchResultsListProps<
      Scope.JiraBoardProjectFilter | Scope.JiraBoardProjectFilterPlan
    >);

export function ScopedSearchResultsList(props: ScopedSearchResultListProps) {
  if (props.type === 'issues') {
    const { type, ...rest } = props;
    return <IssueSearchResultsList {...rest} />;
  } else if (props.type === 'boardsProjectsFiltersPlans') {
    const { type, ...rest } = props;
    return <BoardsProjectFiltersSearchResultsList {...rest} />;
  } else {
    return null;
  }
}
