import { useEffect, useState } from 'react';

import { Stripe } from '@stripe/stripe-js';

export const deferred = <T extends any>(): [Promise<T>, (a: T) => void] => {
  let resolve: (a: T) => void = null as any;
  const promise = new Promise<T>((res) => {
    resolve = res;
  });
  return [promise, resolve];
};

export const useStripePromise = (stripe: Stripe | null): Promise<Stripe> => {
  const [[stripePromise, resolve]] = useState(() => deferred<Stripe>());

  useEffect(() => {
    if (stripe) {
      resolve(stripe);
    }
  }, [resolve, stripe]);

  return stripePromise;
};
