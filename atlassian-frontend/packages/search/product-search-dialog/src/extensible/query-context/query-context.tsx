import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  getInputSkeletonFocus,
  getInputSkeletonQuery,
} from '@atlassian/search-dialog';
import { useSessionUserInput } from '../../extensible/user-input-provider';
import {
  AnalyticsContextAction,
  SearchDialogAnalyticsContext,
  useAnalyticsContext,
} from '../../common/analytics';
import { useDialogExpansionContext } from '../dialog-expansion-context';

interface QueryContext {
  query: string;
  queryVersion: number;
  isLoading: boolean;
  setQuery: (value: string) => void;
  setAdditionalAnalyticsContext: React.Dispatch<AnalyticsContextAction>;
}

const QueryContext = React.createContext<QueryContext>({
  query: '',
  queryVersion: 0,
  isLoading: false,
  setQuery: (ignore: string) => ({}),
  setAdditionalAnalyticsContext: (ignore: AnalyticsContextAction) => ({}),
});

export const QueryContextProvider: FunctionComponent = ({ children }) => {
  const [stateQuery, setStateQuery] = useState('');
  const {
    stickySearchEnabled,
    query: sessionQuery,
    storeQuery,
  } = useSessionUserInput();
  const query = stickySearchEnabled ? sessionQuery : stateQuery;
  const setQuery = stickySearchEnabled ? storeQuery : setStateQuery;

  const { isExpanded } = useDialogExpansionContext();
  const queryString = getInputSkeletonQuery();
  const isFocused = getInputSkeletonFocus();
  const {
    isLoading,
    setAdditionalAnalyticsContext,
    addAnalyticContext,
    nonPrivacySafeContext,
    queryVersion,
  } = useAnalyticsContext(query);

  useEffect(() => {
    if (!isExpanded && !getInputSkeletonFocus()) {
      if (!stickySearchEnabled) {
        setQuery('');
      }
      setAdditionalAnalyticsContext({ type: 'reset' });
    }
    // Check to make sure React input is the same as SSR input
    if (isFocused && queryString.length) {
      setQuery(queryString);
    }
  }, [
    isExpanded,
    setAdditionalAnalyticsContext,
    stickySearchEnabled,
    setQuery,
    queryString,
    isFocused,
  ]);

  return (
    <QueryContext.Provider
      value={{
        query,
        queryVersion,
        setQuery,
        setAdditionalAnalyticsContext,
        isLoading,
      }}
    >
      <SearchDialogAnalyticsContext
        analyticContext={addAnalyticContext}
        nonPrivacySafeAnalyticContextGenerator={nonPrivacySafeContext}
      >
        {children}
      </SearchDialogAnalyticsContext>
    </QueryContext.Provider>
  );
};

export const useQuery = () => {
  return useContext(QueryContext);
};
