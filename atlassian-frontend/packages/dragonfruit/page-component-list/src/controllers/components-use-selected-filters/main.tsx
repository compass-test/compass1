import { useCallback, useMemo, useState } from 'react';

import { withContext } from '@atlassian/dragonfruit-utils';

import { UNIDENTIFIED_TEAM } from './constants';
import { TeamFilter } from './types';

export const useSelectedFiltersInternal: () => [
  {
    filters: Array<TeamFilter>;
  },
  {
    toggleUnownedFilter: () => void;
    toggleLowPerformingFilter: () => void;
  },
] = () => {
  const [unownedTeamSelected, setUnownedTeamSelected] = useState(false);
  const [lowPerformingSelected, setLowPerformingSelected] = useState(false);
  const toggleUnownedFilter = useCallback(() => {
    setUnownedTeamSelected((current) => !current);
    setLowPerformingSelected(false);
  }, [setUnownedTeamSelected, setLowPerformingSelected]);

  const toggleLowPerformingFilter = useCallback(() => {
    setLowPerformingSelected((current) => !current);
    setUnownedTeamSelected(false);
  }, [setLowPerformingSelected, setUnownedTeamSelected]);

  const filterState = useMemo(() => {
    const filters = [];

    if (unownedTeamSelected) {
      filters.push({
        name: 'ownerId',
        filter: { eq: UNIDENTIFIED_TEAM },
      });
    }

    if (lowPerformingSelected) {
      filters.push({
        name: 'score',
        filter: { lt: '50' },
      });
    }

    return filters;
  }, [unownedTeamSelected, lowPerformingSelected]);

  return [
    {
      filters: filterState,
    },
    {
      toggleUnownedFilter,
      toggleLowPerformingFilter,
    },
  ];
};

export const {
  SharedStateProvider: SelectedFiltersProvider,
  useSharedStateHook: useSelectedFilters,
} = withContext(useSelectedFiltersInternal, {
  provider: 'SelectedFiltersProvider',
  hook: 'useSelectedFilters',
});
