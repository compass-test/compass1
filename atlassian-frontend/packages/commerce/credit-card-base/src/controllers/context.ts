import { createContext } from 'react';

import { PaymentMethodCreateParams } from '@stripe/stripe-js';

import { FailureResult } from '@atlassian/commerce-resultful';

import * as FieldNames from '../common/constants/field-names';
import { FieldConfigs } from '../common/types/field-configs';
import { CreditCardError } from '../common/utils/errors';
import { RequestState } from '../common/utils/state/types';

import { StripeEnvironment } from './types';

export interface FormContentState<
  TS extends StripeEnvironment = StripeEnvironment
> {
  state: RequestState;
  token: TS;
  fieldConfigs: FieldConfigs | undefined;
}

export const formContext = createContext<FormContentState>({
  state: 'loading',
  token: {
    publicKey: 'wrong-key',
  },
  fieldConfigs: undefined,
});

export type FormStateContextType = [
  PaymentMethodCreateParams.BillingDetails,
  (key: string, value: string) => void,
];

const throwWrapWithCreditCardFormState = () => {
  throw new Error('Please wrap with CreditCardFormState');
};

export const formStateContext = createContext<FormStateContextType>([
  {},
  throwWrapWithCreditCardFormState,
]);

export const formErrorContext = createContext<
  [
    FailureResult<CreditCardError, any> | undefined,
    (result: FailureResult<CreditCardError, any> | undefined) => void,
  ]
>([
  undefined,
  () => {
    throw new Error('Please wrap with CreditCardFormState');
  },
]);

export type FieldRef = {
  setFailure(message: FailureResult<CreditCardError, any> | undefined): void;
  focus(): void;
  ready: boolean;
  failed: boolean;
};

export type FormRefsContextType = [
  Record<FieldNames.FieldName, FieldRef>,
  (key: FieldNames.FieldName, value: FieldRef | undefined) => void,
];

export const formStateRefs = createContext<FormRefsContextType>([
  {} as any,
  throwWrapWithCreditCardFormState,
]);

export const retryContext = createContext<() => void>(
  throwWrapWithCreditCardFormState,
);
