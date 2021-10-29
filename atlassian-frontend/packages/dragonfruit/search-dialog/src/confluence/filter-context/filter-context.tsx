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
import { FilterOption, SiteFilterOption } from '../../common/filters/types';

export type { SiteFilterOption };
export interface SpaceFilterOption extends FilterOption {
  spaceName: string;
  iconUrl: string;
}

export interface PeopleFilterOption extends FilterOption {
  displayName: string;
  avatarUrl: string;
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
    (newFilters) => dispatch(addFiltersAction(newFilters)),
    [dispatch],
  );

  const updateFilter: UpdateFilter = useCallback(
    (id, isChecked) => {
      dispatch(updateFilterState(id, isChecked, true));
    },
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
  spaceFilters: FilterStore<SpaceFilterOption>;
  peopleFilters: FilterStore<PeopleFilterOption>;
  siteFilters: FilterStore<SiteFilterOption>;
}

const FilterContext = createContext<FilterContextProps>({
  spaceFilters: DEFAULT_FILTER_STATE,
  peopleFilters: DEFAULT_FILTER_STATE,
  siteFilters: DEFAULT_FILTER_STATE,
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
  defaultSpaceFilters?: SpaceFilterOption[];
  defaultPeopleFilters?: PeopleFilterOption[];
  defaultSiteFilters?: SiteFilterOption[];
}> = ({
  isEnabled = true,
  defaultSpaceFilters,
  defaultPeopleFilters,
  defaultSiteFilters,
  children,
}) => {
  const previousEnabledState = React.useRef(isEnabled);
  const spaceFilterStore = useFilters<SpaceFilterOption>(defaultSpaceFilters);
  const peopleFilterStore = useFilters<PeopleFilterOption>(
    defaultPeopleFilters,
  );

  const siteFilterStore = useFilters<SiteFilterOption>(defaultSiteFilters);

  const filtersAnalyticsContext =
    spaceFilterStore.availableFilters.length === 0 &&
    peopleFilterStore.availableFilters.length === 0
      ? {}
      : {
          container: transformFiltersForAnalytics(
            spaceFilterStore.availableFilters,
          ),
          contributor: transformFiltersForAnalytics(
            peopleFilterStore.availableFilters,
          ),
        };

  // We reset the state when the component becomes disabled
  if (previousEnabledState.current && !isEnabled) {
    spaceFilterStore.reset();
    peopleFilterStore.reset();
    siteFilterStore.reset();
  }

  previousEnabledState.current = isEnabled;

  return (
    <FilterContext.Provider
      value={{
        spaceFilters: spaceFilterStore,
        peopleFilters: peopleFilterStore,
        siteFilters: siteFilterStore,
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

export const useFilterContext = (): FilterContextProps => {
  return React.useContext(FilterContext);
};
