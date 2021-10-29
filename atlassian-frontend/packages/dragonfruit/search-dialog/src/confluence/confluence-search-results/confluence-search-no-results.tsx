import React, { useCallback } from 'react';
import { withAnalytics } from '../../common/analytics';
import {
  onAdvancedSearchSelected,
  onFiltersCleared,
} from '../../common/analytics/events';
import { NoResults, NoResultsProps } from '../../common/no-results';
import { useFeatures } from '../confluence-features';
import { useFilterContext } from '../filter-context';

interface Props {
  filtersCleared: () => void;
}

export const NoResultsWithHooks = (props: Props & NoResultsProps) => {
  const { isMultiSite } = useFeatures();
  const filterContext = useFilterContext();
  const enabledSpaceFilters = filterContext.spaceFilters.availableFilters.filter(
    (f) => f.isChecked,
  );
  const enabledPeopleFilters = filterContext.peopleFilters.availableFilters.filter(
    (f) => f.isChecked,
  );
  const enabledSiteFilters = filterContext.siteFilters.availableFilters.filter(
    (f) => f.isChecked,
  );

  const hasFilters =
    enabledSpaceFilters.length +
      enabledPeopleFilters.length +
      enabledSiteFilters.length >
    0;

  const clearSpaceFilters = filterContext.spaceFilters.clearFilter;
  const clearPeopleFilters = filterContext.peopleFilters.clearFilter;
  const clearSiteFilters = filterContext.siteFilters.clearFilter;

  const { filtersCleared } = props;

  const clearAllFilters = useCallback(() => {
    filtersCleared();

    clearSpaceFilters();
    clearPeopleFilters();
    clearSiteFilters();
  }, [clearSpaceFilters, clearPeopleFilters, clearSiteFilters, filtersCleared]);

  return (
    <NoResults
      {...props}
      hasFilters={hasFilters}
      clearFilters={clearAllFilters}
      isMultiSite={isMultiSite}
    />
  );
};

export default withAnalytics({
  advancedSearchSelected: onAdvancedSearchSelected,
  filtersCleared: onFiltersCleared,
})(NoResultsWithHooks);
