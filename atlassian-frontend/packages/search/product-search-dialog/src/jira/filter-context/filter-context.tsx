import React, { createContext, useCallback, FunctionComponent } from 'react';

import { SearchDialogAnalyticsContext } from '../../common/analytics';
import { FiltersInfo } from '../../common/analytics/events';
import {
  useFilter,
  addFilters as addFiltersAction,
  updateFilterState,
  replaceAllFilters as replaceAllFiltersAction,
  SupportedAction,
} from '../../common/filters/use-filters';
import {
  FilterOption,
  FilterOptionSource,
  SiteFilterOption,
} from '../../common/filters/types';
import { FormattedMessage } from 'react-intl';
import { messages } from '../../messages';
export class BinaryStatusCategory {
  static OPEN = new BinaryStatusCategory(
    'open',
    '"undefined", "In Progress", "To Do"',
  );
  static DONE = new BinaryStatusCategory('done', '"Done"');

  id: string;
  jqlValue: string;

  constructor(id: string, jqlValue: string) {
    this.id = id;
    this.jqlValue = jqlValue;
  }
}

export const DEFAULT_BINARY_STATUS_CATEGORY_FILTERS: BinaryStatusCategoryFilterOption[] = [
  {
    title: messages.binary_status_category_filter_option_open,
    id: BinaryStatusCategory.OPEN.id,
    isChecked: false,
    isVisible: true,
    filterSource: FilterOptionSource.STATIC,
  },
  {
    title: messages.binary_status_category_filter_option_done,
    id: BinaryStatusCategory.DONE.id,
    isChecked: false,
    isVisible: true,
    filterSource: FilterOptionSource.STATIC,
  },
];

export type { SiteFilterOption };
export interface ProjectFilterOption extends FilterOption {
  name: string;
  iconUrl: string;
}

export interface AssigneeFilterOption extends FilterOption {
  displayName: string;
  avatarUrl: string;
}

export interface BinaryStatusCategoryFilterOption extends FilterOption {
  title: FormattedMessage.MessageDescriptor;
}

export type AddFilters<T extends FilterOption> = (filters: T[]) => void;
export type UpdateFilter = (id: string, isChecked: boolean) => void;
export type ClearEnabledFilter = () => void;
export type ResetFilterState = () => void;

interface FilterStore<T extends FilterOption> {
  availableFilters: T[];
  addFilters: AddFilters<T>;
  updateFilter: UpdateFilter;
  clearFilter: ClearEnabledFilter;
  reset: ResetFilterState;
  dispatch: React.Dispatch<SupportedAction<T>>;
}

export const useFilters = <T extends FilterOption>(
  defaultFilters: T[] = [],
): FilterStore<T> => {
  const { filters, dispatch } = useFilter<T>(defaultFilters);

  const addFilters: AddFilters<T> = useCallback(
    (newFilters) =>
      dispatch(
        addFiltersAction(newFilters, (a, b) => {
          if (
            a.filterSource === FilterOptionSource.CURRENT_USER &&
            b.filterSource !== FilterOptionSource.CURRENT_USER
          ) {
            return -1;
          }

          if (
            a.filterSource !== FilterOptionSource.CURRENT_USER &&
            b.filterSource === FilterOptionSource.CURRENT_USER
          ) {
            return 1;
          }
          return 0;
        }),
      ),
    [dispatch],
  );

  const updateFilter: UpdateFilter = useCallback(
    (id, isChecked) => dispatch(updateFilterState(id, isChecked, true)),
    [dispatch],
  );

  const clearFilter: ClearEnabledFilter = useCallback(() => {
    filters.forEach((f) => dispatch(updateFilterState(f.id, false)));
  }, [filters, dispatch]);

  const resetFilter: ResetFilterState = useCallback(() => {
    dispatch(replaceAllFiltersAction(defaultFilters));
  }, [defaultFilters, dispatch]);

  return {
    availableFilters: filters,
    addFilters,
    updateFilter,
    clearFilter,
    reset: resetFilter,
    dispatch,
  };
};

const DEFAULT_FILTER_STATE = {
  availableFilters: [],
  addFilters: () => {},
  updateFilter: () => {},
  clearFilter: () => {},
  reset: () => {},
  dispatch: () => {},
};

export interface FilterContextProps {
  projectFilters: FilterStore<ProjectFilterOption>;
  assigneeFilters: FilterStore<AssigneeFilterOption>;
  siteFilters: FilterStore<SiteFilterOption>;
  binaryStatusCategoryFilters: FilterStore<BinaryStatusCategoryFilterOption>;
}

const FilterContext = createContext<FilterContextProps>({
  projectFilters: DEFAULT_FILTER_STATE,
  assigneeFilters: DEFAULT_FILTER_STATE,
  siteFilters: DEFAULT_FILTER_STATE,
  binaryStatusCategoryFilters: DEFAULT_FILTER_STATE,
});

export function transformFiltersForAnalytics<T extends FilterOption>(
  availableFilters: T[],
): FiltersInfo {
  const appliedFilters = availableFilters
    .map((availableFilter: T, index) => ({ ...availableFilter, index }))
    .filter((filterWithIndex) => filterWithIndex.isChecked);
  return {
    applied: appliedFilters.map((appliedFilter) => ({
      id: appliedFilter.id,
      source: appliedFilter.filterSource,
      index: appliedFilter.index,
    })),
    recommendedIds: availableFilters.map((appliedFilter: T) => ({
      id: appliedFilter.id,
      source: appliedFilter.filterSource,
    })),
  };
}

export const FilterContextProvider: FunctionComponent<{
  isEnabled?: boolean;
  defaultProjectFilters?: ProjectFilterOption[];
  defaultAssigneeFilters?: AssigneeFilterOption[];
  defaultSiteFilters?: SiteFilterOption[];
}> = ({
  isEnabled = true,
  defaultProjectFilters,
  defaultAssigneeFilters,
  defaultSiteFilters,
  children,
}) => {
  const previousEnabledState = React.useRef(isEnabled);
  const projectFilterStore = useFilters<ProjectFilterOption>(
    defaultProjectFilters,
  );
  const assigneeFilterStore = useFilters<AssigneeFilterOption>(
    defaultAssigneeFilters,
  );

  const siteFilterStore = useFilters<SiteFilterOption>(defaultSiteFilters);

  const binaryStatusCategoryFilterStore = useFilters<
    BinaryStatusCategoryFilterOption
  >(DEFAULT_BINARY_STATUS_CATEGORY_FILTERS);

  const filtersAnalyticsContext =
    projectFilterStore.availableFilters.length === 0 &&
    assigneeFilterStore.availableFilters.length === 0
      ? {}
      : {
          projects: transformFiltersForAnalytics(
            projectFilterStore.availableFilters,
          ),
          assignees: transformFiltersForAnalytics(
            assigneeFilterStore.availableFilters,
          ),
          binaryStatusCategories: transformFiltersForAnalytics(
            binaryStatusCategoryFilterStore.availableFilters,
          ),
        };

  // We reset the state when the component becomes disabled
  if (previousEnabledState.current && !isEnabled) {
    projectFilterStore.reset();
    assigneeFilterStore.reset();
    siteFilterStore.reset();
    binaryStatusCategoryFilterStore.clearFilter();
  }

  previousEnabledState.current = isEnabled;

  return (
    <FilterContext.Provider
      value={{
        projectFilters: projectFilterStore,
        assigneeFilters: assigneeFilterStore,
        siteFilters: siteFilterStore,
        binaryStatusCategoryFilters: binaryStatusCategoryFilterStore,
      }}
    >
      <SearchDialogAnalyticsContext
        analyticContext={{}}
        nonPrivacySafeAnalyticContext={{}}
        filterAnalyticsContext={filtersAnalyticsContext}
      >
        {children}
      </SearchDialogAnalyticsContext>
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const filterContext: FilterContextProps = React.useContext(FilterContext);
  return filterContext;
};
