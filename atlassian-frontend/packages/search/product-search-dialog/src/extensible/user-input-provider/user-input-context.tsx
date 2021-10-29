import React, {
  FC,
  useContext,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';

import {
  STICKY_SEARCH_KEY,
  SEARCH_QUERY_KEY,
  SEARCH_FILTERS_KEY,
  getSessionItem,
  setSessionItem,
  deleteSessionItem,
} from '@atlassian/search-dialog';

const noop = () => {};
const SESSION_RESET_TIMEOUT_MS = 300000;

interface UserInputContext {
  stickySearchEnabled: boolean;
  query: string;
  storeQuery: (value: string) => void;
  readFilters: (productId: string) => any;
  storeFilters: (productId: string, value: any) => void;
  resetSearchSession: () => void;
  isStickyUpdated: boolean;
}

export const UserInputContext = React.createContext<UserInputContext>({
  stickySearchEnabled: false,
  query: '',
  storeQuery: noop,
  readFilters: noop,
  storeFilters: noop,
  resetSearchSession: noop,
  isStickyUpdated: false,
});

type QueryContextProviderProps = {
  stickySearchEnabled?: boolean;
  sessionResetIdleTime?: number;
  isExpanded?: boolean;
  children: React.ReactNode;
};

export const UserInputContextProvider: FC<QueryContextProviderProps> = ({
  stickySearchEnabled = false,
  sessionResetIdleTime = SESSION_RESET_TIMEOUT_MS,
  isExpanded = false,
  children,
}) => {
  const [query, setQuery] = useState<string>(
    getSessionItem(SEARCH_QUERY_KEY) || '',
  );
  const [isStickyUpdated, setIsStickyUpdated] = useState<boolean>(false);
  const lastExpandRef = useRef<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const resetSearchSession = useCallback(() => {
    deleteSessionItem(SEARCH_QUERY_KEY);
    deleteSessionItem(SEARCH_FILTERS_KEY);
    setQuery('');
  }, []);

  const updateSessionResetTimeout = useCallback(() => {
    if (timeoutRef?.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      resetSearchSession();
    }, sessionResetIdleTime);
  }, [resetSearchSession, timeoutRef, sessionResetIdleTime]);

  const storeQuery = useCallback(
    (query) => {
      setQuery(query);
      setSessionItem(SEARCH_QUERY_KEY, query);
      updateSessionResetTimeout();
    },
    [updateSessionResetTimeout],
  );

  const readFilters = useCallback(
    (productId: string) => {
      const searchFilterString = getSessionItem(SEARCH_FILTERS_KEY);
      const filters = searchFilterString ? JSON.parse(searchFilterString) : {};
      updateSessionResetTimeout();
      if (productId in filters) {
        return filters[productId];
      }
      return {};
    },
    [updateSessionResetTimeout],
  );

  const storeFilters = useCallback(
    (productId: string, value: any) => {
      const searchFilterString = getSessionItem(SEARCH_FILTERS_KEY);
      const filters = searchFilterString ? JSON.parse(searchFilterString) : {};
      filters[productId] = value;
      setSessionItem(SEARCH_FILTERS_KEY, JSON.stringify(filters));
      updateSessionResetTimeout();
    },
    [updateSessionResetTimeout],
  );

  useEffect(() => {
    setSessionItem(STICKY_SEARCH_KEY, stickySearchEnabled.toString());
  }, [stickySearchEnabled]);

  useEffect(() => {
    if (!lastExpandRef.current && isExpanded) {
      setIsStickyUpdated(query !== '');
    }
    lastExpandRef.current = isExpanded;
  }, [isExpanded, lastExpandRef, query]);

  return (
    <UserInputContext.Provider
      value={{
        stickySearchEnabled,
        query,
        storeQuery: stickySearchEnabled ? storeQuery : noop,
        readFilters: stickySearchEnabled ? readFilters : noop,
        storeFilters: stickySearchEnabled ? storeFilters : noop,
        resetSearchSession: stickySearchEnabled ? resetSearchSession : noop,
        isStickyUpdated: stickySearchEnabled && isStickyUpdated,
      }}
    >
      {children}
    </UserInputContext.Provider>
  );
};

export const useSessionUserInput = () => {
  return useContext(UserInputContext);
};
