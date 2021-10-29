import React from 'react';

import { CommerceMockedEnvironment } from '@atlassian/commerce-environment/mocks';

import {
  BaseCreditCardFormState,
  CommerceService,
  CreditCardForm,
} from '../src';
import { stripeOverride } from '../src/mocks';
import { ErrorCreditCard } from '../src/ui/form/error';
import { LoadingCreditCard } from '../src/ui/form/loading';
import { FormSection } from '../src/ui/form/styled';

const mockedService: CommerceService = {
  token: {
    state: 'complete',
    payload: {
      publicKey: 'the-publishable-key-from-stripe',
    },
  },
};

export default () => (
  <div style={{ margin: 'auto', textAlign: 'center' }}>
    <h2>form</h2>
    <div style={{ width: '800px', margin: 'auto', display: 'flex' }}>
      <div style={{ width: '400px' }}>
        <LoadingCreditCard visible />
      </div>
      <div style={{ width: '400px' }}>
        <CommerceMockedEnvironment overrides={[stripeOverride]}>
          <BaseCreditCardFormState commerceService={mockedService}>
            <CreditCardForm />
          </BaseCreditCardFormState>
        </CommerceMockedEnvironment>
      </div>
    </div>
    <h2>error</h2>
    <div style={{ width: '400px', margin: 'auto' }}>
      <FormSection>
        <ErrorCreditCard />
      </FormSection>
    </div>
  </div>
);
