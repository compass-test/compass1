import { createContext, useContext } from 'react';

import { Stripe } from '@stripe/stripe-js';

const stripeContext = createContext<Stripe | undefined>(undefined);
export const useCommerceStripe = () => useContext(stripeContext);
export const StripeProvider = stripeContext.Provider;
