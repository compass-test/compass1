import React, { createContext, useContext } from 'react';

import { IssueStatusType, IssueStatusTypeMap } from '../../common/types';
import { useStatusTypesService } from '../../services';
import { useAPI } from '../api';

type ContextType = {
  loading: boolean;
  data: IssueStatusTypeMap;
  fetchData: (arg0: IssueStatusType['id'][]) => void;
};

const context = createContext<ContextType>({
  loading: false,
  data: {},
  fetchData: () => {},
});

const defaultData: IssueStatusTypeMap = {};

export const StatusTypesProvider: React.FC<{}> = ({ children }) => {
  const api = useAPI();
  const { data, loading, fetchData } = useStatusTypesService(api);

  return (
    <context.Provider value={{ loading, data: data ?? defaultData, fetchData }}>
      {children}
    </context.Provider>
  );
};

export const useStatusTypes = () => useContext(context);
