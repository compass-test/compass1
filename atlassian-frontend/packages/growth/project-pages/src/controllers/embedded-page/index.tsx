import React, { useContext, useReducer } from 'react';
import { EmbeddedPage, EmbeddedPageState } from './types';

const EmbeddedPageContext = React.createContext<EmbeddedPage>({
  mode: 'view',
  page: null,
  isOpen: false,
  isLoading: false,
  pageCreate: null,
  setEmbeddedPage: () => {},
});

export const useEmbeddedPage = () =>
  useContext<EmbeddedPage>(EmbeddedPageContext);

const reducer: React.Reducer<EmbeddedPageState, Partial<EmbeddedPageState>> = (
  prevState,
  action,
) => ({
  ...prevState,
  ...action,
});

export const EmbeddedPageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pageState, setEmbeddedPage] = useReducer(reducer, {
    mode: 'view',
    page: null,
    isOpen: false,
    isLoading: false,
    pageCreate: null,
  });
  return (
    <EmbeddedPageContext.Provider
      value={{
        ...pageState,
        setEmbeddedPage,
      }}
    >
      {children}
    </EmbeddedPageContext.Provider>
  );
};
