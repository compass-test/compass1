import React from 'react';
import { LinkComponent } from '@atlassian/search-dialog';
import { ResultState } from '../../common/shared/types';
import { Results, Scope } from '../clients/response-types';
import { JiraPreQueryResults } from './jira-pre-query';
import { JiraPostQueryResults } from './jira-post-query';

export const DISPLAYED_RESULT_LIMIT_BOARDS_PROJECTS_FILTERS = 6;

export interface Props {
  query: string;
  isPreQuery: boolean;
  results: ResultsProp;
  linkComponent?: LinkComponent;
  onNavigate: (href: string, event: React.MouseEvent | KeyboardEvent) => void;
  formatDate?: (lastModified: string) => JSX.Element;
  isBelowTakeoverWidth: boolean;
}

interface ResultsProp {
  issues: ResultState<Results<Scope.JiraIssue>>;
  boardsProjectsFiltersPlans: ResultState<
    Results<Scope.JiraBoardProjectFilter | Scope.JiraBoardProjectFilterPlan>
  >;
}

export default function SearchResults({
  query,
  isPreQuery,
  results,
  linkComponent,
  onNavigate,
  formatDate,
  isBelowTakeoverWidth,
}: Props) {
  return isPreQuery ? (
    <JiraPreQueryResults
      results={results}
      onNavigate={onNavigate}
      linkComponent={linkComponent}
      isCollapsed={isBelowTakeoverWidth}
    />
  ) : (
    <JiraPostQueryResults
      query={query}
      results={results}
      onNavigate={onNavigate}
      linkComponent={linkComponent}
      formatDate={formatDate}
    />
  );
}
