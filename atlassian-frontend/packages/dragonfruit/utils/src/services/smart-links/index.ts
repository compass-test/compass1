import { useContext } from 'react';

import { Client, SmartCardContext } from '@atlaskit/smart-card';

/**
 * useSmartLinks provides access to SmartCardContext.
 * */
export const useSmartLinks = () => {
  const context = useContext(SmartCardContext);
  const client = context?.connections.client as Client;

  return { client };
};
