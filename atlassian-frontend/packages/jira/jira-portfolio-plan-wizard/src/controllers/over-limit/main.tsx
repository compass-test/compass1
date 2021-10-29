import React from 'react';

import { context, useContextProviding } from './utils';

export const OverLimitProvider: React.FC<{}> = ({ children }) => {
  return (
    <context.Provider value={useContextProviding()}>
      {children}
    </context.Provider>
  );
};
