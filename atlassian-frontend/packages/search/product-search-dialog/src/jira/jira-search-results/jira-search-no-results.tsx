import React, { useCallback } from 'react';
import {
  onAdvancedSearchSelected,
  onFiltersCleared,
  withAnalytics,
} from '../../common/analytics';
import { NoResults, NoResultsProps } from '../../common/no-results';
import { useFeatures } from '../features';
import { useFilterContext } from '../filter-context';

interface Props {
  filtersCleared: () => void;
  onClick: (href: string, event: React.MouseEvent | KeyboardEvent) => void;
}

export const NoResultsWithHooks = (props: Props & NoResultsProps) => {
  const { isMultiSite } = useFeatures();
  const filterContext = useFilterContext();
  const enabledProjectFilters = filterContext.projectFilters.availableFilters.filter(
    (f) => f.isChecked,
  );
  const enabledAssigneeFilters = filterContext.assigneeFilters.availableFilters.filter(
    (f) => f.isChecked,
  );
  const enabledSiteFilters = filterContext.siteFilters.availableFilters.filter(
    (f) => f.isChecked,
  );

  const hasFilters =
    enabledProjectFilters.length +
      enabledAssigneeFilters.length +
      enabledSiteFilters.length >
    0;

  const clearProjectFilters = filterContext.projectFilters.clearFilter;
  const clearAssigneeFilters = filterContext.assigneeFilters.clearFilter;
  const clearSiteFilters = filterContext.siteFilters.clearFilter;

  const { filtersCleared } = props;

  const clearAllFilters = useCallback(() => {
    filtersCleared();

    clearProjectFilters();
    clearAssigneeFilters();
    clearSiteFilters();
  }, [
    clearProjectFilters,
    clearAssigneeFilters,
    clearSiteFilters,
    filtersCleared,
  ]);

  return (
    <NoResults
      {...props}
      hasFilters={hasFilters}
      clearFilters={clearAllFilters}
      onClick={props.onClick}
      isMultiSite={isMultiSite}
    />
  );
};

export default withAnalytics({
  advancedSearchSelected: onAdvancedSearchSelected,
  filtersCleared: onFiltersCleared,
})(NoResultsWithHooks);
