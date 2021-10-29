import React from 'react';
import { MoreFiltersLink } from '../../../../common/filters/more-filters';
import { LinkComponent } from '@atlassian/search-dialog';

import { useFilterContext } from '../../../filter-context';
import { useFiltersAdvancedSearchUrlFactory } from '../../../jira-advanced-search-url-factory';
import { useJiraSearchClientContext } from '../../../clients';

export interface MoreFiltersProps {
  isLoading: boolean;
  linkComponent?: LinkComponent;
  query: string;
}

const MoreFilters = ({ query, ...rest }: MoreFiltersProps) => {
  const {
    assigneeFilters: { availableFilters: availableAssigneeFilters },
    projectFilters: { availableFilters: availableProjectFilters },
    binaryStatusCategoryFilters: {
      availableFilters: availableBinaryStatusCategoryFilters,
    },
  } = useFilterContext();

  const selectedAssigneeFilters = availableAssigneeFilters.filter(
    (f) => f.isChecked,
  );
  const selectedProjectFilters = availableProjectFilters.filter(
    (f) => f.isChecked,
  );
  const selectedBinaryStatusFilters = availableBinaryStatusCategoryFilters.filter(
    (f) => f.isChecked,
  );
  const { siteUrl } = useJiraSearchClientContext();
  const href = useFiltersAdvancedSearchUrlFactory()(query, siteUrl);
  const selectedFiltersCount =
    selectedAssigneeFilters.length +
    selectedProjectFilters.length +
    selectedBinaryStatusFilters.length;
  return (
    <MoreFiltersLink
      {...rest}
      href={href}
      query={query}
      selectedFiltersCount={selectedFiltersCount}
    />
  );
};

export default MoreFilters;
