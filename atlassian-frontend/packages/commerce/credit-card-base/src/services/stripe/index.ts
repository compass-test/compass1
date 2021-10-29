import { useEffect, useMemo, useState } from 'react';

import { loadStripe, Stripe } from '@stripe/stripe-js';

import { useCommerceOverride } from '@atlassian/commerce-environment';

import {
  isJapaneseLanguage,
  usePreferredLanguage,
} from '../../common/utils/i18n-hack';
import { stateGuard } from '../../common/utils/state';
import { RequestState, StatedResponse } from '../../common/utils/state/types';

export type StripeResponse = StatedResponse<Stripe>;
export type StripeServiceHook = (
  publicKey: string | undefined,
) => StripeResponse;

/**
 * @internal NOT EXPECTED to be use by a consumer
 * initializes Stripe API
 * to be used with {@link CreditCardFormState}
 * @param token - Stripe API token
 */
export const useStripeService: StripeServiceHook = (
  token: string | undefined,
) => {
  const [stripe, setStripe] = useState<Stripe | undefined>(undefined);

  const [state, setState] = useState<RequestState>('loading');
  const stripeLoader = useCommerceOverride(loadStripe);

  const language = usePreferredLanguage();

  const stripeLocale = useMemo(() => {
    if (isJapaneseLanguage(language)) {
      return 'ja' as const;
    } else {
      return 'en' as const;
    }
  }, [language]);

  useEffect(() => {
    let cancelled = false;
    if (token !== undefined) {
      (async () => {
        try {
          const stripe = await stripeLoader(token, {
            locale: stripeLocale,
          });
          if (!cancelled) {
            if (stripe) {
              setStripe(stripe);
              setState('complete');
            } else {
              setState('error');
            }
          }
        } catch (e) {
          if (!cancelled) {
            setState('error');
          }
        }
      })();
    }

    return () => {
      cancelled = true;
    };
  }, [stripeLoader, token, stripeLocale]);

  return stateGuard(stripe, state, undefined);
};
