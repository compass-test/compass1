import React, { FormEvent, useState } from 'react';

import Button from '@atlaskit/button/standard-button';
import { CommerceStartgateProxy } from '@atlassian/commerce-environment/mocks';

import {
  CCPCreditCardFormState,
  CreditCardErrorMessage,
  CreditCardForm,
  useCCPCreatePaymentMethodAndConfirmCardSetup,
  useCreditCardState,
} from '../src';

const Form = () => {
  const state = useCreditCardState();
  const submit = useCCPCreatePaymentMethodAndConfirmCardSetup();

  const [error, setError] = useState('');

  const trySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submit) {
      setError('');
      try {
        const ok = await submit();
        console.log('ok', ok);
      } catch (err) {
        setError(err.message);
        console.error('error', err);
      }
    }
  };

  return (
    <form onSubmit={trySubmit}>
      <CreditCardForm />
      <CreditCardErrorMessage />
      <p>
        {state === 'complete' && (
          <Button appearance="primary" type="submit" isDisabled={!submit}>
            pay
          </Button>
        )}
      </p>
      <p>form state is: {state}</p>
      {error && <p>error: {error}</p>}
    </form>
  );
};

export default () => {
  return (
    <CommerceStartgateProxy>
      {(txaId) => (
        <div style={{ width: '400px' }}>
          <CCPCreditCardFormState accountId={txaId}>
            <Form />
          </CCPCreditCardFormState>
        </div>
      )}
    </CommerceStartgateProxy>
  );
};
