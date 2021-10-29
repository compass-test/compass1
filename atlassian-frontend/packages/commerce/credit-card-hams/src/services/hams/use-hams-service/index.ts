import { createContext, useContext } from 'react';

import { FieldNames } from '@atlassian/commerce-credit-card-base';

import { useOnCardNumberChangeBrandValidation } from '../brand-validation';
import { useHAMSTokenServiceHookWithUrl } from '../use-hams-token-service';

import { PAYMENT_METHOD_TOKEN_URL, STRIPE_KEY_URL } from './constants';

const createIntentSecretURLContext = createContext<string | undefined>(
  undefined,
);
export const CreateIntentSecretURLProvider =
  createIntentSecretURLContext.Provider;
export const useIntentSecretURL = () => {
  const url = useContext(createIntentSecretURLContext);
  return url !== undefined ? url : PAYMENT_METHOD_TOKEN_URL;
};

export const useHAMSServiceWithUrl = (
  stripeKeyUrl: string = STRIPE_KEY_URL,
) => {
  const token = useHAMSTokenServiceHookWithUrl(stripeKeyUrl);

  const onCardNumberChangeBrandValidation = useOnCardNumberChangeBrandValidation();

  return {
    token,
    fieldConfigs: {
      [FieldNames.NUMBER]: {
        onChange: onCardNumberChangeBrandValidation,
      },
    },
  };
};
