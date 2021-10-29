import React from 'react';

import { CommerceMockedEnvironment } from '@atlassian/commerce-environment/mocks';

import {
  BaseCreditCardFormState,
  CommerceService,
  CreditCardErrorMessage,
  CreditCardForm,
} from '../src';
import { stripeOverride } from '../src/mocks';

const exampleService: CommerceService = {
  token: {
    state: 'complete',
    payload: {
      publicKey: 'Publishble key. See https://stripe.com/docs/keys',
    },
  },
};

const Form = () => {
  return (
    <>
      <CreditCardForm />
      <CreditCardErrorMessage />
    </>
  );
};

const Example = () => (
  <CommerceMockedEnvironment overrides={[stripeOverride]}>
    <BaseCreditCardFormState commerceService={exampleService}>
      <Form />
    </BaseCreditCardFormState>
  </CommerceMockedEnvironment>
);

export default Example;
