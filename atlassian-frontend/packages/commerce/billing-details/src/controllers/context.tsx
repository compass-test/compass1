import React, { createContext, useContext } from 'react';

import { ContextData } from '../common/types';

const ShipToContext = createContext<ContextData | undefined>(undefined);
export const ShipToContextProvider: React.FC<{
  data?: ContextData;
}> = ({ data, children }) => (
  <ShipToContext.Provider value={data}>{children}</ShipToContext.Provider>
);

export const useShipToContext = (): ContextData | undefined =>
  useContext(ShipToContext);
