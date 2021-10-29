import React from 'react';

export interface Filter {
  /**
   * Unique id of the filter
   */
  id: string;

  /**
   * Whether the filter is enabled
   */
  isChecked: boolean;

  /**
   * Whether the filter is visible
   */
  isVisible: boolean;
}

type SortFunction<T> = (o1: T, o2: T) => number;

export type FilterDispatch<T extends Filter> = React.Dispatch<
  SupportedAction<T>
>;

export interface AddFiltersAction<T extends Filter> {
  type: 'ADD_FILTERS';
  newFilters: T[];
  sortFunction?: SortFunction<T>;
}

export interface UpdateFilterStateAction {
  type: 'UPDATE_FILTER_STATE';
  filterId: string;
  isChecked: boolean;
  isVisible?: boolean;
}

export interface RemoveFilterAction {
  type: 'REMOVE_FILTER';
  id: string;
}

export interface ReplaceAllFiltersAction<T extends Filter> {
  type: 'REPLACE_ALL_FILTERS';
  newFilters: T[];
}

export interface ReplaceAllFiltersAndMaintainCheckedAction<T extends Filter> {
  type: 'REPLACE_ALL_FILTERS_AND_MAINTAIN_CHECKED';
  newFilters: T[];
}

export const addFilters: <T extends Filter>(
  filters: T[],
  sortFunction?: SortFunction<T>,
) => AddFiltersAction<T> = (filters, sortFunction) => ({
  type: 'ADD_FILTERS',
  newFilters: filters,
  sortFunction,
});

export const removeFilter: (id: string) => RemoveFilterAction = (id) => ({
  type: 'REMOVE_FILTER',
  id,
});

export const replaceAllFilters: <T extends Filter>(
  newFilters: T[],
) => ReplaceAllFiltersAction<T> = (newFilters) => ({
  type: 'REPLACE_ALL_FILTERS',
  newFilters,
});

export const updateFilterState: (
  filter: string,
  isChecked: boolean,
  isVisible?: boolean,
) => UpdateFilterStateAction = (filterId, isChecked, isVisible) => ({
  type: 'UPDATE_FILTER_STATE',
  filterId: filterId,
  isChecked,
  isVisible,
});

export const replaceAllFiltersAndMaintainChecked: <T extends Filter>(
  newFilters: T[],
) => ReplaceAllFiltersAndMaintainCheckedAction<T> = (newFilters) => ({
  type: 'REPLACE_ALL_FILTERS_AND_MAINTAIN_CHECKED',
  newFilters,
});

export type SupportedAction<T extends Filter> =
  | AddFiltersAction<T>
  | RemoveFilterAction
  | ReplaceAllFiltersAction<T>
  | UpdateFilterStateAction
  | ReplaceAllFiltersAndMaintainCheckedAction<T>;

function reducer<T extends Filter>(state: T[], action: SupportedAction<T>) {
  switch (action.type) {
    case 'ADD_FILTERS': {
      if (action.newFilters.length === 0) {
        return state;
      }

      let newState = [...state];
      action.newFilters.forEach((f) => {
        const index = state.findIndex((filter) => filter.id === f.id);

        if (index === -1) {
          newState.push(f);
        } else {
          newState[index] = f;

          return newState;
        }
      });

      action.sortFunction && newState.sort(action.sortFunction);

      return newState;
    }
    case 'UPDATE_FILTER_STATE': {
      const index = state.findIndex((filter) => filter.id === action.filterId);

      if (index === -1) {
        return state;
      }

      const newState = [...state];
      newState[index] = {
        ...newState[index],
        isChecked: action.isChecked,
        isVisible:
          action.isVisible === undefined || action.isVisible === null
            ? newState[index].isVisible
            : action.isVisible,
      };

      return newState;
    }
    case 'REMOVE_FILTER': {
      return [...state.filter((filter) => filter.id !== action.id)];
    }
    case 'REPLACE_ALL_FILTERS': {
      return [...action.newFilters];
    }
    case 'REPLACE_ALL_FILTERS_AND_MAINTAIN_CHECKED': {
      const newState = action.newFilters.map((newFilter) => {
        const existingFilter = state.find((f) => f.id === newFilter.id);
        if (existingFilter && newFilter.isVisible) {
          newFilter.isChecked = existingFilter.isChecked;
        }
        return newFilter;
      });
      return newState;
    }
    default:
      // exhaustive check
      const _: never = action;
      throw new Error(_);
  }
}

export const useFilter = <T extends Filter>(initialValues?: T[]) => {
  const [state, dispatch] = React.useReducer(
    reducer,
    initialValues ? initialValues : [],
  );

  const value = React.useMemo(
    () => ({
      filters: state as T[],
      dispatch: dispatch as FilterDispatch<T>,
    }),
    [state, dispatch],
  );

  return value;
};
