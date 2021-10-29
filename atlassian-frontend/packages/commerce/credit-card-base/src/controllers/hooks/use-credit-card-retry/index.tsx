import { useContext } from 'react';

import { retryContext } from '../../context';

export const useCreditCardRetry = () => {
  return useContext(retryContext);
};
