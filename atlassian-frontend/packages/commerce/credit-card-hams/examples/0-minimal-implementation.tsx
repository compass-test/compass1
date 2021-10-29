import React, { FormEvent, useCallback } from 'react';

import Button from '@atlaskit/button/standard-button';
import { CommerceMockedEnvironment } from '@atlassian/commerce-environment/mocks';

import {
  CreditCardErrorMessage,
  CreditCardForm,
  HAMSCreditCardFormState,
  isSuccessful,
  useHAMSGateway,
  useHAMSRenewablePaymentConfirm,
} from '../src';
import { scenarios, stripeOverride } from '../src/mocks';

const Form = () => {
  const submit = useHAMSRenewablePaymentConfirm(); // Alternatively useHAMSOneTimePaymentConfirm

  const gateway = useHAMSGateway();

  const trySubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (submit !== null) {
        const result = await submit();
        if (isSuccessful(result)) {
          console.log(
            'Combine the confirmation response + the gateway and send it to HAMS. ',
            gateway,
            result,
          );
        }
      }
    },
    [gateway, submit],
  );

  return (
    <form onSubmit={trySubmit}>
      <CreditCardForm />
      <CreditCardErrorMessage />
      <Button
        appearance="primary"
        type="submit"
        isDisabled={submit !== undefined}
      >
        Submit
      </Button>
    </form>
  );
};

const Example = () => {
  return (
    <CommerceMockedEnvironment
      overrides={[stripeOverride]}
      scenarios={[
        scenarios.stripeKeySuccess,
        scenarios.stripePaymentMethodTokenSuccess,
      ]}
    >
      <div style={{ width: '400px' }}>
        <HAMSCreditCardFormState>
          <Form />
        </HAMSCreditCardFormState>
      </div>
    </CommerceMockedEnvironment>
  );
};

export default Example;
