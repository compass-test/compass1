import { useCallback, useEffect, useRef, useState } from 'react';

import type { App } from '../../common/types';
import { searchApp } from '../../services/search-app';

type SelectAppCallback = (app: App | null) => void;

const useSelectApp = (
  defaultSelectedAppKey?: string,
): [boolean, App | null, SelectAppCallback] => {
  const abortRef = useRef<AbortController>();
  const [app, setApp] = useState<App | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // cleanUpFetchApp
  const cleanUpFetchApp = useCallback(() => {
    // Abort fetch if exist
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = undefined;
    }

    // Reset loading flag
    setLoading(false);
  }, []);

  // Async fetchApp
  const fetchApp = useCallback(
    async (appKey: string) => {
      // Set loading flag
      setLoading(true);

      // Fetch
      try {
        const abortCtrl = new AbortController();
        const params = new URLSearchParams();

        abortRef.current = abortCtrl;
        params.set('hosting', 'cloud');
        const app = await searchApp(appKey, params, abortCtrl);

        setApp(app);
      } catch (err) {
        // No-op for now
      }

      // Reset loading flag
      cleanUpFetchApp();
    },
    [cleanUpFetchApp],
  );

  // Select app
  const selectApp = useCallback<SelectAppCallback>(
    selectedApp => {
      // Reset if any existing fetching
      cleanUpFetchApp();

      // Set app
      setApp(selectedApp);
    },
    [cleanUpFetchApp],
  );

  // Fetch default app
  useEffect(() => {
    if (defaultSelectedAppKey) {
      fetchApp(defaultSelectedAppKey);

      return cleanUpFetchApp;
    }
  }, [cleanUpFetchApp, fetchApp, defaultSelectedAppKey]);

  return [loading, app, selectApp];
};

export default useSelectApp;
