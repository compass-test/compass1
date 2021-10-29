import { useState, useEffect, useRef } from 'react';
import { SiteFilterOption } from './types';
import {
  FilterDispatch,
  Filter,
  replaceAllFiltersAndMaintainChecked,
} from './use-filters';

const NUMBER_OF_STARTING_FILTERS = 3;

export const useLoadFilters = <T extends Filter>(
  supplier: () => Promise<T[]>,
  dispatch: FilterDispatch<T>,
  hasFilters: boolean,
  siteFilters: Array<SiteFilterOption>,
): boolean => {
  // We don't need to load or fetch filters if we already have filters fetched
  const [isLoading, setIsLoading] = useState(!hasFilters);

  useEffect(() => (siteFilters.length > 0 ? setIsLoading(true) : undefined), [
    siteFilters,
  ]);

  // While the filters are loading the search dialogs setState and this retriggers useEffect while it is waiting for network call.
  // The second trigger is not because of any change in the useEffect array but I guess some React check to ensure
  // that when useEffect is running any state changes in parent doesn't cause current changes to be lost.
  // Hence, to prevent repeated network calls added a isNetworkCallPending useRef.
  // But isLoading can only be set once the response has come back as it controls the visibility of filter skeleton.
  // This change also prevents repeated network calls because of WarmUpFilterCache component being re-rendered when siteFilter changes.
  const isNetworkCallPending = useRef(false);

  useEffect(() => {
    if (isLoading && !isNetworkCallPending.current) {
      isNetworkCallPending.current = true;
      supplier()
        .then((filters) => {
          setIsLoading(false);
          isNetworkCallPending.current = false;
          const visible = filters
            .slice(0, NUMBER_OF_STARTING_FILTERS)
            .map((f) => ({ ...f, isVisible: true }));
          const hidden = filters
            .slice(NUMBER_OF_STARTING_FILTERS)
            .map((f) => ({ ...f, isVisible: false }));

          dispatch(
            replaceAllFiltersAndMaintainChecked([...visible, ...hidden]),
          );
        })
        .catch(() => {
          setIsLoading(false);
          isNetworkCallPending.current = false;
        });
    }
  }, [isLoading, setIsLoading, dispatch, supplier]);

  return isLoading;
};
