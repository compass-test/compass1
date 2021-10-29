import { useMemo, useRef, useState } from 'react';

import debounce from 'lodash/debounce';

import type { App, CloudProduct } from '../../common/types';
import { searchApps } from '../../services/search-app';

type SearchAppsCallback = (text: string) => void;
type Cancelable = ReturnType<typeof debounce>;

const useSearchApps = (
  cloudProduct: CloudProduct,
): [boolean, App[], SearchAppsCallback] => {
  const abortRef = useRef<AbortController>();
  const debounceRef = useRef<Cancelable>();
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // doSearchApps
  const doSearchApps = useMemo<SearchAppsCallback>(() => {
    // Cancel the previous debounce
    if (debounceRef.current) {
      debounceRef.current.cancel();
      debounceRef.current = undefined;
    }

    // Memoize debounce
    const debounceInstance = debounce<SearchAppsCallback>(async text => {
      // Reset apps before fetching
      setApps([]);

      // Filter out empty string
      if (text.length === 0) {
        return;
      }

      // Abort the previous request
      if (abortRef.current) {
        abortRef.current.abort();
        abortRef.current = undefined;
      }

      // Request API
      const abortCtrl = new AbortController();
      const params = new URLSearchParams();

      abortRef.current = abortCtrl;
      params.set('application', cloudProduct);
      params.set('hosting', 'cloud');
      params.set('limit', '10');
      params.set('text', text);
      setLoading(true);
      try {
        const resultApps = await searchApps(params, abortCtrl);

        setApps(resultApps);
      } catch (err) {
        setLoading(false);

        // NOOP for fetch abort error
        if (
          err instanceof DOMException &&
          err.code === DOMException.ABORT_ERR
        ) {
          return;
        }

        // TODO Re-throw error
        setApps([]);
      }
      setLoading(false);
    }, 200);

    // Set debounce instance
    debounceRef.current = debounceInstance;
    return debounceInstance;
  }, [cloudProduct]);

  return [loading, apps, doSearchApps];
};

export default useSearchApps;
