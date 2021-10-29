import React from 'react';
import { MoreFiltersLink } from '../../../common/filters/more-filters';
import { usePrimarySiteConfluenceAdvancedSearchUrlFactory } from '../../confluence-utils/confluence-url-utils';
import { LinkComponent } from '@atlassian/search-dialog';
import { useFilterContext } from '../../filter-context';

export interface MoreFiltersProps {
  isLoading: boolean;
  linkComponent?: LinkComponent;
  query: string;
}

const MoreFilters = ({ query, ...rest }: MoreFiltersProps) => {
  const {
    spaceFilters: { availableFilters: availableSpaceFilters },
    peopleFilters: { availableFilters: availablePeopleFilters },
  } = useFilterContext();

  // Again to be removed in QS-1932
  const confluenceAdvancedSearchUrlFactory = usePrimarySiteConfluenceAdvancedSearchUrlFactory();

  const enabledSpaces = availableSpaceFilters.filter((f) => f.isChecked);
  const enabledContributors = availablePeopleFilters.filter((f) => f.isChecked);

  const href = confluenceAdvancedSearchUrlFactory(query);
  return (
    <MoreFiltersLink
      {...rest}
      href={href}
      query={query}
      selectedFiltersCount={enabledSpaces.length + enabledContributors.length}
    />
  );
};

export default MoreFilters;
