import React, {
  createContext,
  useCallback,
  useState,
  useLayoutEffect,
  FunctionComponent,
} from 'react';
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
import { useSessionUserInput } from '../../extensible/user-input-provider';

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

const useFilters = <T extends FilterOption>(
  defaultFilters: T[] = [],
  storeFilters = (value: T[]) => {},
): FilterStore<T> => {
  const { filters, dispatch } = useFilter<T>(defaultFilters);

  useLayoutEffect(() => {
    storeFilters(filters);
  });

  const addFilters: AddFilters<T> = useCallback(
    (newFilters) => {
      dispatch(addFiltersAction(newFilters));
      storeFilters(filters.concat(newFilters));
    },
    [dispatch, filters, storeFilters],
  );

  const updateFilter: UpdateFilter = useCallback(
    (id, isChecked) => {
      dispatch(updateFilterState(id, isChecked, true));
      const index = filters.findIndex((filter) => filter.id === id);
      const newFilters = [...filters];
      newFilters[index] = {
        ...newFilters[index],
        isChecked: isChecked,
        isVisible: true,
      };
      storeFilters(filters.concat(newFilters));
    },
    [dispatch, filters, storeFilters],
  );

  const clearFilter: ClearEnabledFilter = useCallback(() => {
    filters.forEach((f) => {
      dispatch(updateFilterState(f.id, false));
    });
    const newFilters = filters.map((f) => {
      const newF = { ...f };
      newF.isChecked = false;
      return newF;
    });
    storeFilters(newFilters);
  }, [dispatch, filters, storeFilters]);

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
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextProps>({
  spaceFilters: DEFAULT_FILTER_STATE,
  peopleFilters: DEFAULT_FILTER_STATE,
  siteFilters: DEFAULT_FILTER_STATE,
  resetFilters: () => {},
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
  const {
    stickySearchEnabled,
    readFilters,
    storeFilters,
  } = useSessionUserInput();
  const [filters, setFilters] = useState(readFilters('confluence'));
  const initialSpaceFilters = stickySearchEnabled
    ? filters?.space || defaultSpaceFilters
    : defaultSpaceFilters;
  const initialPeopleFilters = stickySearchEnabled
    ? filters?.people || defaultPeopleFilters
    : defaultPeopleFilters;
  const initialSiteFilters = stickySearchEnabled
    ? filters?.site || defaultSiteFilters
    : defaultSiteFilters;

  const getUpdateFilters = useCallback(
    (type: 'SPACE' | 'PEOPLE' | 'SITE') => (options: FilterOption[]) => {
      const filters = readFilters('confluence');
      switch (type) {
        case 'SPACE':
          filters.space = options;
          break;
        case 'PEOPLE':
          filters.people = options;
          break;
        case 'SITE':
          filters.site = options;
          break;
      }
      storeFilters('confluence', filters);
    },
    [readFilters, storeFilters],
  );

  const spaceFilterStore = useFilters<SpaceFilterOption>(
    initialSpaceFilters,
    stickySearchEnabled ? getUpdateFilters('SPACE') : undefined,
  );
  const peopleFilterStore = useFilters<PeopleFilterOption>(
    initialPeopleFilters,
    stickySearchEnabled ? getUpdateFilters('PEOPLE') : undefined,
  );
  const siteFilterStore = useFilters<SiteFilterOption>(
    initialSiteFilters,
    stickySearchEnabled ? getUpdateFilters('SITE') : undefined,
  );

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

  const resetFilters = useCallback(() => {
    spaceFilterStore.dispatch(
      replaceAllFiltersAction(defaultSpaceFilters || []),
    );
    peopleFilterStore.dispatch(
      replaceAllFiltersAction(defaultPeopleFilters || []),
    );
    siteFilterStore.dispatch(replaceAllFiltersAction(defaultSiteFilters || []));
    if (stickySearchEnabled) {
      setFilters(readFilters('confluence'));
    }
  }, [
    defaultPeopleFilters,
    defaultSiteFilters,
    defaultSpaceFilters,
    peopleFilterStore,
    siteFilterStore,
    spaceFilterStore,
    readFilters,
    stickySearchEnabled,
  ]);

  // We reset the state when the component becomes disabled
  if (previousEnabledState.current && !isEnabled && !stickySearchEnabled) {
    resetFilters();
  }

  previousEnabledState.current = isEnabled;

  return (
    <FilterContext.Provider
      value={{
        spaceFilters: spaceFilterStore,
        peopleFilters: peopleFilterStore,
        siteFilters: siteFilterStore,
        resetFilters,
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
