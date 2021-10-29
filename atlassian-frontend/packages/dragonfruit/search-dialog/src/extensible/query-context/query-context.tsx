import React, { FunctionComponent, useContext, useState } from 'react';

interface QueryContext {
  query: string;
  setQuery: (value: string) => void;
}

const QueryContext = React.createContext<QueryContext>({
  query: '',
  setQuery: (ignore: string) => ({}),
});

export const QueryContextProvider: FunctionComponent = ({ children }) => {
  const [query, setQuery] = useState('');
  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQuery = () => {
  return useContext(QueryContext);
};
