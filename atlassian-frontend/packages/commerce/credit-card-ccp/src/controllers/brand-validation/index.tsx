import React, { createContext, useCallback, useContext, useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { StripeCardNumberElementChangeEvent } from '@stripe/stripe-js';

import {
  isJapaneseLanguage,
  Language,
  usePreferredLanguage,
} from '@atlassian/commerce-credit-card-base';

// TODO: Move this to HAMS?
const acceptedBrands: readonly string[] = ['mastercard', 'amex', 'visa'];

type SetBrandErrorCallback = (brand: BrandError | undefined) => any;

const ACCEPTED_BRANDS_ERROR_MESSAGE =
  'Only Visa, MasterCard and AMEX are supported';

// TODO: Remove this once proper i18n is supported
const JAPANESE_ACCEPTED_BRANDS_ERROR_MESSAGE =
  'このクレジットカードには対応していません';

const getAcceptedLanguageErrorMessage = (language: Language) => {
  if (isJapaneseLanguage(language)) {
    return JAPANESE_ACCEPTED_BRANDS_ERROR_MESSAGE;
  } else {
    return ACCEPTED_BRANDS_ERROR_MESSAGE;
  }
};

export type BrandError = {
  message: string;
};

const extractCreditCardNumberChangePayloadBrandError = (
  payload: StripeCardNumberElementChangeEvent,
  language: Language,
): BrandError | undefined => {
  if (payload.brand === 'unknown') {
    if (payload.complete) {
      return { message: getAcceptedLanguageErrorMessage(language) };
    }
  } else if (!payload.empty && !acceptedBrands.includes(payload.brand)) {
    return { message: getAcceptedLanguageErrorMessage(language) };
  }

  return undefined;
};

const brandErrorContext = createContext<BrandError | undefined>(undefined);
export const useBrandError = () => {
  return useContext(brandErrorContext);
};

const setBrandErrorContext = createContext<SetBrandErrorCallback | undefined>(
  undefined,
);
export const useOnCardNumberChangeBrandValidation = () => {
  const setBrandError = useContext(setBrandErrorContext);
  const language = usePreferredLanguage();

  const setBrandErrorFomCardNumberChangeEvent = useCallback(
    (payload: StripeCardNumberElementChangeEvent) => {
      const brandError = extractCreditCardNumberChangePayloadBrandError(
        payload,
        language,
      );
      setBrandError!(brandError);
      if (brandError !== undefined && payload.error === undefined) {
        return {
          ...payload,
          error: {
            // Would rather not pretend this is a validation error from Stripe itself
            code: 'invalid_number',
            message: brandError.message,
            type: 'validation_error',
          },
        };
      }

      return payload;
    },
    [setBrandError, language],
  );

  return setBrandErrorFomCardNumberChangeEvent;
};

export const BrandValidationProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [brandError, setBrandError] = useState<BrandError | undefined>(
    undefined,
  );
  return (
    <brandErrorContext.Provider value={brandError}>
      <setBrandErrorContext.Provider value={setBrandError}>
        {children}
      </setBrandErrorContext.Provider>
    </brandErrorContext.Provider>
  );
};
