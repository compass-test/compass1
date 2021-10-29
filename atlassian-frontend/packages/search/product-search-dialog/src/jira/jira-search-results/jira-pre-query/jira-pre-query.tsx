import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { SearchResultSection, LinkComponent } from '@atlassian/search-dialog';
import { messages } from '../../../messages';
import { ResultState } from '../../../common/shared/types';
import {
  Results,
  Scope,
  AttributeIssue,
  Result,
  AttributeBoardProjectFilterPlan,
  AttributeType,
} from '../../clients/response-types';
import { UnreachableError } from '../../../utils/safety';
import { LoadingSpinner } from '../../../common/loading-spinner';
import NoResults from '../jira-search-no-results';
import {
  SearchResultsListProps,
  IssueSearchResultsList,
  BoardsProjectFiltersSearchResultsList,
} from './../jira-search-results-lists';
import {
  ResultSectionAnalyticData,
  SearchResultsShownHandler,
} from '../../../common/analytics';
import { ViewAllIssuesLink } from '../../view-all-issues';
import { useFeatures } from '../../features';
import { useJiraSearchClientContext } from '../../clients';
import { useFiltersAdvancedSearchUrlFactory } from '../../jira-advanced-search-url-factory';

export const DISPLAYED_RESULT_LIMIT_ISSUES = 10;
export const DISPLAYED_RESULT_LIMIT_BOARDS_PROJECTS_FILTERS = 6;
export const DISPLAYED_RESULT_LIMIT_BOARDS_PROJECTS_FILTERS_PLANS = 8;

export interface Props {
  results: ResultsProp;
  linkComponent?: LinkComponent;
  onNavigate: (href: string, event: React.MouseEvent | KeyboardEvent) => void;
  isCollapsed: boolean;
}

interface ResultsProp {
  issues: ResultState<Results<Scope.JiraIssue>>;
  boardsProjectsFiltersPlans: ResultState<
    Results<Scope.JiraBoardProjectFilter | Scope.JiraBoardProjectFilterPlan>
  >;
}

type PossibleResults = keyof Props['results'];

export default function JiraPreQueryResults({
  results,
  linkComponent,
  onNavigate,
  isCollapsed,
}: Props) {
  const {
    hasAdvancedRoadmapsAccess,
    hasSoftwareAccess,
    isMultiSite,
  } = useFeatures();
  const { siteUrl } = useJiraSearchClientContext();
  const href = useFiltersAdvancedSearchUrlFactory()('', siteUrl);

  // Determine if loading and whether results (partial or othwerwise) exist
  const resultKeys = Object.keys(results) as PossibleResults[];
  const ref: React.RefObject<HTMLInputElement> = useRef(null);
  const { isLoading, hasResults } = resultKeys.reduce(
    (curr, key) => ({
      isLoading: curr.isLoading || results[key].isLoading,
      hasResults: curr.hasResults || !!results[key].results?.items.length,
    }),
    { isLoading: false, hasResults: false },
  );

  if (!isLoading && !hasResults) {
    return (
      <span ref={ref}>
        <NoResults
          linkComponent={linkComponent}
          onClick={onNavigate}
          advancedSearchUrl={href}
        />
      </span>
    );
  }

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
      {!isLoading && (
        <>
          {!isMultiSite && (
            <ViewAllIssuesLink
              key="view-all-issues"
              linkComponent={linkComponent}
              query={''}
              onClick={onNavigate}
            />
          )}
          {resultKeys.map((type) => {
            const section = results[type];
            let sectionResults = section.results?.items;
            if (!sectionResults || !sectionResults.length) {
              return null; // Don't render anything if no results and not loading
            }

            if (type === 'issues') {
              sectionResults = sectionResults.slice(
                0,
                DISPLAYED_RESULT_LIMIT_ISSUES,
              ) as Result<AttributeIssue>[];
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
            const content = (
              <SearchResultSection
                key={type}
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
                  screenType={'preQuerySearchResults'}
                  onSelect={onSelect}
                  analyticContext={{
                    sectionIndex,
                    totalNumberOfItemsInPreviousSections,
                  }}
                  isCollapsed={isCollapsed}
                />
              </SearchResultSection>
            );

            totalNumberOfItemsInPreviousSections += sectionResults.length;
            sectionIndex += 1;

            return content;
          })}
        </>
      )}
      {isLoading && <LoadingSpinner />}
      <SearchResultsShownHandler
        isLoading={isLoading}
        isPreQuery
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
      return messages.jira_recently_viewed_issues_section_heading;
    case 'boardsProjectsFiltersPlans':
      if (hasAdvancedRoadmapsAccess) {
        return messages.jira_recent_boards_projects_filters_plans_section_heading;
      } else if (hasSoftwareAccess) {
        return messages.jira_recent_boards_projects_filters_section_heading;
      } else {
        return messages.jira_recent_projects_filters_section_heading;
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
    } & SearchResultsListProps<Scope.JiraBoardProjectFilter>);

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
