import React, { createContext, useContext } from 'react';

import { IssueType, IssueTypeMap } from '../../common/types';
import { useIssueTypesService } from '../../services';
import { useAPI } from '../api';

type ContextType = {
  data: IssueTypeMap;
  loading: boolean;
  fetchData: (arg0: IssueType['id'][]) => void;
};

const context = createContext<ContextType>({
  loading: false,
  data: {},
  fetchData: () => {},
});

const defaultData: IssueTypeMap = {};

export const IssueTypesProvider: React.FC<{}> = ({ children }) => {
  const api = useAPI();
  const { fetchData, data, loading } = useIssueTypesService(api);

  return (
    <context.Provider value={{ loading, data: data ?? defaultData, fetchData }}>
      {children}
    </context.Provider>
  );
};

export const useIssueTypes = () => useContext(context);
