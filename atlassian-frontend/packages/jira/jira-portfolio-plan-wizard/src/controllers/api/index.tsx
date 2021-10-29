import React, { createContext, useContext } from 'react';

import { API } from '../../common/types';

const context = createContext<API>({} as any);

export function useAPI(): API {
  return useContext<API>(context);
}

type Props = {
  api: API;
  /**
   * The children of the component
   *
   * React.FC does include children declaration, however the Flow React$StatelessFunctionalComponent doesn't.
   * Also, APIProvider is exported from the package so we need this temporary hack
   */
  children: React.ReactNode;
};

export const APIProvider: React.FC<Props> = ({ children, api }) => {
  return <context.Provider value={api} children={children} />;
};
