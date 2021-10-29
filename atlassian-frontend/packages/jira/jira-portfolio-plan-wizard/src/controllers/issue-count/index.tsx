import React, { createContext, useContext } from 'react';

import { Plan } from '../../common/types';
import { useIssueCountService } from '../../services';
import { useAPI } from '../api';

const context = createContext<{
  value: number | undefined;
  loading: boolean;
  fetchData: (arg0: Plan, arg1: AbortController) => void;
}>({
  value: undefined,
  loading: false,
  fetchData: () => {},
});

export const IssueCountProvider: React.FC<{}> = ({ children }) => {
  const api = useAPI();
  const { data, fetchData, loading } = useIssueCountService(api);
  const value = data?.issueCount;

  return (
    <context.Provider value={{ value, loading, fetchData }}>
      {children}
    </context.Provider>
  );
};

export const useIssueCount = () => useContext(context);
