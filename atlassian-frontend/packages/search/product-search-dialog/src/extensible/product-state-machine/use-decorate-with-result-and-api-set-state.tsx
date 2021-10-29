import { useCallback, useEffect, useRef } from 'react';
import { EMPTY_SEARCH_ITEMS } from '../product-router/product';
import { SearchItems } from '../product-router/product/result-types';
import useCancellablePromiseOnUnmount from '../utils/use-cancelled-promise-on-un-mount';
import useMaxOneInflightRequest from '../utils/use-max-one-inflight-request';
import { APIStates } from './product-state-machine-types';
import { CancelError } from '../../utils/cancellable-promise';
import { useQuery } from '../query-context';
import { hasSearchResults } from '../product-router/product/utils';

type SetAPIState = (value: APIStates) => void;
export interface DecoratorResultSetStateProps<A> {
  // The response returned from the supplier is stored into a state so that the UI
  // can update itself.
  setState: (arg: SearchItems) => void;
  // Tracks the status of the search item supplier.
  setAPIState: SetAPIState;
  // This callback generates results as per the standarised search results interface.
  searchItemSupplier: (arg: A) => Promise<SearchItems>;
}

/**
 * This decorator accepts a simple search result supplier (pre/post) and decorates it with the
 * functionality of setting the results and api states depending on the different kinds of responses
 * that can be obtained via the supplier.
 *
 * @returns a decorated function that sets the results and api in their corresponding states.
 * Note: Setting these separately in different ticks was causing the results to be stale.
 */
export const useDecorateWithResultAndAPISetState: <A>(
  args: DecoratorResultSetStateProps<A>,
) => (arg: A) => Promise<SearchItems> = ({
  setState,
  searchItemSupplier,
  setAPIState,
}) => {
  const generateCancelledPromiseOnunmount = useCancellablePromiseOnUnmount();
  const generateMaxOneInflightRequest = useMaxOneInflightRequest();
  const { query } = useQuery();
  const presentQuery = useRef(query);
  useEffect(() => {
    presentQuery.current = query;
  }, [query]);

  return useCallback(
    (arg) => {
      return new Promise((resolve, reject) => {
        setAPIState(APIStates.Loading);
        generateMaxOneInflightRequest(
          generateCancelledPromiseOnunmount(searchItemSupplier(arg)),
        )
          .then((response: SearchItems) => {
            if (presentQuery.current !== query) {
              return;
            }
            setState(response);
            if (hasSearchResults(response)) {
              setAPIState(APIStates.Success);
            } else {
              setAPIState(APIStates.NoResult);
            }
            resolve(response);
          })
          .catch((e) => {
            if (presentQuery.current !== query) {
              return;
            }
            /**
             * Set state only if the promise was not cancelled, which happens only to avoid multiple calls going out.
             */
            if (e && !(e as CancelError).isCancelled) {
              setState(EMPTY_SEARCH_ITEMS);
              setAPIState(APIStates.Error);
              reject(e);
            }
          });
      });
    },
    [
      searchItemSupplier,
      setState,
      generateCancelledPromiseOnunmount,
      setAPIState,
      generateMaxOneInflightRequest,
      query,
    ],
  );
};
