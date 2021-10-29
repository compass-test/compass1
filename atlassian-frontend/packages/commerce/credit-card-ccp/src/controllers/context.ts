import { createContext } from 'react';

import { StatedResponse } from '@atlassian/commerce-credit-card-base';

import { CCPStripeEnvironment } from './hooks/use-ccp-token';

export type Token = {
  publicKey: string;
  intentSecret: string;
  paymentMethodId: string;
};
export const tokenContext = createContext<StatedResponse<CCPStripeEnvironment>>(
  {
    state: 'loading',
  },
);
