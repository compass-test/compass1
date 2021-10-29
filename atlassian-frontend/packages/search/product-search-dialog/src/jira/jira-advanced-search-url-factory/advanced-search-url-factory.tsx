import { useCallback } from 'react';
import {
  AssigneeFilterOption,
  BinaryStatusCategory,
  ProjectFilterOption,
  useFilterContext,
} from '../filter-context';
import { BinaryStatusCategoryFilterOption } from '../filter-context/filter-context';

const buildJQLAdvancedIssueUrl = (jql: string) => `/issues/?jql=${jql}`;

const buildSmartQueryAdvancedSearchUrl = (query: string) =>
  `/secure/QuickSearch.jspa?searchString=${encodeURIComponent(query)}`;

const buildJqlQuery = (
  query: string,
  projectIds: string[],
  accountIds: string[],
  binaryStatusCategories: string[],
) => {
  const projectJQL =
    projectIds.length > 0
      ? ` AND project IN (${encodeURIComponent(projectIds.join(','))})`
      : '';
  const assigneeJQL =
    accountIds.length > 0
      ? ` AND assignee IN (${encodeURIComponent(accountIds.join(','))})`
      : '';

  const binaryStatusCategoryValues = binaryStatusCategories
    .map((id) => {
      switch (id) {
        case BinaryStatusCategory.DONE.id:
          return BinaryStatusCategory.DONE.jqlValue;
        case BinaryStatusCategory.OPEN.id:
          return BinaryStatusCategory.OPEN.jqlValue;
        default:
          return '';
      }
    })
    .join(', ');

  const binaryStatusCategoryJQL =
    binaryStatusCategories.length === 1
      ? ` AND statusCategory IN (${encodeURIComponent(
          binaryStatusCategoryValues,
        )})`
      : '';

  return `text ~ "${encodeURIComponent(
    query,
  )}"${projectJQL}${assigneeJQL}${binaryStatusCategoryJQL}`;
};

const buildJiraAdvancedSearchPath = (
  query: string,
  availableProjectFilters: ProjectFilterOption[],
  availableAssigneeFilters: AssigneeFilterOption[],
  availableBinaryStatusCategories: BinaryStatusCategoryFilterOption[],
) => {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return buildSmartQueryAdvancedSearchUrl(query);
  }

  const projectIds = availableProjectFilters
    .filter((f) => f.isChecked)
    .map((f) => f.id);
  const accountIds = availableAssigneeFilters
    .filter((f) => f.isChecked)
    .map((f) => f.id);
  const binaryStatusCategories = availableBinaryStatusCategories
    .filter((f) => f.isChecked)
    .map((f) => f.id);
  /*
    If no filters are specified, we route the user to the "smart" query url (/secure/QuickSearch.jspa)
    as we want to retain the smart querying functions it has (e.g. routing you to an issue directly if you enter an issue key)
    */
  if (
    projectIds.length === 0 &&
    accountIds.length === 0 &&
    binaryStatusCategories.length === 0
  ) {
    return buildSmartQueryAdvancedSearchUrl(trimmedQuery);
  }

  return buildJQLAdvancedIssueUrl(
    buildJqlQuery(trimmedQuery, projectIds, accountIds, binaryStatusCategories),
  );
};

export const buildJiraAdvancedSearchUrl = (
  query: string,
  availableProjectFilters: ProjectFilterOption[],
  availableAssigneeFilters: AssigneeFilterOption[],
  availableBinaryStatusCategories: BinaryStatusCategoryFilterOption[],
  siteUrl?: string,
) => {
  return `${siteUrl ?? ''}${buildJiraAdvancedSearchPath(
    query,
    availableProjectFilters,
    availableAssigneeFilters,
    availableBinaryStatusCategories,
  )}`;
};

export const useFiltersAdvancedSearchUrlFactory = () => {
  const {
    projectFilters: { availableFilters: availableProjectFilters },
    assigneeFilters: { availableFilters: availableAssigneeFilters },
    binaryStatusCategoryFilters: {
      availableFilters: availableBinaryStatusCategoryFilters,
    },
  } = useFilterContext();
  return useCallback(
    (query: string, siteUrl?: string) => {
      return `${siteUrl ?? ''}${buildJiraAdvancedSearchUrl(
        query,
        availableProjectFilters,
        availableAssigneeFilters,
        availableBinaryStatusCategoryFilters,
      )}`;
    },
    [
      availableProjectFilters,
      availableAssigneeFilters,
      availableBinaryStatusCategoryFilters,
    ],
  );
};

export const useQueryOnlyAdvancedSearchUrlFactory = () => {
  return useCallback(
    (query: string, siteUrl?: string) =>
      `${siteUrl ?? ''}${buildJiraAdvancedSearchUrl(query, [], [], [])}`,
    [],
  );
};
